import React from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { Track } from '@/types';
import { formatTime } from '@/lib/audioPlayer';
import { cn } from '@/lib/utils';

interface TrackItemProps {
  track: Track;
  index: number;
  isActive: boolean;
}

export default function TrackItem({ track, index, isActive }: TrackItemProps) {
  const { dispatch } = usePlayer();
  
  const handlePlayTrack = () => {
    dispatch({ type: 'PLAY_TRACK', payload: index });
  };
  
  return (
    <div 
      className={cn(
        "flex items-center p-3 mb-2 rounded-lg transition-colors cursor-pointer",
        isActive ? "bg-indigo-50 border border-primary" : "hover:bg-gray-50"
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
          </svg>
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <p className={cn(
          "font-medium truncate",
          isActive ? "text-gray-900" : "text-gray-800"
        )}>
          {track.title}
        </p>
        <p className="text-sm text-gray-600 truncate">
          {track.artist}
        </p>
      </div>
      
      <div className="flex-shrink-0 text-sm text-gray-500 ml-4">
        {formatTime(track.duration)}
      </div>
    </div>
  );
}
