import { Movie, TVSeries, MovieDetails, TVSeriesDetails, Genre, TMDBResponse, GenreResponse } from '@/types'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY

if (!API_KEY) {
  console.warn('TMDB API key is not set')
}

class TMDBApi {
  private async fetchData<T>(endpoint: string): Promise<T> {
    const url = `${BASE_URL}${endpoint}`

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('TMDB API Error:', error)
      throw error
    }
  }

  // 영화 관련 API
  async getPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchData(`/movie/popular?page=${page}`)
  }

  async getTopRatedMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchData(`/movie/top_rated?page=${page}`)
  }

  async getNowPlayingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchData(`/movie/now_playing?page=${page}`)
  }

  async getUpcomingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchData(`/movie/upcoming?page=${page}`)
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    return this.fetchData(`/movie/${id}`)
  }

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchData(`/discover/movie?with_genres=${genreId}&page=${page}`)
  }

  // TV 시리즈 관련 API
  async getPopularTVSeries(page: number = 1): Promise<TMDBResponse<TVSeries>> {
    return this.fetchData(`/tv/popular?page=${page}`)
  }

  async getTopRatedTVSeries(page: number = 1): Promise<TMDBResponse<TVSeries>> {
    return this.fetchData(`/tv/top_rated?page=${page}`)
  }

  async getOnTheAirTVSeries(page: number = 1): Promise<TMDBResponse<TVSeries>> {
    return this.fetchData(`/tv/on_the_air?page=${page}`)
  }

  async getTVSeriesDetails(id: number): Promise<TVSeriesDetails> {
    return this.fetchData(`/tv/${id}`)
  }

  async getTVSeriesByGenre(genreId: number, page: number = 1): Promise<TMDBResponse<TVSeries>> {
    return this.fetchData(`/discover/tv?with_genres=${genreId}&page=${page}`)
  }

  // 장르 관련 API
  async getMovieGenres(): Promise<GenreResponse> {
    return this.fetchData('/genre/movie/list')
  }

  async getTVGenres(): Promise<GenreResponse> {
    return this.fetchData('/genre/tv/list')
  }

  // 검색 관련 API
  async searchMovies(query: string, page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchData(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`)
  }

  async searchTVSeries(query: string, page: number = 1): Promise<TMDBResponse<TVSeries>> {
    return this.fetchData(`/search/tv?query=${encodeURIComponent(query)}&page=${page}`)
  }

  async searchMulti(query: string, page: number = 1): Promise<TMDBResponse<Movie | TVSeries>> {
    return this.fetchData(`/search/multi?query=${encodeURIComponent(query)}&page=${page}`)
  }

  // 트렌딩 관련 API
  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse<Movie>> {
    return this.fetchData(`/trending/movie/${timeWindow}`)
  }

  async getTrendingTVSeries(timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse<TVSeries>> {
    return this.fetchData(`/trending/tv/${timeWindow}`)
  }

  async getTrendingAll(timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse<Movie | TVSeries>> {
    return this.fetchData(`/trending/all/${timeWindow}`)
  }

  // 한국 컨텐츠 전용 API
  async getKoreanMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchData(`/discover/movie?with_origin_country=KR&sort_by=popularity.desc&page=${page}`)
  }

  async getKoreanTVSeries(page: number = 1): Promise<TMDBResponse<TVSeries>> {
    return this.fetchData(`/discover/tv?with_origin_country=KR&sort_by=popularity.desc&page=${page}`)
  }
}

// 이미지 URL 생성 유틸리티
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-image.jpg'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export const getBackdropUrl = (path: string | null, size: string = 'w1280'): string => {
  if (!path) return '/placeholder-backdrop.jpg'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

// 싱글톤 인스턴스 생성
export const tmdbApi = new TMDBApi()

export default tmdbApi