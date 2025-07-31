"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface Appointment {
  id: number
  propertyId: number
  userId: number
  ownerId: number
  status: "pending" | "confirmed" | "cancelled"
  scheduledDate: string
  timestamp: string
  property?: {
    title: string
    city: string
    type: string
    price: number
  }
}

export default function AppointmentsPage() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fetch appointments
        const appointmentsResponse = await fetch('http://localhost:3001/appointments')
        const appointmentsData = await appointmentsResponse.json()
        
        // Fetch properties
        const propertiesResponse = await fetch('http://localhost:3001/properties')
        const propertiesData = await propertiesResponse.json()
        
        // Filter appointments for current user and add property details
        const userAppointments = appointmentsData
          .filter((apt: Appointment) => apt.userId === user?.id)
          .map((apt: Appointment) => {
            const property = propertiesData.find((p: any) => p.id === apt.propertyId)
            return { ...apt, property }
          })
        
        setAppointments(userAppointments)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) {
      fetchAppointments()
    }
  }, [user?.id])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">My Appointments</h1>
        <p className="text-gray-600">Manage your property viewing appointments</p>
      </div>

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No appointments found</p>
            <p className="text-gray-400">Book a property viewing to see your appointments here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {appointment.property?.title || "Property"}
                  </CardTitle>
                  <Badge className={getStatusColor(appointment.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(appointment.status)}
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {appointment.property?.city} • {appointment.property?.type}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Scheduled: {new Date(appointment.scheduledDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Booked: {new Date(appointment.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-primary">
                      ${appointment.property?.price}/month
                    </div>
                    <div className="text-sm text-gray-600">
                      Appointment ID: #{appointment.id}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}