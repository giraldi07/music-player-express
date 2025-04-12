import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { usePlayer } from '@/context/PlayerContext';
import { parseAudioFile } from '@/lib/audioPlayer';
import { Track } from '@/types';
import { nanoid } from 'nanoid';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export default function FileUploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = usePlayer();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsLoading(true);
    
    try {
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
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      setIsLoading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
        size={isMobile ? "sm" : "default"}
        variant="default"
        disabled={isLoading}
        className={cn(
          "bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition flex items-center",
          isMobile ? "text-xs px-3 py-1.5 space-x-1" : "text-sm px-4 py-2 space-x-2"
        )}
      >
        {isLoading ? (
          <>
            <svg className={cn(
              "animate-spin text-primary-foreground",
              isMobile ? "h-3 w-3 mr-1" : "h-4 w-4 mr-2"
            )} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{isMobile ? 'Loading...' : 'Processing...'}</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className={cn(
              "transition-all duration-300",
              isMobile ? "h-4 w-4" : "h-5 w-5"
            )} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span>{isMobile ? 'Select' : 'Select Music'}</span>
          </>
        )}
      </Button>
    </div>
  );
}
