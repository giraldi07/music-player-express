import React from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { formatTime } from '@/lib/audioPlayer';
import Layout from '@/components/Layout';
import MiniPlayer from '@/components/MiniPlayer';
import FileUploadButton from '@/components/FileUploadButton';
import { cn } from '@/lib/utils';

export default function Songs() {
  const { state, dispatch, currentTrack } = usePlayer();
  const { tracks } = state;
  
  const handlePlayTrack = (index: number) => {
    dispatch({ type: 'PLAY_TRACK', payload: index });
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">All Songs</h1>
          <FileUploadButton />
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
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {tracks.map((track, index) => (
                    <tr 
                      key={track.id}
                      onClick={() => handlePlayTrack(index)}
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{track.album || '-'}</div>
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
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-1">No songs added yet</h3>
            <p className="text-gray-400 dark:text-gray-500">Click the "Select Music" button to add songs to your library</p>
          </div>
        )}
      </div>
      
      <MiniPlayer />
    </Layout>
  );
}