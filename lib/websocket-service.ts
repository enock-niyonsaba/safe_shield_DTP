// WebSocket service for handling real-time notifications
class WebSocketService {
  private socket: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectTimeout: NodeJS.Timeout | null = null
  private listeners: Map<string, Set<(data: any) => void>> = new Map()
  private url: string

  constructor(url: string) {
    this.url = url
  }

  connect() {
    if (this.socket?.readyState === WebSocket.OPEN) return

    try {
      this.socket = new WebSocket(this.url)

      this.socket.onopen = () => {
        console.log("WebSocket connection established")
        this.reconnectAttempts = 0
      }

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.handleMessage(data)
        } catch (error) {
          console.error("Error parsing WebSocket message:", error)
        }
      }

      this.socket.onclose = () => {
        console.log("WebSocket connection closed")
        this.attemptReconnect()
      }

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error)
        this.socket?.close()
      }
    } catch (error) {
      console.error("Failed to connect to WebSocket:", error)
      this.attemptReconnect()
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log("Max reconnect attempts reached")
      return
    }

    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 30000)
    console.log(`Attempting to reconnect in ${delay}ms`)

    this.reconnectTimeout = setTimeout(() => {
      this.reconnectAttempts++
      this.connect()
    }, delay)
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    this.listeners.clear()
  }

  subscribe<T>(event: string, callback: (data: T) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)?.add(callback as (data: any) => void)

    return () => {
      this.listeners.get(event)?.delete(callback as (data: any) => void)
      if (this.listeners.get(event)?.size === 0) {
        this.listeners.delete(event)
      }
    }
  }

  private handleMessage(data: { type: string; payload: any }) {
    const { type, payload } = data

    if (this.listeners.has(type)) {
      this.listeners.get(type)?.forEach((callback) => {
        callback(payload)
      })
    }
  }

  send(type: string, payload: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }))
    } else {
      console.error("WebSocket is not connected")
    }
  }
}

// Singleton instance
let websocketService: WebSocketService | null = null

export const getWebSocketService = () => {
  if (typeof window === "undefined") return null

  if (!websocketService) {
    // Use secure WebSocket in production
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    const host = process.env.NEXT_PUBLIC_WS_HOST || window.location.host
    const wsUrl = `${protocol}//${host}/api/ws`

    websocketService = new WebSocketService(wsUrl)
  }

  return websocketService
}
