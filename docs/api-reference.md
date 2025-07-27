# 🔌 API Reference

This document provides a comprehensive reference for all Safe Shield API endpoints, including request/response formats, authentication, and examples.

## 📋 Table of Contents

- [Authentication](#authentication)
- [Base URL](#base-url)
- [Error Handling](#error-handling)
- [Endpoints](#endpoints)
  - [Authentication](#authentication-endpoints)
  - [Incidents](#incident-endpoints)
  - [Tools](#tool-endpoints)
  - [Reports](#report-endpoints)
  - [Logs](#log-endpoints)
  - [Users](#user-endpoints)

## 🔐 Authentication

Safe Shield uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Getting a Token

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "Security Analyst"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "role": "Security Analyst",
    "name": "John Doe"
  }
}
```

## 🌐 Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

## ❌ Error Handling

All API endpoints return consistent error responses:

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Email is required"
    }
  }
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `UNAUTHORIZED` | Invalid or missing authentication | 401 |
| `FORBIDDEN` | Insufficient permissions | 403 |
| `NOT_FOUND` | Resource not found | 404 |
| `VALIDATION_ERROR` | Invalid input data | 400 |
| `INTERNAL_ERROR` | Server error | 500 |

## 📡 Endpoints

### 🔐 Authentication Endpoints

#### Login User

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "Security Analyst"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "role": "Security Analyst",
    "name": "John Doe"
  }
}
```

#### Logout User

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

#### Refresh Token

```http
POST /api/auth/refresh
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 🚨 Incident Endpoints

#### Get All Incidents

```http
GET /api/incidents
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number): Page number for pagination
- `limit` (number): Number of items per page
- `search` (string): Search term for incident title or ID
- `severity` (string): Filter by severity (Low, Medium, High, Critical)
- `status` (string): Filter by status (Open, Investigating, Contained, Resolved, Closed)

**Response:**
```json
{
  "success": true,
  "data": {
    "incidents": [
      {
        "id": "INC-2024-001",
        "title": "Suspicious SQL Injection Attempt",
        "type": "SQL Injection",
        "severity": "High",
        "status": "Investigating",
        "description": "Multiple SQL injection attempts detected...",
        "reporter": "John Doe",
        "assignee": "Jane Smith",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T12:15:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

#### Get Incident by ID

```http
GET /api/incidents/{id}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "INC-2024-001",
    "title": "Suspicious SQL Injection Attempt",
    "type": "SQL Injection",
    "severity": "High",
    "status": "Investigating",
    "description": "Multiple SQL injection attempts detected...",
    "reporter": "John Doe",
    "assignee": "Jane Smith",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T12:15:00Z",
    "toolsUsed": [
      {
        "id": "1",
        "name": "Burp Suite",
        "description": "Used for intercepting and analyzing HTTP requests",
        "impact": "Confirmed presence of SQL injection vulnerability"
      }
    ],
    "evidence": [
      {
        "id": "1",
        "type": "image",
        "name": "burp-suite-analysis.png",
        "url": "/uploads/evidence/burp-suite-analysis.png"
      }
    ],
    "timeline": [
      {
        "id": "1",
        "timestamp": "2024-01-15T10:30:00Z",
        "action": "Incident Detected",
        "description": "Automated monitoring system detected suspicious SQL queries",
        "user": "System",
        "type": "detection"
      }
    ]
  }
}
```

#### Create Incident

```http
POST /api/incidents
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Security Incident",
  "type": "Malware Detection",
  "severity": "High",
  "description": "Suspicious malware detected on endpoint",
  "reporter": "John Doe",
  "assignee": "Jane Smith"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "INC-2024-002",
    "title": "New Security Incident",
    "type": "Malware Detection",
    "severity": "High",
    "status": "Open",
    "description": "Suspicious malware detected on endpoint",
    "reporter": "John Doe",
    "assignee": "Jane Smith",
    "createdAt": "2024-01-15T14:30:00Z",
    "updatedAt": "2024-01-15T14:30:00Z"
  }
}
```

#### Update Incident

```http
PUT /api/incidents/{id}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "Investigating",
  "description": "Updated description with new findings",
  "assignee": "Mike Johnson"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "INC-2024-001",
    "title": "Suspicious SQL Injection Attempt",
    "status": "Investigating",
    "description": "Updated description with new findings",
    "assignee": "Mike Johnson",
    "updatedAt": "2024-01-15T15:30:00Z"
  }
}
```

#### Delete Incident

```http
DELETE /api/incidents/{id}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Incident deleted successfully"
}
```

### 🛠️ Tool Endpoints

#### Get All Tools

```http
GET /api/tools
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number): Page number for pagination
- `limit` (number): Number of items per page
- `search` (string): Search term for tool name or description
- `category` (string): Filter by category
- `effectiveness` (string): Filter by effectiveness (Low, Medium, High, Critical)

