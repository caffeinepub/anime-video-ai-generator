import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { type VideoJobConfig } from './types';
import { generateStoryboard } from './storyboard';
import { useCreateVideoJob } from '@/hooks/useVideoJobs';

interface StoryboardPreviewProps {
  config: VideoJobConfig;
  onBack: () => void;
  onConfirm: (jobId: string) => void;
}

export default function StoryboardPreview({ config, onBack, onConfirm }: StoryboardPreviewProps) {
  const scenes = generateStoryboard(config);
  const createJobMutation = useCreateVideoJob();

  const handleConfirm = async () => {
    try {
      const jobId = await createJobMutation.mutateAsync({
        prompt: config.prompt,
        style: config.style,
        duration: config.duration,
        quality: config.quality,
        thumbnail: undefined,
      });
      onConfirm(jobId);
    } catch (error: any) {
      console.error('Failed to create video job:', error);
      toast.error(error.message || 'Failed to start video generation. Please try again.');
    }
  };

  const isCreating = createJobMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} disabled={isCreating}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Edit
        </Button>
      </div>

      <Card className="surface-card">
        <CardHeader>
          <CardTitle>Storyboard Preview</CardTitle>
          <CardDescription>Review your video scenes before generation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {scenes.map((scene, index) => (
              <div
                key={scene.id}
                className="flex gap-4 rounded-lg border border-border/50 bg-card/50 p-4 transition-colors hover:border-purple-500/50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 font-bold text-purple-400">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">{scene.timestamp}</div>
                  <p className="text-sm">{scene.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={onBack} disabled={isCreating}>
          Edit Configuration
        </Button>
        <Button size="lg" className="gradient-cta" onClick={handleConfirm} disabled={isCreating}>
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Starting...
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              Start Generation
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
