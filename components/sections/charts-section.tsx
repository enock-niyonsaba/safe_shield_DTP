"use client"

import { useState } from "react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const incidentTypeData = [
  { name: "Phishing", value: 35, color: "#ef4444", count: 42 },
  { name: "Malware", value: 25, color: "#f97316", count: 30 },
  { name: "DDoS", value: 20, color: "#eab308", count: 24 },
  { name: "SQL Injection", value: 12, color: "#22c55e", count: 14 },
  { name: "Data Breach", value: 8, color: "#3b82f6", count: 10 },
]

const severityData = [
  { severity: "Critical", count: 15, color: "#dc2626", resolved: 8, pending: 7 },
  { severity: "High", count: 28, color: "#ea580c", resolved: 22, pending: 6 },
  { severity: "Medium", count: 45, color: "#ca8a04", resolved: 38, pending: 7 },
  { severity: "Low", count: 32, color: "#16a34a", resolved: 30, pending: 2 },
]

const timelineData = [
  { week: "Week 1", incidents: 12, resolved: 10, critical: 2 },
  { week: "Week 2", incidents: 19, resolved: 15, critical: 4 },
  { week: "Week 3", incidents: 8, resolved: 8, critical: 0 },
  { week: "Week 4", incidents: 25, resolved: 20, critical: 5 },
  { week: "Week 5", incidents: 15, resolved: 12, critical: 3 },
  { week: "Week 6", incidents: 22, resolved: 18, critical: 4 },
  { week: "Week 7", incidents: 18, resolved: 16, critical: 2 },
]

const responseTimeData = [
  { department: "SOC", avgTime: 15, target: 20 },
  { department: "Network Ops", avgTime: 25, target: 30 },
  { department: "IT Security", avgTime: 18, target: 25 },
  { department: "Compliance", avgTime: 45, target: 60 },
]

const threatSourceData = [
  { source: "External", count: 65, percentage: 54 },
  { source: "Internal", count: 28, percentage: 23 },
  { source: "Unknown", count: 18, percentage: 15 },
  { source: "Partner", count: 9, percentage: 8 },
]

export default function ChartsSection() {
  const [timeFilter, setTimeFilter] = useState("7days")

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Security Analytics & Insights</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-time security metrics and threat intelligence from our enterprise environment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Incident Types Distribution */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Incident Types Distribution</CardTitle>
              <CardDescription className="text-gray-400">Last 30 days - Total: 120 incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={incidentTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {incidentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {incidentTypeData.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-gray-400">{item.count} incidents</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Severity Levels */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Incidents by Severity</CardTitle>
              <CardDescription className="text-gray-400">Current status and resolution rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={severityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="severity" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="resolved" stackId="a" fill="#10b981" name="Resolved" />
                  <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 flex justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-gray-300">Resolved</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                  <span className="text-gray-300">Pending</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Trends */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-100">Incident Timeline</CardTitle>
                  <CardDescription className="text-gray-400">Weekly incident trends</CardDescription>
                </div>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-gray-100 rounded px-3 py-1 text-sm"
                >
                  <option value="7days">Last 7 weeks</option>
                  <option value="30days">Last 30 days</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="week" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="incidents"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Total Incidents"
                  />
                  <Area
                    type="monotone"
                    dataKey="critical"
                    stackId="2"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.8}
                    name="Critical"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Response Time by Department */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Response Time Performance</CardTitle>
              <CardDescription className="text-gray-400">Average response time vs targets (minutes)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={responseTimeData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" />
                  <YAxis dataKey="department" type="category" stroke="#9ca3af" width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="target" fill="#6b7280" name="Target" />
                  <Bar dataKey="avgTime" fill="#10b981" name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Threat Sources */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Threat Sources</CardTitle>
              <CardDescription className="text-gray-400">Origin of security incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatSourceData.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded"
                        style={{
                          backgroundColor:
                            source.source === "External"
                              ? "#ef4444"
                              : source.source === "Internal"
                                ? "#f59e0b"
                                : source.source === "Unknown"
                                  ? "#6b7280"
                                  : "#8b5cf6",
                        }}
                      ></div>
                      <span className="text-gray-300">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-100 font-medium">{source.count}</div>
                      <div className="text-gray-400 text-sm">{source.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Key Insights:</div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 54% of threats originate externally</li>
                  <li>• Internal threats decreased by 15% this month</li>
                  <li>• Unknown sources require better attribution</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
