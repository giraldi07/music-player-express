import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { usePlayer } from '@/context/PlayerContext';
import Layout from '@/components/Layout';
import FileUploadButton from '@/components/FileUploadButton';
import MiniPlayer from '@/components/MiniPlayer';

export default function Albums() {
  const { state, dispatch } = usePlayer();
  const { albums } = state;
  
  // Make sure albums are organized whenever component loads
  useEffect(() => {
    dispatch({ type: 'ORGANIZE_ALBUMS' });
  }, [dispatch]);
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Albums</h1>
          
          <div className="mt-4 md:mt-0">
            <FileUploadButton />
          </div>
        </div>
        
        {albums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.map(album => (
              <Link key={album.id} href={`/album/${album.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer transition-transform hover:scale-105">
                  {/* Album Cover */}
                  <div className="aspect-square bg-gradient-to-br from-indigo-300 to-purple-400 dark:from-indigo-800 dark:to-purple-900 flex items-center justify-center">
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
                  
                  {/* Album Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">{album.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{album.artist}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{album.tracks.length} {album.tracks.length === 1 ? 'track' : 'tracks'}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-1">No albums yet</h3>
            <p className="text-gray-400 dark:text-gray-500 mb-4">Upload music files with album metadata to view your albums</p>
          </div>
        )}
      </div>
      
      <MiniPlayer />
    </Layout>
  );
}