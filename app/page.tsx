import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProperties } from "@/components/home/featured-properties"
import { RecentProperties } from "@/components/home/recent-properties"
import { SearchSection } from "@/components/home/search-section"

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <SearchSection />
      <FeaturedProperties />
      <RecentProperties />
    </div>
  )
}
