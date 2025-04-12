import React from 'react';
import { Link, useLocation } from 'wouter';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function NavLink({ href, children, className }: NavLinkProps) {
  const [location] = useLocation();
  const isActive = location === href;
  
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
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Offline Music Player</h1>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/">Now Playing</NavLink>
            <NavLink href="/songs">All Songs</NavLink>
            <NavLink href="/albums">Albums</NavLink>
            <NavLink href="/favorites">Favorites</NavLink>
          </div>
          
          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between overflow-x-auto py-2 -mx-4 px-4 space-x-2">
          <NavLink href="/" className="whitespace-nowrap">Now Playing</NavLink>
          <NavLink href="/songs" className="whitespace-nowrap">All Songs</NavLink>
          <NavLink href="/albums" className="whitespace-nowrap">Albums</NavLink>
          <NavLink href="/favorites" className="whitespace-nowrap">Favorites</NavLink>
        </div>
      </div>
    </nav>
  );
}