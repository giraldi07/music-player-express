import React, { useState } from 'react';
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
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
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
      {/* Top Navigation Bar */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo and Title */}
            <div className="flex items-center space-x-2">
              {/* Hamburger menu button for tablet/desktop */}
              {!isMobile && (
                <button 
                  onClick={toggleSidebar}
                  className="mr-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Offline Music Player</h1>
            </div>
            
            {/* Right: Theme Toggle */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
      
      {/* Desktop/Tablet Sidebar */}
      <div className={cn(
        "fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-800 z-30 transition-transform duration-300 ease-in-out transform md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        isMobile && "hidden" // Hide on mobile
      )}>
        <div className="flex flex-col h-full py-4">
          <div className="px-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Menu</h2>
          </div>
          
          <div className="flex-1 space-y-1 px-3">
            <NavLink href="/" sidebar={true} icon={icons.nowPlaying}>Now Playing</NavLink>
            <NavLink href="/songs" sidebar={true} icon={icons.songs}>All Songs</NavLink>
            <NavLink href="/albums" sidebar={true} icon={icons.albums}>Albums</NavLink>
            <NavLink href="/favorites" sidebar={true} icon={icons.favorites}>Favorites</NavLink>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation Bar */}
      <div className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40 h-16 flex justify-around items-center px-2",
        !isMobile && "hidden" // Hide on tablet/desktop
      )}>
        <NavLink 
          href="/" 
          isMobile={true} 
          icon={icons.nowPlaying}
        >
          Now Playing
        </NavLink>
        
        <NavLink 
          href="/songs" 
          isMobile={true} 
          icon={icons.songs}
        >
          Songs
        </NavLink>
        
        <NavLink 
          href="/albums" 
          isMobile={true} 
          icon={icons.albums}
        >
          Albums
        </NavLink>
        
        <NavLink 
          href="/favorites" 
          isMobile={true} 
          icon={icons.favorites}
        >
          Favorites
        </NavLink>
      </div>
      
      {/* Overlay for sidebar on tablet/desktop */}
      {sidebarOpen && !isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}