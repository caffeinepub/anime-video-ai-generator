import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download, Share2, Clock } from 'lucide-react';
import { useGetMyVideoJobs } from '@/hooks/useVideoJobs';
import { type VideoJob } from '@/backend';
import JobDetailModal from './JobDetailModal';
import { downloadFile } from '@/utils/download';
import { copyShareLink } from '@/utils/share';
import { toast } from 'sonner';

export default function JobHistoryList() {
  const { data: jobs, isLoading } = useGetMyVideoJobs();
  const [selectedJob, setSelectedJob] = useState<VideoJob | null>(null);

  const handleDownload = async (job: VideoJob) => {
    if (job.resultUrl) {
      downloadFile(job.resultUrl, `${job.prompt.slice(0, 30)}.mp4`);
      toast.success('Download started!');
    }
  };

  const handleShare = async (job: VideoJob) => {
    const shareUrl = `${window.location.origin}/gallery?video=${job.id}`;
    const success = await copyShareLink(shareUrl);
    if (success) {
      toast.success('Share link copied to clipboard!');
    } else {
      toast.error('Failed to copy share link. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="surface-card animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <Card className="surface-card">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No videos yet. Start creating your first anime video!</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: VideoJob['status']) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      completed: 'default',
      processing: 'secondary',
      pending: 'outline',
      failed: 'destructive',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <>
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="surface-card">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="line-clamp-1">{job.prompt}</CardTitle>
                  <CardDescription className="mt-1 flex flex-wrap items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {new Date(Number(job.createdAt) / 1000000).toLocaleDateString()}
                  </CardDescription>
                </div>
                {getStatusBadge(job.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{job.style}</Badge>
                <Badge variant="secondary">{job.quality}</Badge>
                <Badge variant="secondary">{Math.floor(Number(job.duration) / 60)}min</Badge>
              </div>
              {job.status === 'completed' && (
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => setSelectedJob(job)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDownload(job)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleShare(job)}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedJob && (
        <JobDetailModal job={selectedJob} open={!!selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}
