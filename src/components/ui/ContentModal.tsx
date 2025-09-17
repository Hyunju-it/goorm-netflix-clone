'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ContentItem, MovieDetails, TVSeriesDetails } from '@/types'
import { tmdbApi, getImageUrl, getBackdropUrl } from '@/lib/api/tmdb'
import { formatRating, formatYear, truncateText } from '@/lib/utils'
import Modal from './Modal'
import Button from './Button'

interface ContentModalProps {
  isOpen: boolean
  onClose: () => void
  contentItem: ContentItem | null
}

export default function ContentModal({ isOpen, onClose, contentItem }: ContentModalProps) {
  const [details, setDetails] = useState<MovieDetails | TVSeriesDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && contentItem) {
      fetchDetails()
    }
  }, [isOpen, contentItem])

  const fetchDetails = async () => {
    if (!contentItem) return

    try {
      setLoading(true)
      const response = contentItem.type === 'movie'
        ? await tmdbApi.getMovieDetails(contentItem.id)
        : await tmdbApi.getTVSeriesDetails(contentItem.id)
      setDetails(response)
    } catch (error) {
      console.error('Failed to fetch details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlay = () => {
    if (contentItem) {
      router.push(`/watch/${contentItem.id}`)
      onClose()
    }
  }

  const handleMoreInfo = () => {
    if (contentItem) {
      router.push(`/title/${contentItem.id}`)
      onClose()
    }
  }

  if (!contentItem) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="relative">
        {/* 배경 이미지 */}
        <div className="relative h-80 overflow-hidden">
          <Image
            src={getBackdropUrl(contentItem.backdrop_path)}
            alt={contentItem.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          {/* 컨텐츠 정보 */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-white text-3xl font-bold mb-2">
              {contentItem.title}
            </h2>

            <div className="flex items-center space-x-4 mb-4">
              <Button onClick={handlePlay} className="bg-white text-black hover:bg-gray-200">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                재생
              </Button>

              <button
                className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors"
                aria-label="내 목록에 추가"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              <button
                className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors"
                aria-label="좋아요"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse" />
              <div className="h-20 bg-gray-700 rounded animate-pulse" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* 메타 정보 */}
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <span className="text-green-500 font-bold">
                  {Math.round(contentItem.vote_average * 10)}% 일치
                </span>
                <span>{formatYear(contentItem.release_date)}</span>
                <span className="border border-gray-500 px-1 text-xs">15+</span>
                <span>{contentItem.type === 'movie' ? '영화' : '시리즈'}</span>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{formatRating(contentItem.vote_average)}</span>
                </div>
              </div>

              {/* 줄거리 */}
              <p className="text-white leading-relaxed">
                {contentItem.overview ? truncateText(contentItem.overview, 300) : '줄거리 정보가 없습니다.'}
              </p>

              {/* 장르 */}
              {details && 'genres' in details && (
                <div className="text-sm text-gray-300">
                  <span className="font-medium">장르: </span>
                  {details.genres.map(genre => genre.name).join(', ')}
                </div>
              )}

              {/* 상세 정보 버튼 */}
              <Button
                variant="outline"
                onClick={handleMoreInfo}
                className="mt-4"
              >
                상세 정보 보기
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}