'use client';

import { useState } from 'react';
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
import Textarea from '@/components/ui/Textarea';
import { 
  Wrench, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Upload,
  Download,
  Shield,
  Zap,
  Bug,
  Network,
  Lock
} from 'lucide-react';
import { Tool } from '@/types';

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

const toolsData: (Tool & { 
  category: string; 
  lastUsed: string; 
  usageCount: number; 
  effectiveness: string;
})[] = [
  {
    id: '1',
    name: 'Nmap',
    description: 'Network discovery and security auditing tool used to scan for open ports and identify running services on target systems.',
    screenshot: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
    impact: 'Successfully identified 15 open ports and 3 vulnerable services during the SQL injection investigation.',
    category: 'Network Scanning',
    lastUsed: '2024-01-15T12:30:00Z',
    usageCount: 47,
    effectiveness: 'High'
  },
  {
    id: '2',
    name: 'Metasploit',
    description: 'Penetration testing framework used for developing and executing exploit code against remote target machines.',
    screenshot: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
    impact: 'Confirmed vulnerability exploitation path and demonstrated potential impact of the security flaw.',
    category: 'Exploitation',
    lastUsed: '2024-01-14T16:45:00Z',
    usageCount: 23,
    effectiveness: 'Critical'
  },
  {
    id: '3',
    name: 'Burp Suite',
    description: 'Web application security testing platform used for intercepting, analyzing, and modifying HTTP/HTTPS traffic.',
    screenshot: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
    impact: 'Intercepted malicious SQL injection payloads and identified the exact vulnerable parameter in the login form.',
    category: 'Web Security',
    lastUsed: '2024-01-15T10:15:00Z',
    usageCount: 89,
    effectiveness: 'High'
  },
  {
    id: '4',
    name: 'Wireshark',
    description: 'Network protocol analyzer used for capturing and analyzing network traffic in real-time.',
    screenshot: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400',
    impact: 'Captured and analyzed suspicious network packets during the DDoS attack, identifying attack patterns.',
    category: 'Network Analysis',
    lastUsed: '2024-01-14T14:20:00Z',
    usageCount: 34,
    effectiveness: 'High'
  },
  {
    id: '5',
    name: 'Nikto',
    description: 'Web server scanner that performs comprehensive tests against web servers for multiple items including dangerous files and programs.',
    screenshot: 'https://images.pexels.com/photos/1181674/pexels-photo-1181674.jpeg?auto=compress&cs=tinysrgb&w=400',
    impact: 'Discovered 12 potential security vulnerabilities in the web application, including outdated software versions.',
    category: 'Web Security',
    lastUsed: '2024-01-13T09:30:00Z',
    usageCount: 28,
    effectiveness: 'Medium'
  },
  {
    id: '6',
    name: 'Splunk',
    description: 'Security information and event management (SIEM) platform used for searching, monitoring, and analyzing machine-generated data.',
    screenshot: 'https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg?auto=compress&cs=tinysrgb&w=400',
    impact: 'Correlated security events across multiple systems and identified the attack timeline and affected systems.',
    category: 'SIEM',
    lastUsed: '2024-01-15T13:45:00Z',
    usageCount: 156,
    effectiveness: 'Critical'
  },
  {
    id: '7',
    name: 'Volatility',
    description: 'Advanced memory forensics framework used for analyzing volatile memory (RAM) dumps from compromised systems.',
    screenshot: 'https://images.pexels.com/photos/1181679/pexels-photo-1181679.jpeg?auto=compress&cs=tinysrgb&w=400',
    impact: 'Extracted malware artifacts from memory dump and identified persistence mechanisms used by the attacker.',
    category: 'Forensics',
    lastUsed: '2024-01-12T11:20:00Z',
    usageCount: 15,
    effectiveness: 'High'
  },
  {
    id: '8',
    name: 'ZAP',
    description: 'OWASP Zed Attack Proxy - automated security testing tool for finding vulnerabilities in web applications.',
    screenshot: 'https://images.pexels.com/photos/1181680/pexels-photo-1181680.jpeg?auto=compress&cs=tinysrgb&w=400',
    impact: 'Automated scan revealed 8 security vulnerabilities including XSS and CSRF issues in the customer portal.',
    category: 'Web Security',
    lastUsed: '2024-01-11T15:10:00Z',
    usageCount: 42,
    effectiveness: 'Medium'
  }
];

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'Network Scanning', label: 'Network Scanning' },
  { value: 'Web Security', label: 'Web Security' },
  { value: 'Exploitation', label: 'Exploitation' },
  { value: 'Network Analysis', label: 'Network Analysis' },
  { value: 'SIEM', label: 'SIEM' },
  { value: 'Forensics', label: 'Forensics' }
];

