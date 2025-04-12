import React, { useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { formatTime } from '@/lib/audioPlayer';
import Layout from '@/components/Layout';
import FileUploadButton from '@/components/FileUploadButton';
import MiniPlayer from '@/components/MiniPlayer';
import { cn } from '@/lib/utils';

// Favorites key for localStorage
const FAVORITES_KEY = 'music_player_favorites';

export default function Songs() {
  const { state, dispatch, currentTrack } = usePlayer();
  const { tracks } = state;
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  const handlePlayTrack = (index: number) => {
    dispatch({ type: 'PLAY_TRACK', payload: index });
  };
  
  const toggleFavorite = (trackId: string) => {
    let newFavorites: string[];
    
    if (favorites.includes(trackId)) {
      newFavorites = favorites.filter(id => id !== trackId);
    } else {
      newFavorites = [...favorites, trackId];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">All Songs</h1>
          
          <div className="mt-4 md:mt-0">
            <FileUploadButton />
          </div>
        </div>
        
        {tracks.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Artist</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Album</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {tracks.map((track, index) => (
                    <tr 
                      key={track.id}
                      className={cn(
                        "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
                        currentTrack?.id === track.id ? "bg-indigo-50 dark:bg-gray-700" : ""
                      )}
                    >
                      <td className="px-6 py-4 whitespace-nowrap" onClick={() => handlePlayTrack(index)}>
                        {currentTrack?.id === track.id ? (
                          <div className="flex items-end space-x-0.5 h-5 w-5">
                            <div className="w-1 bg-success h-2 animate-pulse"></div>
                            <div className="w-1 bg-success h-3 animate-pulse"></div>
                            <div className="w-1 bg-success h-4 animate-pulse"></div>
                            <div className="w-1 bg-success h-2 animate-pulse"></div>
                          </div>
                        ) : (
                          <span className="text-gray-900 dark:text-gray-200">{index + 1}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={() => handlePlayTrack(index)}>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{track.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={() => handlePlayTrack(index)}>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{track.artist}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={() => handlePlayTrack(index)}>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{track.album || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400" onClick={() => handlePlayTrack(index)}>
                        {formatTime(track.duration)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => toggleFavorite(track.id)}
                          className={cn(
                            "transition-colors",
                            favorites.includes(track.id)
                              ? "text-red-500 hover:text-red-700"
                              : "text-gray-400 hover:text-red-500"
                          )}
                        >
                          {favorites.includes(track.id) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <h3 className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-1">No songs yet</h3>
            <p className="text-gray-400 dark:text-gray-500 mb-4">Upload music files to view your song list</p>
          </div>
        )}
      </div>
      
      <MiniPlayer />
    </Layout>
  );
}