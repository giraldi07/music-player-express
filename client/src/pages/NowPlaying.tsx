import React from 'react';
import Layout from '@/components/Layout';
import CurrentTrackPlayer from '@/components/CurrentTrackPlayer';
import PlaylistManager from '@/components/PlaylistManager';
import FileUploadButton from '@/components/FileUploadButton';
import MiniPlayer from '@/components/MiniPlayer';
import { usePlayer } from '@/context/PlayerContext';

export default function NowPlaying() {
  const { state } = usePlayer();
  const { tracks } = state;
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Now Playing</h1>
          
          <div className="mt-4 md:mt-0">
            <FileUploadButton />
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Current Track Player */}
          <CurrentTrackPlayer />
          
          {/* Playlist */}
          <PlaylistManager />
        </div>
        
        {/* Empty State */}
        {tracks.length === 0 && (
          <div className="mt-12 text-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No music yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Upload your music files to start listening. This player works completely offline - your files stay on your device.
            </p>
            <FileUploadButton />
          </div>
        )}
      </div>
      
      <MiniPlayer />
    </Layout>
  );
}