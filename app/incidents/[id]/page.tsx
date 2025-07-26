'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Download,
  MessageSquare,
  Users
} from 'lucide-react';

// Mock data for the incident
const incidentData = {
  id: 'INC-2024-001',
  title: 'Suspicious SQL Injection Attempt',
  type: 'SQL Injection',
  severity: 'High',
  status: 'Investigating',
  description: 'Multiple SQL injection attempts detected on the customer portal login form. The attacks appear to be automated and are targeting user authentication bypass. Initial analysis shows attempts to extract user credentials and database schema information.',
  reporter: 'John Doe',
  assignee: 'Jane Smith',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T12:15:00Z',
  toolsUsed: [
    {
      id: '1',
      name: 'Burp Suite',
      description: 'Used for intercepting and analyzing HTTP requests to identify injection points',
      impact: 'Confirmed presence of SQL injection vulnerability'
    },
    {
      id: '2',
      name: 'Nmap',
      description: 'Port scanning to identify potential attack vectors',
      impact: 'Identified open database ports that may be targeted'
    },
    {
      id: '3',
      name: 'Splunk',
      description: 'Log analysis to track attack patterns and frequency',
      impact: 'Identified 47 injection attempts in the last 2 hours'
    }
  ],
  evidence: [
    { id: '1', type: 'image', name: 'burp-suite-analysis.png', url: '#' },
    { id: '2', type: 'log', name: 'access-logs.txt', url: '#' },
    { id: '3', type: 'document', name: 'vulnerability-report.pdf', url: '#' }
  ],
  timeline: [
    {
      id: '1',
      timestamp: '2024-01-15T10:30:00Z',
      action: 'Incident Detected',
      description: 'Automated monitoring system detected suspicious SQL queries',
      user: 'System',
      type: 'detection'
    },
    {
      id: '2',
      timestamp: '2024-01-15T10:35:00Z',
      action: 'Initial Assessment',
      description: 'Security analyst confirmed potential SQL injection attack',
      user: 'John Doe',
      type: 'analysis'
    },
    {
      id: '3',
      timestamp: '2024-01-15T11:00:00Z',
      action: 'Containment Started',
      description: 'Temporary rate limiting applied to affected endpoints',
      user: 'Jane Smith',
      type: 'containment'
    },
    {
      id: '4',
      timestamp: '2024-01-15T11:30:00Z',
      action: 'Evidence Collection',
      description: 'HTTP request logs and database query logs collected',
      user: 'Mike Johnson',
      type: 'analysis'
    },
    {
      id: '5',
      timestamp: '2024-01-15T12:15:00Z',
      action: 'Vulnerability Analysis',
      description: 'Confirmed SQL injection in user authentication form',
      user: 'Jane Smith',
      type: 'analysis'
    }
  ]
};

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

const getTimelineIcon = (type: string) => {
  const icons = {
    detection: AlertTriangle,
    analysis: FileText,
    containment: Shield,
    eradication: CheckCircle,
    recovery: CheckCircle
  };
  
  const Icon = icons[type as keyof typeof icons] || FileText;
  return <Icon className="h-4 w-4" />;
};

export async function generateStaticParams() {
  // Return static params for the mock incident
  return [
    { id: 'INC-2024-001' }
  ];
}

export default function IncidentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'tools', label: 'Tools & Analysis' },
    { id: 'evidence', label: 'Evidence' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-white">{incidentData.title}</h1>
                {getSeverityBadge(incidentData.severity)}
                {getStatusBadge(incidentData.status)}
              </div>
              <p className="text-gray-400">
                <code className="text-[var(--cyber-blue)] font-mono mr-2">{incidentData.id}</code>
                • Reported by {incidentData.reporter} • {formatDate(incidentData.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Assign
            </Button>
            <Button>
              Mark Resolved
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[var(--cyber-blue)] text-[var(--cyber-blue)]'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Incident Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{incidentData.description}</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Incident Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{incidentData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reporter:</span>
                    <span className="text-white">{incidentData.reporter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Assignee:</span>
                    <span className="text-white">{incidentData.assignee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white text-sm">{formatDate(incidentData.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Updated:</span>
                    <span className="text-white text-sm">{formatDate(incidentData.updatedAt)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[var(--cyber-blue)]" />
                Incident Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidentData.timeline.map((event, index) => (
                  <div key={event.id} className="flex space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 border border-gray-600">
                        {getTimelineIcon(event.type)}
                      </div>
                      {index < incidentData.timeline.length - 1 && (
                        <div className="w-px h-12 bg-gray-700 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-white">{event.action}</h4>
                        <span className="text-sm text-gray-400">{formatDate(event.timestamp)}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{event.description}</p>
                      <p className="text-xs text-gray-500 mt-1">by {event.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            {incidentData.toolsUsed.map((tool) => (
              <Card key={tool.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-[var(--matrix-green)]" />
                    {tool.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Usage Description</h4>
                      <p className="text-gray-400">{tool.description}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Impact/Findings</h4>
                      <p className="text-white">{tool.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'evidence' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[var(--cyber-blue)]" />
                Evidence & Attachments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {incidentData.evidence.map((item) => (
                  <div key={item.id} className="border border-gray-700 rounded-lg p-4 hover:bg-gray-800/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="h-8 w-8 text-gray-400" />
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="font-medium text-white text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-400 capitalize">{item.type}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}