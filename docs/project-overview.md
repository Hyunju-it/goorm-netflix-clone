# Netflix 클론 프로젝트 개요

## 프로젝트 목표
Netflix와 유사한 OTT 플랫폼을 개발하여 영화/드라마 스트리밍 서비스 구현

## 기술 스택
- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **API**: TMDB (The Movie Database) API
- **배포**: Docker, AWS S3/EC2

## 프로젝트 구조
```
goorm-netflix-clone/
├── src/
│   ├── app/
│   │   ├── (auth)/          # 인증 관련 페이지
│   │   ├── browse/          # 메인 브라우징 페이지
│   │   ├── watch/           # 시청 페이지
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/              # 공통 UI 컴포넌트
│   │   ├── layout/          # 레이아웃 컴포넌트
│   │   └── sections/        # 페이지 섹션 컴포넌트
│   ├── lib/
│   │   ├── api/             # API 통신 로직
│   │   ├── hooks/           # 커스텀 훅
│   │   └── utils/           # 유틸리티 함수
│   └── types/               # TypeScript 타입 정의
├── docs/                    # 프로젝트 문서
└── public/                  # 정적 파일
```

## 개발 단계
1. 화면 설계 및 DB 스키마 문서화
2. Next.js 구조 설정 및 라우팅
3. API 통신 로직 구현
4. UI/UX 컴포넌트 개발
5. 인터랙션 기능 추가
6. TypeScript 타입 정의
7. 배포 환경 구축