import { UserCheck, AlertTriangle, Upload, Users, Shield, CheckCircle } from "lucide-react"

const steps = [
  {
    step: 1,
    title: "Sign In and Choose Your Role",
    description:
      "Create an account and get admin approval. Choose from Admin, Analyst, or Observer roles based on your responsibilities.",
    icon: UserCheck,
    color: "text-blue-400",
  },
  {
    step: 2,
    title: "Start a Simulation or Log an Incident",
    description:
      "Begin a controlled cybersecurity simulation or report a real security incident with detailed information.",
    icon: AlertTriangle,
    color: "text-red-400",
  },
  {
    step: 3,
    title: "Upload Evidence and Document Tools",
    description: "Securely upload evidence files and document which security tools were used in your investigation.",
    icon: Upload,
    color: "text-green-400",
  },
  {
    step: 4,
    title: "Collaborate with Your Team",
    description: "Use built-in chat channels to communicate with team members and coordinate response efforts.",
    icon: Users,
    color: "text-purple-400",
  },
  {
    step: 5,
    title: "Contain and Analyze",
    description:
      "Implement containment measures, analyze the threat, and document your findings throughout the process.",
    icon: Shield,
    color: "text-yellow-400",
  },
  {
    step: 6,
    title: "Resolve and Learn",
    description: "Mark incidents as resolved, conduct post-incident reviews, and improve your security posture.",
    icon: CheckCircle,
    color: "text-cyan-400",
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">How Safe Shield Works</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A streamlined workflow from incident detection to resolution
          </p>
        </div>

        <div className="relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center mr-4 relative z-10`}
                    >
                      <step.icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-400">Step {step.step}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-100 mt-1">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
