import Header from '@/components/layout/Header'
import SearchResults from '@/components/sections/SearchResults'

export default function SearchPage() {
  return (
    <main className="min-h-screen">
      <Header showProfile />
      <SearchResults />
    </main>
  )
}