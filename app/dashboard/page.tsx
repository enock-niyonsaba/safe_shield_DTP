'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Activity,
  Users,
  FileText
} from 'lucide-react';

const stats = [
  {
    name: 'Total Incidents',
    value: '47',
    change: '+12%',
    changeType: 'increase',
    icon: FileText,
    color: 'text-blue-400'
  },
  {
    name: 'Active Incidents',
    value: '8',
    change: '-3',
    changeType: 'decrease',
    icon: AlertTriangle,
    color: 'text-yellow-400'
  },
  {
    name: 'Resolved Today',
    value: '12',
    change: '+5',
    changeType: 'increase',
    icon: CheckCircle,
    color: 'text-green-400'
  },
  {
    name: 'Critical Incidents',
    value: '2',
    change: 'Stable',
    changeType: 'neutral',
    icon: Shield,
    color: 'text-red-400'
  }
];

const recentIncidents = [
  {
    id: 'INC-2024-001',
    title: 'Suspicious SQL Injection Attempt',
    type: 'SQL Injection',
    severity: 'High',
    status: 'Investigating',
    reporter: 'John Doe',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'INC-2024-002',
    title: 'Phishing Email Campaign Detected',
    type: 'Phishing',
    severity: 'Medium',
    status: 'Contained',
    reporter: 'Jane Smith',
    createdAt: '2024-01-15T09:15:00Z'
  },
  {
    id: 'INC-2024-003',
    title: 'Malware Detection on Workstation',
    type: 'Malware',
    severity: 'Critical',
    status: 'Open',
    reporter: 'Mike Johnson',
    createdAt: '2024-01-15T08:45:00Z'
  },
  {
    id: 'INC-2024-004',
    title: 'DDoS Attack on Web Server',
    type: 'DDoS',
    severity: 'High',
    status: 'Resolved',
    reporter: 'Sarah Wilson',
    createdAt: '2024-01-14T16:22:00Z'
  }
];

const getSeverityBadge = (severity: string) => {
  const variants = {
    'Low': 'info',
    'Medium': 'warning',
    'High': 'danger',
    'Critical': 'danger'
  } as const;
  
  return <Badge variant={variants[severity as keyof typeof variants] || 'default'}>{severity}</Badge>;
};

const getStatusBadge = (status: string) => {
  const variants = {
    'Open': 'danger',
    'Investigating': 'warning',
    'Contained': 'info',
    'Resolved': 'success',
    'Closed': 'default'
  } as const;
  
  return <Badge variant={variants[status as keyof typeof variants] || 'default'}>{status}</Badge>;
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Security Dashboard</h1>
          <p className="text-gray-400">Monitor and manage cybersecurity incidents in real-time</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.name} variant="cyber" className="scan-line">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${
                      stat.changeType === 'increase' ? 'text-green-400' : 
                      stat.changeType === 'decrease' ? 'text-red-400' : 
                      'text-gray-400'
                    }`}>
                      {stat.change} from last week
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Incidents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-[var(--cyber-blue)]" />
                Recent Incidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIncidents.map((incident) => (
                  <div key={incident.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-mono text-[var(--cyber-blue)]">{incident.id}</span>
                        {getSeverityBadge(incident.severity)}
                      </div>
                      <h4 className="font-medium text-white text-sm">{incident.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {incident.type} • Reported by {incident.reporter}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(incident.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-[var(--matrix-green)]" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Network Security</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      <span className="text-sm text-green-400">Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Firewall Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      <span className="text-sm text-green-400">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">IDS/IPS</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                      <span className="text-sm text-yellow-400">Monitoring</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Backup Systems</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      <span className="text-sm text-green-400">Online</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="text-sm font-medium text-white mb-3">Response Time Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Average Response</span>
                      <span className="text-white font-mono">4.2 min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Resolution Rate</span>
                      <span className="text-green-400 font-mono">94.7%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">SLA Compliance</span>
                      <span className="text-green-400 font-mono">98.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}