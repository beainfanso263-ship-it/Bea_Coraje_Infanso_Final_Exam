# Deployment Guide: Render + Aiven

Complete step-by-step guide to deploy the Student Information Management System on Render with Aiven MySQL database.

## 📋 Prerequisites

Before starting deployment, ensure you have:
- ✅ GitHub account with repository created
- ✅ Render account (free tier available at render.com)
- ✅ Aiven account (free tier available at aiven.io)
- ✅ Project pushed to GitHub

## 🗄️ Step 1: Set Up Aiven MySQL Database

### 1.1 Create Aiven Account
1. Go to [aiven.io](https://aiven.io)
2. Sign up for a free account
3. Verify your email

### 1.2 Create MySQL Instance
1. In Aiven Dashboard, click "Create service"
2. Select **MySQL** as service type
3. Choose appropriate settings:
   - **Cloud Provider**: Your preferred region
   - **Service Name**: `student-db` (or your preference)
   - **Plan**: Free tier (trial) for testing, upgrade as needed
4. Click "Create service"
5. Wait for the instance to initialize (5-10 minutes)

### 1.3 Get Connection Details
Once service is ready, in the **Connection information** section, copy:
- **Host**: e.g., `student-db.c.aivencloud.com`
- **Port**: e.g., `12345`
- **User**: `avnadmin` (or your custom user)
- **Password**: Your admin password

### 1.4 Create Database
1. Go to "Databases" tab
2. Click "Create database"
3. Name it: `students_db` (or your preference)
4. The table will be auto-created by the application

**Example Aiven Credentials:**
```
DB_HOST=student-db.c.aivencloud.com
DB_PORT=12345
DB_USER=avnadmin
DB_PASSWORD=your_secure_password
DB_NAME=students_db
```

## 🚀 Step 2: Deploy on Render

### 2.1 Connect GitHub Repository to Render
1. Go to [render.com](https://render.com)
2. Sign up or log in with GitHub
3. Click "New +" button
4. Select "Web Service"
5. Choose "Connect a repository"
6. Find and select your repository: `Bea_Coraje_Infanso_Final_Exam`
7. Click "Connect"

### 2.2 Configure Web Service

**Basic Settings:**
- **Name**: `student-management-system` (or your preference)
- **Environment**: Node
- **Region**: Select closest to your users
- **Branch**: main
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 2.3 Add Environment Variables

In the "Advanced" section, click "Add Environment Variable" and add:

| Key | Value |
|-----|-------|
| `DB_HOST` | Your Aiven host |
| `DB_PORT` | `3306` |
| `DB_USER` | Your Aiven user |
| `DB_PASSWORD` | Your Aiven password |
| `DB_NAME` | `students_db` |
| `NODE_ENV` | `production` |

**Important**: Do NOT paste these into your GitHub repository. Only use Render's environment variables section.

### 2.4 Deploy
1. Click "Create Web Service"
2. Render will start building and deploying
3. Monitor the deployment in the "Logs" tab
4. Once complete, you'll receive a live URL like: `https://student-management-system.onrender.com`

## ✅ Step 3: Verify Deployment

### 3.1 Health Check
Visit: `https://your-app.onrender.com/api/health`

You should see:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### 3.2 Access Application
1. Go to `https://your-app.onrender.com`
2. You should see the Student Management System homepage
3. Test adding a student and view the list

### 3.3 Test All Features
1. **Add Student**: Register a test student through the form
2. **View Records**: Check if student appears in the list
3. **Search**: Search for the student by name or ID
4. **Edit**: Update the student information
5. **Delete**: Delete the test student with confirmation

## 🔧 Troubleshooting

### Issue: Service keeps restarting / Crashes on startup

**Check:**
1. Go to "Events" tab in Render
2. Review error logs
3. Common causes:
   - Missing environment variables
   - Database credentials incorrect
   - Network connectivity issue with Aiven

**Solution:**
1. Verify all 5 environment variables are set correctly
2. Test Aiven connection locally with the same credentials
3. Check Aiven MySQL instance is running (green status)

### Issue: Application loads but no students display

**Check:**
1. Verify database connection is working
2. Ensure `students_db` database exists in Aiven
3. Check browser console (F12) for any errors

**Solution:**
1. Test API endpoint: `https://your-app.onrender.com/api/students`
2. Should return `{"success": true, "data": []}`

### Issue: Database connection timeout

**Solution:**
1. Check Aiven MySQL instance is running (green)
2. Verify correct host, port, user, password in environment variables
3. Ensure IP allowlist in Aiven allows Render's IP (usually "0.0.0.0/0")

### Issue: Changes not reflecting after deployment

**Solution:**
1. Push changes to GitHub
2. Render will auto-redeploy on push
3. Or manually trigger in Render dashboard: "Manual Deploy" → "Deploy Latest Commit"

## 📊 Monitoring and Maintenance

### View Application Logs
1. In Render dashboard, select your service
2. Click "Logs" tab
3. Monitor for any errors or issues

### Update Environment Variables
1. Go to service "Settings"
2. Scroll to "Environment"
3. Edit any variable
4. Changes take effect after redeploy

### Backup Aiven Database
In Aiven:
1. Go to "Databases" tab
2. For each database, you can view backups and manage retention

## 🔐 Security Checklist

- ✅ `.env` file is in `.gitignore` (not committed to GitHub)
- ✅ All credentials stored only in Render environment variables
- ✅ Database password is strong and unique
- ✅ No hardcoded credentials in any source files
- ✅ GitHub repository is public (code visible but no secrets)

## 📝 Final Steps

1. **Update README.md** with your deployment URL:
   ```markdown
   **Live Application**: https://your-app.onrender.com
   ```

2. **Test thoroughly** before submission

3. **Commit and push final changes**:
   ```bash
   git add .
   git commit -m "Update deployment URL in README"
   git push origin main
   ```

## 🆘 Support

If you encounter issues:

1. **Render Support**: https://render.com/docs
2. **Aiven Support**: https://aiven.io/support
3. **Node.js Docs**: https://nodejs.org/docs
4. **Stack Overflow**: Tag with `render-com`, `aiven`, `nodejs`

---

**Deployment Date**: [Your Date]
**Application Status**: ✅ Live and Running
