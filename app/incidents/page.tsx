import Link from "next/link"
import { Eye, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const incidents = [
  {
    id: "INC-001",
    title: "Suspicious SQL Injection Attempt",
    type: "SQL Injection",
    severity: "High",
    status: "Investigating",
    reporter: "Alice Johnson",
    assignedTo: "Bob Smith",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
  },
  {
    id: "INC-002",
    title: "Phishing Email Campaign Detected",
    type: "Phishing",
    severity: "Critical",
    status: "Open",
    reporter: "Bob Smith",
    assignedTo: "Carol Davis",
    createdAt: "2024-01-15T08:15:00Z",
    updatedAt: "2024-01-15T12:45:00Z",
  },
  {
    id: "INC-003",
    title: "Malware Detection on Workstation",
    type: "Malware",
    severity: "Medium",
    status: "Resolved",
    reporter: "Carol Davis",
    assignedTo: "Alice Johnson",
    createdAt: "2024-01-14T16:20:00Z",
    updatedAt: "2024-01-15T09:30:00Z",
  },
]

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Incident Reports</h1>
          <p className="text-gray-400 mt-2">View and manage all security incidents</p>
        </div>
        <Link href="/report-incident">
          <Button>Report New Incident</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search incidents..." className="pl-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="flex h-10 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Statuses</option>
                <option value="open">Open</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
              </select>
              <select className="flex h-10 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Severities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Incidents</CardTitle>
          <CardDescription>Complete list of reported security incidents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-300">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Severity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Assigned To</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Updated</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-blue-400">{incident.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-100">{incident.title}</div>
                      <div className="text-sm text-gray-400">by {incident.reporter}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-300">{incident.type}</span>
                    </td>
                    <td className="py-3 px-4">
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
                    </td>
                    <td className="py-3 px-4">
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
                    </td>
                    <td className="py-3 px-4 text-gray-300">{incident.assignedTo}</td>
                    <td className="py-3 px-4 text-gray-400">{new Date(incident.updatedAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <Link href={`/incidents/${incident.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
