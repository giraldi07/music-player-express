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
          </div>
        </div>
        
        
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