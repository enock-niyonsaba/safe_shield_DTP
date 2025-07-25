"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import {
  BarChart3,
  Shield,
  AlertTriangle,
  FileText,
  Users,
  Settings,
  BookOpen,
  MessageSquare,
  Bell,
  Eye,
  Activity,
  Database,
  Wrench,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Incidents",
    href: "/incidents",
    icon: AlertTriangle,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Account Approvals",
    href: "/admin/account-approvals",
    icon: Shield,
  },
  {
    title: "Activity Logs",
    href: "/admin/activity-logs",
    icon: Activity,
  },
  {
    title: "System Logs",
    href: "/logs",
    icon: Database,
  },
  {
    title: "Tools",
    href: "/tools",
    icon: Wrench,
  },
  {
    title: "Training",
    href: "/training",
    icon: BookOpen,
  },
  {
    title: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

const analystNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Incidents",
    href: "/incidents",
    icon: AlertTriangle,
  },
  {
    title: "Report Incident",
    href: "/report-incident",
    icon: FileText,
  },
  {
    title: "System Logs",
    href: "/logs",
    icon: Database,
  },
  {
    title: "Tools",
    href: "/tools",
    icon: Wrench,
  },
  {
    title: "Training",
    href: "/training",
    icon: BookOpen,
  },
  {
    title: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
]

const observerNavItems = [
  {
    title: "Dashboard",
    href: "/observer",
    icon: Eye,
  },
  {
    title: "Report Incident",
    href: "/report-incident",
    icon: FileText,
  },
  {
    title: "My Reports",
    href: "/observer/reports",
    icon: AlertTriangle,
  },
  {
    title: "Training",
    href: "/training",
    icon: BookOpen,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
]

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { currentRole } = useAuth()

  const getNavItems = () => {
    switch (currentRole) {
      case "Admin":
        return adminNavItems
      case "Analyst":
        return analystNavItems
      case "Observer":
        return observerNavItems
      default:
        return analystNavItems
    }
  }

  const navItems = getNavItems()

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Safe Shield</h2>
          </div>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === item.href ? "text-white bg-white/10" : "text-zinc-400",
                )}
              >
                <div className="flex items-center flex-1">
                  <item.icon className={cn("h-5 w-5 mr-3")} />
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
