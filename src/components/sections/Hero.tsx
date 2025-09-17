'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Movie } from '@/types'
import { tmdbApi, getBackdropUrl } from '@/lib/api/tmdb'
import { formatYear, truncateText } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function Hero() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const response = await tmdbApi.getTrendingMovies('week')
        const randomMovie = response.results[Math.floor(Math.random() * response.results.length)]
        setFeaturedMovie(randomMovie)
      } catch (error) {
        console.error('Failed to fetch featured movie:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedMovie()
  }, [])

  if (loading || !featuredMovie) {
    return (
      <section className="relative h-screen bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </section>
    )
  }

  const handlePlay = () => {
    router.push(`/watch/${featuredMovie.id}`)
  }

  const handleMoreInfo = () => {
    router.push(`/title/${featuredMovie.id}`)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src={getBackdropUrl(featuredMovie.backdrop_path, 'original')}
          alt={featuredMovie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-2xl px-4 md:px-12">
          {/* 제목 */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {featuredMovie.title}
          </h1>

          {/* 메타 정보 */}
          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-300">
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
              영화
            </span>
            <span>{formatYear(featuredMovie.release_date)}</span>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{featuredMovie.vote_average.toFixed(1)}</span>
            </div>
          </div>

          {/* 줄거리 */}
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {truncateText(featuredMovie.overview, 200)}
          </p>

          {/* 액션 버튼들 */}
          <div className="flex space-x-4">
            <Button
              size="lg"
              onClick={handlePlay}
              className="bg-white text-black hover:bg-gray-200 font-bold"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              재생
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={handleMoreInfo}
              className="font-bold"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              상세 정보
            </Button>
          </div>
        </div>
      </div>

      {/* 하단 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}