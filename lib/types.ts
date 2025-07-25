export interface User {
  id: string
  email: string
  name: string
  role: "Admin" | "Analyst" | "Observer"
}

export interface Incident {
  id: string
  title: string
  type: "SQL Injection" | "Phishing" | "Malware" | "DDoS" | "Data Breach" | "Unauthorized Access"
  severity: "Low" | "Medium" | "High" | "Critical"
  status: "Open" | "Investigating" | "Resolved"
  description: string
  reporter: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
  toolsUsed: string[]
  evidence: string[]
  timeline: TimelineEvent[]
}

export interface TimelineEvent {
  id: string
  timestamp: string
  action: string
  description: string
  user: string
}

export interface SystemLog {
  id: string
  timestamp: string
  severity: "Info" | "Warning" | "Error" | "Critical"
  source: string
  sourceIP: string
  action: string
  description: string
}

export interface Tool {
  id: string
  name: string
  description: string
  screenshot?: string
  usedInIncident: string
  impact: string
}

export interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: string
  incidentId?: string
}
