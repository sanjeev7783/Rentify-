import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, CheckCircle, XCircle } from "lucide-react"

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

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={property.images[0] || "/placeholder.svg"}
          alt={property.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        {property.highlight && <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">Featured</Badge>}
        <div className="absolute top-2 right-2 flex gap-1">
          {property.verified ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              <XCircle className="w-3 h-3 mr-1" />
              Unverified
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            {property.city} • {property.type}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            Posted {new Date(property.datePosted).toLocaleDateString()}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{property.description}</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-2xl font-bold text-primary">${property.price}</div>
          <div className="text-sm text-gray-600">per month</div>
        </div>
        <div className="space-y-2">
          <Badge
            variant={property.availability === "Available" ? "default" : "secondary"}
            className={property.availability === "Available" ? "bg-green-500" : "bg-gray-500"}
          >
            {property.availability}
          </Badge>
          <Button asChild size="sm" className="w-full">
            <Link href={`/properties/${property.id}`}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
