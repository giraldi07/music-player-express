import React from 'react';
import FileUploadButton from './FileUploadButton';
import CurrentTrackPlayer from './CurrentTrackPlayer';
import PlaylistManager from './PlaylistManager';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

export default function MusicPlayer() {
  // Initialize audio player and keyboard shortcuts
  useAudioPlayer();
  useKeyboardShortcuts();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
              <h1 className="text-xl font-semibold text-gray-800">Offline Music Player</h1>
            </div>
            
            {/* File Input */}
            <FileUploadButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Current Track & Player Controls */}
        <CurrentTrackPlayer />
        
        {/* Playlist Section */}
        <PlaylistManager />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="text-sm text-gray-500">
              Keyboard shortcuts: Space (Play/Pause), ← (Previous), → (Next), ↑/↓ (Volume)
            </div>
            <div className="text-sm text-gray-500">
              Supports MP3, WAV, OGG, and FLAC formats
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
