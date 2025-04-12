import React from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { formatTime } from '@/lib/audioPlayer';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import PlaybackControls from './PlaybackControls';
import CDAnimation from './CDAnimation';
import { cn } from '@/lib/utils';

export default function CurrentTrackPlayer() {
  const { state, dispatch, currentTrack } = usePlayer();
  const { currentTime, duration, volume, isMuted } = state;
  const { seekByPercentage } = useAudioPlayer();
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(e.target.value);
    seekByPercentage(percent);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value) / 100;
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };
  
  const handleToggleMute = () => {
    dispatch({ type: 'TOGGLE_MUTE' });
  };
  
  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  return (
    <section className="music-card w-full md:w-1/2 lg:w-3/5">
      <div className="p-6 flex flex-col h-full">
        {/* Currently Playing */}
        <div className="flex flex-col items-center justify-center flex-grow py-6">
          {/* Album Art / CD Animation / No Track Selected */}
          {currentTrack ? (
            <div className="mb-8">
              <CDAnimation />
            </div>
          ) : (
            <div className="relative mb-8 rounded-lg shadow-lg overflow-hidden w-48 h-48 md:w-64 md:h-64">
              <div className="absolute inset-0 bg-gray-800 dark:bg-gray-700 bg-opacity-70 flex items-center justify-center">
                <div className="text-center p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <p className="text-white dark:text-gray-200 text-lg font-medium">No track selected</p>
                  <p className="text-gray-300 dark:text-gray-400 mt-2">Select music files to begin playback</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Track Info */}
          <div className="text-center">
            <h2 className={cn(
              "text-xl font-bold mb-1",
              currentTrack ? "text-gray-800 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
            )}>
              {currentTrack?.title || 'No Track Selected'}
            </h2>
            <h3 className={cn(
              "text-lg mb-2",
              currentTrack ? "text-gray-600 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"
            )}>
              {currentTrack?.artist || 'Select a track to play'}
            </h3>
            {currentTrack?.album && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentTrack.album}
              </p>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progressPercentage} 
            className="w-full" 
            onChange={handleSeek}
          />
        </div>
        
        {/* Player Controls */}
        <PlaybackControls />
        
        {/* Volume Control */}
        <div className="flex items-center space-x-2 mt-6">
          {/* Mute/Unmute Button */}
          <button 
            className="p-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={handleToggleMute}
          >
            {isMuted || volume === 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : volume < 0.5 ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
          
          {/* Volume Slider */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume * 100} 
            className="w-full max-w-xs" 
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </section>
  );
}
