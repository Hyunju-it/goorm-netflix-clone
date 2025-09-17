# 데이터 스키마 및 API 구조

## TMDB API 활용 구조

### 1. Movie 데이터 스키마
```typescript
interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
  original_language: string;
}
```

### 2. TV Series 데이터 스키마
```typescript
interface TVSeries {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  origin_country: string[];
  original_language: string;
}
```

### 3. Genre 데이터 스키마
```typescript
interface Genre {
  id: number;
  name: string;
}
```

### 4. 상세 정보 스키마
```typescript
interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  genres: Genre[];
}

interface TVSeriesDetails extends TVSeries {
  episode_run_time: number[];
  status: string;
  tagline: string;
  type: string;
  networks: Network[];
  production_companies: ProductionCompany[];
  seasons: Season[];
  genres: Genre[];
}
```

## 로컬 상태 관리 스키마

### 1. 사용자 프로필
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  subscription: 'basic' | 'standard' | 'premium';
  watchlist: ContentItem[];
  watchHistory: WatchHistoryItem[];
}
```

### 2. 컨텐츠 아이템
```typescript
interface ContentItem {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genres: Genre[];
}
```

### 3. 시청 기록
```typescript
interface WatchHistoryItem {
  contentId: number;
  contentType: 'movie' | 'tv';
  watchedAt: Date;
  progress: number; // 0-100
  episodeId?: number; // TV 시리즈의 경우
  seasonNumber?: number;
  episodeNumber?: number;
}
```

## API 엔드포인트 구조

### TMDB API 활용
- `GET /movie/popular` - 인기 영화
- `GET /movie/top_rated` - 평점 높은 영화
- `GET /movie/now_playing` - 현재 상영작
- `GET /tv/popular` - 인기 TV 시리즈
- `GET /tv/top_rated` - 평점 높은 TV 시리즈
- `GET /search/movie` - 영화 검색
- `GET /search/tv` - TV 시리즈 검색
- `GET /genre/movie/list` - 영화 장르 목록
- `GET /genre/tv/list` - TV 장르 목록

### 커스텀 API 라우트
- `GET /api/featured` - 추천 콘텐츠
- `GET /api/trending` - 트렌딩 콘텐츠
- `GET /api/watchlist` - 사용자 관심 목록
- `POST /api/watchlist` - 관심 목록 추가/제거