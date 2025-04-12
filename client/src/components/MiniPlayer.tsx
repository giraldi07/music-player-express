import React from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { formatTime } from '@/lib/audioPlayer';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

export default function MiniPlayer() {
  const { state, dispatch, currentTrack } = usePlayer();
  const { isPlaying, currentTime, duration } = state;
  
  if (!currentTrack) return null;
  
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  const handlePlayPause = () => {
    dispatch({ type: 'TOGGLE_PLAY' });
  };
  
  const handlePrevious = () => {
    dispatch({ type: 'PREVIOUS_TRACK' });
  };
  
  const handleNext = () => {
    dispatch({ type: 'NEXT_TRACK' });
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-2 z-50">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
        <div 
          className="h-full bg-primary" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto flex items-center px-2">
        {/* Track Info */}
        <div className="flex-grow min-w-0 mr-4">
          <Link href="/">
            <a className="block">
              <p className="font-medium text-sm truncate text-gray-900 dark:text-gray-100">
                {currentTrack.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {currentTrack.artist} {currentTrack.album ? `• ${currentTrack.album}` : ''}
              </p>
            </a>
          </Link>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground"
            onClick={handlePrevious}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className={cn(
              "p-2 rounded-full",
              isPlaying 
                ? "bg-primary text-white" 
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            )}
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            )}
          </button>
          
          <button 
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground"
            onClick={handleNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap w-16 text-right">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}