import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { AudioPlayer } from '@/lib/audioPlayer';
import { Track } from '@/types';

export function useAudioPlayer() {
  const { state, dispatch, currentTrack } = usePlayer();
  const audioPlayerRef = useRef<AudioPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  // Initialize audio player
  useEffect(() => {
    audioPlayerRef.current = new AudioPlayer();
    
    const player = audioPlayerRef.current;
    
    player.onTimeUpdate = () => {
      dispatch({ type: 'SET_CURRENT_TIME', payload: player.currentTime });
    };
    
    player.onDurationChange = () => {
      dispatch({ type: 'SET_DURATION', payload: player.duration });
    };
    
    player.onEnded = () => {
      if (state.repeatMode === 'one') {
        player.currentTime = 0;
        player.play();
      } else if (state.repeatMode === 'all' || state.currentTrackIndex! < state.tracks.length - 1) {
        dispatch({ type: 'NEXT_TRACK' });
      } else {
        dispatch({ type: 'TOGGLE_PLAY' });
      }
    };
    
    player.onCanPlay = () => {
      setIsReady(true);
    };
    
    player.onError = (e) => {
      console.error('Audio player error:', e);
      setIsReady(false);
    };
    
    player.volume = state.volume;
    player.muted = state.isMuted;
    
    return () => {
      player.destroy();
    };
  }, []);
  
  // Handle track changes
  useEffect(() => {
    if (!audioPlayerRef.current || !currentTrack) return;
    
    setIsReady(false);
    audioPlayerRef.current.loadTrack(currentTrack);
  }, [currentTrack]);
  
  // Handle play/pause
  useEffect(() => {
    if (!audioPlayerRef.current || !currentTrack || !isReady) return;
    
    if (state.isPlaying) {
      audioPlayerRef.current.play().catch(err => {
        console.error('Failed to play:', err);
        dispatch({ type: 'TOGGLE_PLAY' });
      });
    } else {
      audioPlayerRef.current.pause();
    }
  }, [state.isPlaying, currentTrack, isReady]);
  
  // Handle volume changes
  useEffect(() => {
    if (!audioPlayerRef.current) return;
    audioPlayerRef.current.volume = state.volume;
  }, [state.volume]);
  
  // Handle mute toggle
  useEffect(() => {
    if (!audioPlayerRef.current) return;
    audioPlayerRef.current.muted = state.isMuted;
  }, [state.isMuted]);
  
  // Functions to control the audio player
  const seekTo = (time: number) => {
    if (!audioPlayerRef.current) return;
    audioPlayerRef.current.currentTime = time;
  };
  
  const seekByPercentage = (percent: number) => {
    if (!audioPlayerRef.current || !state.duration) return;
    const time = (percent / 100) * state.duration;
    seekTo(time);
  };
  
  return {
    seekTo,
    seekByPercentage,
    isReady
  };
}
