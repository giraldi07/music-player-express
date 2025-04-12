import React from 'react';
import { Button } from '@/components/ui/button';
import { usePlayer } from '@/context/PlayerContext';
import { cn } from '@/lib/utils';

export default function PlaybackControls() {
  const { state, dispatch } = usePlayer();
  const { isPlaying, isShuffled, repeatMode } = state;
  
  const handlePlayPause = () => {
    dispatch({ type: 'TOGGLE_PLAY' });
  };
  
  const handlePreviousTrack = () => {
    dispatch({ type: 'PREVIOUS_TRACK' });
  };
  
  const handleNextTrack = () => {
    dispatch({ type: 'NEXT_TRACK' });
  };
  
  const handleToggleShuffle = () => {
    dispatch({ type: 'TOGGLE_SHUFFLE' });
  };
  
  const handleToggleRepeat = () => {
    dispatch({ type: 'TOGGLE_REPEAT' });
  };
  
  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      {/* Shuffle Button */}
      <Button 
        size="icon"
        variant="ghost"
        className={cn(
          "p-2 rounded-full transition-colors",
          isShuffled 
            ? "text-primary bg-indigo-50 dark:bg-indigo-900/30" 
            : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
        onClick={handleToggleShuffle}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </Button>
      
      {/* Previous Track */}
      <Button 
        size="icon"
        variant="ghost"
        className="p-3 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={handlePreviousTrack}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
        </svg>
      </Button>
      
      {/* Play/Pause */}
      <Button 
        className="p-4 rounded-full bg-primary hover:bg-primary/90 text-white dark:text-primary-foreground shadow-md transition transform hover:scale-105"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </Button>
      
      {/* Next Track */}
      <Button 
        size="icon"
        variant="ghost"
        className="p-3 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={handleNextTrack}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
        </svg>
      </Button>
      
      {/* Repeat Button */}
      <Button 
        size="icon"
        variant="ghost"
        className={cn(
          "p-2 rounded-full transition-colors",
          repeatMode !== 'none' 
            ? "text-primary bg-indigo-50 dark:bg-indigo-900/30" 
            : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
        onClick={handleToggleRepeat}
      >
        {repeatMode === 'one' ? (
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">1</span>
          </div>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        )}
      </Button>
    </div>
  );
}
