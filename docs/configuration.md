# ⚙️ Configuration Guide

This guide explains how to configure Safe Shield for different environments and use cases.

## 📋 Table of Contents

- [Environment Variables](#environment-variables)
- [Database Configuration](#database-configuration)
- [Authentication Setup](#authentication-setup)
- [Email Configuration](#email-configuration)
- [File Storage](#file-storage)
- [Security Settings](#security-settings)
- [Performance Tuning](#performance-tuning)
- [Environment-Specific Configs](#environment-specific-configs)

## 🔧 Environment Variables

Safe Shield uses environment variables for configuration. Create a `.env.local` file in the root directory:

```bash
# Application
NODE_ENV=development
PORT=3000
HOST=localhost

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/safeshield

# Authentication
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@safeshield.com

# File Storage
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,png,jpg,jpeg,txt

# Security
JWT_SECRET=your-jwt-secret-key
SESSION_SECRET=your-session-secret
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# Performance
CACHE_TTL=3600
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

## 🗄️ Database Configuration

### PostgreSQL (Recommended)

```bash
# PostgreSQL connection string
DATABASE_URL=postgresql://username:password@host:port/database

# Example
DATABASE_URL=postgresql://safeshield:password123@localhost:5432/safeshield
```

### MySQL

```bash
# MySQL connection string
DATABASE_URL=mysql://username:password@host:port/database

# Example
DATABASE_URL=mysql://safeshield:password123@localhost:3306/safeshield
```

### SQLite (Development)

```bash
# SQLite connection string
DATABASE_URL=file:./dev.db

# Example
DATABASE_URL=file:./safe-shield-dev.db
```

### Database Setup

1. **Create database**
   ```sql
   CREATE DATABASE safeshield;
   CREATE USER safeshield WITH PASSWORD 'password123';
   GRANT ALL PRIVILEGES ON DATABASE safeshield TO safeshield;
   ```

2. **Run migrations**
   ```bash
   npm run db:migrate
   ```

3. **Seed initial data**
   ```bash
   npm run db:seed
   ```

## 🔐 Authentication Setup

### JWT Configuration

```bash
# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here

# JWT Expiration (in seconds)
JWT_EXPIRES_IN=86400  # 24 hours

# Refresh Token Expiration
JWT_REFRESH_EXPIRES_IN=604800  # 7 days
```

### NextAuth Configuration

```bash
# NextAuth Secret
NEXTAUTH_SECRET=your-nextauth-secret-key

# NextAuth URL
NEXTAUTH_URL=http://localhost:3000

# Session Strategy
NEXTAUTH_SESSION_STRATEGY=jwt
```

### Custom Authentication Providers

#### Google OAuth

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### GitHub OAuth

```bash
# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

#### LDAP Authentication

```bash
# LDAP Configuration
LDAP_URL=ldap://ldap.example.com:389
LDAP_BIND_DN=cn=admin,dc=example,dc=com
LDAP_BIND_PASSWORD=admin-password
LDAP_BASE_DN=dc=example,dc=com
LDAP_USER_FILTER=(uid={{username}})
```

## 📧 Email Configuration

### SMTP Settings

```bash
# SMTP Server
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false  # true for 465, false for other ports

# SMTP Authentication
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email Settings
SMTP_FROM=noreply@safeshield.com
SMTP_FROM_NAME=Safe Shield
```

### Email Templates

Configure email templates for:

- **Welcome emails**: New user registration
- **Password reset**: Password recovery
- **Incident notifications**: Alert team members
- **Report delivery**: Send generated reports

### Email Providers

#### Gmail

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### Outlook/Hotmail

```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### SendGrid

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
```

## 📁 File Storage

### Local Storage

```bash
# Upload directory
UPLOAD_DIR=./uploads

# File size limits
MAX_FILE_SIZE=10485760  # 10MB

# Allowed file types
ALLOWED_FILE_TYPES=pdf,doc,docx,png,jpg,jpeg,txt,zip
```

### Cloud Storage

#### AWS S3

```bash
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=safeshield-uploads
AWS_S3_ENDPOINT=https://s3.amazonaws.com
```

#### Google Cloud Storage

```bash
# Google Cloud Storage
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_BUCKET=safeshield-uploads
GOOGLE_CLOUD_KEY_FILE=path/to/service-account.json
```

#### Azure Blob Storage

```bash
# Azure Blob Storage
AZURE_STORAGE_ACCOUNT=your-storage-account
AZURE_STORAGE_KEY=your-storage-key
AZURE_STORAGE_CONTAINER=safeshield-uploads
```

## 🔒 Security Settings

### CORS Configuration

```bash
# CORS Origins (comma-separated)
CORS_ORIGIN=http://localhost:3000,https://yourdomain.com

# CORS Methods
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS

# CORS Headers
CORS_HEADERS=Content-Type,Authorization
```

### Rate Limiting

```bash
# Rate limiting settings
RATE_LIMIT_WINDOW=900000  # 15 minutes in milliseconds
RATE_LIMIT_MAX=100  # Maximum requests per window
RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS=false
```

### Session Security

```bash
# Session configuration
SESSION_SECRET=your-session-secret-key
SESSION_COOKIE_SECURE=true  # HTTPS only
SESSION_COOKIE_HTTPONLY=true
SESSION_COOKIE_SAMESITE=strict
SESSION_MAX_AGE=86400  # 24 hours
```

### Password Policy

```bash
# Password requirements
PASSWORD_MIN_LENGTH=8
PASSWORD_REQUIRE_UPPERCASE=true
PASSWORD_REQUIRE_LOWERCASE=true
PASSWORD_REQUIRE_NUMBERS=true
PASSWORD_REQUIRE_SYMBOLS=true
```

## ⚡ Performance Tuning

### Caching

```bash
# Cache settings
CACHE_TTL=3600  # 1 hour
CACHE_MAX_SIZE=1000
CACHE_CHECK_PERIOD=600  # 10 minutes
```

### Database Connection Pool

```bash
# Database pool settings
DB_POOL_MIN=2
DB_POOL_MAX=10
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
```

### File Upload Limits

```bash
# Upload limits
MAX_FILE_SIZE=10485760  # 10MB
MAX_FILES_PER_REQUEST=10
UPLOAD_TIMEOUT=300000  # 5 minutes
```

### Memory Management

```bash
# Node.js memory settings
NODE_OPTIONS=--max-old-space-size=4096
```

## 🌍 Environment-Specific Configs

### Development Environment

Create `.env.development`:

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=file:./dev.db
NEXTAUTH_URL=http://localhost:3000
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:3000
```

### Production Environment

Create `.env.production`:

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/safeshield
NEXTAUTH_URL=https://yourdomain.com
LOG_LEVEL=warn
CORS_ORIGIN=https://yourdomain.com
SESSION_COOKIE_SECURE=true
```

### Testing Environment

Create `.env.test`:

```bash
NODE_ENV=test
PORT=3001
DATABASE_URL=file:./test.db
NEXTAUTH_URL=http://localhost:3001
LOG_LEVEL=error
```

## 🔄 Configuration Management

### Environment File Priority

Safe Shield loads configuration in this order:

1. `.env.local` (highest priority)
2. `.env.development` (development only)
3. `.env.production` (production only)
4. `.env.test` (testing only)
5. `.env` (fallback)

### Configuration Validation

Safe Shield validates configuration on startup:

```bash
# Check configuration
npm run config:validate

# Test database connection
npm run config:test-db

# Verify email settings
npm run config:test-email
```

### Configuration Reload

Some configuration changes require restart:

- **Database settings**: Restart required
- **Authentication settings**: Restart required
- **Email settings**: Restart required
- **File storage**: Restart required

## 🚨 Security Best Practices

### Secrets Management

1. **Never commit secrets to version control**
   ```bash
   # Add to .gitignore
   .env*
   *.key
   *.pem
   ```

2. **Use environment variables for secrets**
   ```bash
   # Good
   DATABASE_URL=postgresql://user:password@host:5432/db
   
   # Bad (hardcoded)
   const dbUrl = "postgresql://user:password@host:5432/db"
   ```

3. **Rotate secrets regularly**
   - Change database passwords monthly
   - Rotate JWT secrets quarterly
   - Update API keys as needed

### Network Security

1. **Use HTTPS in production**
   ```bash
   SESSION_COOKIE_SECURE=true
   CORS_ORIGIN=https://yourdomain.com
   ```

2. **Configure firewall rules**
   - Allow only necessary ports
   - Restrict database access
   - Use VPN for admin access

3. **Monitor access logs**
   - Enable detailed logging
   - Set up log monitoring
   - Review access patterns

## 📞 Support

For configuration help:

- **Email**: enockccg28@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/enock-niyonsaba/safe-shield/issues)
- **Documentation**: [Full documentation](../README.md)

---

**Last Updated**: January 2024  
**Version**: 1.0.0 