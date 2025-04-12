export interface Track {
  id: string;
  file: File;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  objectUrl: string;
}

export interface PlayerState {
  tracks: Track[];
  currentTrackIndex: number | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: 'none' | 'all' | 'one';
}

export type PlayerAction = 
  | { type: 'ADD_TRACKS'; payload: Track[] }
  | { type: 'PLAY_TRACK'; payload: number }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'NEXT_TRACK' }
  | { type: 'PREVIOUS_TRACK' }
  | { type: 'TOGGLE_SHUFFLE' }
  | { type: 'TOGGLE_REPEAT' }
  | { type: 'CLEAR_PLAYLIST' };
