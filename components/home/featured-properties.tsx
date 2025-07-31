"use client"

import { useEffect, useState } from "react"
import { PropertyCard } from "@/components/properties/property-card"

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

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app, this would fetch from API
    const mockProperties: Property[] = [
      {
        id: 5,
        title: "Luxury Condo in New York",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        city: "Chicago",
        type: "House",
        price: 2411,
        images: ["https://picsum.photos/id/111/800/600", "https://picsum.photos/id/111/800/600"],
        ownerId: 6,
        highlight: true,
        datePosted: "2025-07-16",
        verified: true,
        availability: "Available",
      },
      {
        id: 10,
        title: "Luxury Condo in New York",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        city: "Houston",
        type: "House",
        price: 853,
        images: ["https://picsum.photos/id/111/800/600", "https://picsum.photos/id/111/800/600"],
        ownerId: 4,
        highlight: true,
        datePosted: "2025-07-11",
        verified: true,
        availability: "Not Available",
      },
      {
        id: 15,
        title: "Cozy Apartment in Chicago",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        city: "Phoenix",
        type: "House",
        price: 2783,
        images: ["https://picsum.photos/id/1044/800/600", "https://picsum.photos/id/1045/800/600"],
        ownerId: 6,
        highlight: true,
        datePosted: "2025-07-06",
        verified: false,
        availability: "Not Available",
      },
      {
        id: 20,
        title: "Cozy House in Los Angeles",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        city: "Los Angeles",
        type: "Villa",
        price: 2046,
        images: ["https://picsum.photos/id/1054/800/600", "https://picsum.photos/id/1055/800/600"],
        ownerId: 7,
        highlight: true,
        datePosted: "2025-07-01",
        verified: true,
        availability: "Available",
      },
    ]

    setProperties(mockProperties)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="bg-gray-300 h-4 rounded"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}
