"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { notifyIncident, notifyApproval, notifySystem, notifyTraining, notifySecurity } from "@/lib/notification-utils"

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [notificationType, setNotificationType] = useState("incident")
  const [priority, setPriority] = useState("medium")
  const [status, setStatus] = useState<{ success?: boolean; message?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let result

      switch (notificationType) {
        case "incident":
          result = notifyIncident(title, message, priority as any)
          break
        case "approval":
          result = notifyApproval(title, message)
          break
        case "system":
          result = notifySystem(title, message, priority as any)
          break
        case "training":
          result = notifyTraining(title, message)
          break
        case "security":
          result = notifySecurity(title, message, priority as any)
          break
        default:
          throw new Error("Invalid notification type")
      }

      setStatus({ success: true, message: "Notification sent successfully!" })
      setTimeout(() => setStatus({}), 3000)
    } catch (error) {
      setStatus({ success: false, message: "Failed to send notification." })
    }
  }

  const sendTestNotification = (type: string) => {
    switch (type) {
      case "incident":
        notifyIncident(
          "Critical Security Incident",
          "A potential data breach has been detected in the customer database.",
          "high",
          "INC-056",
        )
        break
      case "approval":
        notifyApproval("New Account Request", "David Wilson has requested access as Security Analyst")
        break
      case "system":
        notifySystem("System Update Required", "Critical security patches are available for installation", "medium")
        break
      case "training":
        notifyTraining(
          "New Training Available",
          "Advanced Malware Analysis course is now available",
          "malware-analysis",
        )
        break
      case "security":
        notifySecurity("Security Policy Update", "Multi-factor authentication is now required for all users", "high")
        break
    }

    setStatus({ success: true, message: `Test ${type} notification sent!` })
    setTimeout(() => setStatus({}), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Notification Management</h1>
        <p className="text-gray-400 mt-2">Send and manage system-wide notifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Custom Notification</CardTitle>
              <CardDescription>Create and send a notification to all users</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400 block mb-1">Notification Type</label>
                    <select
                      value={notificationType}
                      onChange={(e) => setNotificationType(e.target.value)}
                      className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="incident">Incident</option>
                      <option value="approval">Approval</option>
                      <option value="system">System</option>
                      <option value="training">Training</option>
                      <option value="security">Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400 block mb-1">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-400 block mb-1">Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Notification title"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-400 block mb-1">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Notification message"
                    required
                    className="w-full min-h-[100px] rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Notification
                </Button>

                {status.message && (
                  <div
                    className={`p-3 rounded-md ${
                      status.success ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Notifications</CardTitle>
              <CardDescription>Send pre-configured test notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start border-red-800 hover:bg-red-900/20 bg-transparent"
                onClick={() => sendTestNotification("incident")}
              >
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Critical Incident Alert
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start border-blue-800 hover:bg-blue-900/20 bg-transparent"
                onClick={() => sendTestNotification("approval")}
              >
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Account Approval Request
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start border-gray-700 hover:bg-gray-800 bg-transparent"
                onClick={() => sendTestNotification("system")}
              >
                <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                System Update Required
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start border-green-800 hover:bg-green-900/20 bg-transparent"
                onClick={() => sendTestNotification("training")}
              >
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                New Training Available
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start border-yellow-800 hover:bg-yellow-900/20 bg-transparent"
                onClick={() => sendTestNotification("security")}
              >
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Security Policy Update
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
