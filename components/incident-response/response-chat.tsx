"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, User, Shield, Eye, Clock, CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface ChatMessage {
  id: string
  content: string
  userId: string
  userName: string
  userRole: "Admin" | "Analyst" | "Observer" | "Reporter"
  timestamp: string
  isSystem?: boolean
}

interface ResponseChatProps {
  incidentId: string
  userRole: "Admin" | "Analyst" | "Observer"
  isReporter?: boolean
}

export function ResponseChat({ incidentId, userRole, isReporter = false }: ResponseChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    loadMessages()
    setupRealtimeSubscription()

    return () => {
      // Cleanup subscription
    }
  }, [incidentId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = async () => {
    try {
      const { data: messages, error } = await supabase
        .from("incident_chat_messages")
        .select(`
          *,
          users:user_id (name, role)
        `)
        .eq("incident_id", incidentId)
        .order("created_at", { ascending: true })

      if (error) throw error

      const formattedMessages: ChatMessage[] = messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        userId: msg.user_id,
        userName: msg.users?.name || "Unknown User",
        userRole: msg.users?.role || "Observer",
        timestamp: msg.created_at,
        isSystem: msg.is_system || false,
      }))

      setMessages(formattedMessages)
    } catch (error) {
      console.error("Error loading messages:", error)
    }
  }

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel(`incident-chat-${incidentId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "incident_chat_messages",
          filter: `incident_id=eq.${incidentId}`,
        },
        (payload) => {
          const newMessage: ChatMessage = {
            id: payload.new.id,
            content: payload.new.content,
            userId: payload.new.user_id,
            userName: "New User", // Will be updated by loadMessages
            userRole: "Observer",
            timestamp: payload.new.created_at,
            isSystem: payload.new.is_system || false,
          }
          setMessages((prev) => [...prev, newMessage])
        },
      )
      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED")
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const { error } = await supabase.from("incident_chat_messages").insert({
        incident_id: incidentId,
        user_id: user.id,
        content: newMessage.trim(),
        is_system: false,
      })

      if (error) throw error

      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const sendSystemMessage = async (content: string) => {
    try {
      const { error } = await supabase.from("incident_chat_messages").insert({
        incident_id: incidentId,
        user_id: "system",
        content,
        is_system: true,
      })

      if (error) throw error
    } catch (error) {
      console.error("Error sending system message:", error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Shield className="h-3 w-3" />
      case "Analyst":
        return <User className="h-3 w-3" />
      case "Observer":
        return <Eye className="h-3 w-3" />
      case "Reporter":
        return <MessageSquare className="h-3 w-3" />
      default:
        return <User className="h-3 w-3" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "text-red-400"
      case "Analyst":
        return "text-blue-400"
      case "Observer":
        return "text-yellow-400"
      case "Reporter":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Response Communication
            </CardTitle>
            <CardDescription>Real-time chat for incident response coordination</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-xs text-gray-400">{isConnected ? "Connected" : "Disconnected"}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.isSystem ? "justify-center" : ""}`}>
                  {message.isSystem ? (
                    <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg px-3 py-2 max-w-md">
                      <div className="flex items-center gap-2 text-blue-400 text-sm">
                        <CheckCircle2 className="h-3 w-3" />
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ${getRoleColor(message.userRole)}`}
                        >
                          {getRoleIcon(message.userRole)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-200 text-sm">{message.userName}</span>
                          <Badge variant="outline" className="text-xs">
                            {message.userRole}
                          </Badge>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg px-3 py-2">
                          <p className="text-gray-200 text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <User className="h-3 w-3 text-gray-400" />
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t border-gray-700 p-4">
          <div className="flex gap-2">
            <Input
              placeholder={isReporter ? "Ask about the incident status..." : "Type your message..."}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              className="flex-1"
              disabled={!isConnected}
            />
            <Button onClick={sendMessage} disabled={!newMessage.trim() || !isConnected} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>
              {isReporter
                ? "Reporter view - read-only access to response progress"
                : "Press Enter to send, Shift+Enter for new line"}
            </span>
            <span>{messages.length} messages</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
