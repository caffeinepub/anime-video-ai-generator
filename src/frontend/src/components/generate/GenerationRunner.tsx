import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Download, Share2, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import VideoPreviewPlayer from '@/components/video/VideoPreviewPlayer';
import { downloadFile } from '@/utils/download';
import { copyShareLink } from '@/utils/share';
import { useGetVideoJob } from '@/hooks/useVideoJobs';
import { VideoJobStatus } from '@/backend';

interface GenerationRunnerProps {
  jobId: string;
  onNewVideo: () => void;
}

export default function GenerationRunner({ jobId, onNewVideo }: GenerationRunnerProps) {
  const { data: job, isLoading, error } = useGetVideoJob(jobId, { polling: true });
  const [lastStatus, setLastStatus] = useState<VideoJobStatus | null>(null);

  // Calculate progress based on job status and timestamps
  const getProgress = (): number => {
    if (!job) return 0;
    
    switch (job.status) {
      case VideoJobStatus.pending:
        return 5;
      case VideoJobStatus.processing: {
        // Simulate progress based on elapsed time (max 100 seconds for full progress)
        const now = Date.now();
        const createdAt = Number(job.createdAt) / 1_000_000; // Convert nanoseconds to milliseconds
        const elapsed = now - createdAt;
        const simulatedProgress = Math.min(95, 10 + (elapsed / 100000) * 85);
        return Math.floor(simulatedProgress);
      }
      case VideoJobStatus.completed:
        return 100;
      case VideoJobStatus.failed:
        return 0;
      default:
        return 0;
    }
  };

  const progress = getProgress();
  const isCompleted = job?.status === VideoJobStatus.completed;
  const isFailed = job?.status === VideoJobStatus.failed;
  const isGenerating = job?.status === VideoJobStatus.pending || job?.status === VideoJobStatus.processing;

  // Show toast when status changes to completed
  useEffect(() => {
    if (job && lastStatus !== job.status) {
      setLastStatus(job.status);
      if (job.status === VideoJobStatus.completed) {
        toast.success('Video generation completed!');
      } else if (job.status === VideoJobStatus.failed) {
        toast.error('Video generation failed. Please try again.');
      }
    }
  }, [job?.status, lastStatus]);

  const handleDownload = () => {
    if (job?.resultUrl) {
      downloadFile(job.resultUrl, `anime-video-${jobId}.mp4`);
      toast.success('Download started!');
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/gallery?video=${jobId}`;
    const success = await copyShareLink(shareUrl);
    if (success) {
      toast.success('Share link copied to clipboard!');
    } else {
      toast.error('Failed to copy share link. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <Card className="surface-card">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </CardContent>
      </Card>
    );
  }

  if (error || !job) {
    return (
      <Card className="surface-card">
        <CardHeader>
          <CardTitle>Error Loading Job</CardTitle>
          <CardDescription>Unable to load video generation job details</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onNewVideo} variant="outline">
            Create New Video
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {isGenerating && (
        <Card className="surface-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 animate-pulse text-purple-400" />
              Generating Your Anime Video
            </CardTitle>
            <CardDescription>This may take a few minutes depending on video length and quality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              {progress < 30 && 'Analyzing your story prompt...'}
              {progress >= 30 && progress < 60 && 'Generating scenes and characters...'}
              {progress >= 60 && progress < 90 && 'Rendering video frames...'}
              {progress >= 90 && 'Finalizing your anime video...'}
            </p>
          </CardContent>
        </Card>
      )}

      {isFailed && (
        <Card className="surface-card border-destructive/50">
          <CardHeader>
            <CardTitle>Generation Failed</CardTitle>
            <CardDescription>Something went wrong during video generation</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onNewVideo} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {isCompleted && job.resultUrl && (
        <>
          <Card className="surface-card">
            <CardHeader>
              <CardTitle>Your Anime Video is Ready!</CardTitle>
              <CardDescription>Preview, download, or share your creation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <VideoPreviewPlayer url={job.resultUrl} />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={handleDownload} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download Video
                </Button>
                <Button onClick={handleShare} variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={onNewVideo} variant="outline" size="lg">
              Create Another Video
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
