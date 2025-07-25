"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { Shield, Clock, CheckCircle, AlertCircle, Sparkles } from "lucide-react"

export default function PendingApprovalPage() {
  const { user, profile, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth")
    } else if (profile?.status === "active") {
      router.push("/dashboard")
    }
  }, [user, profile, router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/auth")
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-2000" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]" />

        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Shield className="h-12 w-12 text-purple-400" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">SafeShield</h1>
            <p className="text-purple-200">Advanced Cybersecurity Platform</p>
          </div>

          {/* Pending Card */}
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <Clock className="h-16 w-16 text-yellow-400 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 animate-spin" />
                </div>
              </div>
              <CardTitle className="text-white text-2xl">Account Pending Approval</CardTitle>
              <CardDescription className="text-purple-200 text-lg">
                Your account has been created successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-200 font-medium">Account Created</p>
                    <p className="text-green-300 text-sm">Your registration was successful</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <Clock className="h-5 w-5 text-yellow-400 flex-shrink-0 animate-pulse" />
                  <div>
                    <p className="text-yellow-200 font-medium">Awaiting Admin Approval</p>
                    <p className="text-yellow-300 text-sm">An administrator will review your account</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-blue-200 font-medium">Email Notification</p>
                    <p className="text-blue-300 text-sm">You'll receive an email when approved</p>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="bg-white/5 rounded-lg p-4 space-y-2">
                <h3 className="text-white font-medium mb-3">Account Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-200">Email:</span>
                    <span className="text-white">{profile?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Name:</span>
                    <span className="text-white">{profile?.full_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Role:</span>
                    <span className="text-white">{profile?.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Status:</span>
                    <span className="text-yellow-400 capitalize">{profile?.status}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">What happens next?</h3>
                <ul className="space-y-2 text-sm text-purple-200">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>An administrator will review your account request</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>You'll receive an email notification once approved</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>After approval, you can sign in and access the platform</span>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Sign Out
                </Button>
                <Button
                  onClick={() => router.push("/auth")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Back to Sign In
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-purple-200 text-sm">
            <p>© 2024 SafeShield. Advanced Cybersecurity Platform.</p>
            <p className="mt-1">Need help? Contact your system administrator.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
