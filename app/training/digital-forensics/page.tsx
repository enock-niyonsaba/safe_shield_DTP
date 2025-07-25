"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Play, BookOpen, CheckCircle, Clock, Users, Lock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const modules = [
  {
    id: 1,
    title: "Digital Forensics Fundamentals",
    duration: "20 min",
    type: "video",
    completed: true,
    description: "Introduction to digital forensics principles and legal considerations",
  },
  {
    id: 2,
    title: "Evidence Collection & Preservation",
    duration: "30 min",
    type: "video",
    completed: true,
    description: "Proper procedures for collecting and preserving digital evidence",
  },
  {
    id: 3,
    title: "File System Analysis",
    duration: "35 min",
    type: "practical",
    completed: false,
    description: "Analyzing file systems and recovering deleted data",
  },
  {
    id: 4,
    title: "Memory Forensics",
    duration: "40 min",
    type: "interactive",
    completed: false,
    description: "RAM analysis and volatile data extraction techniques",
  },
  {
    id: 5,
    title: "Network Forensics",
    duration: "30 min",
    type: "video",
    completed: false,
    description: "Analyzing network traffic and communication patterns",
  },
  {
    id: 6,
    title: "Timeline Analysis",
    duration: "25 min",
    type: "practical",
    completed: false,
    description: "Creating and analyzing digital timelines of events",
  },
  {
    id: 7,
    title: "Forensics Lab Exercise",
    duration: "50 min",
    type: "lab",
    completed: false,
    description: "Complete forensic investigation of a simulated incident",
  },
]

const forensicsTools = [
  "Autopsy",
  "EnCase",
  "FTK (Forensic Toolkit)",
  "Volatility",
  "Sleuth Kit",
  "SANS SIFT",
  "X-Ways Forensics",
  "Cellebrite",
  "Oxygen Forensic Suite",
  "Magnet AXIOM",
]

const forensicsProcess = [
  {
    phase: "Identification",
    description: "Identify potential sources of digital evidence",
    activities: ["Scene assessment", "Device inventory", "Evidence prioritization"],
  },
  {
    phase: "Preservation",
    description: "Secure and preserve digital evidence",
    activities: ["Imaging", "Chain of custody", "Write protection"],
  },
  {
    phase: "Collection",
    description: "Collect evidence using forensically sound methods",
    activities: ["Bit-by-bit copying", "Hash verification", "Documentation"],
  },
  {
    phase: "Examination",
    description: "Examine evidence for relevant information",
    activities: ["File recovery", "Keyword searching", "Timeline creation"],
  },
  {
    phase: "Analysis",
    description: "Analyze findings and draw conclusions",
    activities: ["Pattern analysis", "Correlation", "Hypothesis testing"],
  },
  {
    phase: "Presentation",
    description: "Present findings in a clear, understandable format",
    activities: ["Report writing", "Expert testimony", "Visual aids"],
  },
]

export default function DigitalForensicsTraining() {
  const [currentModule, setCurrentModule] = useState(1)
  const completedModules = modules.filter((m) => m.completed).length

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/#training">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-100">Digital Forensics Essentials</h1>
              <p className="text-gray-400 mt-1">
                Evidence collection, preservation, and analysis for incident investigation
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-400">
              {completedModules}/{modules.length}
            </div>
            <div className="text-sm text-gray-400">Modules Completed</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Bar */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Course Progress</span>
                  <span className="text-sm text-gray-400">
                    {Math.round((completedModules / modules.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedModules / modules.length) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Video Player / Content Area */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-900 rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <Search className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">
                      {modules.find((m) => m.id === currentModule)?.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{modules.find((m) => m.id === currentModule)?.description}</p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Play className="h-4 w-4 mr-2" />
                      Start Module
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">
                        {modules.find((m) => m.id === currentModule)?.duration}
                      </span>
                      <span className="text-sm bg-purple-900/30 text-purple-400 px-2 py-1 rounded">
                        {modules.find((m) => m.id === currentModule)?.type}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-2" />
                      DFIR Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Forensics Process */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Digital Forensics Process</CardTitle>
                <CardDescription>Standard methodology for digital forensic investigations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forensicsProcess.map((phase, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <h4 className="font-medium text-gray-100">{phase.phase}</h4>
                      </div>
                      <p className="text-sm text-gray-400 mb-3 ml-11">{phase.description}</p>
                      <div className="ml-11">
                        <span className="text-xs text-gray-500 mb-2 block">Key Activities:</span>
                        <div className="flex flex-wrap gap-2">
                          {phase.activities.map((activity, idx) => (
                            <span key={idx} className="text-xs bg-purple-900/30 text-purple-400 px-2 py-1 rounded">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Legal Considerations */}
            <Card className="bg-blue-900/20 border-blue-700">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Legal & Ethical Considerations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-300">
                  <p>• Maintain proper chain of custody documentation</p>
                  <p>• Ensure forensic soundness of all procedures</p>
                  <p>• Respect privacy rights and legal boundaries</p>
                  <p>• Follow organizational policies and legal requirements</p>
                  <p>• Document all actions and maintain detailed logs</p>
                  <p>• Prepare for potential legal testimony</p>
                </div>
              </CardContent>
            </Card>

            {/* Module Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                disabled={currentModule === 1}
                onClick={() => setCurrentModule(Math.max(1, currentModule - 1))}
              >
                Previous Module
              </Button>
              <Button
                disabled={currentModule === modules.length}
                onClick={() => setCurrentModule(Math.min(modules.length, currentModule + 1))}
              >
                Next Module
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Modules */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Course Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setCurrentModule(module.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentModule === module.id ? "bg-purple-600/20 border border-purple-600" : "hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {module.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <div className="h-4 w-4 border border-gray-600 rounded-full" />
                        )}
                        <div>
                          <div className="font-medium text-gray-100 text-sm">{module.title}</div>
                          <div className="text-xs text-gray-400">{module.duration}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Forensics Tools */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Forensics Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {forensicsTools.map((tool, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      <span className="text-sm text-gray-300">{tool}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Info */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Total Duration: 4 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Difficulty: Intermediate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Source: DFIR Training</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
