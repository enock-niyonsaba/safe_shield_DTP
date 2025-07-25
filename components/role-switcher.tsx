"use client"

import { ChevronDown, Shield, Eye, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"

const roleIcons = {
  Admin: Shield,
  Analyst: BarChart3,
  Observer: Eye,
}

export function RoleSwitcher() {
  const { currentRole, switchRole } = useAuth()

  const CurrentIcon = roleIcons[currentRole as keyof typeof roleIcons] || Shield

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <CurrentIcon className="mr-2 h-4 w-4" />
          {currentRole}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchRole("Admin")}>
          <Shield className="mr-2 h-4 w-4" />
          Admin
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchRole("Analyst")}>
          <BarChart3 className="mr-2 h-4 w-4" />
          Analyst
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchRole("Observer")}>
          <Eye className="mr-2 h-4 w-4" />
          Observer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
