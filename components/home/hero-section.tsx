import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Home, Users, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find Your Perfect
            <span className="block text-yellow-300">Rental Property</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
            Discover thousands of verified rental properties. Connect with trusted owners and book viewings instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/properties">
                <Search className="mr-2 h-5 w-5" />
                Browse Properties
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/register">List Your Property</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center space-y-4">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Verified Properties</h3>
              <p className="text-blue-100">All listings are verified by our admin team for authenticity</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Trusted Community</h3>
              <p className="text-blue-100">Connect with verified property owners and tenants</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Secure Platform</h3>
              <p className="text-blue-100">Safe and secure booking process with instant confirmations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
