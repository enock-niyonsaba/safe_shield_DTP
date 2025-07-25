import type { NextRequest } from "next/server"
import { WebSocketServer } from "ws"

// Store active connections
const clients = new Set<WebSocket>()

// Mock data for demonstration
const mockIncidents = [
  { id: "INC-053", title: "SQL Injection Attempt", severity: "high" },
  { id: "INC-054", title: "Unusual Login Activity", severity: "medium" },
  { id: "INC-055", title: "Failed Authentication", severity: "low" },
]

const mockUsers = [
  { id: "USR-001", name: "Alice Johnson", role: "Analyst" },
  { id: "USR-002", name: "Bob Smith", role: "Observer" },
  { id: "USR-003", name: "Carol Davis", role: "Admin" },
]

// Initialize WebSocket server (only once)
let wss: WebSocketServer

if (!wss) {
  wss = new WebSocketServer({ noServer: true })

  wss.on("connection", (ws) => {
    clients.add(ws)
    console.log(`Client connected. Total connections: ${clients.size}`)

    // Send welcome message
    ws.send(
      JSON.stringify({
        type: "notification",
        payload: {
          id: `notif-${Date.now()}`,
          type: "system",
          title: "Connected to Safe Shield",
          message: "You are now receiving real-time security notifications",
          timestamp: new Date().toISOString(),
          priority: "low",
          unread: true,
          sender: "System",
        },
      }),
    )

    // Handle client messages
    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString())
        console.log("Received message:", data)

        // Handle specific message types
        if (data.type === "ping") {
          ws.send(JSON.stringify({ type: "pong", payload: { timestamp: Date.now() } }))
        }
      } catch (error) {
        console.error("Error processing message:", error)
      }
    })

    // Handle disconnection
    ws.on("close", () => {
      clients.delete(ws)
      console.log(`Client disconnected. Remaining connections: ${clients.size}`)
    })

    // Simulate random notifications
    simulateNotifications(ws)
  })
}

// Simulate periodic notifications for demo purposes
function simulateNotifications(ws: WebSocket) {
  // Random incident notification
  setTimeout(
    () => {
      if (ws.readyState === ws.OPEN) {
        const incident = mockIncidents[Math.floor(Math.random() * mockIncidents.length)]
        ws.send(
          JSON.stringify({
            type: "notification",
            payload: {
              id: `notif-${Date.now()}`,
              type: "incident",
              title: `New Incident: ${incident.title}`,
              message: `A ${incident.severity} severity incident has been detected and requires attention.`,
              timestamp: new Date().toISOString(),
              priority: incident.severity,
              unread: true,
              relatedLink: `/incidents/${incident.id}`,
              sender: "Security System",
            },
          }),
        )
      }
    },
    10000 + Math.random() * 20000,
  )

  // Random approval notification
  setTimeout(
    () => {
      if (ws.readyState === ws.OPEN) {
        const user = mockUsers[Math.floor(Math.random() * mockUsers.length)]
        ws.send(
          JSON.stringify({
            type: "notification",
            payload: {
              id: `notif-${Date.now()}`,
              type: "approval",
              title: "Account Approval Request",
              message: `${user.name} has requested access as ${user.role}`,
              timestamp: new Date().toISOString(),
              priority: "medium",
              unread: true,
              relatedLink: "/admin/account-approvals",
              sender: "User Management",
            },
          }),
        )
      }
    },
    30000 + Math.random() * 30000,
  )

  // Random system notification
  setTimeout(
    () => {
      if (ws.readyState === ws.OPEN) {
        ws.send(
          JSON.stringify({
            type: "notification",
            payload: {
              id: `notif-${Date.now()}`,
              type: "system",
              title: "System Update Available",
              message: "A new security update is available for installation",
              timestamp: new Date().toISOString(),
              priority: "low",
              unread: true,
              relatedLink: "/admin/updates",
              sender: "System Administrator",
            },
          }),
        )
      }
    },
    45000 + Math.random() * 30000,
  )
}

// Broadcast to all clients
function broadcast(message: any) {
  const data = JSON.stringify(message)
  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(data)
    }
  })
}

export async function GET(req: NextRequest) {
  // This is a WebSocket endpoint, so we need to upgrade the connection
  const { socket: res } = req as any

  if (!res) {
    return new Response("WebSocket server error", { status: 500 })
  }

  const upgradeHeader = req.headers.get("upgrade")
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 426 })
  }

  // Handle the WebSocket connection
  wss.handleUpgrade(req, res.socket, Buffer.alloc(0), (ws) => {
    wss.emit("connection", ws, req)
  })

  // Return a response that will never complete
  return new Response(null)
}

// Export broadcast function for use in other server components/routes
export { broadcast }
