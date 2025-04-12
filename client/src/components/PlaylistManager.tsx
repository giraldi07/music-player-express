import React from 'react';
import { usePlayer } from '@/context/PlayerContext';
import TrackItem from './TrackItem';
import { Button } from '@/components/ui/button';

export default function PlaylistManager() {
  const { state, dispatch } = usePlayer();
  const { tracks, currentTrackIndex } = state;
  
  const handleClearPlaylist = () => {
    dispatch({ type: 'CLEAR_PLAYLIST' });
  };
  
  return (
    <section className="music-card w-full md:w-1/2 lg:w-2/5">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Playlist</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
          </div>
        </div>
        
        {/* Playlist Items Container with Scrolling */}
        <div className="overflow-y-auto max-h-[calc(100vh-16rem)] md:max-h-[calc(100vh-12rem)] pr-2">
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
            <div className="py-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-1">No tracks yet</h3>
              <p className="text-gray-400 dark:text-gray-500">Select music files to add to your playlist</p>
            </div>
          )}
        </div>
        
        {/* Clear Playlist Button */}
        {tracks.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button 
              variant="ghost" 
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center"
              onClick={handleClearPlaylist}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
