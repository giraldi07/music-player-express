import { Track } from '@/types';

export class AudioPlayer {
  private audio: HTMLAudioElement;
  private _onTimeUpdate: (() => void) | null = null;
  private _onEnded: (() => void) | null = null;
  private _onDurationChange: (() => void) | null = null;
  private _onCanPlay: (() => void) | null = null;
  private _onError: ((e: Error) => void) | null = null;

  constructor() {
    this.audio = new Audio();
    
    this.audio.addEventListener('timeupdate', () => {
      if (this._onTimeUpdate) this._onTimeUpdate();
    });
    
    this.audio.addEventListener('ended', () => {
      if (this._onEnded) this._onEnded();
    });
    
    this.audio.addEventListener('durationchange', () => {
      if (this._onDurationChange) this._onDurationChange();
    });
    
    this.audio.addEventListener('canplay', () => {
      if (this._onCanPlay) this._onCanPlay();
    });
    
    this.audio.addEventListener('error', (e) => {
      if (this._onError) this._onError(new Error('Audio playback error'));
    });
  }

  loadTrack(track: Track): void {
    this.audio.src = track.objectUrl;
    this.audio.load();
  }

  play(): Promise<void> {
    return this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }

  get currentTime(): number {
    return this.audio.currentTime;
  }

  set currentTime(time: number) {
    this.audio.currentTime = time;
  }

  get duration(): number {
    return this.audio.duration || 0;
  }

  get volume(): number {
    return this.audio.volume;
  }

  set volume(vol: number) {
    this.audio.volume = Math.max(0, Math.min(1, vol));
  }

  get muted(): boolean {
    return this.audio.muted;
  }

  set muted(mute: boolean) {
    this.audio.muted = mute;
  }

  set onTimeUpdate(callback: () => void) {
    this._onTimeUpdate = callback;
  }

  set onEnded(callback: () => void) {
    this._onEnded = callback;
  }

  set onDurationChange(callback: () => void) {
    this._onDurationChange = callback;
  }

  set onCanPlay(callback: () => void) {
    this._onCanPlay = callback;
  }

  set onError(callback: (e: Error) => void) {
    this._onError = callback;
  }

  destroy(): void {
    this.audio.pause();
    this.audio.src = '';
    this.audio.remove();
  }
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export async function parseAudioFile(file: File): Promise<Partial<Track>> {
  return new Promise((resolve) => {
    // Create objectURL for the file
    const objectUrl = URL.createObjectURL(file);
    
    // Initialize audio element to get duration
    const audio = new Audio();
    audio.src = objectUrl;
    
    // Set metadata values
    let title = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
    let artist = "Unknown Artist";
    let album = "Unknown Album";
    
    // Try to extract artist and title from filename format "Artist - Title.mp3"
    const match = title.match(/^(.+)\s*-\s*(.+)$/);
    if (match) {
      artist = match[1].trim();
      title = match[2].trim();
    }
    
    audio.onloadedmetadata = () => {
      resolve({
        title,
        artist,
        album,
        duration: audio.duration,
        objectUrl
      });
    };
    
    audio.onerror = () => {
      // If we can't load the audio, still return the metadata we have
      resolve({
        title,
        artist,
        album,
        duration: 0,
        objectUrl
      });
    };
  });
}
