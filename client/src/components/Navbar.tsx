import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  isMobile?: boolean;
  sidebar?: boolean;
}

function NavLink({ href, children, className, icon, isMobile = false, sidebar = false }: NavLinkProps) {
  const [location] = useLocation();
  const isActive = location === href;
  
  if (isMobile) {
    return (
      <Link href={href}>
        <span className={cn(
          "flex flex-col items-center justify-center h-full p-1 transition-colors cursor-pointer",
          isActive 
            ? "text-primary" 
            : "text-gray-600 dark:text-gray-400",
          className
        )}>
          {icon}
          <span className="text-xs mt-1">{children}</span>
        </span>
      </Link>
    );
  }
  
  if (sidebar) {
    return (
      <Link href={href}>
        <span className={cn(
          "flex items-center px-4 py-3 rounded-md font-medium transition-colors cursor-pointer",
          isActive 
            ? "bg-primary text-white dark:bg-primary dark:text-primary-foreground" 
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
          className
        )}>
          {icon && <span className="mr-3">{icon}</span>}
          {children}
        </span>
      </Link>
    );
  }
  
  return (
    <Link href={href}>
      <span className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors cursor-pointer",
        isActive 
          ? "bg-primary text-white dark:bg-primary dark:text-primary-foreground" 
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
        className
      )}>
        {children}
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  

  // Close sidebar when switching to mobile view
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      // Always show sidebar on desktop
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Icons for navigation
  const icons = {
    nowPlaying: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    songs: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    albums: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    favorites: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  };
  
  return (
    <>
      {/* Top Navigation Bar - Fixed at the top */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 z-30 fixed top-0 left-0 right-0">
        <div className="max-w-full mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo and Title */}
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" /> {/* indigo-600 */}
                    <stop offset="100%" stopColor="#9333ea" /> {/* purple-600 */}
                  </linearGradient>
                  <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
                  </filter>
                </defs>
                <path
                  d="M20 4a1 1 0 00-1.2-.98l-12 2A1 1 0 006 6v9.5A3.5 3.5 0 005 15c-1.66 0-3 .9-3 2s1.34 2 3 2 3-.9 3-2V9l10-2v5.5A3.5 3.5 0 0015 12c-1.66 0-3 .9-3 2s1.34 2 3 2 3-.9 3-2V4z"
                  fill="url(#modernGradient)"
                  filter="url(#shadow3d)"
                  stroke="#fff"
                  strokeWidth="0.5"
                />
              </svg>

              
            </div>
            
            {/* Right: Theme Toggle */}
            <div className="flex items-end space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
      
      {/* Desktop/Tablet Sidebar */}
      <div className={cn(
        "fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-800 z-20 transition-transform duration-300 ease-in-out",
        isMobile ? "hidden" : "lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="px-4 pt-4 pb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Menu</h2>
          </div>
          
          <div className="flex-1 space-y-1 px-3 pb-4">
            <NavLink href="/" sidebar={true} icon={icons.nowPlaying}>Now Playing</NavLink>
            <NavLink href="/songs" sidebar={true} icon={icons.songs}>All Songs</NavLink>
            <NavLink href="/albums" sidebar={true} icon={icons.albums}>Albums</NavLink>
            <NavLink href="/favorites" sidebar={true} icon={icons.favorites}>Favorites</NavLink>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation Bar */}
      <div className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-30 h-16 flex justify-around items-center px-2",
        !isMobile && "hidden"
      )}>
        <NavLink href="/" isMobile={true} icon={icons.nowPlaying}>
          Now Playing
        </NavLink>
        <NavLink href="/songs" isMobile={true} icon={icons.songs}>
          Songs
        </NavLink>
        <NavLink href="/albums" isMobile={true} icon={icons.albums}>
          Albums
        </NavLink>
        <NavLink href="/favorites" isMobile={true} icon={icons.favorites}>
          Favorites
        </NavLink>
      </div>
      
      {/* Overlay for sidebar on tablet */}
      {/* {sidebarOpen && !isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity lg:hidden"
          onClick={toggleSidebar}
        />
      )} */}

      {/* Main content padding - This should wrap your page content */}
      <div className={cn(
        "pt-16", 
        !isMobile ? "lg:pl-64" : "pl-0",
        sidebarOpen && !isMobile ? "pl-64" : "pl-0"
      )}>
        {/* Your page content will be rendered here */}
      </div>
    </>
  );
}