import { notFound } from 'next/navigation'
import VideoPlayer from '@/components/sections/VideoPlayer'

interface PageProps {
  params: {
    id: string
  }
}

export default async function WatchPage({ params }: PageProps) {
  const { id } = params

  if (!id) {
    notFound()
  }

  return (
    <main className="h-screen bg-black">
      <VideoPlayer contentId={id} />
    </main>
  )
}