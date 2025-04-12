import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { useTheme } from '@/context/ThemeContext';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <main className={cn(
          "pb-20", // Default padding for the mini player
          isMobile && "pb-36" // Extra padding on mobile for bottom nav + mini player
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;