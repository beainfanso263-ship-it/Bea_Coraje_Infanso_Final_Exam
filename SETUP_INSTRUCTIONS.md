# Local Setup Instructions

Step-by-step guide to set up and run the Student Information Management System locally for development and testing.

## 🎯 Quick Start (5 minutes)

### Minimum Requirements
- Node.js v14+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- MySQL database (local or cloud)
- Git (for cloning repository)

### 30-Second Setup
```bash
# 1. Clone repository
git clone https://github.com/yourusername/Bea_Coraje_Infanso_Final_Exam.git
cd Bea_Coraje_Infanso_Final_Exam

# 2. Install dependencies
npm install

# 3. Create .env file from template
cp .env.example .env

# 4. Edit .env with your database credentials
# (Use your text editor or IDE)

# 5. Start application
npm start

# 6. Open browser to http://localhost:3000
```

## 📝 Detailed Setup Guide

### Step 1: Install Node.js

#### Windows
1. Go to [nodejs.org](https://nodejs.org/)
2. Download LTS version
3. Run installer, follow prompts
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### macOS
```bash
# Using Homebrew (recommended)
brew install node

# Verify
node --version
npm --version
```

#### Linux
```bash
# Using apt (Ubuntu/Debian)
sudo apt update
sudo apt install nodejs npm

# Verify
node --version
npm --version
```

### Step 2: Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/Bea_Coraje_Infanso_Final_Exam.git

# Navigate to project directory
cd Bea_Coraje_Infanso_Final_Exam

# Verify files exist
ls -la
# Should show: crud_final_exam.js, package.json, public/, README.md, .env.example
```

### Step 3: Install Dependencies

```bash
# Install all project dependencies
npm install

# Verify installation
npm list

# Expected output shows: express, mysql2, dotenv, cors, body-parser
```

### Step 4: Set Up Database

#### Option A: Use Aiven (Cloud) - Recommended for Final Submission

1. **Create Aiven Account**
   - Go to [aiven.io](https://aiven.io)
   - Sign up for free account
   - Create MySQL instance (see DEPLOYMENT_GUIDE.md)

2. **Get Connection Details**
   - Note your host, port, user, password
   - Create database named `students_db`

#### Option B: Use Local MySQL (Development Only)

##### Windows
1. Download [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
2. Run installer with default settings
3. MySQL will run on `localhost:3306`
4. Create database:
   ```sql
   CREATE DATABASE students_db;
   ```

##### macOS
```bash
# Using Homebrew
brew install mysql
brew services start mysql

# Secure installation
mysql_secure_installation

# Create database
mysql -u root -p
```

```sql
CREATE DATABASE students_db;
EXIT;
```

##### Linux (Ubuntu/Debian)
```bash
# Install MySQL
sudo apt install mysql-server

# Start service
sudo systemctl start mysql

# Secure installation
sudo mysql_secure_installation

# Create database
sudo mysql -u root -p
```

```sql
CREATE DATABASE students_db;
EXIT;
```

### Step 5: Configure Environment Variables

1. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file** (use your text editor)
   ```
   # Database Configuration
   DB_HOST=localhost              # or your Aiven host
   DB_PORT=3306
   DB_USER=root                   # or your Aiven user
   DB_PASSWORD=your_password      # or your Aiven password
   DB_NAME=students_db
   
   # Server Configuration
   NODE_ENV=development
   PORT=3000
   ```

3. **Save the file**

### Step 6: Start the Application

```bash
# Start development server
npm start

# Expected output:
# Server is running on port 3000
# Environment: development
# Database initialized successfully
```

### Step 7: Access Application

1. Open your browser
2. Go to: `http://localhost:3000`
3. You should see the Student Management System homepage

## 🧪 Testing the Application

### Manual Test Flow

#### Test 1: Add a Student
1. Click "Register Student" in navigation
2. Fill in the form:
   - Student ID: `STU-2024-001`
   - Full Name: `John Doe`
   - Course: `Computer Science`
   - Year Level: `3rd Year`
   - Email: `john@example.com`
3. Click "Register Student"
4. Should see success message

#### Test 2: View Students
1. Click "View Students" in navigation
2. Should see the student you just added in the table

#### Test 3: Search
1. In the search box, type `John`
2. Table should filter to show only matching students
3. Clear search to see all students

#### Test 4: Edit Student
1. Find a student in the table
2. Click "Edit" button
3. Modify information
4. Click "Update Student"
5. Verify changes in the table

#### Test 5: Delete Student
1. Click "Delete" button on any student
2. Confirm deletion in popup
3. Student should be removed from table

### API Testing (using curl or Postman)

```bash
# Add a student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "STU-2024-002",
    "full_name": "Jane Smith",
    "course": "Information Technology",
    "year_level": "2nd Year",
    "email_address": "jane@example.com"
  }'

# Get all students
curl http://localhost:3000/api/students

# Get specific student (replace 1 with student id)
curl http://localhost:3000/api/students/1

# Update student
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "STU-2024-002",
    "full_name": "Jane Updated",
    "course": "IT",
    "year_level": "2nd Year",
    "email_address": "jane.updated@example.com"
  }'

# Delete student
curl -X DELETE http://localhost:3000/api/students/1

# Health check
curl http://localhost:3000/api/health
```

## 🛠️ Development Mode with Auto-Reload

For development, use nodemon to auto-reload on file changes:

```bash
# Install nodemon globally (optional)
npm install -g nodemon

# Run in development mode
npm run dev

# or
npx nodemon crud_final_exam.js
```

## 📁 Project Structure

```
Bea_Coraje_Infanso_Final_Exam/
├── crud_final_exam.js              # Main Express server
├── package.json                    # Project dependencies
├── package-lock.json               # Dependency lock file
├── .env.example                    # Environment variables template
├── .env                            # Your local env variables (not committed)
├── .gitignore                      # Git ignore rules
├── README.md                       # Project documentation
├── DEPLOYMENT_GUIDE.md             # Deployment instructions
├── SETUP_INSTRUCTIONS.md           # This file
└── public/                         # Frontend files (served by Express)
    ├── index.html                  # Main HTML page
    ├── styles.css                  # CSS styling
    └── app.js                      # Frontend JavaScript
```

## 🐛 Troubleshooting

### Issue: "npm install" fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install

# If still failing, try global packages:
npm install -g npm
```

### Issue: Cannot find module 'express'
**Solution:**
```bash
# Make sure you ran npm install
npm install

# Check node_modules exists
ls node_modules
```

### Issue: Port 3000 already in use
**Solution:**
```bash
# Option 1: Use different port
PORT=3001 npm start

# Option 2: Kill process using port 3000
# On macOS/Linux:
lsof -ti :3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Database connection refused
**Checklist:**
- [ ] Is MySQL/database service running?
- [ ] Are DB credentials correct in `.env`?
- [ ] Is `.env` file in project root?
- [ ] Can you connect to database manually?

```bash
# Test connection manually
mysql -h [DB_HOST] -u [DB_USER] -p[DB_PASSWORD] -e "SELECT VERSION();"
```

### Issue: "EADDRINUSE" - Port already in use
**Solution:**
See "Port 3000 already in use" above

### Issue: "getaddrinfo ENOTFOUND" - Database host not found
**Solution:**
- Verify database host is correct
- Check internet connection
- For Aiven: Ensure IP is whitelisted

## 📚 File Modifications for Deployment

Before deployment to Render, ensure these are configured:

### 1. Update README.md
Add your Render deployment URL:
```markdown
## 🌐 Live Deployment
**Application URL:** https://your-app.onrender.com
```

### 2. Verify .gitignore
Should include:
```
.env
node_modules/
```

### 3. Check package.json
Should have start script:
```json
"scripts": {
  "start": "node crud_final_exam.js",
  "dev": "nodemon crud_final_exam.js"
}
```

## 🔐 Security Reminder

**NEVER commit `.env` file to GitHub!**
- Always use `.env.example` as template
- Store credentials in Render environment variables
- Use `.gitignore` to prevent accidental commits

## ✅ Deployment Checklist

Before deploying to Render:
- [ ] Application runs locally without errors
- [ ] All CRUD operations work correctly
- [ ] Database persists data properly
- [ ] `.env` is in `.gitignore`
- [ ] README.md has deployment URL (update after deployment)
- [ ] All changes committed to GitHub
- [ ] Aiven database instance is ready

## 📞 Getting Help

If you encounter issues:

1. **Check error messages carefully** - they often contain the solution
2. **Review logs** in terminal output
3. **Search Stack Overflow** with your error message
4. **Check official documentation**:
   - Node.js: https://nodejs.org/docs
   - Express: https://expressjs.com
   - MySQL: https://dev.mysql.com/doc
   - Aiven: https://help.aiven.io

---

**Last Updated**: May 26, 2026
**Status**: ✅ Ready for Local Development and Deployment
