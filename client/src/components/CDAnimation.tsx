import React, { useEffect, useRef } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { cn } from '@/lib/utils';

export default function CDAnimation() {
  const { state, currentTrack } = usePlayer();
  const { isPlaying, cdRotation } = state;
  const discRef = useRef<HTMLDivElement>(null);
  
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
  
  return (
    <div className="cd-container">
      {/* CD disc that spins */}
      <div 
        ref={discRef}
        className={cn(
          "cd-disc",
          isPlaying ? "cd-spinning" : ""
        )} 
        style={{ 
          transform: `rotate(${cdRotation}deg)`,
          backgroundImage: currentTrack?.coverArt ? `url(${currentTrack.coverArt})` : 'none' 
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
      <div className="cd-inner-circle">
        <div className="cd-spindle"></div>
      </div>
      
      {/* CD label text */}
      <div className="cd-label">
        {currentTrack?.album || currentTrack?.artist || ''}
      </div>
    </div>
  );
}