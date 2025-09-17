import Hero from '@/components/sections/Hero'
import ContentRows from '@/components/sections/ContentRows'
import Header from '@/components/layout/Header'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ContentRows />
    </main>
  )
}