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

export function RecentProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app, this would fetch from API
    const mockProperties: Property[] = [
      {
        id: 1,
        title: "Luxury Apartment in Los Angeles",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        city: "Los Angeles",
        type: "Apartment",
        price: 1292,
        images: ["https://picsum.photos/id/1015/800/600", "https://picsum.photos/id/1016/800/600"],
        ownerId: 7,
        highlight: false,
        datePosted: "2025-07-20",
        verified: true,
        availability: "Not Available",
      },
      {
        id: 2,
        title: "Cozy Studio in Phoenix",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        city: "Chicago",
        type: "House",
        price: 2417,
        images: ["https://picsum.photos/id/1018/800/600", "https://picsum.photos/id/1019/800/600"],
        ownerId: 5,
        highlight: false,
        datePosted: "2025-07-19",
        verified: true,
        availability: "Not Available",
      },
      {
        id: 3,
        title: "Cozy Villa in Houston",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        city: "Los Angeles",
        type: "House",
        price: 1107,
        images: ["https://picsum.photos/id/1020/800/600", "https://picsum.photos/id/1021/800/600"],
        ownerId: 7,
        highlight: false,
        datePosted: "2025-07-18",
        verified: false,
        availability: "Not Available",
      },
      {
        id: 4,
        title: "Spacious Villa in Chicago",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        city: "Chicago",
        type: "Studio",
        price: 1661,
        images: ["https://picsum.photos/id/1022/800/600", "https://picsum.photos/id/1023/800/600"],
        ownerId: 4,
        highlight: false,
        datePosted: "2025-07-17",
        verified: true,
        availability: "Not Available",
      },
    ]

    setProperties(mockProperties)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Recently Added</h2>
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
    <section className="container mx-auto px-4 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Recently Added</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}
