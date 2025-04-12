import React from 'react';
import CurrentTrackPlayer from '@/components/CurrentTrackPlayer';
import PlaylistManager from '@/components/PlaylistManager';
import FileUploadButton from '@/components/FileUploadButton';
import Layout from '@/components/Layout';

export default function NowPlaying() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Now Playing</h1>
          <FileUploadButton />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <CurrentTrackPlayer />
          <PlaylistManager />
        </div>
      </div>
    </Layout>
  );
}