import { useEffect } from 'react';
import { usePlayer } from '@/context/PlayerContext';

export function useKeyboardShortcuts() {
  const { state, dispatch } = usePlayer();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      // Space: Play/Pause
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent scrolling
        dispatch({ type: 'TOGGLE_PLAY' });
      }
      
      // Right Arrow: Next Track
      if (e.code === 'ArrowRight') {
        dispatch({ type: 'NEXT_TRACK' });
      }
      
      // Left Arrow: Previous Track
      if (e.code === 'ArrowLeft') {
        dispatch({ type: 'PREVIOUS_TRACK' });
      }
      
      // M: Mute/Unmute
      if (e.code === 'KeyM') {
        dispatch({ type: 'TOGGLE_MUTE' });
      }
      
      // S: Toggle Shuffle
      if (e.code === 'KeyS') {
        dispatch({ type: 'TOGGLE_SHUFFLE' });
      }
      
      // R: Toggle Repeat
      if (e.code === 'KeyR') {
        dispatch({ type: 'TOGGLE_REPEAT' });
      }
      
      // Volume Up: Up Arrow
      if (e.code === 'ArrowUp') {
        e.preventDefault(); // Prevent scrolling
        const newVolume = Math.min(state.volume + 0.1, 1);
        dispatch({ type: 'SET_VOLUME', payload: newVolume });
      }
      
      // Volume Down: Down Arrow
      if (e.code === 'ArrowDown') {
        e.preventDefault(); // Prevent scrolling
        const newVolume = Math.max(state.volume - 0.1, 0);
        dispatch({ type: 'SET_VOLUME', payload: newVolume });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, state.volume]);
}