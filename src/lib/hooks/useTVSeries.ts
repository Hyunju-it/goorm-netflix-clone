'use client'

import { useState, useEffect } from 'react'
import { TVSeries } from '@/types'
import { tmdbApi } from '@/lib/api/tmdb'

interface UseTVSeriesOptions {
  category?: string
  genre?: string
  page?: number
}

interface UseTVSeriesReturn {
  tvSeries: TVSeries[]
  loading: boolean
  error: string | null
  hasNextPage: boolean
  fetchNextPage: () => void
}

export function useTVSeries(options: UseTVSeriesOptions = {}): UseTVSeriesReturn {
  const [tvSeries, setTVSeries] = useState<TVSeries[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(options.page || 1)
  const [hasNextPage, setHasNextPage] = useState(true)

  const fetchTVSeries = async (pageNumber: number = 1, append: boolean = false) => {
    try {
      setLoading(true)
      setError(null)

      let response
      const { category, genre } = options

      if (genre) {
        const genreId = parseInt(genre)
        response = await tmdbApi.getTVSeriesByGenre(genreId, pageNumber)
      } else {
        switch (category) {
          case 'popular':
            response = await tmdbApi.getPopularTVSeries(pageNumber)
            break
          case 'top_rated':
            response = await tmdbApi.getTopRatedTVSeries(pageNumber)
            break
          case 'on_the_air':
            response = await tmdbApi.getOnTheAirTVSeries(pageNumber)
            break
          case 'trending':
            response = await tmdbApi.getTrendingTVSeries()
            break
          case 'korean':
            response = await tmdbApi.getKoreanTVSeries(pageNumber)
            break
          default:
            response = await tmdbApi.getPopularTVSeries(pageNumber)
        }
      }

      if (append) {
        setTVSeries(prev => [...prev, ...response.results])
      } else {
        setTVSeries(response.results)
      }

      setHasNextPage(pageNumber < response.total_pages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch TV series')
    } finally {
      setLoading(false)
    }
  }

  const fetchNextPage = () => {
    if (hasNextPage && !loading) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchTVSeries(nextPage, true)
    }
  }

  useEffect(() => {
    fetchTVSeries(1, false)
  }, [options.category, options.genre])

  return {
    tvSeries,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
  }
}