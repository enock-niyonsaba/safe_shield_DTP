import { AlertTriangle, CheckCircle, Clock, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Active Incidents",
    value: "12",
    change: "+2 from yesterday",
    icon: AlertTriangle,
    color: "text-red-400",
  },
  {
    title: "Resolved Today",
    value: "8",
    change: "+4 from yesterday",
    icon: CheckCircle,
    color: "text-green-400",
  },
  {
    title: "In Progress",
    value: "5",
    change: "No change",
    icon: Clock,
    color: "text-yellow-400",
  },
  {
    title: "Team Members",
    value: "24",
    change: "2 online now",
    icon: Users,
    color: "text-blue-400",
  },
]

const recentIncidents = [
  {
    id: "INC-001",
    title: "Suspicious SQL Injection Attempt",
    severity: "High",
    status: "Investigating",
    reporter: "Alice Johnson",
    time: "2 hours ago",
  },
  {
    id: "INC-002",
    title: "Phishing Email Campaign Detected",
    severity: "Critical",
    status: "Open",
    reporter: "Bob Smith",
    time: "4 hours ago",
  },
  {
    id: "INC-003",
    title: "Malware Detection on Workstation",
    severity: "Medium",
    status: "Resolved",
    reporter: "Carol Davis",
    time: "6 hours ago",
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-gray-400 mt-2">Overview of current security incidents and system status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
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

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>Latest security incidents requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIncidents.map((incident) => (
              <div
                key={incident.id}
                className="flex items-center justify-between p-4 border border-gray-700 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm text-blue-400">{incident.id}</span>
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
                  <h3 className="font-medium text-gray-100 mt-1">{incident.title}</h3>
                  <p className="text-sm text-gray-400">
                    Reported by {incident.reporter} • {incident.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
