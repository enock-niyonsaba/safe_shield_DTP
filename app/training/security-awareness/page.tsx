"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Play, BookOpen, CheckCircle, Clock, Users, Shield, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const modules = [
  {
    id: 1,
    title: "Security Awareness Fundamentals",
    duration: "15 min",
    type: "video",
    completed: true,
    description: "Understanding the human element in cybersecurity and common attack vectors",
  },
  {
    id: 2,
    title: "Phishing Recognition",
    duration: "20 min",
    type: "interactive",
    completed: true,
    description: "Identifying phishing emails, websites, and social engineering attempts",
  },
  {
    id: 3,
    title: "Password Security",
    duration: "18 min",
    type: "video",
    completed: false,
    description: "Creating strong passwords and using password managers effectively",
  },
  {
    id: 4,
    title: "Social Engineering Defense",
    duration: "25 min",
    type: "practical",
    completed: false,
    description: "Recognizing and defending against social engineering attacks",
  },
  {
    id: 5,
    title: "Safe Browsing Practices",
    duration: "15 min",
    type: "video",
    completed: false,
    description: "Secure web browsing and avoiding malicious websites",
  },
  {
    id: 6,
    title: "Mobile Device Security",
    duration: "20 min",
    type: "interactive",
    completed: false,
    description: "Securing smartphones, tablets, and mobile applications",
  },
  {
    id: 7,
    title: "Incident Reporting",
    duration: "12 min",
    type: "practical",
    completed: false,
    description: "How and when to report security incidents and suspicious activities",
  },
]

const securityTips = [
  {
    category: "Email Security",
    tips: [
      "Verify sender identity before clicking links or attachments",
      "Look for spelling errors and suspicious domains",
      "Be cautious of urgent or threatening language",
      "Use email filtering and anti-phishing tools",
    ],
  },
  {
    category: "Password Management",
    tips: [
      "Use unique passwords for each account",
      "Enable two-factor authentication when available",
      "Use a reputable password manager",
      "Avoid sharing passwords or writing them down",
    ],
  },
  {
    category: "Physical Security",
    tips: [
      "Lock your workstation when away",
      "Don't leave sensitive documents visible",
      "Be aware of shoulder surfing",
      "Secure mobile devices and laptops",
    ],
  },
]

const phishingExamples = [
  {
    type: "Urgent Action Required",
    description: "Emails claiming immediate action needed to avoid account closure",
    redFlags: ["Urgent language", "Threats", "Generic greetings", "Suspicious links"],
  },
  {
    type: "Prize/Lottery Scams",
    description: "Notifications about winning prizes or lotteries you never entered",
    redFlags: ["Unexpected winnings", "Request for fees", "Poor grammar", "Unknown sender"],
  },
  {
    type: "Tech Support Scams",
    description: "Fake technical support claiming your computer is infected",
    redFlags: ["Unsolicited contact", "Scare tactics", "Remote access requests", "Payment demands"],
  },
  {
    type: "Business Email Compromise",
    description: "Emails impersonating executives or vendors requesting transfers",
    redFlags: ["Unusual requests", "Urgency", "Different email patterns", "Financial requests"],
  },
]

export default function SecurityAwarenessTraining() {
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
              <h1 className="text-3xl font-bold text-gray-100">Security Awareness & Phishing Defense</h1>
              <p className="text-gray-400 mt-1">
                Recognize social engineering attacks and train end users on security best practices
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-cyan-400">
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
                    className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
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
                    <Mail className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">
                      {modules.find((m) => m.id === currentModule)?.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{modules.find((m) => m.id === currentModule)?.description}</p>
                    <Button className="bg-cyan-600 hover:bg-cyan-700">
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
                      <span className="text-sm bg-cyan-900/30 text-cyan-400 px-2 py-1 rounded">
                        {modules.find((m) => m.id === currentModule)?.type}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Security Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phishing Examples */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Common Phishing Techniques</CardTitle>
                <CardDescription>Learn to recognize these common phishing attack patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {phishingExamples.map((example, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-gray-100 mb-2 flex items-center">
                        <Mail className="h-4 w-4 text-red-400 mr-2" />
                        {example.type}
                      </h4>
                      <p className="text-sm text-gray-400 mb-3">{example.description}</p>
                      <div>
                        <span className="text-xs text-gray-500 mb-2 block">Red Flags:</span>
                        <div className="flex flex-wrap gap-2">
                          {example.redFlags.map((flag, idx) => (
                            <span key={idx} className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded">
                              {flag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Tips */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Security Best Practices</CardTitle>
                <CardDescription>Essential security practices for daily work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {securityTips.map((category, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <Shield className="h-4 w-4 text-cyan-400 mr-2" />
                        {category.category}
                      </h4>
                      <ul className="space-y-2">
                        {category.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-300">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
                      currentModule === module.id ? "bg-cyan-600/20 border border-cyan-600" : "hover:bg-gray-700/50"
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

            {/* Quick Reference */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Quick Reference</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-200 mb-2">Report Suspicious Activity</h4>
                  <p className="text-xs text-gray-400">security-team@company.com</p>
                  <p className="text-xs text-gray-400">ext. 2001 (24/7)</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-200 mb-2">IT Support</h4>
                  <p className="text-xs text-gray-400">it-support@company.com</p>
                  <p className="text-xs text-gray-400">ext. 3000</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-200 mb-2">Emergency</h4>
                  <p className="text-xs text-gray-400">ext. 911</p>
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
                  <span className="text-sm text-gray-300">Total Duration: 2 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Difficulty: Beginner</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Source: KnowBe4</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
