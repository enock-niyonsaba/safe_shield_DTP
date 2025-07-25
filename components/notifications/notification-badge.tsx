"use client"

import type React from "react"
import { useNotifications } from "@/contexts/notification-context"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NotificationBadgeProps {
  showCount?: boolean
  showIcon?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  showCount = true,
  showIcon = true,
  variant = "ghost",
  size = "icon",
}) => {
  const { unreadCount } = useNotifications()

  if (unreadCount === 0 && !showIcon) {
    return null
  }

  return (
    <Link href="/notifications">
      <Button variant={variant} size={size} className="relative">
        {showIcon && <Bell className="h-5 w-5" />}
        {showCount && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
        {!showIcon && unreadCount > 0 && (
          <span className="text-sm font-medium">
            {unreadCount} {unreadCount === 1 ? "notification" : "notifications"}
          </span>
        )}
      </Button>
    </Link>
  )
}
