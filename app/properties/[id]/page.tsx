"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, CheckCircle, XCircle, User, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"

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

interface Owner {
  id: number
  name: string
  email: string
  phone: string
}

export default function PropertyDetailsPage() {
  const params = useParams()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [property, setProperty] = useState<Property | null>(null)
  const [owner, setOwner] = useState<Owner | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [message, setMessage] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [appointmentId, setAppointmentId] = useState(null)

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const propertyResponse = await fetch(`http://localhost:3001/properties/${params.id}`)
        const propertyData = await propertyResponse.json()
        setProperty(propertyData)

        // Fetch owner details
        const ownerResponse = await fetch(`http://localhost:3001/users/${propertyData.ownerId}`)
        const ownerData = await ownerResponse.json()
        setOwner(ownerData)
      } catch (error) {
        console.error('Error fetching property details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPropertyDetails()
    }
  }, [params.id])

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time for your appointment')
      return
    }

    setBookingLoading(true)
    try {
      const appointment = {
        propertyId: property?.id,
        userId: user.id,
        ownerId: property?.ownerId,
        status: 'pending',
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        message: message,
        timestamp: new Date().toISOString()
      }

      const response = await fetch('http://localhost:3001/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
      })

      if (response.ok) {
        const appointmentData = await response.json()
        setAppointmentId(appointmentData.id)
        setBookingSuccess(true)
        setShowBookingForm(false)
        
        // Send notification to property owner (simulate)
        await fetch('http://localhost:3001/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'appointment_request',
            recipientId: property?.ownerId,
            senderId: user.id,
            propertyId: property?.id,
            message: `New appointment request for ${property?.title}`,
            timestamp: new Date().toISOString()
          })
        }).catch(err => console.log('Notification failed:', err))
        
      } else {
        throw new Error('Failed to book appointment')
      }
    } catch (error) {
      console.error('Error booking appointment:', error)
      alert('❌ Failed to book appointment. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    return maxDate.toISOString().split('T')[0]
  }

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-300 h-64 rounded-lg"></div>
          <div className="space-y-2">
            <div className="bg-gray-300 h-8 rounded w-3/4"></div>
            <div className="bg-gray-300 h-4 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Property not found</h1>
          <p className="text-gray-600">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Images and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
              {property.highlight && (
                <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">
                  Featured
                </Badge>
              )}
            </div>
            {property.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {property.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="relative h-24 rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={`${property.title} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{property.title}</CardTitle>
                <Badge variant={property.verified ? "default" : "secondary"}>
                  {property.verified ? (
                    <><CheckCircle className="w-3 h-3 mr-1" />Verified</>
                  ) : (
                    <><XCircle className="w-3 h-3 mr-1" />Unverified</>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {property.city} • {property.type}
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Posted {new Date(property.datePosted).toLocaleDateString()}
              </div>
              <p className="text-gray-700">{property.description}</p>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">${property.price}</div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
                <Badge
                  variant={property.availability === "Available" ? "default" : "secondary"}
                  className={property.availability === "Available" ? "bg-green-500" : "bg-gray-500"}
                >
                  {property.availability}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Owner Info and Booking */}
        <div className="space-y-6">
          {/* Owner Information */}
          {owner && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Property Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="font-semibold">{owner.name}</div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {owner.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {owner.phone}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Booking Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Viewing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isAuthenticated ? (
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 mb-2">Please login to book an appointment</p>
                  <Button asChild variant="outline">
                    <Link href="/login">Login Now</Link>
                  </Button>
                </div>
              ) : property.availability !== "Available" ? (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-2">This property is currently not available for viewing</p>
                  <Button disabled className="w-full">
                    Property Not Available
                  </Button>
                </div>
              ) : !showBookingForm ? (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Schedule a viewing with the property owner</p>
                  <Button 
                    onClick={() => setShowBookingForm(true)}
                    className="w-full"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Viewing
                  </Button>
                </div>
              ) : bookingSuccess ? (
                <div className="text-center space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-600">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-2">🎉 Booking Confirmed!</h3>
                    <p className="text-sm mb-4">Your appointment request has been sent to the property owner.</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border text-left text-sm">
                    <p><strong>Property:</strong> {property?.title}</p>
                    <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                    <p><strong>Status:</strong> <span className="text-yellow-600">Pending Confirmation</span></p>
                    {appointmentId && <p><strong>Reference:</strong> #{appointmentId}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600">📧 You'll receive an email notification once the owner responds</p>
                    
                    <div className="flex gap-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link href="/appointments">
                          📅 View My Appointments
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setBookingSuccess(false)
                          setSelectedDate('')
                          setSelectedTime('')
                          setMessage('')
                          setAppointmentId(null)
                        }}
                      >
                        📝 Book Another
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => {
                        navigator.share ? 
                        navigator.share({
                          title: property?.title,
                          text: `Check out this property: ${property?.title}`,
                          url: window.location.href
                        }) : 
                        navigator.clipboard.writeText(window.location.href).then(() => 
                          alert('Property link copied to clipboard!')
                        )
                      }}
                    >
                      🔗 Share Property
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                    💡 <strong>Next Steps:</strong><br/>
                    • Owner will review your request within 24 hours<br/>
                    • You'll get notified via email about the status<br/>
                    • Check "My Appointments" for updates
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Date</label>
                    <input
                      type="date"
                      min={getMinDate()}
                      max={getMaxDate()}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Message (Optional)</label>
                    <textarea
                      placeholder="Any specific requirements or questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2 border rounded-md resize-none"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleBookAppointment}
                      disabled={bookingLoading || !selectedDate || !selectedTime}
                      className="flex-1"
                    >
                      {bookingLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Booking...
                        </>
                      ) : (
                        <>📅 Confirm Booking</>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowBookingForm(false)
                        setSelectedDate('')
                        setSelectedTime('')
                        setMessage('')
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    💡 Your appointment request will be sent to the property owner for confirmation
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}