"use client"

import { useState } from "react"
import {
  Bell,
  Filter,
  Search,
  ExternalLink,
  Trash2,
  BookMarkedIcon as MarkAsRead,
  AlertTriangle,
  CheckCircle,
  Info,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    type: "incident",
    title: "Critical Incident Escalated",
    message: "SQL Injection attempt on web server requires immediate attention",
    timestamp: "2024-01-16T10:30:00Z",
    unread: true,
    priority: "high",
    relatedLink: "/incidents/INC-052",
    sender: "Security System",
  },
  {
    id: 2,
    type: "approval",
    title: "Account Approval Request",
    message: "New user Sarah Johnson awaiting admin approval",
    timestamp: "2024-01-16T09:15:00Z",
    unread: true,
    priority: "medium",
    relatedLink: "/admin/account-approvals",
    sender: "User Management",
  },
  {
    id: 3,
    type: "system",
    title: "System Maintenance Scheduled",
    message: "Scheduled maintenance tonight at 2:00 AM EST for security updates",
    timestamp: "2024-01-16T08:00:00Z",
    unread: false,
    priority: "low",
    relatedLink: "/admin/maintenance",
    sender: "System Administrator",
  },
  {
    id: 4,
    type: "training",
    title: "Training Module Completed",
    message: "15 team members completed Advanced Threat Hunting training",
    timestamp: "2024-01-15T16:45:00Z",
    unread: false,
    priority: "low",
    relatedLink: "/training/threat-hunting",
    sender: "Training System",
  },
  {
    id: 5,
    type: "incident",
    title: "Incident Status Update",
    message: "INC-048 investigation completed - Network anomaly resolved",
    timestamp: "2024-01-15T14:20:00Z",
    unread: false,
    priority: "medium",
    relatedLink: "/incidents/INC-048",
    sender: "Mike Chen",
  },
  {
    id: 6,
    type: "security",
    title: "Security Policy Updated",
    message: "Password policy requirements have been updated",
    timestamp: "2024-01-15T11:30:00Z",
    unread: true,
    priority: "medium",
    relatedLink: "/policies/password",
    sender: "Security Team",
  },
  {
    id: 7,
    type: "system",
    title: "Backup Completed Successfully",
    message: "Daily system backup completed at 3:00 AM",
    timestamp: "2024-01-15T03:00:00Z",
    unread: false,
    priority: "low",
    relatedLink: "/admin/backups",
    sender: "Backup System",
  },
  {
    id: 8,
    type: "incident",
    title: "New Incident Reported",
    message: "Phishing email reported by Emily Johnson",
    timestamp: "2024-01-14T17:15:00Z",
    unread: false,
    priority: "medium",
    relatedLink: "/incidents/INC-049",
    sender: "Emily Johnson",
  },
]

const notificationStats = [
  {
    title: "Unread Notifications",
    value: notifications.filter((n) => n.unread).length.toString(),
    icon: Bell,
    color: "text-blue-400",
  },
  {
    title: "High Priority",
    value: notifications.filter((n) => n.priority === "high").length.toString(),
    icon: AlertTriangle,
    color: "text-red-400",
  },
  {
    title: "This Week",
    value: "12",
    icon: CheckCircle,
    color: "text-green-400",
  },
  {
    title: "Total",
    value: notifications.length.toString(),
    icon: Info,
    color: "text-gray-400",
  },
]

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !typeFilter || notification.type === typeFilter
    const matchesPriority = !priorityFilter || notification.priority === priorityFilter
    const matchesUnread = !unreadOnly || notification.unread
    return matchesSearch && matchesType && matchesPriority && matchesUnread
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "incident":
        return AlertTriangle
      case "approval":
        return Users
      case "training":
        return CheckCircle
      case "security":
        return Bell
      default:
        return Info
    }
  }

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === "high") return "text-red-400"
    switch (type) {
      case "incident":
        return "text-red-400"
      case "approval":
        return "text-blue-400"
      case "training":
        return "text-green-400"
      case "security":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const toggleNotificationSelection = (id: number) => {
    setSelectedNotifications((prev) => (prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]))
  }

  const markAsRead = (ids: number[]) => {
    // Implementation for marking notifications as read
    console.log("Marking as read:", ids)
  }

  const deleteNotifications = (ids: number[]) => {
    // Implementation for deleting notifications
    console.log("Deleting notifications:", ids)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Notifications</h1>
          <p className="text-gray-400 mt-2">Manage your system notifications and alerts</p>
        </div>
        <div className="flex space-x-2">
          {selectedNotifications.length > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={() => markAsRead(selectedNotifications)}>
                <MarkAsRead className="h-4 w-4 mr-2" />
                Mark as Read
              </Button>
              <Button variant="outline" size="sm" onClick={() => deleteNotifications(selectedNotifications)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </>
          )}
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {notificationStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search notifications..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex h-10 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="incident">Incidents</option>
              <option value="approval">Approvals</option>
              <option value="training">Training</option>
              <option value="security">Security</option>
              <option value="system">System</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="flex h-10 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={unreadOnly}
                onChange={(e) => setUnreadOnly(e.target.checked)}
                className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-300">Unread only</span>
            </label>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setTypeFilter("")
                setPriorityFilter("")
                setUnreadOnly(false)
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>
            {filteredNotifications.length} of {notifications.length} notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type)
              const iconColor = getNotificationColor(notification.type, notification.priority)

              return (
                <div
                  key={notification.id}
                  className={`border border-gray-700 rounded-lg p-4 transition-colors hover:bg-gray-800/50 ${
                    notification.unread ? "bg-blue-900/10 border-blue-800" : ""
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => toggleNotificationSelection(notification.id)}
                      className="mt-1 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                    <div
                      className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`h-5 w-5 ${iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium ${notification.unread ? "text-gray-100" : "text-gray-300"}`}>
                          {notification.title}
                          {notification.unread && (
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                          )}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              notification.priority === "high"
                                ? "bg-red-900/30 text-red-400"
                                : notification.priority === "medium"
                                  ? "bg-yellow-900/30 text-yellow-400"
                                  : "bg-gray-700 text-gray-400"
                            }`}
                          >
                            {notification.priority}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(notification.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">From: {notification.sender}</span>
                        {notification.relatedLink && (
                          <Link href={notification.relatedLink}>
                            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
