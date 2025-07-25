"use client"

import { useState } from "react"
import { Eye, AlertTriangle, Clock, CheckCircle, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const observerStats = [
  {
    title: "Incidents Reported",
    value: "12",
    change: "+3 this month",
    icon: AlertTriangle,
    color: "text-red-400",
  },
  {
    title: "Under Investigation",
    value: "5",
    change: "Awaiting updates",
    icon: Clock,
    color: "text-yellow-400",
  },
  {
    title: "Resolved",
    value: "7",
    change: "This month",
    icon: CheckCircle,
    color: "text-green-400",
  },
  {
    title: "Avg Resolution Time",
    value: "2.1h",
    change: "For your reports",
    icon: Clock,
    color: "text-blue-400",
  },
]

const myIncidents = [
  {
    id: "INC-045",
    title: "Suspicious Email Attachment",
    type: "Phishing",
    severity: "Medium",
    status: "Resolved",
    reportedAt: "2024-01-15T10:30:00Z",
    assignedTo: "Mike Chen",
    lastUpdate: "2024-01-15T14:20:00Z",
  },
  {
    id: "INC-048",
    title: "Unusual Network Traffic",
    type: "Network Anomaly",
    severity: "High",
    status: "Investigating",
    reportedAt: "2024-01-16T09:15:00Z",
    assignedTo: "Sarah Johnson",
    lastUpdate: "2024-01-16T11:30:00Z",
  },
  {
    id: "INC-051",
    title: "Failed Login Attempts",
    type: "Unauthorized Access",
    severity: "Low",
    status: "Open",
    reportedAt: "2024-01-16T14:45:00Z",
    assignedTo: "David Kim",
    lastUpdate: "2024-01-16T14:45:00Z",
  },
]

const recentUpdates = [
  {
    id: 1,
    incidentId: "INC-045",
    message: "Incident resolved - Email attachment was benign training material",
    timestamp: "2 hours ago",
    updatedBy: "Mike Chen",
  },
  {
    id: 2,
    incidentId: "INC-048",
    message: "Investigation ongoing - Network traffic patterns analyzed",
    timestamp: "4 hours ago",
    updatedBy: "Sarah Johnson",
  },
  {
    id: 3,
    incidentId: "INC-051",
    message: "Incident assigned to analyst for review",
    timestamp: "6 hours ago",
    updatedBy: "System",
  },
]

export default function ObserverDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const filteredIncidents = myIncidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || incident.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Observer Dashboard</h1>
          <p className="text-gray-400 mt-2">Track your reported incidents and system observations</p>
        </div>
        <Link href="/report-incident">
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report New Incident
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {observerStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Incidents */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>My Reported Incidents</CardTitle>
                <CardDescription>Incidents you have reported and their current status</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search incidents..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="Open">Open</option>
                <option value="Investigating">Investigating</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="border border-gray-700 rounded-lg p-4 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-blue-400">{incident.id}</span>
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
                    <Link href={`/incidents/${incident.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <h3 className="font-medium text-gray-100 mb-1">{incident.title}</h3>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Type: {incident.type}</p>
                    <p>Assigned to: {incident.assignedTo}</p>
                    <p>Reported: {new Date(incident.reportedAt).toLocaleString()}</p>
                    <p>Last Update: {new Date(incident.lastUpdate).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Latest updates on your reported incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUpdates.map((update) => (
                <div key={update.id} className="border-l-2 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm text-blue-400">{update.incidentId}</span>
                    <span className="text-xs text-gray-400">{update.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-100 mb-1">{update.message}</p>
                  <p className="text-xs text-gray-400">Updated by: {update.updatedBy}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Observer Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Observer Guidelines</CardTitle>
          <CardDescription>Best practices for reporting and monitoring security incidents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-200 mb-3">Reporting Best Practices</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide detailed descriptions of observed anomalies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Include timestamps and affected systems</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Attach relevant screenshots or logs when possible</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Classify severity based on potential impact</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-200 mb-3">What to Report</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Suspicious emails or phishing attempts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Unusual network activity or performance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Unauthorized access attempts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>System errors or unexpected behavior</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
