import { useState } from 'react';
import { useSeo } from '@/hooks/useSeo';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import GalleryPreviewModal from '@/components/gallery/GalleryPreviewModal';
import { type VideoJob } from '@/backend';

export default function GalleryPage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoJob | null>(null);

  useSeo({
    title: 'Gallery - Anime Video AI Generator',
    description: 'Explore stunning anime videos created by our community using AI.',
  });

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Video Gallery</h1>
        <p className="text-lg text-muted-foreground">
          Discover amazing anime videos created by our community
        </p>
      </div>

      <GalleryGrid onVideoSelect={setSelectedVideo} />

      {selectedVideo && (
        <GalleryPreviewModal
          video={selectedVideo}
          open={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
