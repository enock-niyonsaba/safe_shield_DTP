"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface AuthContextType {
  user: User | null
  profile: Profile | null
  currentRole: "Admin" | "Analyst" | "Observer" | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: "Admin" | "Analyst" | "Observer",
  ) => Promise<{ error: any }>
  signOut: () => Promise<void>
  switchRole: (role: "Admin" | "Analyst" | "Observer") => void
  refreshProfile: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [currentRole, setCurrentRole] = useState<"Admin" | "Analyst" | "Observer" | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          setError(error.message)
          return
        }

        if (mounted) {
          setUser(session?.user ?? null)
          if (session?.user) {
            await fetchProfile(session.user.id)
          } else {
            setLoading(false)
          }
        }
      } catch (err) {
        console.error("Error in getInitialSession:", err)
        if (mounted) {
          setError("Failed to initialize authentication")
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)

      if (mounted) {
        setUser(session?.user ?? null)
        setError(null)

        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
          setCurrentRole(null)
          setLoading(false)
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId)

      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("Error fetching profile:", error)

        // If profile doesn't exist, create one for existing auth users
        if (error.code === "PGRST116") {
          console.log("Profile not found, creating default profile")
          const { data: userData } = await supabase.auth.getUser()

          if (userData.user) {
            const newProfile = {
              id: userData.user.id,
              email: userData.user.email || "",
              full_name: userData.user.user_metadata?.full_name || userData.user.email?.split("@")[0] || "User",
              role: "Analyst" as const,
              status: "active" as const,
            }

            const { data: createdProfile, error: createError } = await supabase
              .from("profiles")
              .insert(newProfile)
              .select()
              .single()

            if (createError) {
              console.error("Error creating profile:", createError)
              setError("Failed to create user profile")
              return
            }

            setProfile(createdProfile)
            setCurrentRole(createdProfile.role)
          }
        } else {
          setError("Failed to fetch user profile")
        }
        return
      }

      console.log("Profile fetched:", data)
      setProfile(data)
      setCurrentRole(data.role)
    } catch (error) {
      console.error("Error in fetchProfile:", error)
      setError("Failed to fetch user profile")
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      console.log("Attempting to sign in:", email)

      // Validate email format before sending to Supabase
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.trim())) {
        const errorMessage = "Please enter a valid email address"
        setError(errorMessage)
        return { error: { message: errorMessage } }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })

      if (error) {
        console.error("Sign in error:", error)
        setError(error.message)
        return { error }
      }

      console.log("Sign in successful:", data.user?.email)

      // The auth state change listener will handle profile fetching
      return { error: null }
    } catch (err) {
      console.error("Unexpected error during sign in:", err)
      const errorMessage = "An unexpected error occurred during sign in"
      setError(errorMessage)
      return { error: { message: errorMessage } }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName: string, role: "Admin" | "Analyst" | "Observer") => {
    setLoading(true)
    setError(null)

    try {
      console.log("Attempting to sign up:", email, role)

      // Validate email format before sending to Supabase
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const cleanEmail = email.trim().toLowerCase()

      if (!emailRegex.test(cleanEmail)) {
        const errorMessage = "Please enter a valid email address"
        setError(errorMessage)
        return { error: { message: errorMessage } }
      }

      // Validate password strength
      if (password.length < 8) {
        const errorMessage = "Password must be at least 8 characters long"
        setError(errorMessage)
        return { error: { message: errorMessage } }
      }

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            role: role,
          },
        },
      })

      if (error) {
        console.error("Sign up error:", error)

        // Handle specific Supabase errors
        if (error.message.includes("Email address") && error.message.includes("invalid")) {
          setError("The email address format is not valid. Please use a valid email address.")
        } else if (error.message.includes("User already registered")) {
          setError("An account with this email already exists. Please sign in instead.")
        } else {
          setError(error.message)
        }
        return { error }
      }

      if (data.user) {
        // Create profile in database
        const profileData = {
          id: data.user.id,
          email: cleanEmail,
          full_name: fullName.trim(),
          role: role,
          status: role === "Admin" ? ("active" as const) : ("pending" as const),
        }

        const { error: profileError } = await supabase.from("profiles").insert(profileData)

        if (profileError) {
          console.error("Error creating profile:", profileError)
          setError("Account created but failed to create user profile. Please contact support.")
          return { error: profileError }
        }

        console.log("Sign up successful:", data.user.email)
      }

      return { error: null }
    } catch (err) {
      console.error("Unexpected error during sign up:", err)
      const errorMessage = "An unexpected error occurred during sign up"
      setError(errorMessage)
      return { error: { message: errorMessage } }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("Signing out")
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error("Sign out error:", error)
        setError(error.message)
        return
      }

      // Clear state
      setUser(null)
      setProfile(null)
      setCurrentRole(null)

      // Redirect to auth page
      router.push("/auth")
    } catch (err) {
      console.error("Unexpected error during sign out:", err)
      setError("An unexpected error occurred during sign out")
    } finally {
      setLoading(false)
    }
  }

  const switchRole = (role: "Admin" | "Analyst" | "Observer") => {
    if (profile?.role === "Admin") {
      console.log("Admin switching role to:", role)
      setCurrentRole(role)
    } else {
      console.log("Non-admin user cannot switch roles")
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const value = {
    user,
    profile,
    currentRole,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    switchRole,
    refreshProfile,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
