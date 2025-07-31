"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginSuccess } from "@/redux/slices/authSlice"
import { Building } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  // Mock users data (with passwords for demo)
  const mockUsers = [
    { id: 1, role: "admin", name: "Admin Alice", email: "admin1@rentify.com", phone: "1234567800", password: "admin123", verified: true },
    { id: 4, role: "owner", name: "Owner Diana", email: "owner4@rentify.com", phone: "1234567803", password: "owner123", verified: true },
    { id: 8, role: "tenant", name: "Tenant Hannah", email: "tenant8@rentify.com", phone: "1234567807", password: "tenant123", verified: true },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Fetch all users from database
      const response = await fetch('http://localhost:3001/users')
      const allUsers = await response.json()
      
      // Combine mock users with database users
      const combinedUsers = [...mockUsers, ...allUsers]
      
      // Find user by email and validate password
      const user = combinedUsers.find((u) => u.email === email && u.password === password)

      if (user) {
        dispatch(loginSuccess(user))

        // Redirect based on role
        switch (user.role) {
          case "admin":
            router.push("/admin")
            break
          case "owner":
            router.push("/owners")
            break
          case "tenant":
            router.push("/properties")
            break
          default:
            router.push("/")
        }
      } else {
        setError("Invalid email or password")
      }
    } catch (error) {
      console.error('Login error:', error)
      setError("Login failed. Please check your connection and try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Building className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold text-primary">Rentify</span>
          </div>
          <CardTitle className="text-2xl text-center">Sign in to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-sm">
              <p className="text-gray-600 mb-2">Demo accounts:</p>
              <div className="space-y-1 text-xs">
                <p>
                  <strong>Admin:</strong> admin1@rentify.com / admin123
                </p>
                <p>
                  <strong>Owner:</strong> owner4@rentify.com / owner123
                </p>
                <p>
                  <strong>Tenant:</strong> tenant8@rentify.com / tenant123
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center text-sm">
              {"Don't have an account? "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
