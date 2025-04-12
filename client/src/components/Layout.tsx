import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { useTheme } from '@/context/ThemeContext';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}