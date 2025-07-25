import { Upload, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  {
    id: "1",
    name: "Nmap",
    description: "Network discovery and security auditing tool used to scan for open ports and services",
    screenshot: "/placeholder.svg?height=200&width=300",
    usedInIncident: "INC-001",
    impact: "Identified vulnerable services running on target systems",
    lastUsed: "2024-01-15T14:30:00Z",
  },
  {
    id: "2",
    name: "Burp Suite",
    description: "Web application security testing platform for finding vulnerabilities",
    screenshot: "/placeholder.svg?height=200&width=300",
    usedInIncident: "INC-001",
    impact: "Discovered SQL injection vulnerability in login form",
    lastUsed: "2024-01-15T12:15:00Z",
  },
  {
    id: "3",
    name: "Wireshark",
    description: "Network protocol analyzer for capturing and analyzing network traffic",
    screenshot: "/placeholder.svg?height=200&width=300",
    usedInIncident: "INC-002",
    impact: "Captured malicious network traffic patterns during phishing attack",
    lastUsed: "2024-01-14T16:45:00Z",
  },
  {
    id: "4",
    name: "Metasploit",
    description: "Penetration testing framework for developing and executing exploit code",
    screenshot: "/placeholder.svg?height=200&width=300",
    usedInIncident: "INC-003",
    impact: "Validated malware persistence mechanisms on compromised systems",
    lastUsed: "2024-01-13T10:20:00Z",
  },
]

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Tools Used</h1>
          <p className="text-gray-400 mt-2">Security tools and their usage in incident investigations</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Add Tool Usage
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Card key={tool.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <CardDescription className="mt-2">{tool.description}</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={tool.screenshot || "/placeholder.svg"}
                  alt={`${tool.name} screenshot`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-400">Used in Incident:</span>
                  <span className="ml-2 font-mono text-blue-400">{tool.usedInIncident}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Impact:</span>
                  <p className="text-sm text-gray-300 mt-1">{tool.impact}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Last Used:</span>
                  <span className="ml-2 text-sm text-gray-300">{new Date(tool.lastUsed).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
