import { Quote, Shield, Users, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote:
      "Safe Shield has significantly improved our incident response time. The centralized dashboard and real-time collaboration features help us coordinate effectively during security events.",
    author: "Security Operations Manager",
    role: "SOC Team Lead",
    department: "Information Security",
    icon: Shield,
    color: "text-blue-400",
  },
  {
    quote:
      "The training modules and simulation capabilities have enhanced our team's preparedness. We can now practice incident response procedures in a controlled environment.",
    author: "Senior Security Analyst",
    role: "Incident Response Specialist",
    department: "Cybersecurity Division",
    icon: Users,
    color: "text-green-400",
  },
  {
    quote:
      "Having all our security tools integrated in one platform streamlines our workflow. The evidence management and timeline tracking features are particularly valuable during investigations.",
    author: "IT Security Coordinator",
    role: "Threat Hunter",
    department: "Network Security",
    icon: Zap,
    color: "text-purple-400",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Team Feedback</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            What our security team members say about using Safe Shield for daily operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Quote className="h-8 w-8 text-gray-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-gray-300 mb-4 italic leading-relaxed">"{testimonial.quote}"</p>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center`}>
                        <testimonial.icon className={`h-5 w-5 ${testimonial.color}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-100">{testimonial.author}</p>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                        <p className="text-sm text-gray-500">{testimonial.department}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
