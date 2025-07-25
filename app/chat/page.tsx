"use client"

import type React from "react"

import { useState } from "react"
import { Send, Hash, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const channels = [
  { id: "general", name: "general", type: "channel" },
  { id: "incidents", name: "incidents", type: "channel" },
  { id: "INC-001", name: "INC-001", type: "incident" },
  { id: "INC-002", name: "INC-002", type: "incident" },
]

const messages = [
  {
    id: "1",
    user: "Alice Johnson",
    message: "Just submitted INC-001 for the SQL injection attempt. Bob, can you take a look?",
    timestamp: "2024-01-15T14:30:00Z",
    channel: "incidents",
  },
  {
    id: "2",
    user: "Bob Smith",
    message: "On it! I'll start the investigation right away.",
    timestamp: "2024-01-15T14:32:00Z",
    channel: "incidents",
  },
  {
    id: "3",
    user: "Carol Davis",
    message: "I've seen similar patterns in our logs. Let me know if you need help with the analysis.",
    timestamp: "2024-01-15T14:35:00Z",
    channel: "incidents",
  },
  {
    id: "4",
    user: "Bob Smith",
    message: "Thanks Carol! I've identified the attack vector. Implementing containment measures now.",
    timestamp: "2024-01-15T14:45:00Z",
    channel: "incidents",
  },
]

export default function TeamChatPage() {
  const [selectedChannel, setSelectedChannel] = useState("incidents")
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const filteredMessages = messages.filter((msg) => msg.channel === selectedChannel)

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-gray-100">Team Chat</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">CHANNELS</h3>
              <div className="space-y-1">
                {channels
                  .filter((ch) => ch.type === "channel")
                  .map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`w-full flex items-center space-x-2 px-2 py-1 rounded text-left ${
                        selectedChannel === channel.id ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <Hash className="h-4 w-4" />
                      <span>{channel.name}</span>
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">INCIDENT THREADS</h3>
              <div className="space-y-1">
                {channels
                  .filter((ch) => ch.type === "incident")
                  .map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`w-full flex items-center space-x-2 px-2 py-1 rounded text-left ${
                        selectedChannel === channel.id ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>{channel.name}</span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Users className="h-4 w-4" />
            <span>4 members online</span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center space-x-2">
            {selectedChannel.startsWith("INC-") ? (
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            ) : (
              <Hash className="h-5 w-5 text-gray-400" />
            )}
            <h2 className="text-lg font-semibold text-gray-100">
              {selectedChannel.startsWith("INC-") ? `Incident ${selectedChannel}` : `#${selectedChannel}`}
            </h2>
          </div>
          {selectedChannel.startsWith("INC-") && (
            <p className="text-sm text-gray-400 mt-1">Discussion thread for incident {selectedChannel}</p>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredMessages.map((message) => (
            <div key={message.id} className="flex space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {message.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-100">{message.user}</span>
                  <span className="text-xs text-gray-400">{new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-gray-300 mt-1">{message.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-700">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              placeholder={`Message ${selectedChannel.startsWith("INC-") ? selectedChannel : `#${selectedChannel}`}`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
