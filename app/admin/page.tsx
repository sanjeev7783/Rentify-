"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Building, Calendar, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalAppointments: 0,
    pendingVerifications: 0
  })
  const [recentProperties, setRecentProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, propertiesRes, appointmentsRes] = await Promise.all([
          fetch('http://localhost:3001/users'),
          fetch('http://localhost:3001/properties'),
          fetch('http://localhost:3001/appointments')
        ])

        const users = await usersRes.json()
        const properties = await propertiesRes.json()
        const appointments = await appointmentsRes.json()

        setStats({
          totalUsers: users.length,
          totalProperties: properties.length,
          totalAppointments: appointments.length,
          pendingVerifications: properties.filter((p: any) => !p.verified).length
        })

        // Only show unverified properties in the verification section
        setRecentProperties(properties.filter((p: any) => !p.verified).slice(-5))
      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleVerifyProperty = async (propertyId: number) => {
    try {
      await fetch(`http://localhost:3001/properties/${propertyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: true })
      })
      
      // Remove the verified property from the list since we only show unverified ones
      setRecentProperties(prev => 
        prev.filter((p: any) => p.id !== propertyId)
      )
      
      // Update stats to reflect the verification
      setStats(prev => ({
        ...prev,
        pendingVerifications: prev.pendingVerifications - 1
      }))
    } catch (error) {
      console.error('Error verifying property:', error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
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
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users, properties, and platform content</p>
        
        {/* Quick Navigation */}
        <div className="flex gap-4 mt-4">
          <Button asChild variant="outline">
            <Link href="/admin/users">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/properties">
              <Building className="h-4 w-4 mr-2" />
              View All Properties
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAppointments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.pendingVerifications}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Properties - Verification Required</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProperties.map((property: any) => (
              <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm text-gray-600">{property.city} • {property.type} • ${property.price}/month</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={property.verified ? "default" : "secondary"}>
                    {property.verified ? "Verified" : "Pending"}
                  </Badge>
                  {!property.verified && (
                    <Button 
                      size="sm" 
                      onClick={() => handleVerifyProperty(property.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}