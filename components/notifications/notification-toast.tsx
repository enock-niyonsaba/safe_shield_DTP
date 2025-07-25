"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { X, AlertTriangle, Info, CheckCircle, Bell, Users } from "lucide-react"
import { useNotifications } from "@/contexts/notification-context"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

export const NotificationToast: React.FC = () => {
  const { notifications, markAsRead } = useNotifications()
  const [visibleNotifications, setVisibleNotifications] = useState<string[]>([])

  // Show new unread notifications as toasts
  useEffect(() => {
    const newUnread = notifications.filter((n) => n.unread && !visibleNotifications.includes(n.id)).map((n) => n.id)

    if (newUnread.length > 0) {
      setVisibleNotifications((prev) => [...prev, ...newUnread])

      // Auto-hide notifications after 5 seconds
      newUnread.forEach((id) => {
        setTimeout(() => {
          setVisibleNotifications((prev) => prev.filter((notifId) => notifId !== id))
        }, 5000)
      })
    }
  }, [notifications])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "incident":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      case "approval":
        return <Users className="h-5 w-5 text-blue-400" />
      case "training":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "security":
        return <Bell className="h-5 w-5 text-yellow-400" />
      default:
        return <Info className="h-5 w-5 text-gray-400" />
    }
  }

  const handleClose = (id: string) => {
    setVisibleNotifications((prev) => prev.filter((notifId) => notifId !== id))
    markAsRead(id)
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {notifications
          .filter((notification) => visibleNotifications.includes(notification.id))
          .map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className={`
                rounded-lg shadow-lg border p-4 backdrop-blur-md
                ${
                  notification.priority === "high"
                    ? "bg-red-900/80 border-red-700"
                    : notification.priority === "medium"
                      ? "bg-gray-800/80 border-gray-700"
                      : "bg-gray-800/70 border-gray-700"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                    <button onClick={() => handleClose(notification.id)} className="text-gray-400 hover:text-white">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">{notification.message}</p>
                  {notification.relatedLink && (
                    <Link
                      href={notification.relatedLink}
                      className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block"
                      onClick={() => markAsRead(notification.id)}
                    >
                      View details
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  )
}
