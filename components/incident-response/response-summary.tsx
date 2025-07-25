"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  X,
  Download,
  Clock,
  User,
  CheckCircle,
  FileText,
  Calendar,
  AlertTriangle,
  Shield,
  Trash2,
  RefreshCw,
  Users,
  BarChart3,
} from "lucide-react"
import type { ResponseStepData } from "./response-tracker"

interface ResponseSummaryProps {
  incidentId: string
  steps: ResponseStepData[]
  onClose: () => void
}

export function ResponseSummary({ incidentId, steps, onClose }: ResponseSummaryProps) {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case "detect":
        return AlertTriangle
      case "contain":
        return Shield
      case "eradicate":
        return Trash2
      case "recover":
        return RefreshCw
      case "communicate":
        return Users
      default:
        return CheckCircle
    }
  }

  const getStepColor = (stepId: string) => {
    switch (stepId) {
      case "detect":
        return "text-yellow-500"
      case "contain":
        return "text-blue-500"
      case "eradicate":
        return "text-red-500"
      case "recover":
        return "text-green-500"
      case "communicate":
        return "text-purple-500"
      default:
        return "text-gray-500"
    }
  }

  const calculateTotalDuration = () => {
    const completedSteps = steps.filter((step) => step.completedAt)
    if (completedSteps.length === 0) return "N/A"

    const startTime = new Date(Math.min(...completedSteps.map((step) => new Date(step.completedAt!).getTime())))
    const endTime = new Date(Math.max(...completedSteps.map((step) => new Date(step.completedAt!).getTime())))

    const duration = endTime.getTime() - startTime.getTime()
    const hours = Math.floor(duration / (1000 * 60 * 60))
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  const getCompletedActions = () => {
    return steps.reduce((total, step) => {
      return total + step.actions.filter((action) => action.completed).length
    }, 0)
  }

  const getTotalActions = () => {
    return steps.reduce((total, step) => total + step.actions.length, 0)
  }

  const getTotalEvidence = () => {
    return steps.reduce((total, step) => total + step.evidence.length, 0)
  }

  const generateReport = async () => {
    setIsGeneratingReport(true)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create and download report
    const reportData = {
      incidentId,
      generatedAt: new Date().toISOString(),
      summary: {
        totalDuration: calculateTotalDuration(),
        completedSteps: steps.filter((step) => step.status === "completed").length,
        totalSteps: steps.length,
        completedActions: getCompletedActions(),
        totalActions: getTotalActions(),
        evidenceFiles: getTotalEvidence(),
      },
      steps: steps.map((step) => ({
        name: step.name,
        status: step.status,
        completedAt: step.completedAt,
        actions: step.actions,
        notes: step.notes,
        evidence: step.evidence.map((e) => e.filename),
        logs: step.logs,
      })),
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `incident-${incidentId}-response-report.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsGeneratingReport(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Incident Response Summary
              </CardTitle>
              <CardDescription>Complete overview of the incident response process</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={generateReport} disabled={isGeneratingReport}>
                <Download className="h-4 w-4 mr-1" />
                {isGeneratingReport ? "Generating..." : "Export Report"}
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Duration</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-100">{calculateTotalDuration()}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-400">Steps</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-100">
                    {steps.filter((step) => step.status === "completed").length}/{steps.length}
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-400">Actions</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-100">
                    {getCompletedActions()}/{getTotalActions()}
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-400">Evidence</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-100">{getTotalEvidence()} files</p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Response Timeline</h3>
                <div className="space-y-4">
                  {steps.map((step, index) => {
                    const StepIcon = getStepIcon(step.id)
                    return (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                              step.status === "completed"
                                ? "bg-green-600 border-green-600 text-white"
                                : step.status === "in-progress"
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : "border-gray-600 text-gray-400"
                            }`}
                          >
                            <StepIcon className="h-5 w-5" />
                          </div>
                          {index < steps.length - 1 && <div className="w-px h-16 bg-gray-600 mt-2" />}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-gray-100">{step.name}</h4>
                            <Badge
                              variant={
                                step.status === "completed"
                                  ? "default"
                                  : step.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {step.status.replace("-", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">{step.description}</p>

                          {step.completedAt && (
                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                              <Calendar className="h-4 w-4" />
                              Completed on {new Date(step.completedAt).toLocaleString()}
                            </div>
                          )}

                          {/* Step Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Actions:</span>
                              <p className="text-gray-200">
                                {step.actions.filter((a) => a.completed).length}/{step.actions.length} completed
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-400">Evidence:</span>
                              <p className="text-gray-200">{step.evidence.length} files</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Logs:</span>
                              <p className="text-gray-200">{step.logs.length} entries</p>
                            </div>
                          </div>

                          {step.notes && (
                            <div className="mt-3 p-3 bg-gray-800/30 rounded-lg">
                              <span className="text-gray-400 text-sm">Notes:</span>
                              <p className="text-gray-200 text-sm mt-1">{step.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Key Actions Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Key Actions Taken</h3>
                <div className="space-y-3">
                  {steps.map(
                    (step) =>
                      step.actions.filter((action) => action.completed).length > 0 && (
                        <div key={step.id} className="bg-gray-800/30 rounded-lg p-4">
                          <h4 className="font-medium text-gray-100 mb-2 flex items-center gap-2">
                            {React.createElement(getStepIcon(step.id), {
                              className: `h-4 w-4 ${getStepColor(step.id)}`,
                            })}
                            {step.name}
                          </h4>
                          <ul className="space-y-1">
                            {step.actions
                              .filter((action) => action.completed)
                              .map((action) => (
                                <li key={action.id} className="flex items-center gap-2 text-sm text-gray-300">
                                  <CheckCircle className="h-3 w-3 text-green-400" />
                                  {action.description}
                                  {action.completedAt && (
                                    <span className="text-gray-400 ml-auto">
                                      {new Date(action.completedAt).toLocaleString()}
                                    </span>
                                  )}
                                </li>
                              ))}
                          </ul>
                        </div>
                      ),
                  )}
                </div>
              </div>

              {/* Evidence Summary */}
              {getTotalEvidence() > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-4">Evidence Collected</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {steps.map(
                      (step) =>
                        step.evidence.length > 0 && (
                          <div key={step.id} className="bg-gray-800/30 rounded-lg p-4">
                            <h4 className="font-medium text-gray-100 mb-2">{step.name}</h4>
                            <ul className="space-y-2">
                              {step.evidence.map((evidence) => (
                                <li key={evidence.id} className="flex items-center gap-2 text-sm">
                                  <FileText className="h-3 w-3 text-gray-400" />
                                  <span className="text-gray-300">{evidence.filename}</span>
                                  <span className="text-gray-400 ml-auto">
                                    {(evidence.fileSize / 1024).toFixed(1)} KB
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
