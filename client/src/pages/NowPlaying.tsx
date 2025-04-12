import React, { useState } from 'react';
import Layout from '@/components/Layout';
import CurrentTrackPlayer from '@/components/CurrentTrackPlayer';
import PlaylistManager from '@/components/PlaylistManager';
import FileUploadButton from '@/components/FileUploadButton';
import MiniPlayer from '@/components/MiniPlayer';
import { usePlayer } from '@/context/PlayerContext';
import { Button } from '@/components/ui/button';

export default function NowPlaying() {
  const { state } = usePlayer();
  const { tracks } = state;
  const [showShortcuts, setShowShortcuts] = useState(false);
  
  const toggleShortcutsGuide = () => {
    setShowShortcuts(prev => !prev);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Now Playing</h1>
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleShortcutsGuide}
              className="text-sm"
            >
              {showShortcuts ? 'Hide Shortcuts' : 'Keyboard Shortcuts'}
            </Button>
          </div>
          
          <div className="mt-4 md:mt-0">
            <FileUploadButton />
          </div>
        </div>
        
        {/* Keyboard Shortcuts Guide */}
        {showShortcuts && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Keyboard Shortcuts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2">Space</span>
                <span className="text-gray-700 dark:text-gray-300">Play/Pause</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2">←</span>
                <span className="text-gray-700 dark:text-gray-300">Previous Track</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2">→</span>
                <span className="text-gray-700 dark:text-gray-300">Next Track</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2">↑</span>
                <span className="text-gray-700 dark:text-gray-300">Volume Up</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2">↓</span>
                <span className="text-gray-700 dark:text-gray-300">Volume Down</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2">M</span>
                <span className="text-gray-700 dark:text-gray-300">Mute/Unmute</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2">S</span>
                <span className="text-gray-700 dark:text-gray-300">Toggle Shuffle</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 font-mono mr-2">R</span>
                <span className="text-gray-700 dark:text-gray-300">Toggle Repeat</span>
              </div>
            </div>
          </div>
        )}
        
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