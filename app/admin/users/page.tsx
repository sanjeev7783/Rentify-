"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, CheckCircle, XCircle, Trash2 } from "lucide-react"

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleVerifyUser = async (userId: number) => {
    try {
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: true })
      })
      
      setUsers(prev => 
        prev.map((user: any) => 
          user.id === userId ? { ...user, verified: true } : user
        )
      )
    } catch (error) {
      console.error('Error verifying user:', error)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`http://localhost:3001/users/${userId}`, {
          method: 'DELETE'
        })
        
        setUsers(prev => prev.filter((user: any) => user.id !== userId))
        alert('User deleted successfully!')
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Failed to delete user')
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-16 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">User Management</h1>
        <p className="text-gray-600">Manage all platform users</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            All Users ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user: any) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-600">{user.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant={
                    user.role === 'admin' ? 'default' : 
                    user.role === 'owner' ? 'secondary' : 'outline'
                  }>
                    {user.role}
                  </Badge>
                  
                  <Badge variant={user.verified ? "default" : "secondary"}>
                    {user.verified ? (
                      <><CheckCircle className="w-3 h-3 mr-1" />Verified</>
                    ) : (
                      <><XCircle className="w-3 h-3 mr-1" />Unverified</>
                    )}
                  </Badge>
                  
                  <div className="flex gap-1">
                    {!user.verified && (
                      <Button 
                        size="sm" 
                        onClick={() => handleVerifyUser(user.id)}
                      >
                        Verify
                      </Button>
                    )}
                    
                    {user.role !== 'admin' && (
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}