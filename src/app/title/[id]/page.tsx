import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import MovieDetails from '@/components/sections/MovieDetails'

interface PageProps {
  params: {
    id: string
  }
}

export default async function TitlePage({ params }: PageProps) {
  const { id } = params

  if (!id) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header showProfile />
      <MovieDetails id={id} />
    </main>
  )
}