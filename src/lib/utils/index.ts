import { type ClassValue, clsx } from 'clsx'
import { Movie, TVSeries, ContentItem } from '@/types'

// Tailwind CSS 클래스 병합 유틸리티
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// 날짜 포맷팅 유틸리티
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString()
}

// 평점 포맷팅
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

// 런타임 포맷팅 (분 -> 시간)
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes}분`
  }

  if (remainingMinutes === 0) {
    return `${hours}시간`
  }

  return `${hours}시간 ${remainingMinutes}분`
}

// 텍스트 자르기
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Movie/TVSeries를 ContentItem으로 변환
export function movieToContentItem(movie: Movie): ContentItem {
  return {
    id: movie.id,
    type: 'movie',
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
    overview: movie.overview,
  }
}

export function tvSeriesToContentItem(tvSeries: TVSeries): ContentItem {
  return {
    id: tvSeries.id,
    type: 'tv',
    title: tvSeries.name,
    poster_path: tvSeries.poster_path,
    backdrop_path: tvSeries.backdrop_path,
    vote_average: tvSeries.vote_average,
    release_date: tvSeries.first_air_date,
    overview: tvSeries.overview,
  }
}

// 혼합 컨텐츠 정렬
export function sortContentByPopularity(items: ContentItem[]): ContentItem[] {
  return items.sort((a, b) => b.vote_average - a.vote_average)
}

export function sortContentByDate(items: ContentItem[]): ContentItem[] {
  return items.sort((a, b) =>
    new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  )
}

// 로컬 스토리지 유틸리티
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

// 숫자 포맷팅 (천 단위 구분)
export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR')
}

// 통화 포맷팅
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
}

// URL slug 생성
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// 디바운스 유틸리티
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 스크롤 위치 감지
export function isElementInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}