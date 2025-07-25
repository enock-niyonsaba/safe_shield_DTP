"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Circle,
  Clock,
  FileText,
  AlertTriangle,
  Shield,
  Trash2,
  RefreshCw,
  Users,
  BarChart3,
} from "lucide-react"
import { ResponseStep } from "./response-step"
import { ResponseChat } from "./response-chat"
import { ResponseSummary } from "./response-summary"
import { createClient } from "@/lib/supabase/client"

interface ResponseTrackerProps {
  incidentId: string
  userRole: "Admin" | "Analyst" | "Observer"
  isReporter?: boolean
}

export interface ResponseStepData {
  id: string
  name: string
  description: string
  status: "pending" | "in-progress" | "completed"
  icon: any
  color: string
  actions: ResponseAction[]
  logs: ResponseLog[]
  notes: string
  evidence: ResponseEvidence[]
  template: string[]
  completedAt?: string
  assignedTo?: string
}

export interface ResponseAction {
  id: string
  description: string
  completed: boolean
  completedAt?: string
  completedBy?: string
}

export interface ResponseLog {
  id: string
  timestamp: string
  action: string
  user: string
  details: string
}

export interface ResponseEvidence {
  id: string
  filename: string
  fileUrl: string
  uploadedAt: string
  uploadedBy: string
  fileType: string
  fileSize: number
}

const initialSteps: ResponseStepData[] = [
  {
    id: "detect",
    name: "Detect",
    description: "Identify and analyze the security incident",
    status: "pending",
    icon: AlertTriangle,
    color: "text-yellow-500",
    actions: [],
    logs: [],
    notes: "",
    evidence: [],
    template: [
      "Verify incident authenticity and scope",
      "Gather initial evidence and indicators",
      "Assess potential impact and severity",
      "Document initial findings",
      "Notify relevant stakeholders",
    ],
  },
  {
    id: "contain",
    name: "Contain",
    description: "Isolate and prevent further damage",
    status: "pending",
    icon: Shield,
    color: "text-blue-500",
    actions: [],
    logs: [],
    notes: "",
    evidence: [],
    template: [
      "Isolate affected systems from network",
      "Preserve evidence and system state",
      "Implement temporary security measures",
      "Block malicious IPs/domains",
      "Secure backup systems",
    ],
  },
  {
    id: "eradicate",
    name: "Eradicate",
    description: "Remove threats and vulnerabilities",
    status: "pending",
    icon: Trash2,
    color: "text-red-500",
    actions: [],
    logs: [],
    notes: "",
    evidence: [],
    template: [
      "Remove malware and malicious files",
      "Close security vulnerabilities",
      "Update and patch affected systems",
      "Reset compromised credentials",
      "Strengthen security controls",
    ],
  },
  {
    id: "recover",
    name: "Recover",
    description: "Restore systems and normal operations",
    status: "pending",
    icon: RefreshCw,
    color: "text-green-500",
    actions: [],
    logs: [],
    notes: "",
    evidence: [],
    template: [
      "Restore systems from clean backups",
      "Gradually reconnect to network",
      "Monitor for signs of reinfection",
      "Validate system integrity",
      "Resume normal operations",
    ],
  },
  {
    id: "communicate",
    name: "Communicate",
    description: "Document and report incident resolution",
    status: "pending",
    icon: Users,
    color: "text-purple-500",
    actions: [],
    logs: [],
    notes: "",
    evidence: [],
    template: [
      "Prepare incident report",
      "Notify affected stakeholders",
      "Update management and compliance",
      "Conduct lessons learned session",
      "Update incident response procedures",
    ],
  },
]

