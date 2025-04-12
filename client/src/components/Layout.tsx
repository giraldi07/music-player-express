import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Initialize audio player and keyboard shortcuts
  useAudioPlayer();
  useKeyboardShortcuts();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {/* Header/Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Keyboard shortcuts: Space (Play/Pause), ← (Previous), → (Next), ↑/↓ (Volume)
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Supports MP3, WAV, OGG, and FLAC formats
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}