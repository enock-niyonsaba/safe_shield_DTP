import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/auth", "/auth/pending", "/"]
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  // If user is not authenticated and trying to access protected route
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  // If user is authenticated, get their profile
  if (session) {
    const { data: profile } = await supabase.from("users").select("role, status").eq("id", session.user.id).single()

    // If user account is pending approval
    if (profile?.status === "pending" && pathname !== "/auth/pending") {
      return NextResponse.redirect(new URL("/auth/pending", req.url))
    }

    // If user account is inactive
    if (profile?.status === "inactive") {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL("/auth", req.url))
    }

    // Role-based access control
    const userRole = profile?.role

    // Admin-only routes
    const adminRoutes = ["/admin"]
    const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

    if (isAdminRoute && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Observer restrictions - they can only access certain routes
    const observerAllowedRoutes = [
      "/dashboard",
      "/incidents",
      "/logs",
      "/training",
      "/notifications",
      "/observer",
      "/profile",
    ]

    if (userRole === "observer") {
      const isAllowedRoute = observerAllowedRoutes.some((route) => pathname.startsWith(route) || pathname === "/")

      if (!isAllowedRoute) {
        return NextResponse.redirect(new URL("/observer", req.url))
      }
    }

    // Redirect authenticated users away from auth pages
    if (isPublicRoute && pathname !== "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return res
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
