export interface VideoJobConfig {
  prompt: string;
  duration: number;
  quality: string;
  style: string;
  customStyle?: string;
  characterOption: 'upload' | 'preset' | 'text';
  characterImage?: File;
  characterPreset?: string;
  characterDescription?: string;
  voiceGender: 'male' | 'female';
  voiceLanguage: 'hindi' | 'english' | 'japanese';
  musicStyle: string;
}

export interface StoryboardScene {
  id: string;
  description: string;
  timestamp: string;
}
