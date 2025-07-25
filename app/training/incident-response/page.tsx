"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Play, BookOpen, CheckCircle, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const modules = [
  {
    id: 1,
    title: "Introduction to Incident Response",
    duration: "15 min",
    type: "video",
    completed: true,
    description: "Overview of cybersecurity incidents and the importance of structured response",
  },
  {
    id: 2,
    title: "NIST Cybersecurity Framework",
    duration: "25 min",
    type: "video",
    completed: true,
    description: "Understanding the five core functions: Identify, Protect, Detect, Respond, Recover",
  },
  {
    id: 3,
    title: "Incident Classification",
    duration: "20 min",
    type: "interactive",
    completed: false,
    description: "Learn to categorize incidents by type, severity, and impact",
  },
  {
    id: 4,
    title: "Response Team Roles",
    duration: "18 min",
    type: "video",
    completed: false,
    description: "Defining roles and responsibilities during incident response",
  },
  {
    id: 5,
    title: "Documentation Standards",
    duration: "22 min",
    type: "practical",
    completed: false,
    description: "Best practices for incident documentation and evidence preservation",
  },
  {
    id: 6,
    title: "Hands-on Exercise",
    duration: "45 min",
    type: "exercise",
    completed: false,
    description: "Simulated incident response scenario with real-world application",
  },
]

const keyTopics = [
  "Incident Response Lifecycle",
  "NIST Framework Implementation",
  "Threat Classification Systems",
  "Communication Protocols",
  "Evidence Handling Procedures",
  "Post-Incident Analysis",
]

export default function IncidentResponseTraining() {
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
              <h1 className="text-3xl font-bold text-gray-100">Incident Response Fundamentals</h1>
              <p className="text-gray-400 mt-1">
                Master the NIST Cybersecurity Framework and incident response lifecycle
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">
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
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                    <Play className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">
                      {modules.find((m) => m.id === currentModule)?.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{modules.find((m) => m.id === currentModule)?.description}</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
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
                      <span className="text-sm bg-blue-900/30 text-blue-400 px-2 py-1 rounded">
                        {modules.find((m) => m.id === currentModule)?.type}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Resources
                    </Button>
                  </div>
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
                      currentModule === module.id ? "bg-blue-600/20 border border-blue-600" : "hover:bg-gray-700/50"
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

            {/* Key Topics */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Key Topics Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {keyTopics.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span className="text-sm text-gray-300">{topic}</span>
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
                  <span className="text-sm text-gray-300">Total Duration: 3 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Difficulty: Beginner</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Source: ITProTV</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
