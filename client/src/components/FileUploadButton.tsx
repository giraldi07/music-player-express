import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { usePlayer } from '@/context/PlayerContext';
import { parseAudioFile } from '@/lib/audioPlayer';
import { Track } from '@/types';
import { nanoid } from 'nanoid';

export default function FileUploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = usePlayer();
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const trackPromises = Array.from(files).map(async (file) => {
      try {
        // Parse audio metadata
        const metadata = await parseAudioFile(file);
        
        // Create track object
        const track: Track = {
          id: nanoid(),
          file,
          title: metadata.title || file.name,
          artist: metadata.artist || 'Unknown Artist',
          album: metadata.album,
          duration: metadata.duration || 0,
          objectUrl: metadata.objectUrl || URL.createObjectURL(file)
        };
        
        return track;
      } catch (error) {
        console.error('Error processing file:', file.name, error);
        return null;
      }
    });
    
    // Wait for all files to be processed
    const tracks = (await Promise.all(trackPromises)).filter(Boolean) as Track[];
    
    // Add tracks to player state
    if (tracks.length > 0) {
      dispatch({ type: 'ADD_TRACKS', payload: tracks });
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="relative">
      <input 
        ref={fileInputRef}
        type="file" 
        accept="audio/*" 
        multiple 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        onChange={handleFileUpload}
      />
      <Button 
        onClick={triggerFileInput}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2 rounded-md transition flex items-center space-x-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span>Select Music</span>
      </Button>
    </div>
  );
}
