import React from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { formatTime } from '@/lib/audioPlayer';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export default function MiniPlayer() {
  const { state, dispatch, currentTrack } = usePlayer();
  const { isPlaying, currentTime, duration } = state;
  const isMobile = useIsMobile();
  
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
    <div className={cn(
      "fixed left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 transition-all duration-300",
      isMobile ? "bottom-16 p-1.5 sm:p-2" : "bottom-0 p-2" // Adjust position for mobile to accommodate the bottom nav bar
    )}>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
        <div 
          className="h-full bg-primary" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className={cn(
        "mx-auto flex items-center transition-all duration-300",
        isMobile ? "px-1.5 sm:px-2" : "max-w-7xl px-2 sm:px-4"
      )}>
        {/* Track Info */}
        <div className={cn(
          "flex-grow min-w-0 transition-all duration-300",
          isMobile ? "mr-2" : "mr-4"
        )}>
          <Link href="/">
            <span className="block cursor-pointer">
              <p className={cn(
                "font-medium truncate text-gray-900 dark:text-gray-100 transition-all duration-300",
                isMobile ? "text-xs" : "text-sm"
              )}>
                {currentTrack.title}
              </p>
              <p className={cn(
                "text-gray-500 dark:text-gray-400 truncate transition-all duration-300",
                isMobile ? "text-[10px]" : "text-xs"
              )}>
                {currentTrack.artist} {currentTrack.album ? `• ${currentTrack.album}` : ''}
              </p>
            </span>
          </Link>
        </div>
        
        {/* Controls */}
        <div className={cn(
          "flex items-center transition-all duration-300",
          isMobile ? "space-x-1.5 sm:space-x-2" : "space-x-2 sm:space-x-3"
        )}>
          <button 
            className={cn(
              "rounded-full text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors",
              isMobile ? "p-1.5" : "p-2"
            )}
            onClick={handlePrevious}
            aria-label="Previous track"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={cn(
              "transition-all duration-300",
              isMobile ? "h-4 w-4" : "h-5 w-5"
            )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className={cn(
              "rounded-full transition-all duration-300",
              isMobile ? "p-1.5" : "p-2",
              isPlaying 
                ? "bg-primary text-white dark:text-primary-foreground" 
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            )}
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className={cn(
                "transition-all duration-300",
                isMobile ? "h-5 w-5" : "h-6 w-6"
              )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className={cn(
                "transition-all duration-300",
                isMobile ? "h-5 w-5" : "h-6 w-6"
              )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            )}
          </button>
          
          <button 
            className={cn(
              "rounded-full text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors",
              isMobile ? "p-1.5" : "p-2"
            )}
            onClick={handleNext}
            aria-label="Next track"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={cn(
              "transition-all duration-300",
              isMobile ? "h-4 w-4" : "h-5 w-5"
            )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <span className={cn(
            "text-gray-500 dark:text-gray-400 whitespace-nowrap text-right transition-all duration-300",
            isMobile ? "text-[10px] w-14" : "text-xs w-16"
          )}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}