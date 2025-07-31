"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { PropertyCard } from "@/components/properties/property-card"
import { PropertyFilters } from "@/components/properties/property-filters"

interface Property {
  id: number
  title: string
  description: string
  city: string
  type: string
  price: number
  images: string[]
  ownerId: number
  highlight: boolean
  datePosted: string
  verified: boolean
  availability: "Available" | "Not Available"
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:3001/properties')
        if (response.ok) {
          const data = await response.json()
          setProperties(data)
        } else {
          console.error('Failed to fetch properties')
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  useEffect(() => {
    let filtered = [...properties]

    const city = searchParams.get("city")
    const type = searchParams.get("type")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const availability = searchParams.get("availability")
    const verified = searchParams.get("verified")

    if (city && city !== "All Cities") {
      filtered = filtered.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()))
    }

    if (type && type !== "All Types") {
      filtered = filtered.filter((p) => p.type.toLowerCase() === type.toLowerCase())
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= Number.parseInt(minPrice))
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number.parseInt(maxPrice))
    }

    if (availability && availability !== "All") {
      filtered = filtered.filter((p) => p.availability === availability)
    }

    if (verified === "true") {
      filtered = filtered.filter((p) => p.verified === true)
    }

    setFilteredProperties(filtered)
  }, [properties, searchParams])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="bg-gray-300 h-48 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="bg-gray-300 h-4 rounded"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Properties</h1>
        <p className="text-gray-600">Found {filteredProperties.length} properties</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <PropertyFilters />
        </aside>

        <main className="lg:w-3/4">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
