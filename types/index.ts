export interface User {
  id: string;
  email: string;
  role: 'Admin' | 'Analyst' | 'Observer';
  name: string;
  avatar?: string;
}

export interface Incident {
  id: string;
  title: string;
  type: 'SQL Injection' | 'Phishing' | 'Malware' | 'DDoS' | 'Data Breach' | 'Insider Threat';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Investigating' | 'Contained' | 'Resolved' | 'Closed';
  description: string;
  reporter: string;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  toolsUsed: Tool[];
  evidence: Evidence[];
  timeline: TimelineEvent[];
}

export interface Tool {
  id: string;
  name: 'Nmap' | 'Metasploit' | 'Nikto' | 'ZAP' | 'Burp Suite' | 'Wireshark' | 'Volatility' | 'Splunk';
  description: string;
  screenshot?: string;
  impact: string;
}

export interface Evidence {
  id: string;
  type: 'image' | 'document' | 'log';
  name: string;
  url: string;
  uploadedAt: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  action: string;
  description: string;
  user: string;
  type: 'detection' | 'containment' | 'eradication' | 'recovery' | 'analysis';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  severity: 'Info' | 'Warning' | 'Error' | 'Critical';
  source: string;
  sourceIP: string;
  action: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  incidentId?: string;
}

export interface DashboardStats {
  totalIncidents: number;
  activeIncidents: number;
  resolvedIncidents: number;
  criticalIncidents: number;
  averageResponseTime: string;
}