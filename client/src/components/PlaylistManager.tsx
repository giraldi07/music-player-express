import React from 'react';
import { usePlayer } from '@/context/PlayerContext';
import TrackItem from './TrackItem';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export default function PlaylistManager() {
  const { state, dispatch } = usePlayer();
  const { tracks, currentTrackIndex } = state;
  const isMobile = useIsMobile();
  
  const handleClearPlaylist = () => {
    dispatch({ type: 'CLEAR_PLAYLIST' });
  };
  
  return (
    <section className="music-card w-full lg:w-2/5 transition-all duration-300">
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className={cn(
            "font-semibold text-gray-800 dark:text-gray-100 transition-all duration-300",
            isMobile ? "text-base" : "text-lg"
          )}>Playlist</h2>
          <div className={cn(
            "text-gray-500 dark:text-gray-400 transition-all duration-300",
            isMobile ? "text-xs" : "text-sm"
          )}>
            {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
          </div>
        </div>
        
        {/* Playlist Items Container with Scrolling */}
        <div className={cn(
          "overflow-y-auto pr-2 transition-all duration-300",
          isMobile 
            ? "max-h-[calc(100vh-18rem)]" 
            : "sm:max-h-[calc(100vh-16rem)] md:max-h-[calc(100vh-12rem)]"
        )}>
          {tracks.length > 0 ? (
            tracks.map((track, index) => (
              <TrackItem 
                key={track.id} 
                track={track} 
                index={index}
                isActive={index === currentTrackIndex}
              />
            ))
          ) : (
            // Empty State
            <div className={cn(
              "text-center transition-all duration-300",
              isMobile ? "py-8" : "py-12"
            )}>
              <svg xmlns="http://www.w3.org/2000/svg" className={cn(
                "mx-auto text-gray-300 dark:text-gray-600 mb-3 sm:mb-4 transition-all duration-300",
                isMobile ? "h-10 w-10" : "h-12 w-12"
              )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className={cn(
                "text-gray-500 dark:text-gray-400 font-medium mb-1 transition-all duration-300",
                isMobile ? "text-base" : "text-lg"
              )}>No tracks yet</h3>
              <p className={cn(
                "text-gray-400 dark:text-gray-500 transition-all duration-300",
                isMobile ? "text-xs" : "text-sm"
              )}>Select music files to add to your playlist</p>
            </div>
          )}
        </div>
        
        {/* Clear Playlist Button */}
        {tracks.length > 0 && (
          <div className="mt-4 sm:mt-6 flex justify-end">
            <Button 
              variant="ghost" 
              size={isMobile ? "sm" : "default"}
              className={cn(
                "text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center",
                isMobile ? "text-xs" : "text-sm"
              )}
              onClick={handleClearPlaylist}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={cn(
                "mr-1 transition-all duration-300",
                isMobile ? "h-3 w-3" : "h-4 w-4"
              )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear playlist
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
