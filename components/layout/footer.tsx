import Link from "next/link"
import { Shield, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-100">Safe Shield</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Internal cybersecurity incident response platform for our enterprise security operations team. Secure,
              reliable, and always available for critical security events.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">Emergency: ext. 911</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">security-team@company.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Security Operations Center - Building A, Floor 3</span>
              </div>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-gray-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/incidents" className="text-gray-400 hover:text-gray-300">
                  Incidents
                </Link>
              </li>
              <li>
                <Link href="/logs" className="text-gray-400 hover:text-gray-300">
                  System Logs
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-400 hover:text-gray-300">
                  Security Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/training" className="text-gray-400 hover:text-gray-300">
                  Training Materials
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-gray-400 hover:text-gray-300">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/playbooks" className="text-gray-400 hover:text-gray-300">
                  Response Playbooks
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-gray-400 hover:text-gray-300">
                  Security Policies
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-gray-300">
                  IT Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Safe Shield - Internal Security Platform. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Security Incidents:</span>
              <Link href="mailto:incidents@company.com" className="text-red-400 hover:text-red-300 text-sm font-medium">
                incidents@company.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