const effectivenessOptions = [
  { value: '', label: 'All Effectiveness' },
  { value: 'Critical', label: 'Critical' },
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' }
];

const getCategoryIcon = (category: string) => {
  const icons = {
    'Network Scanning': Network,
    'Web Security': Shield,
    'Exploitation': Zap,
    'Network Analysis': Network,
    'SIEM': Shield,
    'Forensics': Bug
  };
  
  const Icon = icons[category as keyof typeof icons] || Wrench;
  return <Icon className="h-5 w-5" />;
};

const getEffectivenessBadge = (effectiveness: string) => {
  const variants = {
    'Critical': 'danger',
    'High': 'warning',
    'Medium': 'info',
    'Low': 'default'
  } as const;
  
  return <Badge variant={variants[effectiveness as keyof typeof variants] || 'default'}>{effectiveness}</Badge>;
};

export default function ToolsUsedPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [effectivenessFilter, setEffectivenessFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTools = toolsData.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || tool.category === categoryFilter;
    const matchesEffectiveness = !effectivenessFilter || tool.effectiveness === effectivenessFilter;
    
    return matchesSearch && matchesCategory && matchesEffectiveness;
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
              <Wrench className="h-8 w-8 mr-3 text-[var(--tech-purple)]" />
              Security Tools
            </h1>
            <p className="text-gray-400">Manage and track security tools used in incident investigations</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Tool
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
                              <CustomSelect
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  options={categoryOptions}
                />
                <CustomSelect
                  value={effectivenessFilter}
                  onChange={(e) => setEffectivenessFilter(e.target.value)}
                  options={effectivenessOptions}
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
                  <p className="text-sm text-gray-400">Total Tools</p>
                  <p className="text-2xl font-bold text-white">{filteredTools.length}</p>
                </div>
                <Wrench className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          <Card variant="cyber">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Most Used</p>
                  <p className="text-lg font-bold text-white">Splunk</p>
                  <p className="text-xs text-gray-400">156 uses</p>
                </div>
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card variant="cyber">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Critical Tools</p>
                  <p className="text-2xl font-bold text-red-400">
                    {filteredTools.filter(tool => tool.effectiveness === 'Critical').length}
                  </p>
                </div>
                <Zap className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          <Card variant="cyber">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Categories</p>
                  <p className="text-2xl font-bold text-green-400">6</p>
                </div>
                <Network className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="hover:border-cyan-500/30 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-lg">
                      {getCategoryIcon(tool.category)}
                      <span className="ml-2">{tool.name}</span>
                    </CardTitle>
                    {getEffectivenessBadge(tool.effectiveness)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tool.screenshot && (
                      <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={tool.screenshot}
                          alt={`${tool.name} screenshot`}
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm text-gray-300 mb-2">{tool.description}</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <p><span className="font-medium">Category:</span> {tool.category}</p>
                        <p><span className="font-medium">Last Used:</span> {formatDate(tool.lastUsed)}</p>
                        <p><span className="font-medium">Usage Count:</span> {tool.usageCount}</p>
                      </div>
                    </div>

                    <div className="bg-gray-800/30 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-white mb-1">Impact</h4>
                      <p className="text-xs text-gray-300">{tool.impact}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Tools List ({filteredTools.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Tool</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Effectiveness</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Usage Count</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Last Used</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTools.map((tool) => (
                      <tr key={tool.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            {getCategoryIcon(tool.category)}
                            <div>
                              <p className="font-medium text-white">{tool.name}</p>
                              <p className="text-sm text-gray-400 truncate max-w-xs">{tool.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-300">{tool.category}</span>
                        </td>
                        <td className="py-3 px-4">
                          {getEffectivenessBadge(tool.effectiveness)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-mono text-[var(--cyber-blue)]">{tool.usageCount}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-400">{formatDate(tool.lastUsed)}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
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
        )}
      </div>
    </DashboardLayout>
  );
}