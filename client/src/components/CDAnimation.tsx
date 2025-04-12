import React from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { cn } from '@/lib/utils';

export default function CDAnimation() {
  const { state, currentTrack } = usePlayer();
  const { isPlaying, cdRotation } = state;
  
  return (
    <div 
      className="cd-container"
      style={{ 
        transform: `rotate(${cdRotation}deg)`,
        transition: isPlaying ? 'none' : 'transform 0.5s ease-out'
      }}
    >
      <div className="cd-label">
        {currentTrack?.artist?.charAt(0) || '♪'}
      </div>
      {currentTrack && (
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center z-0"
        )}>
          <div className="text-5xl text-primary opacity-20">♪</div>
        </div>
      )}
    </div>
  );
}