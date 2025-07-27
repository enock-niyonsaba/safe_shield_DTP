# 🚀 Installation Guide

This guide will walk you through installing and setting up Safe Shield on your system.

## 📋 Prerequisites

Before installing Safe Shield, ensure you have the following:

### System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: Version 2.0 or higher
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: At least 2GB free disk space

### Verify Prerequisites

Check if you have the required software installed:

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

If any of these commands fail, install the missing software:

- **Node.js**: Download from [nodejs.org](https://nodejs.org/)
- **Git**: Download from [git-scm.com](https://git-scm.com/)

## 🔧 Installation Methods

### Method 1: Clone from GitHub (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/enock-niyonsaba/safe-shield.git
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

### Method 2: Download ZIP File

1. **Download the ZIP file**
   - Go to [GitHub repository](https://github.com/enock-niyonsaba/safe-shield)
   - Click "Code" → "Download ZIP"
   - Extract the ZIP file to your desired location

2. **Open terminal/command prompt**
   ```bash
   cd path/to/safe-shield
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database Configuration
DATABASE_URL="your-database-url"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email Configuration (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# File Upload (optional)
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE="10485760" # 10MB
```

### Default Configuration

Safe Shield works out of the box with default settings. You can customize:

- **Port**: Change the default port (3000) by setting `PORT` environment variable
- **Database**: Configure your preferred database
- **Authentication**: Set up custom authentication providers
- **File Storage**: Configure file upload settings

## 🐳 Docker Installation

### Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/enock-niyonsaba/safe-shield.git
   cd safe-shield
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   services:
     safe-shield:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - DATABASE_URL=postgresql://user:password@db:5432/safeshield
       depends_on:
         - db
     
     db:
       image: postgres:15
       environment:
         - POSTGRES_DB=safeshield
         - POSTGRES_USER=user
         - POSTGRES_PASSWORD=password
       volumes:
         - postgres_data:/var/lib/postgresql/data
   
   volumes:
     postgres_data:
   ```

3. **Build and run**
   ```bash
   docker-compose up --build
   ```

### Using Dockerfile

1. **Build the image**
   ```bash
   docker build -t safe-shield .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 safe-shield
   ```

## 🔒 Production Deployment

### Build for Production

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Environment-Specific Configurations

#### Development
```bash
NODE_ENV=development
npm run dev
```

#### Production
```bash
NODE_ENV=production
npm run build
npm start
```

#### Testing
```bash
NODE_ENV=test
npm test
```

## 🧪 Verification

After installation, verify that everything is working:

1. **Check the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - You should see the Safe Shield login page

2. **Test the login**
   - Use default credentials (if configured)
   - Or create a new account

3. **Verify features**
   - Navigate to different pages
   - Test incident creation
   - Check system logs

## 🚨 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Error: Port 3000 is already in use
# Solution: Use a different port
PORT=3001 npm run dev
```

#### Node Modules Issues
```bash
# Error: Module not found
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Build Errors
```bash
# Error: Build failed
# Solution: Clear cache and rebuild
npm run clean
npm run build
```

#### Permission Issues
```bash
# Error: Permission denied
# Solution: Fix permissions
sudo chown -R $USER:$USER .
```

### Getting Help

If you encounter issues:

1. **Check the logs**
   ```bash
   npm run dev 2>&1 | tee logs.txt
   ```

2. **Search existing issues**
   - Check [GitHub Issues](https://github.com/enock-niyonsaba/safe-shield/issues)

3. **Create a new issue**
   - Include error messages and system information
   - Provide steps to reproduce the problem

## 📞 Support

Need help with installation?

- **Email**: enockccg28@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/enock-niyonsaba/safe-shield/issues)
- **Documentation**: [Full documentation](../README.md)

---

**Next Steps**: After installation, read the [Quick Start Guide](./quick-start.md) to get up and running quickly. 