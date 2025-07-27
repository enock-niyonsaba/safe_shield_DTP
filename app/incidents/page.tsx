'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';

// Custom Select component wrapper
const CustomSelect = ({ value, onChange, options }: {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  options: { value: string; label: string }[];
}) => {
  return (
    <Select value={value} onValueChange={(newValue) => onChange({ target: { value: newValue } })}>
      <SelectTrigger className="w-full bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-[var(--cyber-blue)] focus:border-[var(--cyber-blue)]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-700">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-700">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const incidents = [
  {
    id: 'INC-2024-001',
    title: 'Suspicious SQL Injection Attempt',
    type: 'SQL Injection',
    severity: 'High',
    status: 'Investigating',
    reporter: 'John Doe',
    assignee: 'Jane Smith',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T12:15:00Z'
  },
  {
    id: 'INC-2024-002',
    title: 'Phishing Email Campaign Detected',
    type: 'Phishing',
    severity: 'Medium',
    status: 'Contained',
    reporter: 'Jane Smith',
    assignee: 'Mike Johnson',
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T11:30:00Z'
  },
  {
    id: 'INC-2024-003',
    title: 'Malware Detection on Workstation',
    type: 'Malware',
    severity: 'Critical',
    status: 'Open',
    reporter: 'Mike Johnson',
    assignee: 'John Doe',
    createdAt: '2024-01-15T08:45:00Z',
    updatedAt: '2024-01-15T08:45:00Z'
  },
  {
    id: 'INC-2024-004',
    title: 'DDoS Attack on Web Server',
    type: 'DDoS',
    severity: 'High',
    status: 'Resolved',
    reporter: 'Sarah Wilson',
    assignee: 'Jane Smith',
    createdAt: '2024-01-14T16:22:00Z',
    updatedAt: '2024-01-15T09:10:00Z'
  },
  {
    id: 'INC-2024-005',
    title: 'Unauthorized Access Attempt',
    type: 'Data Breach',
    severity: 'Critical',
    status: 'Investigating',
    reporter: 'Alex Chen',
    assignee: 'John Doe',
    createdAt: '2024-01-14T14:18:00Z',
    updatedAt: '2024-01-15T10:45:00Z'
  },
  {
    id: 'INC-2024-006',
    title: 'Suspicious Network Traffic',
    type: 'Insider Threat',
    severity: 'Medium',
    status: 'Closed',
    reporter: 'David Lee',
    assignee: 'Mike Johnson',
    createdAt: '2024-01-13T11:33:00Z',
    updatedAt: '2024-01-14T16:20:00Z'
  }
];

const severityOptions = [
  { value: '', label: 'All Severities' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Critical', label: 'Critical' }
];

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'Open', label: 'Open' },
  { value: 'Investigating', label: 'Investigating' },
  { value: 'Contained', label: 'Contained' },
  { value: 'Resolved', label: 'Resolved' },
  { value: 'Closed', label: 'Closed' }
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

export default function IncidentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = !severityFilter || incident.severity === severityFilter;
    const matchesStatus = !statusFilter || incident.status === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <FileText className="h-8 w-8 mr-3 text-[var(--cyber-blue)]" />
              Incident Reports
            </h1>
            <p className="text-gray-400">View and manage all security incidents</p>
          </div>
          <Link href="/report">
            <Button className="mt-4 sm:mt-0">
              Report New Incident
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search incidents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <CustomSelect
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  options={severityOptions}
                />
                <CustomSelect
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  options={statusOptions}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incidents Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Incidents ({filteredIncidents.length})</span>
              <Filter className="h-5 w-5 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-300">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Title</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Severity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Assignee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Updated</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIncidents.map((incident) => (
                    <tr key={incident.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <code className="text-sm text-[var(--cyber-blue)] font-mono">
                          {incident.id}
                        </code>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <Link href={`/incidents/${incident.id}`} className="text-white hover:text-[var(--cyber-blue)] font-medium">
                            {incident.title}
                          </Link>
                          <p className="text-xs text-gray-400 mt-1">
                            Reported by {incident.reporter}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-300">{incident.type}</span>
                      </td>
                      <td className="py-3 px-4">
                        {getSeverityBadge(incident.severity)}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(incident.status)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-300">{incident.assignee}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-400">
                          {formatDate(incident.updatedAt)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Link href={`/incidents/${incident.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </Button>
                        </div>
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