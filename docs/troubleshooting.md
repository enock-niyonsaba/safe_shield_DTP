# 🔧 Troubleshooting Guide

This guide helps you resolve common issues with Safe Shield. If you can't find a solution here, please contact support.

## 📋 Table of Contents

- [Installation Issues](#installation-issues)
- [Runtime Errors](#runtime-errors)
- [Authentication Problems](#authentication-problems)
- [Database Issues](#database-issues)
- [Performance Problems](#performance-problems)
- [Network Issues](#network-issues)
- [File Upload Problems](#file-upload-problems)
- [Browser Issues](#browser-issues)
- [Getting Help](#getting-help)

## 🚀 Installation Issues

### Node.js Version Problems

**Problem**: "Node.js version not supported"

**Solution**:
```bash
# Check your Node.js version
node --version

# If below 18.0, update Node.js
# Download from: https://nodejs.org/
```

### npm Install Fails

**Problem**: "npm install" fails with errors

**Solutions**:

1. **Clear npm cache**:
   ```bash
   npm cache clean --force
   npm install
   ```

2. **Delete node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check network connection**:
   ```bash
   # Test npm registry
   npm ping
   ```

4. **Use different npm registry**:
   ```bash
   npm config set registry https://registry.npmjs.org/
   npm install
   ```

### Port Already in Use

**Problem**: "Port 3000 is already in use"

**Solutions**:

1. **Use different port**:
   ```bash
   PORT=3001 npm run dev
   ```

2. **Find and kill process using port 3000**:
   ```bash
   # On Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # On macOS/Linux
   lsof -ti:3000 | xargs kill -9
   ```

3. **Check what's running on port 3000**:
   ```bash
   # On Windows
   netstat -ano | findstr :3000

   # On macOS/Linux
   lsof -i :3000
   ```

## ⚠️ Runtime Errors

### "Element type is invalid" Error

**Problem**: React component import/export issues

**Solutions**:

1. **Check component imports**:
   ```typescript
   // Correct import
   import { Button } from '@/components/ui/button';
   
   // Wrong import
   import Button from '@/components/ui/Button';
   ```

2. **Verify file casing**:
   ```bash
   # Check actual file names
   ls components/ui/
   ```

3. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

### "Module not found" Error

**Problem**: Missing dependencies or incorrect paths

**Solutions**:

1. **Reinstall dependencies**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check import paths**:
   ```typescript
   // Use absolute imports
   import { Component } from '@/components/ui/component';
   
   // Not relative imports
   import { Component } from '../../../components/ui/component';
   ```

3. **Verify tsconfig.json paths**:
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

### Build Errors

**Problem**: "npm run build" fails

**Solutions**:

1. **Check TypeScript errors**:
   ```bash
   npx tsc --noEmit
   ```

2. **Fix linting errors**:
   ```bash
   npm run lint
   npm run lint:fix
   ```

3. **Clear build cache**:
   ```bash
   rm -rf .next
   npm run build
   ```

## 🔐 Authentication Problems

### Login Fails

**Problem**: Can't log in with correct credentials

**Solutions**:

1. **Check environment variables**:
   ```bash
   # Verify .env.local exists
   cat .env.local
   
   # Check NEXTAUTH_SECRET is set
   echo $NEXTAUTH_SECRET
   ```

2. **Clear browser cache**:
   - Clear cookies and cache
   - Try incognito/private mode
   - Try different browser

3. **Check server logs**:
   ```bash
   npm run dev 2>&1 | grep -i auth
   ```

### Session Expires Quickly

**Problem**: Logged out frequently

**Solutions**:

1. **Extend session timeout**:
   ```bash
   # In .env.local
   NEXTAUTH_MAX_AGE=86400  # 24 hours
   ```

2. **Check browser settings**:
   - Enable cookies
   - Allow local storage
   - Disable private browsing

### Permission Denied

**Problem**: "Access denied" or "Forbidden" errors

**Solutions**:

1. **Check user role**:
   - Verify your role has required permissions
   - Contact administrator to update role

2. **Check resource ownership**:
   - Ensure you own the resource
   - Or have admin permissions

## 🗄️ Database Issues

### Connection Failed

**Problem**: "Database connection failed"

**Solutions**:

1. **Check DATABASE_URL**:
   ```bash
   # Verify in .env.local
   echo $DATABASE_URL
   ```

2. **Test database connection**:
   ```bash
   # For PostgreSQL
   psql $DATABASE_URL -c "SELECT 1;"
   
   # For MySQL
   mysql -u user -p database -e "SELECT 1;"
   ```

3. **Check database service**:
   ```bash
   # PostgreSQL
   sudo systemctl status postgresql
   
   # MySQL
   sudo systemctl status mysql
   ```

### Migration Errors

**Problem**: "Database migration failed"

**Solutions**:

1. **Reset database**:
   ```bash
   npm run db:reset
   npm run db:migrate
   ```

2. **Check migration files**:
   ```bash
   # Verify migration files exist
   ls -la prisma/migrations/
   ```

3. **Manual migration**:
   ```bash
   npx prisma migrate dev
   ```

### Data Not Saving

**Problem**: Changes not persisted to database

**Solutions**:

1. **Check database permissions**:
   ```sql
   -- Grant permissions
   GRANT ALL PRIVILEGES ON DATABASE safeshield TO user;
   ```

2. **Verify transaction commits**:
   - Check if transactions are being committed
   - Look for rollback errors

3. **Check connection pool**:
   ```bash
   # Increase pool size
   DB_POOL_MAX=20
   ```

## ⚡ Performance Problems

### Slow Page Loads

**Problem**: Pages take too long to load

**Solutions**:

1. **Check server resources**:
   ```bash
   # Monitor CPU and memory
   top
   htop
   ```

2. **Optimize database queries**:
   ```bash
   # Enable query logging
   LOG_LEVEL=debug
   ```

3. **Enable caching**:
   ```bash
   # In .env.local
   CACHE_TTL=3600
   ```

### Memory Issues

**Problem**: "Out of memory" errors

**Solutions**:

1. **Increase Node.js memory**:
   ```bash
   # Set memory limit
   NODE_OPTIONS="--max-old-space-size=4096"
   ```

2. **Optimize bundle size**:
   ```bash
   # Analyze bundle
   npm run build -- --analyze
   ```

3. **Check for memory leaks**:
   ```bash
   # Monitor memory usage
   node --inspect npm run dev
   ```

### High CPU Usage

**Problem**: Application using too much CPU

**Solutions**:

1. **Check for infinite loops**:
   - Review component re-renders
   - Check useEffect dependencies

2. **Optimize database queries**:
   - Add database indexes
   - Limit query results

3. **Enable production mode**:
   ```bash
   NODE_ENV=production
   npm run build
   npm start
   ```

## 🌐 Network Issues

### CORS Errors

**Problem**: "CORS policy blocked request"

**Solutions**:

1. **Configure CORS**:
   ```bash
   # In .env.local
   CORS_ORIGIN=http://localhost:3000
   ```

2. **Check request origin**:
   - Ensure requests come from allowed origins
   - Verify protocol (http vs https)

3. **Disable CORS for development**:
   ```bash
   # Only for development
   CORS_ORIGIN=*
   ```

### API Timeout

**Problem**: API requests timeout

**Solutions**:

1. **Increase timeout**:
   ```bash
   # In .env.local
   API_TIMEOUT=30000  # 30 seconds
   ```

2. **Check network connectivity**:
   ```bash
   # Test API endpoint
   curl -I http://localhost:3000/api/health
   ```

3. **Optimize database queries**:
   - Add indexes
   - Limit result sets
   - Use pagination

### SSL/TLS Issues

**Problem**: HTTPS certificate problems

**Solutions**:

1. **Use HTTP for development**:
   ```bash
   # Disable HTTPS for local development
   NEXTAUTH_URL=http://localhost:3000
   ```

2. **Generate self-signed certificate**:
   ```bash
   # For development only
   openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
   ```

3. **Use reverse proxy**:
   - Configure nginx or Apache
   - Handle SSL termination

## 📁 File Upload Problems

### Upload Fails

**Problem**: File uploads not working

**Solutions**:

1. **Check file size limits**:
   ```bash
   # Increase file size limit
   MAX_FILE_SIZE=52428800  # 50MB
   ```

2. **Verify upload directory**:
   ```bash
   # Create upload directory
   mkdir -p uploads
   chmod 755 uploads
   ```

3. **Check file permissions**:
   ```bash
   # Fix permissions
   sudo chown -R $USER:$USER uploads/
   ```

### File Type Restrictions

**Problem**: "File type not allowed"

**Solutions**:

1. **Update allowed file types**:
   ```bash
   # In .env.local
   ALLOWED_FILE_TYPES=pdf,doc,docx,png,jpg,jpeg,txt,zip
   ```

2. **Check file extension**:
   - Ensure file has correct extension
   - Verify file is not corrupted

### Storage Issues

**Problem**: "Storage quota exceeded"

**Solutions**:

1. **Clean up old files**:
   ```bash
   # Remove old uploads
   find uploads/ -mtime +30 -delete
   ```

2. **Increase storage limit**:
   ```bash
   # If using cloud storage, increase quota
   ```

3. **Implement file rotation**:
   - Archive old files
   - Compress large files

## 🌐 Browser Issues

### JavaScript Errors

**Problem**: Console shows JavaScript errors

**Solutions**:

1. **Check browser console**:
   - Open Developer Tools (F12)
   - Look for error messages
   - Check network tab

2. **Clear browser cache**:
   - Hard refresh (Ctrl+Shift+R)
   - Clear cache and cookies
   - Try incognito mode

3. **Update browser**:
   - Use latest browser version
   - Enable JavaScript
   - Disable ad blockers

### Responsive Design Issues

**Problem**: Layout broken on mobile/tablet

**Solutions**:

1. **Check viewport meta tag**:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **Test responsive design**:
   - Use browser dev tools
   - Test on actual devices
   - Check CSS media queries

### Browser Compatibility

**Problem**: App doesn't work in certain browsers

**Solutions**:

1. **Check browser support**:
   - Chrome 90+
   - Firefox 88+
   - Safari 14+
   - Edge 90+

2. **Add polyfills**:
   ```bash
   npm install core-js
   ```

3. **Test in multiple browsers**:
   - Use browser testing tools
   - Check for specific issues

## 🆘 Getting Help

### Before Contacting Support

1. **Check this guide**: Look for your specific issue
2. **Search existing issues**: [GitHub Issues](https://github.com/enock-niyonsaba/safe-shield/issues)
3. **Check logs**: Look at server and browser logs
4. **Reproduce the issue**: Document exact steps

### When Contacting Support

Include the following information:

1. **Error message**: Exact error text
2. **Steps to reproduce**: Detailed steps
3. **Environment details**:
   - Operating system
   - Node.js version
   - Browser version
   - Safe Shield version
4. **Logs**: Relevant log files
5. **Screenshots**: If applicable

### Support Channels

- **Email**: enockccg28@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/enock-niyonsaba/safe-shield/issues)
- **Documentation**: [Full documentation](../README.md)

### Emergency Contacts

For critical issues affecting production:

- **Security issues**: Immediate response required
- **Data loss**: High priority
- **System downtime**: Urgent attention

---

**Last Updated**: January 2024  
**Version**: 1.0.0 