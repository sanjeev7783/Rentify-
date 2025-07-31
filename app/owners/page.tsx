"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import type { RootState } from "@/redux/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PropertyCard } from "@/components/properties/property-card"
import { Building, Calendar, Plus, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function OwnerDashboard() {
  const { user } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const [properties, setProperties] = useState([])
  const [appointments, setAppointments] = useState([])
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalAppointments: 0,
    pendingAppointments: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOwnerData = async () => {
      if (!user?.id) return

      try {
        const [propertiesRes, appointmentsRes] = await Promise.all([
          fetch(`http://localhost:3001/properties?ownerId=${user.id}`),
          fetch(`http://localhost:3001/appointments?ownerId=${user.id}`)
        ])

        const ownerProperties = await propertiesRes.json()
        const ownerAppointments = await appointmentsRes.json()

        setProperties(ownerProperties)
        setAppointments(ownerAppointments)
        setStats({
          totalProperties: ownerProperties.length,
          totalAppointments: ownerAppointments.length,
          pendingAppointments: ownerAppointments.filter((a: any) => a.status === 'pending').length
        })
      } catch (error) {
        console.error('Error fetching owner data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOwnerData()
  }, [user?.id])

  const handleEditProperty = (propertyId: number) => {
    router.push(`/register?edit=${propertyId}`)
  }

  const handleDeleteProperty = async (propertyId: number) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await fetch(`http://localhost:3001/properties/${propertyId}`, {
          method: 'DELETE'
        })
        
        setProperties(prev => prev.filter((p: any) => p.id !== propertyId))
        setStats(prev => ({ ...prev, totalProperties: prev.totalProperties - 1 }))
        
        alert('Property deleted successfully!')
      } catch (error) {
        console.error('Error deleting property:', error)
        alert('Failed to delete property')
      }
    }
  }

  const handleAppointmentStatus = async (appointmentId: number, status: string) => {
    try {
      await fetch(`http://localhost:3001/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      setAppointments(prev => 
        prev.map((apt: any) => 
          apt.id === appointmentId ? { ...apt, status } : apt
        )
      )
      
      if (status !== 'pending') {
        setStats(prev => ({ ...prev, pendingAppointments: prev.pendingAppointments - 1 }))
      }
      
      alert(`Appointment ${status} successfully!`)
    } catch (error) {
      console.error('Error updating appointment:', error)
      alert('Failed to update appointment')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-24 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Owner Dashboard</h1>
        <p className="text-gray-600">Manage your properties and appointments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAppointments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Eye className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingAppointments}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <Button asChild>
          <Link href="/register">
            <Plus className="h-4 w-4 mr-2" />
            Add New Property
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>My Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {properties.length === 0 ? (
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No properties listed yet</p>
              <Button asChild className="mt-4">
                <Link href="/register">List Your First Property</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property: any) => (
                <div key={property.id} className="relative">
                  <PropertyCard property={property} />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => handleEditProperty(property.id)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteProperty(property.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Appointment Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No appointment requests yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.slice(0, 5).map((appointment: any) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">Appointment #{appointment.id}</p>
                    <p className="text-sm text-gray-600">
                      Scheduled: {new Date(appointment.scheduledDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        appointment.status === 'confirmed' ? 'default' : 
                        appointment.status === 'cancelled' ? 'destructive' : 'secondary'
                      }
                    >
                      {appointment.status}
                    </Badge>
                    {appointment.status === 'pending' && (
                      <div className="flex gap-1">
                        <Button size="sm" onClick={() => handleAppointmentStatus(appointment.id, 'confirmed')}>
                          Confirm
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleAppointmentStatus(appointment.id, 'cancelled')}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}