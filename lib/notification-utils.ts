import { broadcast } from "@/app/api/ws/route"

type NotificationType = "incident" | "approval" | "system" | "security" | "training"
type NotificationPriority = "high" | "medium" | "low"

interface SendNotificationOptions {
  type: NotificationType
  title: string
  message: string
  priority: NotificationPriority
  relatedLink?: string
  sender: string
}

export function sendNotification(options: SendNotificationOptions) {
  const notification = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    unread: true,
    ...options,
  }

  // Broadcast to all connected clients
  broadcast({
    type: "notification",
    payload: notification,
  })

  return notification
}

// Helper functions for common notification types
export const notifyIncident = (
  title: string,
  message: string,
  priority: NotificationPriority = "high",
  incidentId?: string,
) => {
  return sendNotification({
    type: "incident",
    title,
    message,
    priority,
    relatedLink: incidentId ? `/incidents/${incidentId}` : undefined,
    sender: "Security System",
  })
}

export const notifyApproval = (title: string, message: string) => {
  return sendNotification({
    type: "approval",
    title,
    message,
    priority: "medium",
    relatedLink: "/admin/account-approvals",
    sender: "User Management",
  })
}

export const notifySystem = (title: string, message: string, priority: NotificationPriority = "low") => {
  return sendNotification({
    type: "system",
    title,
    message,
    priority,
    sender: "System",
  })
}

export const notifyTraining = (title: string, message: string, trainingPath?: string) => {
  return sendNotification({
    type: "training",
    title,
    message,
    priority: "low",
    relatedLink: trainingPath ? `/training/${trainingPath}` : "/training",
    sender: "Training System",
  })
}

export const notifySecurity = (title: string, message: string, priority: NotificationPriority = "medium") => {
  return sendNotification({
    type: "security",
    title,
    message,
    priority,
    sender: "Security Team",
  })
}
