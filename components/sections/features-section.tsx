import { AlertTriangle, Users, Upload, Clock, Wrench, MessageSquare, Shield, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: AlertTriangle,
    title: "Real-time Incident Reporting",
    description: "Submit and track security incidents instantly with comprehensive forms and automated workflows.",
    color: "text-red-400",
  },
  {
    icon: Users,
    title: "Role-based Access Control",
    description:
      "Secure access management with Admin, Analyst, and Observer roles. Admin approval required for new accounts.",
    color: "text-blue-400",
  },
  {
    icon: Upload,
    title: "Evidence Upload & Management",
    description:
      "Securely upload, organize, and analyze digital evidence including logs, screenshots, and network captures.",
    color: "text-green-400",
  },
  {
    icon: Clock,
    title: "Timeline & Resolution Tracking",
    description:
      "Visual timeline tracking from incident detection through containment, eradication, and recovery phases.",
    color: "text-yellow-400",
  },
  {
    icon: Wrench,
    title: "Tools Documentation",
    description: "Integrated support for Nmap, Metasploit, ZAP, Burp Suite, and other essential security tools.",
    color: "text-purple-400",
  },
  {
    icon: MessageSquare,
    title: "Team Collaboration",
    description: "Built-in chat interface with incident-specific channels for seamless team communication.",
    color: "text-cyan-400",
  },
  {
    icon: Shield,
    title: "Threat Modeling Tools",
    description: "Advanced threat modeling capabilities to identify and assess potential security risks.",
    color: "text-orange-400",
  },
  {
    icon: Eye,
    title: "Live Monitoring Dashboard",
    description: "Real-time visibility into system status, active incidents, and team performance metrics.",
    color: "text-pink-400",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Comprehensive Security Operations</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to simulate, detect, respond to, and learn from cybersecurity incidents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg text-gray-100">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
