'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LoginFormData } from '@/types'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {}

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.'
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.'
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // 실제 로그인 로직은 여기에 구현
      // 현재는 임시로 브라우즈 페이지로 리다이렉트
      await new Promise(resolve => setTimeout(resolve, 1000)) // 로딩 시뮬레이션

      router.push('/browse')
    } catch (error) {
      console.error('Login failed:', error)
      setErrors({ email: '로그인에 실패했습니다. 다시 시도해주세요.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // 에러 초기화
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-black/75 backdrop-blur-sm rounded-lg p-8">
        {/* 로고 */}
        <Link href="/" className="block text-center mb-8">
          <span className="text-netflix-red text-3xl font-bold">NETFLIX</span>
        </Link>

        {/* 제목 */}
        <h1 className="text-white text-2xl font-bold mb-6">로그인</h1>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="이메일 주소"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
          />

          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="w-full bg-netflix-red hover:bg-red-700 text-white font-bold"
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        {/* 추가 옵션들 */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                className="mr-2 rounded bg-gray-600 border-gray-500"
              />
              로그인 정보 저장
            </label>
            <Link href="/forgot-password" className="text-gray-300 hover:text-white">
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          <div className="text-center text-gray-400 text-sm">
            Netflix 회원이 아닌가요?{' '}
            <Link href="/signup" className="text-white hover:underline">
              지금 가입하세요
            </Link>
          </div>

          <div className="text-xs text-gray-500 leading-4">
            이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 로봇이 아님을 확인합니다.{' '}
            <Link href="/terms" className="text-blue-500 hover:underline">
              자세히 알아보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}