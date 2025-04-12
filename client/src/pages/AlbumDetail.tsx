import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { usePlayer } from '@/context/PlayerContext';
import { formatTime } from '@/lib/audioPlayer';
import Layout from '@/components/Layout';
import MiniPlayer from '@/components/MiniPlayer';
import { Album, Track } from '@/types';
import { cn } from '@/lib/utils';

// Favorites key for localStorage
const FAVORITES_KEY = 'music_player_favorites';

export default function AlbumDetail() {
  const [, params] = useRoute('/album/:id');
  const albumId = params?.id;
  
  const { state, dispatch, currentTrack } = usePlayer();
  const { albums, tracks } = state;
  
  const [album, setAlbum] = useState<Album | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  // Find the album
  useEffect(() => {
    if (albumId) {
      const foundAlbum = albums.find(a => a.id === albumId);
      setAlbum(foundAlbum || null);
    }
  }, [albumId, albums]);
  
  // Make sure albums are organized when component loads
  useEffect(() => {
    dispatch({ type: 'ORGANIZE_ALBUMS' });
  }, [dispatch]);
  
  const handlePlayTrack = (track: Track) => {
    const mainIndex = tracks.findIndex(t => t.id === track.id);
    if (mainIndex !== -1) {
      dispatch({ type: 'PLAY_TRACK', payload: mainIndex });
    }
  };
  
  const playAlbum = () => {
    if (album && album.tracks.length > 0) {
      const firstTrack = album.tracks[0];
      const mainIndex = tracks.findIndex(t => t.id === firstTrack.id);
      if (mainIndex !== -1) {
        dispatch({ type: 'PLAY_TRACK', payload: mainIndex });
      }
    }
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
  
  if (!album) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-1">Album not found</h3>
            <p className="text-gray-400 dark:text-gray-500 mb-4">The album you're looking for doesn't exist</p>
            <Link href="/albums">
              <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 cursor-pointer">
                Back to Albums
              </span>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* Album Header */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          {/* Album Cover */}
          <div className="w-full md:w-64 h-64 bg-gradient-to-br from-indigo-300 to-purple-400 dark:from-indigo-800 dark:to-purple-900 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
            {album.coverArt ? (
              <img 
                src={album.coverArt} 
                alt={album.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            )}
          </div>
          
          {/* Album Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{album.title}</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-1">{album.artist}</p>
            {album.year && (
              <p className="text-gray-500 dark:text-gray-400 mb-3">{album.year}</p>
            )}
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {album.tracks.length} {album.tracks.length === 1 ? 'song' : 'songs'}
            </p>
            
            <button
              onClick={playAlbum}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play Album
            </button>
          </div>
        </div>
        
        {/* Tracks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Artist</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {album.tracks.map((track, index) => (
                  <tr 
                    key={track.id}
                    className={cn(
                      "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
                      currentTrack?.id === track.id ? "bg-indigo-50 dark:bg-gray-700" : ""
                    )}
                  >
                    <td className="px-6 py-4 whitespace-nowrap" onClick={() => handlePlayTrack(track)}>
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
                    <td className="px-6 py-4 whitespace-nowrap" onClick={() => handlePlayTrack(track)}>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{track.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" onClick={() => handlePlayTrack(track)}>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{track.artist}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400" onClick={() => handlePlayTrack(track)}>
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
      </div>
      
      <MiniPlayer />
    </Layout>
  );
}