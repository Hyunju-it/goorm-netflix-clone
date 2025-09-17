import Header from '@/components/layout/Header'
import FeaturedContent from '@/components/sections/FeaturedContent'
import ContentRows from '@/components/sections/ContentRows'

export default function BrowsePage() {
  return (
    <main className="min-h-screen">
      <Header showProfile />
      <FeaturedContent />
      <ContentRows />
    </main>
  )
}