'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { AlertTriangle, Upload, X } from 'lucide-react';

const incidentTypes = [
  { value: 'SQL Injection', label: 'SQL Injection' },
  { value: 'Phishing', label: 'Phishing' },
  { value: 'Malware', label: 'Malware' },
  { value: 'DDoS', label: 'DDoS Attack' },
  { value: 'Data Breach', label: 'Data Breach' },
  { value: 'Insider Threat', label: 'Insider Threat' }
];

const severityLevels = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Critical', label: 'Critical' }
];

const availableTools = [
  { value: 'Nmap', label: 'Nmap' },
  { value: 'Metasploit', label: 'Metasploit' },
  { value: 'Nikto', label: 'Nikto' },
  { value: 'ZAP', label: 'OWASP ZAP' },
  { value: 'Burp Suite', label: 'Burp Suite' },
  { value: 'Wireshark', label: 'Wireshark' },
  { value: 'Volatility', label: 'Volatility' },
  { value: 'Splunk', label: 'Splunk' }
];

export default function ReportIncidentPage() {
  const [loading, setLoading] = useState(false);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    severity: '',
    description: '',
    reporter: 'John Doe'
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to incidents page
    router.push('/incidents');
  };

  const handleToolToggle = (tool: string) => {
    setSelectedTools(prev => 
      prev.includes(tool) 
        ? prev.filter(t => t !== tool)
        : [...prev, tool]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <AlertTriangle className="h-8 w-8 mr-3 text-[var(--cyber-blue)]" />
            Report Security Incident
          </h1>
          <p className="text-gray-400">Document and report cybersecurity incidents for investigation</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Incident Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Incident Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Brief description of the incident"
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Incident Type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      options={incidentTypes}
                      required
                    />

                    <Select
                      label="Severity Level"
                      value={formData.severity}
                      onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                      options={severityLevels}
                      required
                    />
                  </div>

                  <Textarea
                    label="Detailed Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide detailed information about the incident, including when it was discovered, potential impact, and any immediate actions taken..."
                    rows={6}
                    required
                  />

                  <Input
                    label="Reporter Name"
                    value={formData.reporter}
                    onChange={(e) => setFormData({ ...formData, reporter: e.target.value })}
                    required
                  />
                </CardContent>
              </Card>

              {/* Tools Used */}
              <Card>
                <CardHeader>
                  <CardTitle>Tools Used in Investigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableTools.map((tool) => (
                      <button
                        key={tool.value}
                        type="button"
                        onClick={() => handleToolToggle(tool.value)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedTools.includes(tool.value)
                            ? 'border-cyan-500 bg-cyan-900/30 text-cyan-400'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50'
                        }`}
                      >
                        {tool.label}
                      </button>
                    ))}
                  </div>
                  {selectedTools.length > 0 && (
                    <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
                      <p className="text-sm text-gray-400 mb-2">Selected tools:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedTools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-1 bg-cyan-900/50 text-cyan-400 text-xs rounded border border-cyan-500/30"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Evidence Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Evidence & Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400 mb-2">
                        Drop files here or click to upload
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".jpg,.jpeg,.png,.pdf,.txt,.log"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-[var(--cyber-blue)] text-sm hover:underline"
                      >
                        Browse files
                      </label>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-300">Uploaded files:</p>
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-800/30 rounded text-sm"
                          >
                            <span className="text-gray-300 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-gray-400 hover:text-red-400 ml-2"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full"
                    loading={loading}
                  >
                    Submit Incident Report
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push('/dashboard')}
                  >
                    Save as Draft
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}