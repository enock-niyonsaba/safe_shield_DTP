"use client"

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
  LineChart,
  Line,
} from "recharts"
import { Users, Award, TrendingUp, Shield, Clock, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const departmentData = [
  { name: "SOC Team", value: 35, color: "#3b82f6", members: 12, incidents: 45 },
  { name: "Network Security", value: 25, color: "#10b981", members: 8, incidents: 28 },
  { name: "IT Security", value: 20, color: "#f59e0b", members: 6, incidents: 22 },
  { name: "Compliance", value: 12, color: "#8b5cf6", members: 4, incidents: 15 },
  { name: "Management", value: 8, color: "#ef4444", members: 3, incidents: 8 },
]

const championData = [
  { department: "SOC Team", champions: 8, certifications: 15, trainings: 24 },
  { department: "Network Security", champions: 5, certifications: 12, trainings: 18 },
  { department: "IT Security", champions: 4, certifications: 8, trainings: 16 },
  { department: "Compliance", champions: 3, certifications: 6, trainings: 12 },
  { department: "Management", champions: 2, certifications: 4, trainings: 8 },
]

const performanceData = [
  { month: "Jan", incidents: 28, resolved: 26, avgTime: 2.4 },
  { month: "Feb", incidents: 32, resolved: 30, avgTime: 2.1 },
  { month: "Mar", incidents: 25, resolved: 24, avgTime: 1.8 },
  { month: "Apr", incidents: 35, resolved: 33, avgTime: 2.2 },
  { month: "May", incidents: 29, resolved: 28, avgTime: 1.9 },
  { month: "Jun", incidents: 31, resolved: 30, avgTime: 1.7 },
]

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "SOC Manager",
    department: "SOC Team",
    certifications: ["CISSP", "GCIH", "GCFA"],
    incidentsHandled: 15,
    responseTime: "1.2h",
    status: "online",
  },
  {
    name: "Mike Rodriguez",
    role: "Senior Analyst",
    department: "SOC Team",
    certifications: ["GSEC", "GCDA"],
    incidentsHandled: 23,
    responseTime: "1.8h",
    status: "online",
  },
  {
    name: "Emily Johnson",
    role: "Network Security Specialist",
    department: "Network Security",
    certifications: ["CCNA Security", "GSEC"],
    incidentsHandled: 12,
    responseTime: "2.1h",
    status: "away",
  },
  {
    name: "David Kim",
    role: "Threat Hunter",
    department: "SOC Team",
    certifications: ["GNFA", "GCTI"],
    incidentsHandled: 18,
    responseTime: "1.5h",
    status: "online",
  },
]

export default function TeamSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Team & Community Engagement</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Track team participation, performance metrics, and recognize cybersecurity champions across our organization
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Team Members</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100">33</div>
              <p className="text-xs text-green-400 mt-1">+2 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Security Champions</CardTitle>
              <Award className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100">22</div>
              <p className="text-xs text-blue-400 mt-1">67% of team</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100">1.8h</div>
              <p className="text-xs text-green-400 mt-1">-0.3h improvement</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Training Completion</CardTitle>
              <Target className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100">94%</div>
              <p className="text-xs text-purple-400 mt-1">Above target</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Department Participation */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-400" />
                Department Distribution
              </CardTitle>
              <CardDescription className="text-gray-400">Team members by security department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {departmentData.map((dept, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-300">{dept.name}</span>
                    <span className="text-gray-400">{dept.members} members</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Champions */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center">
                <Award className="mr-2 h-5 w-5 text-yellow-400" />
                Security Champions
              </CardTitle>
              <CardDescription className="text-gray-400">Certified professionals and training leaders</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={championData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="department" stroke="#9ca3af" fontSize={10} />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="champions" fill="#fbbf24" name="Champions" />
                  <Bar dataKey="certifications" fill="#3b82f6" name="Certifications" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
                Performance Trends
              </CardTitle>
              <CardDescription className="text-gray-400">Monthly incident resolution metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
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
                    dataKey="incidents"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    name="Incidents"
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    name="Resolved"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Team Members */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-100">Team Members</CardTitle>
            <CardDescription className="text-gray-400">
              Current security team roster and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-100">{member.name}</h4>
                        <p className="text-sm text-gray-400">{member.role}</p>
                      </div>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        member.status === "online"
                          ? "bg-green-500"
                          : member.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      }`}
                    ></div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Department:</span>
                      <span className="text-gray-300">{member.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Incidents Handled:</span>
                      <span className="text-gray-300">{member.incidentsHandled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Response Time:</span>
                      <span className="text-gray-300">{member.responseTime}</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-gray-400 text-xs">Certifications:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.certifications.map((cert, idx) => (
                          <span key={idx} className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Achievements */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-700">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-100 mb-2">Zero Breach Record</h3>
              <p className="text-blue-400 text-2xl font-bold mb-2">18 Months</p>
              <p className="text-sm text-gray-400">Consecutive months without major security breach</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/20 to-green-800/20 border-green-700">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-100 mb-2">SLA Achievement</h3>
              <p className="text-green-400 text-2xl font-bold mb-2">98.5%</p>
              <p className="text-sm text-gray-400">Incident response SLA compliance rate</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/20 to-purple-800/20 border-purple-700">
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-100 mb-2">Team Recognition</h3>
              <p className="text-purple-400 text-2xl font-bold mb-2">5 Awards</p>
              <p className="text-sm text-gray-400">Industry recognition and certifications earned</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
