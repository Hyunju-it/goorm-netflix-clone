'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ContentCardProps } from '@/types'
import { getImageUrl } from '@/lib/api/tmdb'
import { formatRating } from '@/lib/utils'
import { cn } from '@/lib/utils'
import ContentModal from './ContentModal'

export default function ContentCard({ item, size = 'medium' }: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setIsModalOpen(true)
  }

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/watch/${item.id}`)
  }

  const sizeClasses = {
    small: 'w-32 h-48',
    medium: 'w-40 h-60',
    large: 'w-48 h-72',
  }

  return (
    <div
      className={cn(
        'relative group cursor-pointer transition-transform duration-300',
        sizeClasses[size],
        isHovered && 'scale-105 z-10'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* 포스터 이미지 */}
      <div className="relative w-full h-full overflow-hidden rounded-md bg-gray-800">
        {!imageError ? (
          <Image
            src={getImageUrl(item.poster_path)}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-700">
            <div className="text-center text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-xs">{item.title}</p>
            </div>
          </div>
        )}

        {/* 호버 오버레이 */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-3">
              {/* 액션 버튼들 */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex space-x-2">
                  <button
                    onClick={handlePlay}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    aria-label="재생"
                  >
                    <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <button
                    className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors"
                    aria-label="내 목록에 추가"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <button
                  className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors"
                  aria-label="더보기"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsModalOpen(true)
                  }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* 제목 */}
              <h3 className="text-white text-sm font-medium mb-1 line-clamp-2">
                {item.title}
              </h3>

              {/* 평점 */}
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{formatRating(item.vote_average)}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span>{item.type === 'movie' ? '영화' : '시리즈'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 간단한 제목 (호버하지 않을 때) */}
      {!isHovered && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <h3 className="text-white text-xs font-medium line-clamp-1">
            {item.title}
          </h3>
        </div>
      )}

      {/* 모달 */}
      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contentItem={item}
      />
    </div>
  )
}