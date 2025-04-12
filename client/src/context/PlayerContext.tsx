import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { PlayerState, PlayerAction, Track, Album } from '@/types';
import { nanoid } from 'nanoid';

const initialState: PlayerState = {
  tracks: [],
  albums: [],
  currentTrackIndex: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  isMuted: false,
  isShuffled: false,
  repeatMode: 'none',
  cdRotation: 0,
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'ADD_TRACKS': {
      const newTracks = [...state.tracks, ...action.payload];
      return {
        ...state,
        tracks: newTracks,
        currentTrackIndex: state.currentTrackIndex === null && action.payload.length > 0 
          ? 0 
          : state.currentTrackIndex,
      };
    }
      
    case 'PLAY_TRACK':
      return {
        ...state,
        currentTrackIndex: action.payload,
        isPlaying: true,
      };
      
    case 'TOGGLE_PLAY':
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
      
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload,
      };
      
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
      };
      
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload,
        isMuted: action.payload === 0,
      };
      
    case 'TOGGLE_MUTE':
      return {
        ...state,
        isMuted: !state.isMuted,
      };
      
    case 'NEXT_TRACK': {
      if (state.tracks.length === 0 || state.currentTrackIndex === null) {
        return state;
      }
      
      let nextIndex: number;
      
      if (state.isShuffled) {
        // Random track excluding current
        const availableIndices = state.tracks
          .map((_, index) => index)
          .filter(index => index !== state.currentTrackIndex);
        
        nextIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      } else {
        nextIndex = (state.currentTrackIndex + 1) % state.tracks.length;
      }
      
      return {
        ...state,
        currentTrackIndex: nextIndex,
        isPlaying: true,
      };
    }
      
    case 'PREVIOUS_TRACK': {
      if (state.tracks.length === 0 || state.currentTrackIndex === null) {
        return state;
      }
      
      let prevIndex: number;
      
      if (state.isShuffled) {
        // Random track excluding current
        const availableIndices = state.tracks
          .map((_, index) => index)
          .filter(index => index !== state.currentTrackIndex);
        
        prevIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      } else {
        prevIndex = state.currentTrackIndex === 0 
          ? state.tracks.length - 1 
          : state.currentTrackIndex - 1;
      }
      
      return {
        ...state,
        currentTrackIndex: prevIndex,
        isPlaying: true,
      };
    }
      
    case 'TOGGLE_SHUFFLE':
      return {
        ...state,
        isShuffled: !state.isShuffled,
      };
      
    case 'TOGGLE_REPEAT': {
      const modes: ('none' | 'all' | 'one')[] = ['none', 'all', 'one'];
      const currentIndex = modes.indexOf(state.repeatMode);
      const nextIndex = (currentIndex + 1) % modes.length;
      
      return {
        ...state,
        repeatMode: modes[nextIndex],
      };
    }
      
    case 'CLEAR_PLAYLIST':
      return {
        ...state,
        tracks: [],
        albums: [],
        currentTrackIndex: null,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
      };
      
    case 'UPDATE_CD_ROTATION':
      return {
        ...state,
        cdRotation: action.payload,
      };
      
    case 'ORGANIZE_ALBUMS': {
      // Group tracks by album
      const albumsMap = new Map<string, Track[]>();
      
      state.tracks.forEach(track => {
        const albumTitle = track.album || 'Unknown Album';
        if (!albumsMap.has(albumTitle)) {
          albumsMap.set(albumTitle, []);
        }
        albumsMap.get(albumTitle)?.push(track);
      });
      
      // Create album objects
      const albums: Album[] = [];
      
      albumsMap.forEach((tracks, albumTitle) => {
        // Use the artist from the first track as the album artist
        const artist = tracks[0]?.artist || 'Unknown Artist';
        // Use the first track's cover art as the album cover
        const coverArt = tracks[0]?.coverArt;
        
        albums.push({
          id: nanoid(),
          title: albumTitle,
          artist,
          coverArt,
          tracks,
        });
      });
      
      return {
        ...state,
        albums,
      };
    }
      
    default:
      return state;
  }
}

interface PlayerContextType {
  state: PlayerState;
  dispatch: React.Dispatch<PlayerAction>;
  currentTrack: Track | null;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  
  const currentTrack = state.currentTrackIndex !== null && state.tracks.length > 0 
    ? state.tracks[state.currentTrackIndex] 
    : null;
  
  // Organize tracks into albums when tracks change
  useEffect(() => {
    if (state.tracks.length > 0) {
      dispatch({ type: 'ORGANIZE_ALBUMS' });
    }
  }, [state.tracks]);
  
  // CD rotation animation effect
  useEffect(() => {
    let animationFrameId: number;
    
    if (state.isPlaying) {
      let lastTime = 0;
      const rotateCD = (time: number) => {
        if (lastTime === 0) {
          lastTime = time;
        }
        
        const delta = time - lastTime;
        lastTime = time;
        
        // Rotate 1 degree every 50ms (thus 7.2 RPM - like a real vinyl)
        const rotationSpeed = 0.02; // degrees per millisecond
        const newRotation = (state.cdRotation + rotationSpeed * delta) % 360;
        
        dispatch({ type: 'UPDATE_CD_ROTATION', payload: newRotation });
        animationFrameId = requestAnimationFrame(rotateCD);
      };
      
      animationFrameId = requestAnimationFrame(rotateCD);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [state.isPlaying, state.cdRotation]);
  
  return (
    <PlayerContext.Provider value={{ state, dispatch, currentTrack }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
