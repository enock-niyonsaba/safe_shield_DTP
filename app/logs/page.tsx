"use client"

import { useState } from "react"
import { Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const logs = [
  {
    id: "1",
    timestamp: "2024-01-15T14:30:25Z",
    severity: "Critical",
    source: "Web Server",
    sourceIP: "192.168.1.100",
    action: "SQL Injection Attempt",
    description: "Malicious SQL query detected in login form: UNION SELECT * FROM users",
  },
  {
    id: "2",
    timestamp: "2024-01-15T14:28:15Z",
    severity: "Warning",
    source: "Firewall",
    sourceIP: "203.0.113.45",
    action: "Port Scan Detected",
    description: "Multiple port scan attempts from external IP address",
  },
  {
    id: "3",
    timestamp: "2024-01-15T14:25:10Z",
    severity: "Info",
    source: "Authentication",
    sourceIP: "192.168.1.50",
    action: "Failed Login",
    description: "Failed login attempt for user: admin",
  },
  {
    id: "4",
    timestamp: "2024-01-15T14:20:05Z",
    severity: "Error",
    source: "Database",
    sourceIP: "192.168.1.200",
    action: "Connection Timeout",
    description: "Database connection timeout after 30 seconds",
  },
  {
    id: "5",
    timestamp: "2024-01-15T14:15:30Z",
    severity: "Critical",
    source: "Email Server",
    sourceIP: "198.51.100.25",
    action: "Phishing Attempt",
    description: "Suspicious email with malicious attachment detected",
  },
]

export default function SystemLogsPage() {
  const [filters, setFilters] = useState({
    search: "",
    severity: "",
    source: "",
    dateFrom: "",
    dateTo: "",
  })

  const handleExport = () => {
    // Handle log export
    console.log("Exporting logs...")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">System Logs</h1>
          <p className="text-gray-400 mt-2">Monitor and analyze system security events</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter logs by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search logs..."
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Severity</label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.severity}
                onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
              >
                <option value="">All Severities</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Source</label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.source}
                onChange={(e) => setFilters({ ...filters, source: e.target.value })}
              >
                <option value="">All Sources</option>
                <option value="web-server">Web Server</option>
                <option value="firewall">Firewall</option>
                <option value="database">Database</option>
                <option value="authentication">Authentication</option>
                <option value="email-server">Email Server</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date From</label>
              <Input
                type="datetime-local"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date To</label>
              <Input
                type="datetime-local"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Security Events</CardTitle>
          <CardDescription>Real-time system and security logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Timestamp</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Severity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Source</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Source IP</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Action</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Description</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-gray-300">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`status-badge ${
                          log.severity === "Critical"
                            ? "severity-critical"
                            : log.severity === "Error"
                              ? "severity-high"
                              : log.severity === "Warning"
                                ? "severity-medium"
                                : "severity-low"
                        }`}
                      >
                        {log.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{log.source}</td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-blue-400">{log.sourceIP}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{log.action}</td>
                    <td className="py-3 px-4">
                      <span className="text-gray-300 text-sm">{log.description}</span>
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
