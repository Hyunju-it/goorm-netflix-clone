'use client'

import { useState, useEffect } from 'react'
import { Movie, UseMoviesOptions, UseMoviesReturn } from '@/types'
import { tmdbApi } from '@/lib/api/tmdb'

export function useMovies(options: UseMoviesOptions = {}): UseMoviesReturn {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(options.page || 1)
  const [hasNextPage, setHasNextPage] = useState(true)

  const fetchMovies = async (pageNumber: number = 1, append: boolean = false) => {
    try {
      setLoading(true)
      setError(null)

      let response
      const { category, genre } = options

      if (genre) {
        const genreId = parseInt(genre)
        response = await tmdbApi.getMoviesByGenre(genreId, pageNumber)
      } else {
        switch (category) {
          case 'popular':
            response = await tmdbApi.getPopularMovies(pageNumber)
            break
          case 'top_rated':
            response = await tmdbApi.getTopRatedMovies(pageNumber)
            break
          case 'now_playing':
            response = await tmdbApi.getNowPlayingMovies(pageNumber)
            break
          case 'upcoming':
            response = await tmdbApi.getUpcomingMovies(pageNumber)
            break
          case 'trending':
            response = await tmdbApi.getTrendingMovies()
            break
          case 'korean':
            response = await tmdbApi.getKoreanMovies(pageNumber)
            break
          default:
            response = await tmdbApi.getPopularMovies(pageNumber)
        }
      }

      if (append) {
        setMovies(prev => [...prev, ...response.results])
      } else {
        setMovies(response.results)
      }

      setHasNextPage(pageNumber < response.total_pages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies')
    } finally {
      setLoading(false)
    }
  }

  const fetchNextPage = () => {
    if (hasNextPage && !loading) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchMovies(nextPage, true)
    }
  }

  useEffect(() => {
    fetchMovies(1, false)
  }, [options.category, options.genre])

  return {
    movies,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
  }
}