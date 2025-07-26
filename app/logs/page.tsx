'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Activity, Search, Filter, Download, Calendar, AlertTriangle } from 'lucide-react';
import { SystemLog } from '@/types';

const systemLogs: SystemLog[] = [
  {
    id: '1',
    timestamp: '2024-01-15T14:32:15Z',
    severity: 'Critical',
    source: 'Firewall',
    sourceIP: '192.168.1.100',
    action: 'BLOCKED',
    description: 'Multiple failed login attempts detected from external IP'
  },
  {
    id: '2',
    timestamp: '2024-01-15T14:28:42Z',
    severity: 'Warning',
    source: 'IDS',
    sourceIP: '10.0.0.45',
    action: 'ALERT',
    description: 'Suspicious SQL query pattern detected in web application logs'
  },
  {
    id: '3',
    timestamp: '2024-01-15T14:25:18Z',
    severity: 'Info',
    source: 'Web Server',
    sourceIP: '203.0.113.42',
    action: 'LOGGED',
    description: 'User authentication successful for admin@company.com'
  },
  {
    id: '4',
    timestamp: '2024-01-15T14:22:33Z',
    severity: 'Error',
    source: 'Database',
    sourceIP: '10.0.0.12',
    action: 'FAILED',
    description: 'Database connection timeout during backup operation'
  },
  {
    id: '5',
    timestamp: '2024-01-15T14:18:07Z',
    severity: 'Warning',
    source: 'Antivirus',
    sourceIP: '10.0.0.78',
    action: 'QUARANTINED',
    description: 'Malicious file detected and quarantined: trojan.exe'
  },
  {
    id: '6',
    timestamp: '2024-01-15T14:15:44Z',
    severity: 'Critical',
    source: 'Network Monitor',
    sourceIP: '198.51.100.23',
    action: 'BLOCKED',
    description: 'DDoS attack detected, traffic rate exceeded threshold'
  },
  {
    id: '7',
    timestamp: '2024-01-15T14:12:29Z',
    severity: 'Info',
    source: 'VPN',
    sourceIP: '172.16.0.5',
    action: 'CONNECTED',
    description: 'VPN connection established for user: john.doe@company.com'
  },
  {
    id: '8',
    timestamp: '2024-01-15T14:08:16Z',
    severity: 'Warning',
    source: 'Email Security',
    sourceIP: '209.85.128.26',
    action: 'QUARANTINED',
    description: 'Phishing email detected and quarantined from external sender'
  },
  {
    id: '9',
    timestamp: '2024-01-15T14:05:52Z',
    severity: 'Error',
    source: 'File Server',
    sourceIP: '10.0.0.25',
    action: 'DENIED',
    description: 'Unauthorized file access attempt to sensitive directory'
  },
  {
    id: '10',
    timestamp: '2024-01-15T14:02:38Z',
    severity: 'Info',
    source: 'Backup System',
    sourceIP: '10.0.0.50',
    action: 'COMPLETED',
    description: 'Daily backup completed successfully for all critical systems'
  }
];

const severityOptions = [
  { value: '', label: 'All Severities' },
  { value: 'Info', label: 'Info' },
  { value: 'Warning', label: 'Warning' },
  { value: 'Error', label: 'Error' },
  { value: 'Critical', label: 'Critical' }
];

const sourceOptions = [
  { value: '', label: 'All Sources' },
  { value: 'Firewall', label: 'Firewall' },
  { value: 'IDS', label: 'IDS/IPS' },
  { value: 'Web Server', label: 'Web Server' },
  { value: 'Database', label: 'Database' },
  { value: 'Antivirus', label: 'Antivirus' },
  { value: 'Network Monitor', label: 'Network Monitor' },
  { value: 'VPN', label: 'VPN' },
  { value: 'Email Security', label: 'Email Security' },
  { value: 'File Server', label: 'File Server' },
  { value: 'Backup System', label: 'Backup System' }
];

const getSeverityBadge = (severity: string) => {
  const variants = {
    'Info': 'info',
    'Warning': 'warning',
    'Error': 'danger',
    'Critical': 'danger'
  } as const;
  
  return <Badge variant={variants[severity as keyof typeof variants] || 'default'}>{severity}</Badge>;
};

const getSeverityIcon = (severity: string) => {
  if (severity === 'Critical' || severity === 'Error') {
    return <AlertTriangle className="h-4 w-4 text-red-400" />;
  }
  return <Activity className="h-4 w-4 text-gray-400" />;
};

export default function SystemLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [dateRange, setDateRange] = useState('today');

  const filteredLogs = systemLogs.filter((log) => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.sourceIP.includes(searchTerm) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = !severityFilter || log.severity === severityFilter;
    const matchesSource = !sourceFilter || log.source === sourceFilter;
    
    return matchesSearch && matchesSeverity && matchesSource;
  });

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleExportLogs = () => {
    // Simulate export functionality
    const csvContent = [
      'Timestamp,Severity,Source,Source IP,Action,Description',
      ...filteredLogs.map(log => 
        `${log.timestamp},${log.severity},${log.source},${log.sourceIP},${log.action},"${log.description}"`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <Activity className="h-8 w-8 mr-3 text-[var(--matrix-green)]" />
              System Logs
            </h1>
            <p className="text-gray-400">Monitor system events and security alerts in real-time</p>
          </div>
          <Button onClick={handleExportLogs} className="mt-4 sm:mt-0">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs, IPs, actions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                options={severityOptions}
              />
              <Select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                options={sourceOptions}
              />
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                options={[
                  { value: 'today', label: 'Today' },
                  { value: 'week', label: 'This Week' },
                  { value: 'month', label: 'This Month' }
                ]}
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card variant="cyber">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Events</p>
                  <p className="text-2xl font-bold text-white">{filteredLogs.length}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card variant="cyber">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Critical</p>
                  <p className="text-2xl font-bold text-red-400">
                    {filteredLogs.filter(log => log.severity === 'Critical').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          <Card variant="cyber">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {filteredLogs.filter(log => log.severity === 'Warning').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card variant="cyber">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Blocked</p>
                  <p className="text-2xl font-bold text-green-400">
                    {filteredLogs.filter(log => log.action === 'BLOCKED').length}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>System Events ({filteredLogs.length})</span>
              <Filter className="h-5 w-5 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Timestamp</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Severity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Source</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Source IP</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Action</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <span className="text-sm font-mono text-gray-300">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {getSeverityIcon(log.severity)}
                          {getSeverityBadge(log.severity)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-300">{log.source}</span>
                      </td>
                      <td className="py-3 px-4">
                        <code className="text-sm text-[var(--cyber-blue)] font-mono bg-gray-800/50 px-2 py-1 rounded">
                          {log.sourceIP}
                        </code>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-sm font-medium px-2 py-1 rounded ${
                          log.action === 'BLOCKED' ? 'bg-red-900/30 text-red-400' :
                          log.action === 'ALERT' ? 'bg-yellow-900/30 text-yellow-400' :
                          log.action === 'COMPLETED' ? 'bg-green-900/30 text-green-400' :
                          'bg-gray-800/50 text-gray-300'
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-300">{log.description}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}