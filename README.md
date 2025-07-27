# 🛡️ Safe Shield - Cybersecurity Incident Management Platform

A modern, comprehensive cybersecurity incident management platform built with Next.js, designed to help security teams track, investigate, and resolve security incidents efficiently.

![Safe Shield Platform](https://img.shields.io/badge/Next.js-13.5.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Safe Shield is a comprehensive cybersecurity incident management platform that provides security teams with the tools they need to:

- **Track Security Incidents**: Monitor and manage security incidents from detection to resolution
- **Investigate Threats**: Analyze incident details, evidence, and timeline
- **Manage Tools**: Track security tools used in investigations
- **Generate Reports**: Create detailed incident reports
- **Monitor System Logs**: View and analyze system security logs
- **Collaborate**: Share information and updates with team members

## ✨ Features

### 🔐 Authentication & Security
- **Secure Login System**: Role-based authentication with user management
- **Session Management**: Secure session handling and user validation
- **Access Control**: Different permission levels for different user roles

### 📊 Dashboard
- **Real-time Overview**: Key metrics and incident statistics
- **Quick Actions**: Fast access to common tasks
- **Recent Activity**: Latest incidents and updates
- **System Health**: Current system status and alerts

### 🚨 Incident Management
- **Incident Tracking**: Create, update, and track security incidents
- **Severity Classification**: Categorize incidents by severity (Low, Medium, High, Critical)
- **Status Management**: Track incident status (Open, Investigating, Contained, Resolved, Closed)
- **Detailed Views**: Comprehensive incident details with timeline and evidence
- **Search & Filter**: Advanced search and filtering capabilities

### 🔍 Investigation Tools
- **Evidence Management**: Upload and organize incident evidence
- **Timeline Tracking**: Detailed incident timeline with user actions
- **Tool Integration**: Track security tools used in investigations
- **Collaboration**: Team member assignments and updates

### 📈 Reporting
- **Incident Reports**: Generate detailed incident reports
- **Evidence Documentation**: Document findings and evidence
- **Export Capabilities**: Export reports in various formats
- **Template System**: Pre-built report templates

### 🛠️ Security Tools Management
- **Tool Catalog**: Comprehensive list of security tools
- **Usage Tracking**: Monitor tool usage and effectiveness
- **Category Organization**: Tools organized by category
- **Effectiveness Ratings**: Track tool performance and impact

### 📝 System Logs
- **Log Monitoring**: Real-time system log monitoring
- **Security Events**: Track security-related events
- **Source Filtering**: Filter logs by source (Firewall, IDS, Web Server, etc.)
- **Severity Levels**: Log severity classification (Info, Warning, Error, Critical)

### 💬 Communication
- **Chat System**: Real-time communication between team members
- **Incident Discussions**: Threaded conversations for specific incidents
- **File Sharing**: Share evidence and documents
- **Notifications**: Real-time notifications for updates

## 🖼️ Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/1f2937/ffffff?text=Safe+Shield+Dashboard)

### Incident Management
![Incident Management](https://via.placeholder.com/800x400/1f2937/ffffff?text=Incident+Management)

### Incident Details
![Incident Details](https://via.placeholder.com/800x400/1f2937/ffffff?text=Incident+Details)

## 🛠️ Tech Stack

### Frontend
- **Next.js 13.5.1**: React framework with App Router
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **TypeScript**: Type-safe server-side code

### Development Tools
- **ESLint**: Code linting and quality
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 🚀 Installation

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/safe-shield.git
   cd safe-shield
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 📖 Usage

### Getting Started

1. **Login to the Platform**
   - Navigate to the login page
   - Enter your credentials
   - Select your role (Security Analyst, Incident Manager, etc.)

2. **Dashboard Overview**
   - View key metrics and recent incidents
   - Access quick actions and system status
   - Monitor real-time alerts

### Managing Incidents

1. **Create a New Incident**
   - Navigate to the Incidents page
   - Click "Create New Incident"
   - Fill in incident details (title, description, severity, etc.)
   - Assign team members and set priority

2. **Investigate an Incident**
   - Click on an incident to view details
   - Review the incident timeline
   - Upload evidence and documentation
   - Update incident status as you progress

3. **Track Investigation Progress**
   - Use the timeline to record actions taken
   - Document findings and evidence
   - Update incident status (Open → Investigating → Contained → Resolved)

### Using Security Tools

1. **Browse Tools**
   - Navigate to the Tools page
   - Browse tools by category
   - View tool descriptions and effectiveness ratings

2. **Track Tool Usage**
   - Record tools used in investigations
   - Document tool effectiveness
   - Maintain a catalog of available tools

### Generating Reports

1. **Create Incident Reports**
   - Navigate to the Report page
   - Select incident details
   - Add evidence and findings
   - Generate comprehensive reports

2. **Export and Share**
   - Export reports in various formats
   - Share with stakeholders
   - Maintain report history

### Monitoring System Logs

1. **View System Logs**
   - Navigate to the Logs page
   - Monitor real-time security events
   - Filter logs by source and severity

2. **Analyze Security Events**
   - Search for specific events
   - Track patterns and trends
   - Identify potential threats

## 📁 Project Structure

```
safe_shield/
├── app/                          # Next.js App Router pages
│   ├── chat/                     # Chat system
│   ├── dashboard/                # Main dashboard
│   ├── incidents/                # Incident management
│   │   └── [id]/                 # Dynamic incident detail pages
│   ├── logs/                     # System logs
│   ├── login/                    # Authentication
│   ├── report/                   # Report generation
│   └── tools/                    # Security tools management
├── components/                   # Reusable React components
│   ├── layout/                   # Layout components
│   └── ui/                       # UI components (Radix UI)
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── types/                        # TypeScript type definitions
└── public/                       # Static assets
```

## 🔌 API Documentation

### Authentication Endpoints

```typescript
// Login
POST /api/auth/login
{
  email: string,
  password: string,
  role: string
}

// Logout
POST /api/auth/logout
```

### Incident Endpoints

```typescript
// Get all incidents
GET /api/incidents

// Get incident by ID
GET /api/incidents/[id]

// Create incident
POST /api/incidents
{
  title: string,
  description: string,
  severity: 'Low' | 'Medium' | 'High' | 'Critical',
  status: 'Open' | 'Investigating' | 'Contained' | 'Resolved' | 'Closed'
}

// Update incident
PUT /api/incidents/[id]

// Delete incident
DELETE /api/incidents/[id]
```

### Tools Endpoints

```typescript
// Get all tools
GET /api/tools

// Create tool
POST /api/tools
{
  name: string,
  description: string,
  category: string,
  effectiveness: 'Low' | 'Medium' | 'High' | 'Critical'
}
```

## 🤝 Contributing

We welcome contributions to Safe Shield! Here's how you can help:

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm test
   ```
5. **Submit a pull request**

### Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing code structure

### Reporting Issues

- Use the GitHub issue tracker
- Provide detailed bug reports
- Include steps to reproduce
- Add screenshots when relevant

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon library

## 📞 Support

- **Documentation**: [docs.safeshield.com](https://docs.safeshield.com)
- **Issues**: [GitHub Issues](https://github.com/enock-niyonsaba/safe-shield/issues)
- **Discussions**: [GitHub Discussions](https://github.com/enock-niyonsaba/safe-shield/discussions)
- **Email**: enockccg28@gmail.com

---

**Made with ❤️ for the cybersecurity community**

*Safe Shield - Protecting digital assets, one incident at a time.* 