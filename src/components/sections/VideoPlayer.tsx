interface VideoPlayerProps {
  contentId: string
}

export default function VideoPlayer({ contentId }: VideoPlayerProps) {
  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <p className="text-white text-xl">Video Player for Content ID: {contentId}</p>
    </div>
  )
}