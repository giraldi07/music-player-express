import React, { useState } from 'react';
import Layout from '@/components/Layout';
import CurrentTrackPlayer from '@/components/CurrentTrackPlayer';
import PlaylistManager from '@/components/PlaylistManager';
import FileUploadButton from '@/components/FileUploadButton';
import MiniPlayer from '@/components/MiniPlayer';
import { usePlayer } from '@/context/PlayerContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const NowPlaying = () => {
  const { state } = usePlayer();
  const { tracks } = state;
  const [showShortcuts] = useState(false);
  const isMobile = useIsMobile();
  
  
  return (
    <Layout>
      <div className={cn(
        "mx-auto transition-all duration-300",
        isMobile ? "px-3 py-4" : "max-w-7xl px-4 sm:px-6 lg:px-8 py-6"
      )}>
        {/* Header section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <h1 className={cn(
              "font-bold text-gray-900 dark:text-gray-100 transition-all duration-300",
              isMobile ? "text-xl" : "text-2xl"
            )}>Now Playing</h1>
            {/* <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={toggleShortcutsGuide}
              className={cn(
                "transition-all duration-300",
                isMobile ? "text-xs" : "text-sm"
              )}
            >
              {showShortcuts ? 'Hide Shortcuts' : 'Keyboard Shortcuts'}
            </Button> */}
          </div>
          
          {/* <div className="mt-3 sm:mt-0">
            <FileUploadButton />
          </div> */}
        </div>
        
        {/* Keyboard Shortcuts Guide */}
        {showShortcuts && (
          <div className={cn(
            "bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 sm:mb-6 transition-all duration-300",
            isMobile ? "p-3" : "p-4"
          )}>
            <h3 className={cn(
              "font-medium text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 transition-all duration-300",
              isMobile ? "text-base" : "text-lg"
            )}>Keyboard Shortcuts</h3>
            <div className={cn(
              "grid gap-2 sm:gap-3 transition-all duration-300",
              isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            )}>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2 text-xs sm:text-sm">Space</span>
                <span className={cn(
                  "text-gray-700 dark:text-gray-300 transition-all duration-300",
                  isMobile ? "text-xs" : "text-sm"
                )}>Play/Pause</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2 text-xs sm:text-sm">←</span>
                <span className={cn(
                  "text-gray-700 dark:text-gray-300 transition-all duration-300",
                  isMobile ? "text-xs" : "text-sm"
                )}>Previous Track</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2 text-xs sm:text-sm">→</span>
                <span className={cn(
                  "text-gray-700 dark:text-gray-300 transition-all duration-300",
                  isMobile ? "text-xs" : "text-sm"
                )}>Next Track</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2 text-xs sm:text-sm">↑</span>
                <span className={cn(
                  "text-gray-700 dark:text-gray-300 transition-all duration-300",
                  isMobile ? "text-xs" : "text-sm"
                )}>Volume Up</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2 text-xs sm:text-sm">↓</span>
                <span className={cn(
                  "text-gray-700 dark:text-gray-300 transition-all duration-300",
                  isMobile ? "text-xs" : "text-sm"
                )}>Volume Down</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2 text-xs sm:text-sm">M</span>
                <span className={cn(
                  "text-gray-700 dark:text-gray-300 transition-all duration-300",
                  isMobile ? "text-xs" : "text-sm"
                )}>Mute/Unmute</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2 text-xs sm:text-sm">S</span>
                <span className={cn(
                  "text-gray-700 dark:text-gray-300 transition-all duration-300",
                  isMobile ? "text-xs" : "text-sm"
                )}>Toggle Shuffle</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2 text-xs sm:text-sm">R</span>
                <span className={cn(
                  "text-gray-700 dark:text-gray-300 transition-all duration-300",
                  isMobile ? "text-xs" : "text-sm"
                )}>Toggle Repeat</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Main content area */}
        <div className={cn(
          "flex flex-col items-start transition-all duration-300",
          isMobile ? "gap-4" : "lg:flex-row gap-6"
        )}>
          {/* Current Track Player */}
          <CurrentTrackPlayer />
          
          {/* Playlist */}
          <PlaylistManager />
        </div>
        
        {/* Empty State */}
        {tracks.length === 0 && (
          <div className={cn(
            "text-center bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300",
            isMobile ? "mt-8 p-6" : "mt-12 p-10"
          )}>
            <svg xmlns="http://www.w3.org/2000/svg" className={cn(
              "mx-auto text-gray-300 dark:text-gray-600 mb-3 sm:mb-4 transition-all duration-300",
              isMobile ? "h-12 w-12" : "h-16 w-16"
            )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <h2 className={cn(
              "font-semibold text-gray-800 dark:text-gray-200 mb-2 transition-all duration-300",
              isMobile ? "text-lg" : "text-xl"
            )}>No music yet</h2>
            <p className={cn(
              "text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto transition-all duration-300",
              isMobile ? "text-sm" : "text-base"
            )}>
              Upload your music files to start listening. This player works completely offline - your files stay on your device.
            </p>
            <FileUploadButton />
          </div>
        )}

        <div className="flex flex-col items-center p-4 space-y-2">
          <h3>{`Total Tracks: ${tracks.length}`}</h3>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Giraldi Prama Yudistira. All rights reserved.
          </p>
        </div>

      </div>
      
      <MiniPlayer />
    </Layout>
  );
};

export default NowPlaying;