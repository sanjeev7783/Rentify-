import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ['/admin', '/owners', '/appointments']
  const adminRoutes = ['/admin']
  const ownerRoutes = ['/owners']
  const publicRoutes = ['/login', '/register', '/properties', '/']

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // In a real app, you'd check for a valid JWT token in cookies/headers
    // For this demo, we'll check for a simple auth cookie
    const authCookie = request.cookies.get('auth-user')
    
    if (!authCookie) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const user = JSON.parse(authCookie.value)
      
      // Check role-based access
      if (adminRoutes.some(route => pathname.startsWith(route)) && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/properties', request.url))
      }
      
      if (ownerRoutes.some(route => pathname.startsWith(route)) && user.role !== 'owner') {
        return NextResponse.redirect(new URL('/properties', request.url))
      }
    } catch (error) {
      // Invalid auth cookie, redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // Allow access to public routes regardless of auth status
  if (isPublicRoute) {
    // No additional checks needed for public routes
  }

  // Log requests in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}