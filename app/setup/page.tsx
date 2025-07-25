"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createAdminUser } from "@/app/actions/setup-admin"
import { Shield, CheckCircle, AlertCircle, Sparkles, Settings, User, Key } from "lucide-react"

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect after successful setup
    if (isComplete) {
      const timer = setTimeout(() => {
        router.push("/auth")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isComplete, router])

  const handleSetup = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await createAdminUser()

      if (result.error) {
        setError(result.error)
      } else {
        setIsComplete(true)
      }
    } catch (err) {
      console.error("Setup error:", err)
      setError("An unexpected error occurred during setup")
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-3xl font-bold text-white mb-2">SafeShield Setup</h1>
            <p className="text-purple-200">Initialize your cybersecurity platform</p>
          </div>

          {/* Setup Card */}
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                {isComplete ? (
                  <CheckCircle className="h-16 w-16 text-green-400" />
                ) : (
                  <Settings className="h-16 w-16 text-purple-400 animate-spin" />
                )}
              </div>
              <CardTitle className="text-white text-2xl">{isComplete ? "Setup Complete!" : "Platform Setup"}</CardTitle>
              <CardDescription className="text-purple-200 text-lg">
                {isComplete
                  ? "Your SafeShield platform is ready to use"
                  : "Create the administrator account to get started"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isComplete ? (
                <>
                  {/* Setup Information */}
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-3 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Admin Account Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-purple-200">Email:</span>
                          <span className="text-white">admin@company.com</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-200">Password:</span>
                          <span className="text-white font-mono">S@feShield2024!</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-200">Role:</span>
                          <span className="text-white">System Administrator</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-3 flex items-center">
                        <Key className="h-4 w-4 mr-2" />
                        What will be created:
                      </h3>
                      <ul className="space-y-2 text-sm text-purple-200">
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>Administrator user account</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>User profile with admin privileges</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>Database tables and initial data</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>Security configurations</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Setup Button */}
                  <Button
                    onClick={handleSetup}
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isLoading ? "Setting up platform..." : "Initialize SafeShield"}
                  </Button>
                </>
              ) : (
                <>
                  {/* Success Message */}
                  <div className="space-y-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <div>
                          <p className="text-green-200 font-medium">Setup Successful</p>
                          <p className="text-green-300 text-sm">Administrator account created successfully</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-3">Next Steps:</h3>
                      <ul className="space-y-2 text-sm text-purple-200">
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>You will be redirected to the sign-in page</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>Use the admin credentials to sign in</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>Access the full SafeShield dashboard</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>Start managing your cybersecurity platform</span>
                        </li>
                      </ul>
                    </div>

                    <div className="text-center text-purple-200 text-sm">
                      <p>Redirecting to sign-in page in 3 seconds...</p>
                    </div>
                  </div>

                  {/* Manual Navigation */}
                  <Button
                    onClick={() => router.push("/auth")}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Go to Sign In
                  </Button>
                </>
              )}

              {/* Error Display */}
              {error && (
                <Alert className="bg-red-500/10 border-red-500/20">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-purple-200 text-sm">
            <p>© 2024 SafeShield. Advanced Cybersecurity Platform.</p>
            <p className="mt-1">Secure • Reliable • Professional</p>
          </div>
        </div>
      </div>
    </div>
  )
}
