"use client"

import { Bell, User, LogOut, UserCheck, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminHeader() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1" />

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* Admin-specific menu items */}
          <Link href="/admin/account-approvals">
            <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
              <UserCheck className="h-4 w-4 mr-2" />
              Account Approvals
            </Button>
          </Link>

          <Link href="/admin/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-gray-300">Admin User</span>
          </div>

          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
