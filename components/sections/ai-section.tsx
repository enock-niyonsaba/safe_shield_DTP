import { Brain, Zap, Target, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const aiSuggestions = [
  {
    category: "Phishing Attack",
    severity: "High",
    suggestions: [
      "Block sender domain on email gateway",
      "Quarantine affected mailboxes",
      "Run phishing awareness training",
      "Update email security policies",
    ],
    icon: Target,
    color: "text-red-400",
  },
  {
    category: "Malware Detection",
    severity: "Critical",
    suggestions: [
      "Isolate affected endpoint immediately",
      "Run full system antivirus scan",
      "Check for lateral movement",
      "Update endpoint protection rules",
    ],
    icon: Shield,
    color: "text-orange-400",
  },
  {
    category: "DDoS Attack",
    severity: "High",
    suggestions: [
      "Enable DDoS protection on CDN",
      "Block suspicious IP ranges",
      "Scale up server resources",
      "Contact ISP for upstream filtering",
    ],
    icon: Zap,
    color: "text-yellow-400",
  },
]

export default function AISection() {
  return (
    <section className="py-20 bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Brain className="h-12 w-12 text-purple-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">AI-Powered Response Recommendations</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get intelligent containment suggestions based on threat category, tool findings, and severity level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aiSuggestions.map((item, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-100">{item.category}</CardTitle>
                    <CardDescription className={`text-sm ${item.color}`}>Severity: {item.severity}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Recommended Actions:</h4>
                  <ul className="space-y-2">
                    {item.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-400">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-900/30 border border-purple-700 rounded-lg px-4 py-2">
            <Brain className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-300">AI recommendations improve with each incident analyzed</span>
          </div>
        </div>
      </div>
    </section>
  )
}
