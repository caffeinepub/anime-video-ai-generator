import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { type VideoJob } from '@/backend';
import VideoPreviewPlayer from '@/components/video/VideoPreviewPlayer';
import { downloadFile } from '@/utils/download';
import { copyShareLink } from '@/utils/share';
import { toast } from 'sonner';

interface GalleryPreviewModalProps {
  video: VideoJob;
  open: boolean;
  onClose: () => void;
}

export default function GalleryPreviewModal({ video, open, onClose }: GalleryPreviewModalProps) {
  const handleDownload = async () => {
    if (video.resultUrl) {
      downloadFile(video.resultUrl, `${video.prompt.slice(0, 30)}.mp4`);
      toast.success('Download started!');
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/gallery?video=${video.id}`;
    const success = await copyShareLink(shareUrl);
    if (success) {
      toast.success('Share link copied to clipboard!');
    } else {
      toast.error('Failed to copy share link. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{video.prompt}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">{video.style}</Badge>
              <Badge variant="secondary">{video.quality}</Badge>
              <Badge variant="secondary">{Math.floor(Number(video.duration) / 60)} minutes</Badge>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {video.resultUrl && <VideoPreviewPlayer url={video.resultUrl} />}
          <div className="flex gap-3">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
