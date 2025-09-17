# Netflix 클론 프로젝트

Next.js와 TypeScript를 사용하여 구축한 Netflix 클론 웹 애플리케이션입니다. TMDB API를 활용하여 실제 영화 및 TV 시리즈 데이터를 제공합니다.

## 🚀 주요 기능

- ✅ 반응형 디자인 (모바일, 태블릿, 데스크톱)
- ✅ 영화 및 TV 시리즈 브라우징
- ✅ 카테고리별 콘텐츠 분류 (인기, 높은 평점, 한국 콘텐츠 등)
- ✅ 검색 기능
- ✅ 상세 정보 모달
- ✅ 사용자 인증 (로그인/회원가입)
- ✅ 수평 스크롤 콘텐츠 행
- ✅ 호버 인터랙션 및 애니메이션

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS 3
- **API**: TMDB (The Movie Database) API
- **Image Optimization**: Next.js Image Component
- **State Management**: React Hooks
- **Build Tool**: Next.js Built-in Build System

## 📁 프로젝트 구조

```
goorm-netflix-clone/
├── docs/                    # 프로젝트 문서
├── public/                  # 정적 파일
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── browse/          # 메인 브라우징 페이지
│   │   ├── login/           # 로그인 페이지
│   │   ├── signup/          # 회원가입 페이지
│   │   ├── title/[id]/      # 콘텐츠 상세 페이지
│   │   ├── watch/[id]/      # 시청 페이지
│   │   └── search/          # 검색 페이지
│   ├── components/
│   │   ├── ui/              # 재사용 가능한 UI 컴포넌트
│   │   ├── layout/          # 레이아웃 컴포넌트
│   │   └── sections/        # 페이지별 섹션 컴포넌트
│   ├── lib/
│   │   ├── api/             # API 통신 로직
│   │   ├── hooks/           # 커스텀 React 훅
│   │   └── utils/           # 유틸리티 함수
│   └── types/               # TypeScript 타입 정의
├── tailwind.config.js       # Tailwind CSS 설정
├── tsconfig.json           # TypeScript 설정
└── next.config.mjs         # Next.js 설정
```

## 🚦 시작하기

### 사전 요구사항

- Node.js 18.0 이상
- npm 또는 yarn
- TMDB API 키

### 설치 및 실행

1. **저장소 클론**
```bash
git clone <repository-url>
cd goorm-netflix-clone
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
```bash
cp .env.example .env
```

`.env` 파일에 TMDB API Bearer 토큰을 추가하세요:
```
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_bearer_token_here
```

4. **개발 서버 실행**
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

### TMDB API Bearer 토큰 발급

1. [TMDB 웹사이트](https://www.themoviedb.org/)에서 계정 생성
2. API 설정 페이지로 이동: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
3. **"API Read Access Token"**을 복사 (레거시 API 키가 아닌 Bearer 토큰 사용)
4. 발급받은 Bearer 토큰을 환경 변수에 설정

> **중요**: API v4의 Bearer 토큰(`eyJ`로 시작)을 사용해야 하며, 레거시 API 키(`32자 문자열`)가 아닙니다.

## 📱 주요 페이지

- `/` - 랜딩 페이지
- `/browse` - 메인 브라우징 페이지
- `/login` - 로그인 페이지
- `/signup` - 회원가입 페이지
- `/title/[id]` - 콘텐츠 상세 페이지
- `/watch/[id]` - 비디오 플레이어 페이지
- `/search` - 검색 페이지

