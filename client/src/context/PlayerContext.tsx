import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { PlayerState, PlayerAction, Track } from '@/types';

const initialState: PlayerState = {
  tracks: [],
  currentTrackIndex: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  isMuted: false,
  isShuffled: false,
  repeatMode: 'none',
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'ADD_TRACKS':
      return {
        ...state,
        tracks: [...state.tracks, ...action.payload],
        currentTrackIndex: state.currentTrackIndex === null && action.payload.length > 0 
          ? 0 
          : state.currentTrackIndex,
      };
      
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
        currentTrackIndex: null,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
      };
      
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
