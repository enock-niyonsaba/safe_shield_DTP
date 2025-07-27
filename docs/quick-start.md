# ⚡ Quick Start Guide

Get Safe Shield up and running in 5 minutes! This guide will help you install, configure, and start using the platform quickly.

## 🎯 What You'll Learn

- Install Safe Shield on your system
- Create your first incident
- Generate a report
- Navigate the platform

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ Node.js 18.0+ installed
- ✅ npm 8.0+ installed
- ✅ Git installed
- ✅ 2GB free disk space

**Quick Check:**
```bash
node --version
npm --version
git --version
```

## 🚀 Installation (2 minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/enock-niyonsaba/safe-shield.git
cd safe-shield
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Application

```bash
npm run dev
```

### Step 4: Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the Safe Shield login page! 🎉

## 🔐 First Login (1 minute)

### Step 1: Access the Login Page

The login page will be displayed automatically.

### Step 2: Enter Credentials

For the demo, you can use:
- **Email**: `admin@safeshield.com`
- **Password**: `admin123`
- **Role**: `Security Analyst`

### Step 3: Sign In

Click "Sign In" to access the dashboard.

## 📊 Dashboard Overview (1 minute)

After login, you'll see the main dashboard with:

- **Key Metrics**: Active incidents, alerts, system health
- **Quick Actions**: Create incident, generate report, view logs
- **Recent Activity**: Latest incidents and updates
- **Navigation Sidebar**: Access all platform features

## 🚨 Create Your First Incident (1 minute)

### Step 1: Navigate to Incidents

Click "Incidents" in the sidebar.

### Step 2: Create New Incident

Click the "Create New Incident" button.

### Step 3: Fill in Details

```
Title: Test Security Incident
Type: Malware Detection
Severity: Medium
Description: This is a test incident to verify the platform functionality.
Reporter: [Your Name]
Assignee: [Your Name]
```

### Step 4: Save the Incident

Click "Create Incident" to save.

## 📈 Generate Your First Report (1 minute)

### Step 1: Navigate to Reports

Click "Report" in the sidebar.

### Step 2: Select Incident

Choose the incident you just created.

### Step 3: Fill Report Details

```
Title: Test Incident Report
Summary: Initial analysis of test security incident
Findings: Platform functionality verified successfully
Recommendations: Continue monitoring for real incidents
```

### Step 4: Generate Report

Click "Generate Report" to create your first report.

## 🎉 Congratulations!

You've successfully:
- ✅ Installed Safe Shield
- ✅ Logged into the platform
- ✅ Created your first incident
- ✅ Generated your first report

## 🚀 Next Steps

Now that you're familiar with the basics, explore these features:

### 🔍 Explore the Platform

1. **Dashboard**: Review metrics and recent activity
2. **Incidents**: Manage and track security incidents
3. **Tools**: Browse security tools catalog
4. **Logs**: View system security logs
5. **Chat**: Communicate with team members

### 📚 Learn More

- **User Manual**: [Complete user guide](./user-manual.md)
- **API Reference**: [Developer documentation](./api-reference.md)
- **Configuration**: [Advanced setup](./configuration.md)

### 🛠️ Customize Your Setup

1. **Configure Email**: Set up email notifications
2. **Add Users**: Create team member accounts
3. **Customize Roles**: Set up role-based permissions
4. **Integrate Tools**: Connect your security tools

## 🚨 Troubleshooting

### Common Issues

#### Can't Access the Application
```bash
# Check if the server is running
npm run dev

# Check the port
# Default: http://localhost:3000
# If port 3000 is busy, try: http://localhost:3001
```

#### Login Issues
- Verify you're using the correct credentials
- Check that the server is running
- Clear browser cache if needed

#### Missing Dependencies
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

If you encounter issues:

1. **Check the logs**: Look at the terminal output
2. **Search documentation**: Use the search function
3. **Create an issue**: [GitHub Issues](https://github.com/enock-niyonsaba/safe-shield/issues)
4. **Email support**: enockccg28@gmail.com

## 📞 Support

Need help getting started?

- **Email**: enockccg28@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/enock-niyonsaba/safe-shield/issues)
- **Documentation**: [Full documentation](../README.md)

---

**Time to Complete**: ~5 minutes  
**Difficulty**: Beginner  
**Last Updated**: January 2024 