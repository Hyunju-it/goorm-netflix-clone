'use client'

import { useEffect, useState } from 'react'
import { Movie, TVSeries, ContentItem } from '@/types'
import { tmdbApi } from '@/lib/api/tmdb'
import { movieToContentItem, tvSeriesToContentItem } from '@/lib/utils'
import ContentRow from './ContentRow'

export default function ContentRows() {
  const [contentSections, setContentSections] = useState<{
    title: string
    items: ContentItem[]
  }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        setLoading(true)

        // 병렬로 여러 카테고리의 컨텐츠를 가져옴
        const [
          popularMovies,
          topRatedMovies,
          koreanMovies,
          popularTVSeries,
          topRatedTVSeries,
          koreanTVSeries,
          trendingMovies,
          trendingTVSeries
        ] = await Promise.all([
          tmdbApi.getPopularMovies(),
          tmdbApi.getTopRatedMovies(),
          tmdbApi.getKoreanMovies(),
          tmdbApi.getPopularTVSeries(),
          tmdbApi.getTopRatedTVSeries(),
          tmdbApi.getKoreanTVSeries(),
          tmdbApi.getTrendingMovies(),
          tmdbApi.getTrendingTVSeries()
        ])

        const sections = [
          {
            title: '지금 뜨는 콘텐츠',
            items: [
              ...trendingMovies.results.slice(0, 10).map(movieToContentItem),
              ...trendingTVSeries.results.slice(0, 10).map(tvSeriesToContentItem)
            ].sort(() => Math.random() - 0.5).slice(0, 15)
          },
          {
            title: '인기 영화',
            items: popularMovies.results.slice(0, 15).map(movieToContentItem)
          },
          {
            title: '높은 평점의 영화',
            items: topRatedMovies.results.slice(0, 15).map(movieToContentItem)
          },
          {
            title: '한국 영화',
            items: koreanMovies.results.slice(0, 15).map(movieToContentItem)
          },
          {
            title: '인기 시리즈',
            items: popularTVSeries.results.slice(0, 15).map(tvSeriesToContentItem)
          },
          {
            title: '높은 평점의 시리즈',
            items: topRatedTVSeries.results.slice(0, 15).map(tvSeriesToContentItem)
          },
          {
            title: '한국 시리즈',
            items: koreanTVSeries.results.slice(0, 15).map(tvSeriesToContentItem)
          }
        ]

        // 빈 섹션 필터링
        const filteredSections = sections.filter(section => section.items.length > 0)
        setContentSections(filteredSections)

      } catch (error) {
        console.error('Failed to fetch content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllContent()
  }, [])

  if (loading) {
    return (
      <div className="px-4 md:px-12 space-y-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="h-6 bg-gray-700 rounded w-48 animate-pulse" />
            <div className="flex space-x-4 overflow-x-auto">
              {[...Array(8)].map((_, cardIndex) => (
                <div
                  key={cardIndex}
                  className="min-w-[160px] h-[240px] bg-gray-700 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="px-4 md:px-12 space-y-8 pb-12">
      {contentSections.map((section) => (
        <ContentRow
          key={section.title}
          title={section.title}
          items={section.items}
        />
      ))}
    </div>
  )
}