import React, { useState, useEffect } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { Track } from '@/types';
import { formatTime } from '@/lib/audioPlayer';
import { cn } from '@/lib/utils';

// Favorites key for localStorage
const FAVORITES_KEY = 'music_player_favorites';

interface TrackItemProps {
  track: Track;
  index: number;
  isActive: boolean;
}

export default function TrackItem({ track, index, isActive }: TrackItemProps) {
  const { dispatch } = usePlayer();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Check if track is in favorites
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites) as string[];
        setIsFavorite(favorites.includes(track.id));
      } catch (e) {
        console.error('Failed to parse favorites:', e);
      }
    }
  }, [track.id]);
  
  const handlePlayTrack = () => {
    dispatch({ type: 'PLAY_TRACK', payload: index });
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent trigger of parent onClick
    
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    let favorites: string[] = [];
    
    if (savedFavorites) {
      try {
        favorites = JSON.parse(savedFavorites) as string[];
      } catch (e) {
        console.error('Failed to parse favorites:', e);
      }
    }
    
    // Toggle favorite status
    if (isFavorite) {
      favorites = favorites.filter(id => id !== track.id);
    } else {
      favorites.push(track.id);
    }
    
    // Save updated favorites
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };
  
  return (
    <div 
      className={cn(
        "playlist-item",
        isActive ? "playlist-item-active" : "playlist-item-inactive"
      )}
      onClick={handlePlayTrack}
    >
      <div className="flex-shrink-0 mr-3">
        {isActive ? (
          // Playing Indicator
          <div className="flex items-end space-x-0.5 h-5 w-5">
            <div className="w-1 bg-success h-2 animate-pulse"></div>
            <div className="w-1 bg-success h-3 animate-pulse"></div>
            <div className="w-1 bg-success h-4 animate-pulse"></div>
            <div className="w-1 bg-success h-2 animate-pulse"></div>
          </div>
        ) : (
          // Music Icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
          </svg>
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <p className={cn(
          "font-medium truncate",
          isActive ? "text-gray-900 dark:text-gray-100" : "text-gray-800 dark:text-gray-200"
        )}>
          {track.title}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {track.artist}
        </p>
      </div>
      
      <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400 ml-2">
        {formatTime(track.duration)}
      </div>
      
      <button 
        className={cn(
          "flex-shrink-0 ml-2 p-1.5 rounded-full transition-colors",
          isFavorite 
            ? "text-red-500 dark:text-red-400" 
            : "text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
        )}
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
      </button>
    </div>
  );
}
