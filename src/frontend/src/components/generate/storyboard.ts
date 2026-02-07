import { type VideoJobConfig, type StoryboardScene } from './types';

export function generateStoryboard(config: VideoJobConfig): StoryboardScene[] {
  const { prompt, duration } = config;
  
  // Calculate number of scenes based on duration (roughly 1 scene per 30 seconds)
  const sceneCount = Math.max(3, Math.min(8, Math.ceil(duration / 30)));
  
  const scenes: StoryboardScene[] = [];
  const timePerScene = duration / sceneCount;
  
  for (let i = 0; i < sceneCount; i++) {
    const startTime = Math.floor(i * timePerScene);
    const minutes = Math.floor(startTime / 60);
    const seconds = startTime % 60;
    const timestamp = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    let description = '';
    if (i === 0) {
      description = `Opening scene: ${prompt.slice(0, 80)}...`;
    } else if (i === sceneCount - 1) {
      description = 'Climactic finale and resolution of the story';
    } else if (i === 1) {
      description = 'Introduction of main character and setting';
    } else if (i === Math.floor(sceneCount / 2)) {
      description = 'Major plot development and conflict escalation';
    } else {
      description = `Scene ${i + 1}: Story progression and character development`;
    }
    
    scenes.push({
      id: `scene-${i}`,
      description,
      timestamp,
    });
  }
  
  return scenes;
}
