import { useState } from 'react';
import { useSeo } from '@/hooks/useSeo';
import GenerateVideoForm from '@/components/generate/GenerateVideoForm';
import StoryboardPreview from '@/components/generate/StoryboardPreview';
import GenerationRunner from '@/components/generate/GenerationRunner';
import { type VideoJobConfig } from '@/components/generate/types';

type Step = 'configure' | 'preview' | 'generate';

export default function GenerateVideoPage() {
  const [step, setStep] = useState<Step>('configure');
  const [config, setConfig] = useState<VideoJobConfig | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  useSeo({
    title: 'Generate Anime Video - Anime Video AI Generator',
    description: 'Create your custom anime video with AI. Choose style, duration, quality, characters, voices, and music.',
  });

  const handleConfigSubmit = (newConfig: VideoJobConfig) => {
    setConfig(newConfig);
    setStep('preview');
  };

  const handleBackToConfig = () => {
    setStep('configure');
  };

  const handleStartGeneration = (newJobId: string) => {
    setJobId(newJobId);
    setStep('generate');
  };

  const handleNewVideo = () => {
    setStep('configure');
    setConfig(null);
    setJobId(null);
  };

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">Generate Anime Video</h1>
          <p className="text-muted-foreground">Create stunning anime videos with AI in minutes</p>
        </div>

        {step === 'configure' && <GenerateVideoForm onSubmit={handleConfigSubmit} initialConfig={config} />}

        {step === 'preview' && config && (
          <StoryboardPreview config={config} onBack={handleBackToConfig} onConfirm={handleStartGeneration} />
        )}

        {step === 'generate' && jobId && <GenerationRunner jobId={jobId} onNewVideo={handleNewVideo} />}
      </div>
    </div>
  );
}
