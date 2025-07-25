"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getWebSocketService } from "@/lib/websocket-service"

export interface Notification {
  id: string
  type: "incident" | "approval" | "system" | "security" | "training"
  title: string
  message: string
  timestamp: string
  priority: "high" | "medium" | "low"
  unread: boolean
  relatedLink?: string
  sender: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isConnected, setIsConnected] = useState(false)

  // Calculate unread count
  const unreadCount = notifications.filter((n) => n.unread).length

  // Add a new notification
  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev])

    // Play sound for high priority notifications
    if (notification.priority === "high" && typeof window !== "undefined") {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3")
      audio.play().catch((err) => console.error("Failed to play notification sound:", err))
    }

    // Show browser notification if supported and permission granted
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.message,
        icon: "/favicon.ico",
      })
    }
  }

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, unread: false } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, unread: false })))
  }

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([])
  }

  // Connect to WebSocket when component mounts
  useEffect(() => {
    if (typeof window === "undefined") return

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }

    const wsService = getWebSocketService()
    if (!wsService) return

    wsService.connect()
    setIsConnected(true)

    // Subscribe to notification events
    const unsubscribe = wsService.subscribe<Notification>("notification", (data) => {
      addNotification(data)
    })

    // Cleanup on unmount
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
