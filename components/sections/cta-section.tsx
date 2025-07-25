import Link from "next/link"
import { ArrowRight, Users, FileText, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-cyan-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Ready to Enhance Our Security Operations?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Access the Safe Shield platform to manage incidents, conduct training, and collaborate with the security team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <Users className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-100 mb-2">Access Dashboard</h3>
            <p className="text-gray-400 text-sm mb-4">
              Log in to view active incidents, system status, and team activities
            </p>
            <Link href="/dashboard">
              <Button className="w-full">
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <FileText className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-100 mb-2">Report Security Incident</h3>
            <p className="text-gray-400 text-sm mb-4">
              Quickly report and document security incidents for immediate response
            </p>
            <Link href="/report-incident">
              <Button variant="outline" className="w-full bg-transparent">
                Report Incident
              </Button>
            </Link>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <Settings className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-100 mb-2">System Administration</h3>
            <p className="text-gray-400 text-sm mb-4">
              Manage user accounts, system settings, and platform configuration
            </p>
            <Link href="/admin">
              <Button variant="outline" className="w-full bg-transparent">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">Need technical support or have questions?</p>
          <Link href="mailto:it-support@company.com" className="text-blue-400 hover:text-blue-300 transition-colors">
            Contact IT Support Team →
          </Link>
        </div>
      </div>
    </section>
  )
}