**Response:**
```json
{
  "success": true,
  "data": {
    "tools": [
      {
        "id": "1",
        "name": "Burp Suite",
        "description": "Web application security testing platform",
        "category": "Web Security",
        "effectiveness": "High",
        "version": "2023.1",
        "vendor": "PortSwigger",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "pages": 2
    }
  }
}
```

#### Get Tool by ID

```http
GET /api/tools/{id}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Burp Suite",
    "description": "Web application security testing platform",
    "category": "Web Security",
    "effectiveness": "High",
    "version": "2023.1",
    "vendor": "PortSwigger",
    "documentation": "https://portswigger.net/burp/documentation",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

#### Create Tool

```http
POST /api/tools
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Nmap",
  "description": "Network discovery and security auditing tool",
  "category": "Network Scanning",
  "effectiveness": "High",
  "version": "7.94",
  "vendor": "Insecure.Com LLC"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "2",
    "name": "Nmap",
    "description": "Network discovery and security auditing tool",
    "category": "Network Scanning",
    "effectiveness": "High",
    "version": "7.94",
    "vendor": "Insecure.Com LLC",
    "createdAt": "2024-01-15T16:00:00Z"
  }
}
```

### 📊 Report Endpoints

#### Generate Report

```http
POST /api/reports
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "incidentId": "INC-2024-001",
  "title": "SQL Injection Incident Report",
  "summary": "Comprehensive analysis of SQL injection attempt",
  "findings": "Multiple injection points identified",
  "recommendations": "Implement input validation and parameterized queries",
  "evidence": ["file1.pdf", "file2.png"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "REP-2024-001",
    "incidentId": "INC-2024-001",
    "title": "SQL Injection Incident Report",
    "summary": "Comprehensive analysis of SQL injection attempt",
    "findings": "Multiple injection points identified",
    "recommendations": "Implement input validation and parameterized queries",
    "evidence": ["file1.pdf", "file2.png"],
    "generatedBy": "John Doe",
    "createdAt": "2024-01-15T17:00:00Z",
    "downloadUrl": "/api/reports/REP-2024-001/download"
  }
}
```

#### Get Report by ID

```http
GET /api/reports/{id}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "REP-2024-001",
    "incidentId": "INC-2024-001",
    "title": "SQL Injection Incident Report",
    "summary": "Comprehensive analysis of SQL injection attempt",
    "findings": "Multiple injection points identified",
    "recommendations": "Implement input validation and parameterized queries",
    "evidence": ["file1.pdf", "file2.png"],
    "generatedBy": "John Doe",
    "createdAt": "2024-01-15T17:00:00Z",
    "downloadUrl": "/api/reports/REP-2024-001/download"
  }
}
```

### 📝 Log Endpoints

#### Get System Logs

```http
GET /api/logs
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number): Page number for pagination
- `limit` (number): Number of items per page
- `search` (string): Search term for log description
- `severity` (string): Filter by severity (Info, Warning, Error, Critical)
- `source` (string): Filter by source (Firewall, IDS, Web Server, etc.)
- `dateRange` (string): Filter by date range (today, week, month)

**Response:**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "1",
        "timestamp": "2024-01-15T10:30:00Z",
        "severity": "Warning",
        "source": "Firewall",
        "description": "Suspicious connection attempt from 192.168.1.100",
        "sourceIP": "192.168.1.100",
        "action": "Blocked",
        "details": "Connection blocked due to suspicious activity"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 150,
      "pages": 15
    }
  }
}
```

### 👥 User Endpoints

#### Get Current User

```http
GET /api/users/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "Security Analyst",
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLogin": "2024-01-15T10:00:00Z"
  }
}
```

#### Update User Profile

```http
PUT /api/users/me
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "email": "john.smith@example.com",
    "name": "John Smith",
    "role": "Security Analyst",
    "updatedAt": "2024-01-15T18:00:00Z"
  }
}
```

## 📊 Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute
- **Other endpoints**: 100 requests per minute

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

## 🔒 Security

### HTTPS Only
All API communications should use HTTPS in production.

### Token Expiration
JWT tokens expire after 24 hours. Use the refresh endpoint to get a new token.

### Input Validation
All inputs are validated and sanitized to prevent injection attacks.

## 📞 Support

For API support:

- **Email**: enockccg28@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/enock-niyonsaba/safe-shield/issues)
- **Documentation**: [Full documentation](../README.md)

---

**Last Updated**: January 2024  
**API Version**: 1.0.0 