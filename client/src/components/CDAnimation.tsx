import React, { useEffect, useRef } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export default function CDAnimation() {
  const { state, currentTrack } = usePlayer();
  const { isPlaying, cdRotation } = state;
  const discRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Update CD rotation when playing
  useEffect(() => {
    if (!isPlaying) return;
    
    let animationFrame: number;
    let lastTimestamp: number;
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      // Calculate new rotation based on time passed (30 degrees per second)
      const newRotation = (cdRotation + (deltaTime * 0.03)) % 360;
      
      // Update disc element rotation
      if (discRef.current) {
        discRef.current.style.transform = `rotate(${newRotation}deg)`;
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, cdRotation]);
  
  // Size classes based on device
  const containerSize = isMobile ? "w-40 h-40 sm:w-48 sm:h-48" : "w-48 h-48 md:w-64 md:h-64";
  const labelSize = isMobile ? "text-sm sm:text-base" : "text-base md:text-lg";
  
  return (
    <div className={cn("cd-container relative transition-all duration-300", containerSize)}>
      {/* CD disc that spins */}
      <div 
        ref={discRef}
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 border-8 border-gray-700 dark:border-gray-600 transition-transform",
          isPlaying ? "animate-spin-slow" : ""
        )} 
        style={{ 
          transform: `rotate(${cdRotation}deg)`,
          backgroundImage: currentTrack?.coverArt ? `url(${currentTrack.coverArt})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* CD grooves (concentric circles) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full border border-gray-600 dark:border-gray-500 opacity-20"></div>
          <div className="absolute w-1/2 h-1/2 rounded-full border border-gray-600 dark:border-gray-500 opacity-20"></div>
          <div className="absolute w-1/3 h-1/3 rounded-full border border-gray-600 dark:border-gray-500 opacity-20"></div>
        </div>
      </div>
      
      {/* CD inner circle (center) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-16 md:w-20 sm:h-16 md:h-20 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center z-10">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-400 dark:bg-gray-500"></div>
      </div>
      
      {/* CD label text */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center z-10 font-medium text-gray-200 dark:text-gray-300 transition-all duration-300",
        labelSize
      )}>
        <div className="w-1/2 text-center truncate">
          {currentTrack?.album || currentTrack?.artist || ''}
        </div>
      </div>
    </div>
  );
}