export function ResponseTracker({ incidentId, userRole, isReporter = false }: ResponseTrackerProps) {
  const [steps, setSteps] = useState<ResponseStepData[]>(initialSteps)
  const [activeStep, setActiveStep] = useState<string>("detect")
  const [showSummary, setShowSummary] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadResponseData()
  }, [incidentId])

  const loadResponseData = async () => {
    try {
      setIsLoading(true)

      // Load response tracking data from database
      const { data: responseData, error } = await supabase
        .from("incident_response_tracking")
        .select(`
          *,
          response_actions (*),
          response_logs (*),
          response_evidence (*)
        `)
        .eq("incident_id", incidentId)
        .single()

      if (responseData) {
        // Update steps with loaded data
        const updatedSteps = steps.map((step) => {
          const stepData = responseData.steps?.find((s: any) => s.id === step.id)
          if (stepData) {
            return {
              ...step,
              ...stepData,
              actions: responseData.response_actions?.filter((a: any) => a.step_id === step.id) || [],
              logs: responseData.response_logs?.filter((l: any) => l.step_id === step.id) || [],
              evidence: responseData.response_evidence?.filter((e: any) => e.step_id === step.id) || [],
            }
          }
          return step
        })
        setSteps(updatedSteps)
      }
    } catch (error) {
      console.error("Error loading response data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateStepStatus = async (stepId: string, status: "pending" | "in-progress" | "completed") => {
    const updatedSteps = steps.map((step) =>
      step.id === stepId
        ? {
            ...step,
            status,
            completedAt: status === "completed" ? new Date().toISOString() : undefined,
          }
        : step,
    )
    setSteps(updatedSteps)

    // Save to database
    try {
      await supabase.from("incident_response_tracking").upsert({
        incident_id: incidentId,
        step_id: stepId,
        status,
        completed_at: status === "completed" ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error updating step status:", error)
    }
  }

  const addLog = async (stepId: string, action: string, details: string) => {
    const newLog: ResponseLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action,
      user: "Current User", // Replace with actual user
      details,
    }

    const updatedSteps = steps.map((step) => (step.id === stepId ? { ...step, logs: [...step.logs, newLog] } : step))
    setSteps(updatedSteps)

    // Save to database
    try {
      await supabase.from("response_logs").insert({
        incident_id: incidentId,
        step_id: stepId,
        action,
        details,
        user_id: "current-user-id", // Replace with actual user ID
      })
    } catch (error) {
      console.error("Error adding log:", error)
    }
  }

  const calculateProgress = () => {
    const completedSteps = steps.filter((step) => step.status === "completed").length
    return (completedSteps / steps.length) * 100
  }

  const getOverallStatus = () => {
    const completedSteps = steps.filter((step) => step.status === "completed").length
    const inProgressSteps = steps.filter((step) => step.status === "in-progress").length

    if (completedSteps === steps.length) return "completed"
    if (inProgressSteps > 0 || completedSteps > 0) return "in-progress"
    return "pending"
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-400">Loading response tracker...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Incident Response Progress
              </CardTitle>
              <CardDescription>Track and manage the incident response workflow</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getOverallStatus() === "completed" ? "default" : "secondary"}>
                {getOverallStatus().replace("-", " ").toUpperCase()}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSummary(true)}
                disabled={getOverallStatus() !== "completed"}
              >
                <FileText className="h-4 w-4 mr-1" />
                Summary
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Overall Progress</span>
              <span className="text-gray-100">{Math.round(calculateProgress())}% Complete</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />

            {/* Step Progress Indicators */}
            <div className="flex items-center justify-between mt-6">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      step.status === "completed"
                        ? "bg-green-600 border-green-600 text-white"
                        : step.status === "in-progress"
                          ? "bg-blue-600 border-blue-600 text-white"
                          : activeStep === step.id
                            ? "border-blue-600 text-blue-600"
                            : "border-gray-600 text-gray-400"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : step.status === "in-progress" ? (
                      <Clock className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  <span
                    className={`text-xs mt-2 text-center ${activeStep === step.id ? "text-blue-400" : "text-gray-400"}`}
                  >
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="absolute w-16 h-px bg-gray-600 mt-5 ml-16 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step Details */}
        <div className="lg:col-span-2">
          <Tabs value={activeStep} onValueChange={setActiveStep}>
            <TabsList className="grid w-full grid-cols-5">
              {steps.map((step) => (
                <TabsTrigger key={step.id} value={step.id} className="text-xs">
                  <step.icon className="h-4 w-4 mr-1" />
                  {step.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {steps.map((step) => (
              <TabsContent key={step.id} value={step.id}>
                <ResponseStep
                  step={step}
                  onUpdateStatus={updateStepStatus}
                  onAddLog={addLog}
                  onUpdateStep={(updatedStep) => {
                    const updatedSteps = steps.map((s) => (s.id === updatedStep.id ? updatedStep : s))
                    setSteps(updatedSteps)
                  }}
                  userRole={userRole}
                  isReadOnly={isReporter}
                  incidentId={incidentId}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Communication Panel */}
        <div>
          <ResponseChat incidentId={incidentId} userRole={userRole} isReporter={isReporter} />
        </div>
      </div>

      {/* Summary Modal */}
      {showSummary && <ResponseSummary incidentId={incidentId} steps={steps} onClose={() => setShowSummary(false)} />}
    </div>
  )
}
