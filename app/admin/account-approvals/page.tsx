"use client"

import { useState } from "react"
import { Check, X, Clock, User, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const pendingAccounts = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Analyst",
    department: "IT Security",
    requestedAt: "2024-01-15T10:30:00Z",
    manager: "Mike Chen",
  },
  {
    id: "2",
    name: "David Rodriguez",
    email: "david.rodriguez@company.com",
    role: "Observer",
    department: "Network Operations",
    requestedAt: "2024-01-15T09:15:00Z",
    manager: "Lisa Wang",
  },
  {
    id: "3",
    name: "Emily Carter",
    email: "emily.carter@company.com",
    role: "Analyst",
    department: "Cybersecurity",
    requestedAt: "2024-01-14T16:45:00Z",
    manager: "John Smith",
  },
]

export default function AccountApprovalsPage() {
  const [accounts, setAccounts] = useState(pendingAccounts)

  const handleApprove = (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id))
    // Handle approval logic
    console.log(`Approved account ${id}`)
  }

  const handleReject = (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id))
    // Handle rejection logic
    console.log(`Rejected account ${id}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Account Approvals</h1>
        <p className="text-gray-400 mt-2">Review and approve pending user account requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-yellow-900/20 border-yellow-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-300">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-100">{accounts.length}</div>
            <p className="text-xs text-yellow-400 mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="bg-green-900/20 border-green-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-300">Approved Today</CardTitle>
            <Check className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-100">5</div>
            <p className="text-xs text-green-400 mt-1">Accounts activated</p>
          </CardContent>
        </Card>

        <Card className="bg-red-900/20 border-red-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-300">Rejected</CardTitle>
            <X className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-100">2</div>
            <p className="text-xs text-red-400 mt-1">This week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Account Requests</CardTitle>
          <CardDescription>Review employee account requests for Safe Shield access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accounts.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No pending account requests</p>
              </div>
            ) : (
              accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-800/30"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-100">{account.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{account.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(account.requestedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>Role: {account.role}</span>
                        <span>Department: {account.department}</span>
                        <span>Manager: {account.manager}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-400 border-red-700 hover:bg-red-900/30 bg-transparent"
                      onClick={() => handleReject(account.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(account.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
