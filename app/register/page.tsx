"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  const isEditing = !!editId
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    type: "",
    price: "",
    images: "",
    availability: "Available"
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [originalProperty, setOriginalProperty] = useState(null)

  useEffect(() => {
    if (isEditing) {
      const fetchProperty = async () => {
        try {
          const response = await fetch(`http://localhost:3001/properties/${editId}`)
          const property = await response.json()
          setOriginalProperty(property)
          setFormData({
            title: property.title,
            description: property.description,
            city: property.city,
            type: property.type,
            price: property.price.toString(),
            images: property.images.join(', '),
            availability: property.availability
          })
        } catch (error) {
          console.error('Error fetching property:', error)
        }
      }
      fetchProperty()
    }
  }, [editId, isEditing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create property object (preserve original data for updates)
      const propertyData = isEditing && originalProperty ? {
        ...originalProperty,
        title: formData.title,
        description: formData.description,
        city: formData.city,
        type: formData.type,
        price: parseInt(formData.price),
        images: formData.images ? formData.images.split(',').map(url => url.trim()) : originalProperty.images,
        availability: formData.availability
      } : {
        title: formData.title,
        description: formData.description,
        city: formData.city,
        type: formData.type,
        price: parseInt(formData.price),
        images: formData.images ? formData.images.split(',').map(url => url.trim()) : ["https://picsum.photos/800/600"],
        ownerId: 7, // Default owner ID
        highlight: false,
        datePosted: new Date().toISOString().split('T')[0],
        verified: false,
        availability: formData.availability
      }
      
      // Add or update property
      const url = isEditing ? `http://localhost:3001/properties/${editId}` : 'http://localhost:3001/properties'
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData)
      })
      
      if (response.ok) {
        console.log("Property added successfully!")
        
        // Clear form and show success
        setFormData({
          title: "",
          description: "",
          city: "",
          type: "",
          price: "",
          images: "",
          availability: "Available"
        })
        
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 3000)
      } else {
        throw new Error('Failed to add property')
      }
    } catch (error) {
      console.error('Error adding property:', error)
      alert('Failed to add property. Please make sure json-server is running.')
    }
    
    setIsSubmitting(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{isEditing ? 'Edit Property' : 'List Your Property'}</h1>
          <p className="text-gray-600">{isEditing ? 'Update your property details' : 'Fill out the form below to list your property for rent'}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Luxury Apartment in Downtown"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Select value={formData.city} onValueChange={(value) => handleChange("city", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                      <SelectItem value="Chicago">Chicago</SelectItem>
                      <SelectItem value="Houston">Houston</SelectItem>
                      <SelectItem value="Phoenix">Phoenix</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                      <SelectItem value="Studio">Studio</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Monthly Rent ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 1500"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Image URLs (comma separated)</Label>
                <Input
                  id="images"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  value={formData.images}
                  onChange={(e) => handleChange("images", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Availability</Label>
                <Select value={formData.availability} onValueChange={(value) => handleChange("availability", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Not Available">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  isEditing ? "Update Property" : "List Property"
                )}
              </Button>
              
              {isSubmitted && (
                <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  {isEditing ? 'Property updated successfully!' : 'Property added successfully! You can now see it in the properties list.'}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}