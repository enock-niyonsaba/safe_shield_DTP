"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Play, CheckCircle, Upload, Download, Plus, Clock, FileText, User, Calendar } from "lucide-react"
import type { ResponseStepData, ResponseAction } from "./response-tracker"
import { createClient } from "@/lib/supabase/client"

interface ResponseStepProps {
  step: ResponseStepData
  onUpdateStatus: (stepId: string, status: "pending" | "in-progress" | "completed") => void
  onAddLog: (stepId: string, action: string, details: string) => void
  onUpdateStep: (step: ResponseStepData) => void
  userRole: "Admin" | "Analyst" | "Observer"
  isReadOnly: boolean
  incidentId: string
}

export function ResponseStep({
  step,
  onUpdateStatus,
  onAddLog,
  onUpdateStep,
  userRole,
  isReadOnly,
  incidentId,
}: ResponseStepProps) {
  const [newAction, setNewAction] = useState("")
  const [newNote, setNewNote] = useState(step.notes)
  const [uploadingFile, setUploadingFile] = useState(false)
  const supabase = createClient()

  const canEdit = !isReadOnly && (userRole === "Admin" || userRole === "Analyst")

  const handleStatusChange = (newStatus: "pending" | "in-progress" | "completed") => {
    onUpdateStatus(step.id, newStatus)
    onAddLog(step.id, "Status Changed", `Step status changed to ${newStatus}`)
  }

  const handleAddAction = () => {
    if (!newAction.trim()) return

    const action: ResponseAction = {
      id: Date.now().toString(),
      description: newAction,
      completed: false,
    }

    const updatedStep = {
      ...step,
      actions: [...step.actions, action],
    }

    onUpdateStep(updatedStep)
    onAddLog(step.id, "Action Added", newAction)
    setNewAction("")
  }

  const handleToggleAction = (actionId: string) => {
    const updatedActions = step.actions.map((action) =>
      action.id === actionId
        ? {
            ...action,
            completed: !action.completed,
            completedAt: !action.completed ? new Date().toISOString() : undefined,
            completedBy: !action.completed ? "Current User" : undefined,
          }
        : action,
    )

    const updatedStep = { ...step, actions: updatedActions }
    onUpdateStep(updatedStep)

    const action = step.actions.find((a) => a.id === actionId)
    if (action) {
      onAddLog(
        step.id,
        "Action Updated",
        `${action.description} marked as ${!action.completed ? "completed" : "pending"}`,
      )
    }
  }

  const handleNotesUpdate = () => {
    const updatedStep = { ...step, notes: newNote }
    onUpdateStep(updatedStep)
    onAddLog(step.id, "Notes Updated", "Step notes have been updated")
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingFile(true)
    try {
      // Upload file to Supabase storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${incidentId}/${step.id}/${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage.from("incident-evidence").upload(fileName, file)

      if (error) throw error

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("incident-evidence").getPublicUrl(fileName)

      // Add to evidence list
      const evidence = {
        id: Date.now().toString(),
        filename: file.name,
        fileUrl: publicUrl,
        uploadedAt: new Date().toISOString(),
        uploadedBy: "Current User",
        fileType: file.type,
        fileSize: file.size,
      }

      const updatedStep = {
        ...step,
        evidence: [...step.evidence, evidence],
      }

      onUpdateStep(updatedStep)
      onAddLog(step.id, "Evidence Uploaded", `File uploaded: ${file.name}`)
    } catch (error) {
      console.error("Error uploading file:", error)
    } finally {
      setUploadingFile(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <step.icon className={`h-6 w-6 ${step.color}`} />
            <div>
              <CardTitle>{step.name}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                step.status === "completed" ? "default" : step.status === "in-progress" ? "secondary" : "outline"
              }
            >
              {step.status.replace("-", " ").toUpperCase()}
            </Badge>
            {canEdit && (
              <div className="flex gap-1">
                {step.status === "pending" && (
                  <Button size="sm" onClick={() => handleStatusChange("in-progress")}>
                    <Play className="h-4 w-4 mr-1" />
                    Start
                  </Button>
                )}
                {step.status === "in-progress" && (
                  <Button size="sm" onClick={() => handleStatusChange("completed")}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Complete
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template/Guidance */}
        <div>
          <h4 className="font-medium text-gray-100 mb-3">Step Guidance</h4>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <ul className="space-y-2">
              {step.template.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-blue-400 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-100">Actions</h4>
            {canEdit && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add new action..."
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  className="w-64"
                  onKeyPress={(e) => e.key === "Enter" && handleAddAction()}
                />
                <Button size="sm" onClick={handleAddAction}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="space-y-2">
            {step.actions.length === 0 ? (
              <p className="text-gray-400 text-sm">No actions added yet</p>
            ) : (
              step.actions.map((action) => (
                <div key={action.id} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                  <Checkbox
                    checked={action.completed}
                    onCheckedChange={() => handleToggleAction(action.id)}
                    disabled={!canEdit}
                  />
                  <span className={`flex-1 ${action.completed ? "line-through text-gray-400" : "text-gray-200"}`}>
                    {action.description}
                  </span>
                  {action.completed && action.completedAt && (
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {action.completedBy}
                      <Calendar className="h-3 w-3 ml-2" />
                      {new Date(action.completedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 className="font-medium text-gray-100 mb-3">Notes</h4>
          <Textarea
            placeholder="Add notes about this step..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onBlur={handleNotesUpdate}
            disabled={!canEdit}
            className="min-h-[100px]"
          />
        </div>

        {/* Evidence & Files */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-100">Evidence & Files</h4>
            {canEdit && (
              <div>
                <input
                  type="file"
                  id={`file-upload-${step.id}`}
                  className="hidden"
                  onChange={handleFileUpload}
                  multiple
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => document.getElementById(`file-upload-${step.id}`)?.click()}
                  disabled={uploadingFile}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  {uploadingFile ? "Uploading..." : "Upload"}
                </Button>
              </div>
            )}
          </div>
          <div className="space-y-2">
            {step.evidence.length === 0 ? (
              <p className="text-gray-400 text-sm">No evidence uploaded yet</p>
            ) : (
              step.evidence.map((evidence) => (
                <div key={evidence.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-200">{evidence.filename}</p>
                      <p className="text-xs text-gray-400">
                        Uploaded by {evidence.uploadedBy} on {new Date(evidence.uploadedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" asChild>
                    <a href={evidence.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity Logs */}
        <div>
          <h4 className="font-medium text-gray-100 mb-3">Activity Logs</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {step.logs.length === 0 ? (
              <p className="text-gray-400 text-sm">No activity logs yet</p>
            ) : (
              step.logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-800/20 rounded-lg">
                  <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-200">{log.action}</span>
                      <span className="text-xs text-gray-400">by {log.user}</span>
                    </div>
                    <p className="text-sm text-gray-300">{log.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(log.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
