'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HeaderProps } from '@/types'
import Button from '@/components/ui/Button'

export default function Header({ showProfile = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const navItems = [
    { name: '홈', href: '/browse' },
    { name: '시리즈', href: '/browse?type=tv' },
    { name: '영화', href: '/browse?type=movie' },
    { name: '내가 찜한 콘텐츠', href: '/my-list' },
  ]

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between px-4 py-4 md:px-12">
        {/* 로고 */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-netflix-red text-2xl font-bold">
            NETFLIX
          </Link>

          {/* 네비게이션 메뉴 (데스크톱) */}
          {showProfile && (
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white text-sm hover:text-gray-300 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* 우측 메뉴 */}
        <div className="flex items-center space-x-4">
          {showProfile ? (
            <>
              {/* 검색 버튼 */}
              <button
                onClick={() => router.push('/search')}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="검색"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>

              {/* 알림 버튼 */}
              <button
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="알림"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </button>

              {/* 프로필 드롭다운 */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
                >
                  <div className="w-8 h-8 bg-netflix-red rounded flex items-center justify-center">
                    <span className="text-sm font-medium">U</span>
                  </div>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* 드롭다운 메뉴 */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-gray-600 rounded-md shadow-lg">
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                      >
                        프로필 관리
                      </Link>
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                      >
                        계정
                      </Link>
                      <Link
                        href="/help"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                      >
                        고객센터
                      </Link>
                      <hr className="my-2 border-gray-600" />
                      <button
                        onClick={() => router.push('/login')}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800"
                      >
                        Netflix에서 로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 모바일 메뉴 버튼 */}
              <button
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="메뉴"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </>
          ) : (
            /* 로그인되지 않은 상태 */
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/login')}
              >
                로그인
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 모바일 네비게이션 메뉴 */}
      {showProfile && isMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-600">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-white text-lg py-2 hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}