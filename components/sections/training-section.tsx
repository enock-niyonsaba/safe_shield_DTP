import { BookOpen, Play, Users, Shield, AlertTriangle, Lock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const trainingModules = [
  {
    title: "Incident Response Fundamentals",
    description:
      "Master the NIST Cybersecurity Framework and incident response lifecycle. Learn detection, analysis, containment, eradication, and recovery procedures.",
    duration: "3 hours",
    level: "Beginner",
    icon: BookOpen,
    videoSource: "ITProTV - Incident Response Fundamentals",
    topics: ["NIST Framework", "Incident Classification", "Response Team Roles", "Documentation Standards"],
    href: "/training/incident-response",
  },
  {
    title: "Advanced Threat Hunting",
    description:
      "Proactive threat hunting techniques using SIEM, EDR tools, and threat intelligence. Learn to identify advanced persistent threats (APTs).",
    duration: "4 hours",
    level: "Advanced",
    icon: Eye,
    videoSource: "SANS Cyber Aces - Threat Hunting",
    topics: ["MITRE ATT&CK Framework", "IOC Analysis", "Behavioral Analytics", "Threat Intelligence"],
    href: "/training/threat-hunting",
  },
  {
    title: "Network Security Monitoring",
    description:
      "Monitor network traffic, detect anomalies, and respond to network-based attacks. Hands-on with Wireshark and network analysis tools.",
    duration: "3.5 hours",
    level: "Intermediate",
    icon: Shield,
    videoSource: "Cybrary - Network Security Monitoring",
    topics: ["Traffic Analysis", "Intrusion Detection", "Network Forensics", "Packet Capture"],
    href: "/training/network-monitoring",
  },
  {
    title: "Malware Analysis & Reverse Engineering",
    description:
      "Static and dynamic malware analysis techniques. Learn to analyze suspicious files and understand malware behavior patterns.",
    duration: "5 hours",
    level: "Advanced",
    icon: AlertTriangle,
    videoSource: "Practical Malware Analysis Course",
    topics: ["Static Analysis", "Dynamic Analysis", "Sandbox Environments", "Behavioral Analysis"],
    href: "/training/malware-analysis",
  },
  {
    title: "Digital Forensics Essentials",
    description:
      "Evidence collection, preservation, and analysis. Learn forensic tools and techniques for incident investigation.",
    duration: "4 hours",
    level: "Intermediate",
    icon: Lock,
    videoSource: "DFIR Training - Digital Forensics",
    topics: ["Evidence Handling", "File System Analysis", "Memory Forensics", "Timeline Analysis"],
    href: "/training/digital-forensics",
  },
  {
    title: "Security Awareness & Phishing Defense",
    description:
      "Recognize social engineering attacks, phishing campaigns, and train end users on security best practices.",
    duration: "2 hours",
    level: "Beginner",
    icon: Users,
    videoSource: "KnowBe4 Security Awareness Training",
    topics: ["Phishing Recognition", "Social Engineering", "Password Security", "Safe Browsing"],
    href: "/training/security-awareness",
  },
]

const safetyTips = [
  {
    title: "Secure Workspace Guidelines",
    tips: [
      "Always lock your workstation when stepping away (Windows + L)",
      "Use encrypted storage for sensitive security data and evidence",
      "Implement clean desk policy - no sensitive information visible",
      "Use privacy screens when working in public areas",
    ],
  },
  {
    title: "Communication Security",
    tips: [
      "Use encrypted channels for discussing security incidents",
      "Avoid discussing sensitive security matters in public spaces",
      "Verify identity before sharing incident details over phone/email",
      "Use secure file sharing platforms for evidence exchange",
    ],
  },
  {
    title: "Tool & System Safety",
    tips: [
      "Always use isolated environments for malware analysis",
      "Regularly update security tools and maintain current signatures",
      "Follow proper evidence handling procedures to maintain chain of custody",
      "Use VPN when accessing security systems remotely",
    ],
  },
]

export default function TrainingSection() {
  return (
    <section id="training" className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Security Team Training Hub</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive cybersecurity training modules to enhance our team's skills and incident response capabilities
          </p>
        </div>

        {/* Training Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trainingModules.map((module, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                    <module.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-100">{module.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{module.level}</span>
                      <span className="text-xs text-gray-400">{module.duration}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 mb-3">{module.description}</CardDescription>
                <div className="mb-3">
                  <p className="text-xs text-blue-400 mb-2">Video Source: {module.videoSource}</p>
                  <div className="flex flex-wrap gap-1">
                    {module.topics.map((topic, idx) => (
                      <span key={idx} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <Link href={module.href}>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Play className="mr-2 h-4 w-4" />
                    Start Training
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Guidelines */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-100 mb-8 text-center">Workplace Safety Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {safetyTips.map((category, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-100 flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-green-400" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Emergency Contacts & Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-200 mb-2">Security Team Contacts</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>SOC Manager: ext. 2001 (24/7)</li>
                <li>Incident Response Lead: ext. 2002</li>
                <li>IT Security Coordinator: ext. 2003</li>
                <li>Emergency Escalation: ext. 911</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-200 mb-2">Key Resources</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>Incident Response Playbook: /docs/ir-playbook</li>
                <li>Security Policies: /policies/security</li>
                <li>Tool Documentation: /docs/tools</li>
                <li>Training Materials: /training/materials</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Play className="mr-2 h-5 w-5" />
              Start Training Program
            </Button>
            <Button size="lg" variant="outline">
              <BookOpen className="mr-2 h-5 w-5" />
              Access All Materials
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
