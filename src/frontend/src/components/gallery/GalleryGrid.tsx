import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';
import { useGetPublicVideos } from '@/hooks/useVideoJobs';
import { type VideoJob } from '@/backend';

interface GalleryGridProps {
  onVideoSelect: (video: VideoJob) => void;
}

export default function GalleryGrid({ onVideoSelect }: GalleryGridProps) {
  const { data: videos, isLoading } = useGetPublicVideos();

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="surface-card animate-pulse">
            <div className="aspect-video bg-muted" />
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No public videos available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <Card
          key={video.id}
          className="surface-card group cursor-pointer overflow-hidden transition-all hover:border-purple-500/50"
          onClick={() => onVideoSelect(video)}
        >
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-purple-950/50 to-blue-950/50">
            {video.thumbnail ? (
              <img
                src={video.thumbnail.getDirectURL()}
                alt={video.prompt}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Play className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Play className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="mb-2 font-semibold line-clamp-1">{video.prompt}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{video.style}</Badge>
              <Badge variant="secondary">{video.quality}</Badge>
              <Badge variant="secondary">{Math.floor(Number(video.duration) / 60)}min</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
