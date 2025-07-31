import Link from "next/link"
import { Building } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building className="h-6 w-6" />
              <span className="text-xl font-bold">Rentify</span>
            </div>
            <p className="text-gray-400">
              Find your perfect rental property with ease. Connect with property owners and book viewings instantly.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Tenants</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/properties" className="hover:text-white">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="hover:text-white">
                  My Appointments
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Owners</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/owners" className="hover:text-white">
                  List Property
                </Link>
              </li>
              <li>
                <Link href="/owners/dashboard" className="hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/owners/appointments" className="hover:text-white">
                  Manage Bookings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Rentify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
