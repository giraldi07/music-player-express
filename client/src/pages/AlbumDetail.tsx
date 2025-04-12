import React, { useMemo } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { formatTime } from '@/lib/audioPlayer';
import Layout from '@/components/Layout';
import MiniPlayer from '@/components/MiniPlayer';
import { cn } from '@/lib/utils';
import { useRoute } from 'wouter';

export default function AlbumDetail() {
  const { state, dispatch, currentTrack } = usePlayer();
  const { tracks } = state;
  
  // Get album ID from URL
  const [match, params] = useRoute('/album/:id');
  const albumId = params?.id;
  
  // Find the album
  const album = useMemo(() => {
    return state.albums.find(album => album.id === albumId);
  }, [state.albums, albumId]);
  
  // Exit if album not found
  if (!album) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Album not found</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">The album you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }
  
  const handlePlayTrack = (trackId: string) => {
    // Find the track index in the main tracks array
    const index = tracks.findIndex(t => t.id === trackId);
    if (index !== -1) {
      dispatch({ type: 'PLAY_TRACK', payload: index });
    }
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* Album Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="w-48 h-48 shrink-0 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 shadow-md flex items-center justify-center">
            <div className="text-7xl text-primary opacity-30">♪</div>
          </div>
          
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{album.title}</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mt-1">{album.artist}</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {album.tracks.length} {album.tracks.length === 1 ? 'song' : 'songs'}
            </p>
            
            <div className="mt-6">
              <button 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full shadow-md transition-colors"
                onClick={() => {
                  if (album.tracks.length > 0) {
                    handlePlayTrack(album.tracks[0].id);
                  }
                }}
              >
                Play Album
              </button>
            </div>
          </div>
        </div>
        
        {/* Tracks List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Artist</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {album.tracks.map((track, index) => (
                  <tr 
                    key={track.id}
                    onClick={() => handlePlayTrack(track.id)}
                    className={cn(
                      "hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors",
                      currentTrack?.id === track.id ? "bg-indigo-50 dark:bg-gray-700" : ""
                    )}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{track.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{track.artist}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatTime(track.duration)}
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