"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const incidentTypes = ["SQL Injection", "Phishing", "Malware", "DDoS", "Data Breach", "Unauthorized Access"]

const severityLevels = ["Low", "Medium", "High", "Critical"]

const availableTools = ["Nmap", "Metasploit", "Nikto", "ZAP", "Burp Suite", "Wireshark", "Nessus", "OpenVAS"]

export default function ReportIncident() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    severity: "",
    description: "",
    reporter: "",
    toolsUsed: [] as string[],
    evidence: [] as File[],
  })

  const handleToolToggle = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      toolsUsed: prev.toolsUsed.includes(tool) ? prev.toolsUsed.filter((t) => t !== tool) : [...prev.toolsUsed, tool],
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        evidence: [...prev.evidence, ...Array.from(e.target.files!)],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      evidence: prev.evidence.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Incident reported:", formData)
    // Handle form submission
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Report Incident</h1>
        <p className="text-gray-400 mt-2">Submit a new security incident for investigation</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incident Details</CardTitle>
          <CardDescription>Provide comprehensive information about the security incident</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Incident Title *
                </label>
                <Input
                  id="title"
                  placeholder="Brief description of the incident"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="reporter" className="block text-sm font-medium text-gray-300 mb-2">
                  Reporter Name *
                </label>
                <Input
                  id="reporter"
                  placeholder="Your name"
                  value={formData.reporter}
                  onChange={(e) => setFormData({ ...formData, reporter: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                  Incident Type *
                </label>
                <select
                  id="type"
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="">Select incident type</option>
                  {incidentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="severity" className="block text-sm font-medium text-gray-300 mb-2">
                  Severity Level *
                </label>
                <select
                  id="severity"
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                  required
                >
                  <option value="">Select severity</option>
                  {severityLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                className="flex w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed description of the incident, including timeline and impact"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tools Used</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availableTools.map((tool) => (
                  <label key={tool} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.toolsUsed.includes(tool)}
                      onChange={() => handleToolToggle(tool)}
                      className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-300">{tool}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Evidence Files</label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-400 hover:text-blue-300">Upload files</span>
                    <span className="text-gray-400"> or drag and drop</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".jpg,.jpeg,.png,.pdf,.txt,.log"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">PNG, JPG, PDF, TXT, LOG up to 10MB each</p>
              </div>

              {formData.evidence.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.evidence.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                      <span className="text-sm text-gray-300">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit">Submit Incident</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
