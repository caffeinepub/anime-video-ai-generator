interface VideoPreviewPlayerProps {
  url: string;
}

export default function VideoPreviewPlayer({ url }: VideoPreviewPlayerProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      <video
        src={url}
        controls
        className="h-full w-full"
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
