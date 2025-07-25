import Link from "next/link"
import { ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/cyber-security-hero.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gray-900/80"></div>
      </div>

      {/* Animated network nodes */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-500 rounded-full animate-ping shadow-lg shadow-green-500/50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping shadow-lg shadow-purple-500/50"></div>
        <div className="absolute top-3/4 left-1/2 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50"></div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <line x1="25%" y1="25%" x2="66%" y2="33%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="33%" y1="75%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3">
            <animate attributeName="stroke-dashoffset" values="0;6" dur="1.5s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-blue-600/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
              <Shield className="h-16 w-16 text-blue-400" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Enterprise Security Operations Center
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4">Secure, Simulate, Respond</p>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed">
            Internal cybersecurity incident response platform for our security team. Streamline incident management,
            conduct security simulations, and enhance team collaboration during critical security operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
              >
                <Shield className="mr-2 h-5 w-5" />
                Access Dashboard
              </Button>
            </Link>
            <Link href="/report-incident">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-100 hover:bg-gray-800 px-6 sm:px-8 py-3 text-base sm:text-lg bg-transparent backdrop-blur-sm w-full sm:w-auto"
              >
                Report Incident
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="text-sm text-gray-500">
            <p>Trusted by our security operations team • Available 24/7 for incident response</p>
          </div>
        </div>
      </div>
    </section>
  )
}
