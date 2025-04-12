import { useEffect } from 'react';
import { usePlayer } from '@/context/PlayerContext';

export function useKeyboardShortcuts() {
  const { state, dispatch } = usePlayer();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if we're in an input element
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }
      
      switch (e.code) {
        case 'Space':
          e.preventDefault(); // Prevent page scroll
          dispatch({ type: 'TOGGLE_PLAY' });
          break;
          
        case 'ArrowLeft':
          dispatch({ type: 'PREVIOUS_TRACK' });
          break;
          
        case 'ArrowRight':
          dispatch({ type: 'NEXT_TRACK' });
          break;
          
        case 'ArrowUp':
          e.preventDefault(); // Prevent page scroll
          const newVolumeUp = Math.min(1, state.volume + 0.1);
          dispatch({ type: 'SET_VOLUME', payload: newVolumeUp });
          break;
          
        case 'ArrowDown':
          e.preventDefault(); // Prevent page scroll
          const newVolumeDown = Math.max(0, state.volume - 0.1);
          dispatch({ type: 'SET_VOLUME', payload: newVolumeDown });
          break;
          
        case 'KeyM':
          dispatch({ type: 'TOGGLE_MUTE' });
          break;
          
        case 'KeyS':
          dispatch({ type: 'TOGGLE_SHUFFLE' });
          break;
          
        case 'KeyR':
          dispatch({ type: 'TOGGLE_REPEAT' });
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.volume, dispatch]);
}
