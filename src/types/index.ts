// TMDB API 응답 타입들
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface TVSeries {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  origin_country: string[];
  original_language: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

// 상세 정보 타입들
export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  genres: Genre[];
  homepage?: string;
  imdb_id?: string;
}

export interface TVSeriesDetails extends TVSeries {
  episode_run_time: number[];
  status: string;
  tagline: string;
  type: string;
  networks: Network[];
  production_companies: ProductionCompany[];
  seasons: Season[];
  genres: Genre[];
  homepage?: string;
  in_production: boolean;
  languages: string[];
  last_air_date?: string;
  number_of_episodes: number;
  number_of_seasons: number;
}

// 공통 컨텐츠 타입
export type ContentType = 'movie' | 'tv';

export interface ContentItem {
  id: number;
  type: ContentType;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genres?: Genre[];
  overview?: string;
}

// API 응답 타입들
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface GenreResponse {
  genres: Genre[];
}

// 사용자 관련 타입들
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  subscription: 'basic' | 'standard' | 'premium';
  watchlist: ContentItem[];
  watchHistory: WatchHistoryItem[];
}

export interface WatchHistoryItem {
  contentId: number;
  contentType: ContentType;
  watchedAt: Date;
  progress: number; // 0-100
  episodeId?: number;
  seasonNumber?: number;
  episodeNumber?: number;
}

// 컴포넌트 Props 타입들
export interface HeaderProps {
  showProfile?: boolean;
}

export interface ContentRowProps {
  title: string;
  items: ContentItem[];
  genre?: string;
}

export interface ContentCardProps {
  item: ContentItem;
  size?: 'small' | 'medium' | 'large';
}

export interface VideoPlayerProps {
  contentId: string;
  autoPlay?: boolean;
  onBack?: () => void;
}

// 훅 관련 타입들
export interface UseMoviesOptions {
  category?: string;
  genre?: string;
  page?: number;
}

export interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

// 폼 관련 타입들
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// 검색 관련 타입들
export interface SearchFilters {
  genre?: string;
  year?: string;
  rating?: number;
  type?: ContentType;
}

export interface SearchParams {
  query: string;
  filters?: SearchFilters;
  page?: number;
}