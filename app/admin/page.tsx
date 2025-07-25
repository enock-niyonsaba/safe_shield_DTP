"use client"

import { useState } from "react"
import { Users, Shield, AlertTriangle, Settings, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const systemStats = [
  {
    title: "Total Users",
    value: "156",
    change: "+12 this month",
    icon: Users,
    color: "text-blue-400",
  },
  {
    title: "Active Incidents",
    value: "23",
    change: "-5 from yesterday",
    icon: AlertTriangle,
    color: "text-red-400",
  },
  {
    title: "System Uptime",
    value: "99.9%",
    change: "Last 30 days",
    icon: Shield,
    color: "text-green-400",
  },
  {
    title: "Avg Response Time",
    value: "1.8h",
    change: "-0.3h improvement",
    icon: Clock,
    color: "text-yellow-400",
  },
]

const userActivityData = [
  { month: "Jan", logins: 1240, incidents: 45, trainings: 89 },
  { month: "Feb", logins: 1380, incidents: 52, trainings: 95 },
  { month: "Mar", logins: 1290, incidents: 38, trainings: 102 },
  { month: "Apr", logins: 1450, incidents: 61, trainings: 87 },
  { month: "May", logins: 1520, incidents: 43, trainings: 110 },
  { month: "Jun", logins: 1680, incidents: 55, trainings: 125 },
]

const roleDistribution = [
  { name: "Analysts", value: 45, color: "#3b82f6" },
  { name: "Observers", value: 35, color: "#10b981" },
  { name: "Admins", value: 20, color: "#f59e0b" },
]

const recentActivities = [
  {
    id: 1,
    type: "user_created",
    message: "New user Sarah Johnson registered",
    timestamp: "2 minutes ago",
    status: "pending",
  },
  {
    id: 2,
    type: "incident_resolved",
    message: "Critical incident INC-045 resolved by Mike Chen",
    timestamp: "15 minutes ago",
    status: "success",
  },
  {
    id: 3,
    type: "system_update",
    message: "Security policies updated",
    timestamp: "1 hour ago",
    status: "info",
  },
  {
    id: 4,
    type: "training_completed",
    message: "15 users completed Incident Response training",
    timestamp: "2 hours ago",
    status: "success",
  },
]

const systemHealth = [
  { component: "Web Server", status: "healthy", uptime: "99.9%", lastCheck: "2 min ago" },
  { component: "Database", status: "healthy", uptime: "99.8%", lastCheck: "1 min ago" },
  { component: "Authentication", status: "warning", uptime: "98.5%", lastCheck: "5 min ago" },
  { component: "File Storage", status: "healthy", uptime: "99.9%", lastCheck: "3 min ago" },
  { component: "Email Service", status: "healthy", uptime: "99.7%", lastCheck: "1 min ago" },
]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("30days")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">System overview and administrative controls</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
          <Button>Generate Report</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat) => (
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
        {/* User Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>User Activity Trends</CardTitle>
                <CardDescription>Monthly user engagement metrics</CardDescription>
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-gray-100 rounded px-3 py-1 text-sm"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="logins"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  name="Logins"
                />
                <Line
                  type="monotone"
                  dataKey="incidents"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                  name="Incidents"
                />
                <Line
                  type="monotone"
                  dataKey="trainings"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  name="Trainings"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Role Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
            <CardDescription>Current user roles breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {roleDistribution.map((role, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-300">{role.name}</span>
                  <span className="text-gray-400">{role.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activities</CardTitle>
            <CardDescription>Latest system events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "warning"
                          ? "bg-yellow-500"
                          : activity.status === "pending"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-100">{activity.message}</p>
                    <p className="text-xs text-gray-400">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health Status</CardTitle>
            <CardDescription>Real-time system component monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((component, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {component.status === "healthy" ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : component.status === "warning" ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-100">{component.component}</p>
                      <p className="text-xs text-gray-400">Last check: {component.lastCheck}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-100">{component.uptime}</p>
                    <p
                      className={`text-xs ${
                        component.status === "healthy"
                          ? "text-green-400"
                          : component.status === "warning"
                            ? "text-yellow-400"
                            : "text-red-400"
                      }`}
                    >
                      {component.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Administrative Actions</CardTitle>
          <CardDescription>Common administrative tasks and system management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
              <Shield className="h-6 w-6 mb-2" />
              <span className="text-sm">Security Settings</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
              <Settings className="h-6 w-6 mb-2" />
              <span className="text-sm">System Config</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
              <TrendingUp className="h-6 w-6 mb-2" />
              <span className="text-sm">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
