import { ArrowLeft, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponseTracker } from "@/components/incident-response/response-tracker"

// Mock data for demonstration
const incident = {
  id: "INC-001",
  title: "Suspicious SQL Injection Attempt",
  type: "SQL Injection",
  severity: "High",
  status: "Investigating",
  description:
    "Multiple SQL injection attempts detected on the user authentication endpoint. The attacker appears to be using automated tools to probe for vulnerabilities. Initial analysis shows attempts to extract user credentials and database schema information.",
  reporter: "Alice Johnson",
  assignedTo: "Bob Smith",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T14:20:00Z",
  toolsUsed: ["Nmap", "Burp Suite", "Wireshark"],
  evidence: ["screenshot1.png", "network_logs.txt", "sql_queries.log"],
  timeline: [
    {
      id: "1",
      timestamp: "2024-01-15T10:30:00Z",
      action: "Incident Reported",
      description: "Initial report submitted by Alice Johnson",
      user: "Alice Johnson",
    },
    {
      id: "2",
      timestamp: "2024-01-15T11:15:00Z",
      action: "Investigation Started",
      description: "Assigned to Bob Smith for investigation",
      user: "System",
    },
    {
      id: "3",
      timestamp: "2024-01-15T12:30:00Z",
      action: "Evidence Collected",
      description: "Network logs and SQL queries captured",
      user: "Bob Smith",
    },
    {
      id: "4",
      timestamp: "2024-01-15T14:20:00Z",
      action: "Containment Measures",
      description: "Temporary firewall rules implemented to block suspicious IPs",
      user: "Bob Smith",
    },
  ],
}

export default function IncidentDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/incidents">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-100">{incident.title}</h1>
            <p className="text-gray-400 mt-1">Incident ID: {incident.id}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Assign to Me</Button>
          <Button variant="destructive">Escalate</Button>
          <Button>Mark as Resolved</Button>
        </div>
      </div>

      {/* Response Tracker - Main Feature */}
      <ResponseTracker
        incidentId={params.id}
        userRole="Analyst" // This should come from user context
        isReporter={false} // This should be determined based on user role and incident reporter
      />

      {/* Original incident details moved to a collapsible section */}
      <Card>
        <CardHeader>
          <CardTitle>Original Incident Report</CardTitle>
          <CardDescription>Initial incident details and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Type:</span>
              <span className="text-gray-100">{incident.type}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Severity:</span>
              <span
                className={`status-badge ${
                  incident.severity === "Critical"
                    ? "severity-critical"
                    : incident.severity === "High"
                      ? "severity-high"
                      : incident.severity === "Medium"
                        ? "severity-medium"
                        : "severity-low"
                }`}
              >
                {incident.severity}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Status:</span>
              <span
                className={`status-badge ${
                  incident.status === "Open"
                    ? "status-open"
                    : incident.status === "Investigating"
                      ? "status-investigating"
                      : "status-resolved"
                }`}
              >
                {incident.status}
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-100 mb-2">Description</h3>
            <p className="text-gray-300 leading-relaxed">{incident.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <span className="text-gray-400 text-sm">Reporter</span>
              <div className="flex items-center space-x-2 mt-1">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-100">{incident.reporter}</span>
              </div>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Assigned To</span>
              <div className="flex items-center space-x-2 mt-1">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-100">{incident.assignedTo}</span>
              </div>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Created</span>
              <p className="text-gray-100 mt-1">{new Date(incident.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Last Updated</span>
              <p className="text-gray-100 mt-1">{new Date(incident.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
