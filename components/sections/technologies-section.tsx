import { ExternalLink } from "lucide-react"

const technologies = [
  {
    name: "Next.js",
    description: "React framework for production",
    website: "https://nextjs.org",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    description: "Typed JavaScript at scale",
    website: "https://www.typescriptlang.org",
    category: "Language",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
    website: "https://tailwindcss.com",
    category: "Styling",
  },
  {
    name: "Recharts",
    description: "Composable charting library",
    website: "https://recharts.org",
    category: "Visualization",
  },
  {
    name: "Nmap",
    description: "Network discovery and security auditing",
    website: "https://nmap.org",
    category: "Security Tool",
  },
  {
    name: "Metasploit",
    description: "Penetration testing framework",
    website: "https://www.metasploit.com",
    category: "Security Tool",
  },
  {
    name: "OWASP ZAP",
    description: "Web application security scanner",
    website: "https://www.zaproxy.org",
    category: "Security Tool",
  },
  {
    name: "Burp Suite",
    description: "Web vulnerability scanner",
    website: "https://portswigger.net/burp",
    category: "Security Tool",
  },
]

export default function TechnologiesSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Built with Industry-Leading Technologies
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Powered by modern web technologies and integrated with essential cybersecurity tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{tech.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-100 mb-2">{tech.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{tech.description}</p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      tech.category === "Security Tool"
                        ? "bg-red-900/30 text-red-400"
                        : tech.category === "Frontend"
                          ? "bg-blue-900/30 text-blue-400"
                          : tech.category === "Language"
                            ? "bg-green-900/30 text-green-400"
                            : tech.category === "Styling"
                              ? "bg-purple-900/30 text-purple-400"
                              : "bg-yellow-900/30 text-yellow-400"
                    }`}
                  >
                    {tech.category}
                  </span>
                  <a
                    href={tech.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-900/30 border border-blue-700 rounded-lg px-6 py-3">
            <span className="text-sm text-blue-300">
              <strong>Coming Soon:</strong> Live Threat Feed Integration, Endpoint Agents, SIEM Integration, and Voice
              Evidence Support
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-100 mb-2">Security Standards</h4>
            <p className="text-sm text-gray-400">NIST Cybersecurity Framework, ISO 27001, OWASP Top 10</p>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-100 mb-2">Compliance</h4>
            <p className="text-sm text-gray-400">SOC 2, GDPR, HIPAA, PCI DSS</p>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-100 mb-2">Integration APIs</h4>
            <p className="text-sm text-gray-400">MISP, STIX/TAXII, REST APIs, Webhooks</p>
          </div>
        </div>
      </div>
    </section>
  )
}
