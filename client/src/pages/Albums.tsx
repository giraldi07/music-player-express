import React from 'react';
import { usePlayer } from '@/context/PlayerContext';
import Layout from '@/components/Layout';
import MiniPlayer from '@/components/MiniPlayer';
import FileUploadButton from '@/components/FileUploadButton';
import { Link } from 'wouter';

export default function Albums() {
  const { state } = usePlayer();
  const { albums } = state;
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Albums</h1>
          <FileUploadButton />
        </div>
        
        {albums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.map(album => (
              <Link key={album.id} href={`/album/${album.id}`}>
                <a className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-transform hover:scale-105">
                  <div className="relative pb-[100%] bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl text-primary opacity-30">
                      ♪
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">{album.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{album.artist}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{album.tracks.length} {album.tracks.length === 1 ? 'song' : 'songs'}</p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2H5z" />
            </svg>
            <h3 className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-1">No albums found</h3>
            <p className="text-gray-400 dark:text-gray-500">Add songs to your library to automatically create albums</p>
          </div>
        )}
      </div>
      
      <MiniPlayer />
    </Layout>
  );
}