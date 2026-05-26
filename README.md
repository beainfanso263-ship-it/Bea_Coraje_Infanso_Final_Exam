# Student Information Management System

A comprehensive full-stack web application for managing student records with complete CRUD functionality, built with Node.js, Express, MySQL, and deployed on Render with database hosting on Aiven.

## 🌐 Live Deployment

**Application URL:** [Your Render Deployment URL]

## 📋 Project Overview

This Student Information Management System demonstrates modern full-stack development with:
- **Frontend**: Responsive HTML/CSS/JavaScript with intuitive UI
- **Backend**: Node.js with Express.js REST API
- **Database**: MySQL database hosted on Aiven
- **Deployment**: Hosted on Render.com
- **Version Control**: GitHub repository with meaningful commits

## 🎯 Features

### CRUD Operations
- ✅ **Create**: Add new student records with validation
- ✅ **Read**: View all students in an organized table with search functionality
- ✅ **Update**: Edit student information through a modal interface
- ✅ **Delete**: Remove student records with confirmation

### User Interface
- 📱 Responsive design that works on desktop, tablet, and mobile
- 🎨 Modern gradient-based UI with smooth animations
- 🔍 Real-time search functionality for student records
- 📊 Organized table display with action buttons
- ⚠️ Form validation and error handling

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL database (Aiven account)
- Render account for deployment
- GitHub account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Bea_Coraje_Infanso_Final_Exam.git
   cd Bea_Coraje_Infanso_Final_Exam
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update with your Aiven database credentials:
   ```
   DB_HOST=your_aiven_host
   DB_USER=your_aiven_user
   DB_PASSWORD=your_aiven_password
   DB_NAME=your_database_name
   DB_PORT=3306
   NODE_ENV=production
   PORT=3000
   ```

4. **Start the application**
   ```bash
   npm start
   ```
   - Application will be available at `http://localhost:3000`

5. **Development mode (with auto-reload)**
   ```bash
   npm run dev
   ```

## 🗄️ Database Setup

### Aiven MySQL Configuration

1. Create a MySQL database instance on [Aiven.io](https://aiven.io)
2. Create a database named according to your `DB_NAME` in `.env`
3. The application automatically creates the `students` table on first run

### Database Schema

```sql
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  course VARCHAR(100) NOT NULL,
  year_level VARCHAR(50) NOT NULL,
  email_address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 📡 API Endpoints

### Base URL
`https://your-app.onrender.com/api` (Production)
or `http://localhost:3000/api` (Local)

### Endpoints

#### Students CRUD Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/students` | Create a new student |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get a specific student |
| PUT | `/api/students/:id` | Update student information |
| DELETE | `/api/students/:id` | Delete a student |
| GET | `/api/health` | Health check endpoint |

### Request/Response Examples

#### Create Student
```json
POST /api/students
{
  "student_id": "STU-2024-001",
  "full_name": "John Doe",
  "course": "Computer Science",
  "year_level": "3rd Year",
  "email_address": "john.doe@example.com"
}

Response (Success):
{
  "success": true,
  "message": "Student added successfully",
  "data": {
    "id": 1,
    "student_id": "STU-2024-001",
    "full_name": "John Doe",
    "course": "Computer Science",
    "year_level": "3rd Year",
    "email_address": "john.doe@example.com"
  }
}
```

## 🚀 Deployment on Render

### Prerequisites on Render
- Render account created and logged in
- GitHub repository linked to Render

### Deployment Steps

1. **Connect GitHub Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Environment Variables**
   - In Render dashboard, go to "Environment"
   - Add environment variables:
     - `DB_HOST`: Your Aiven MySQL host
     - `DB_USER`: Your Aiven MySQL user
     - `DB_PASSWORD`: Your Aiven MySQL password
     - `DB_NAME`: Your database name
     - `DB_PORT`: 3306
     - `NODE_ENV`: production

3. **Set Build and Start Commands**
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy from your GitHub repository

### Important Security Notes

⚠️ **Never commit `.env` to GitHub!**
- Use `.env.example` as a template
- Store actual credentials in Render environment variables only
- The `.gitignore` file protects `.env` from being committed

## 📁 Project Structure

```
Bea_Coraje_Infanso_Final_Exam/
├── crud_final_exam.js          # Main server file with API routes
├── package.json                # Project dependencies
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── README.md                   # This file
├── public/
│   ├── index.html              # Main HTML page
│   ├── styles.css              # CSS styling
│   └── app.js                  # Frontend JavaScript
└── .git/                       # Git repository
```

## 🔒 Security Best Practices

1. **Environment Variables**: Store sensitive data in environment variables, not in code
2. **Input Validation**: All inputs are validated on both frontend and backend
3. **SQL Injection Prevention**: Using parameterized queries with mysql2/promise
4. **CORS**: CORS is configured for secure cross-origin requests
5. **Error Handling**: Proper error handling without exposing sensitive information

## 📚 Technologies Used

### Frontend
- HTML5
- CSS3 (with animations and responsive design)
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js (Web framework)
- mysql2/promise (MySQL client)
- dotenv (Environment variable management)
- CORS (Cross-Origin Resource Sharing)
- body-parser (Request parsing)

### Database
- MySQL (Aiven Cloud Database)

### Deployment
- Render.com (Web hosting)
- GitHub (Version control)

## 🧪 Testing

### Manual Testing Checklist

- [ ] Add a new student through the form
- [ ] View all students in the table
- [ ] Search for students by name or ID
- [ ] Edit a student's information
- [ ] Delete a student record
- [ ] Verify database persistence
- [ ] Test on mobile devices
- [ ] Test deployment on Render

## 🐛 Troubleshooting

### Common Issues

**Issue**: Database connection failed
- **Solution**: Verify Aiven connection details in `.env` and Render environment variables

**Issue**: Students table not found
- **Solution**: Application auto-creates table on startup. Check server logs.

**Issue**: 404 error on deployed app
- **Solution**: Ensure `package.json` has correct start script and `node_modules` is in `.gitignore`

**Issue**: CORS errors
- **Solution**: CORS is already configured. Check that API_BASE_URL in app.js is correct.

## 📝 Commits and Version Control

Example commit messages used in this project:

```
git commit -m "Initial project setup with Express server"
git commit -m "Add frontend HTML and CSS styling"
git commit -m "Implement CRUD API endpoints"
git commit -m "Add MySQL database integration"
git commit -m "Configure environment variables for security"
git commit -m "Deploy to Render with Aiven database"
```

## 👤 Author

**Bea Coraje Infanso**
- Final Examination Project
- Date: 2026

## 📄 License

This project is provided as-is for educational purposes.

## 🔗 References

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Aiven.io Guides](https://help.aiven.io/)
- [Render Documentation](https://render.com/docs)

---

**Status**: ✅ Complete and Deployed
**Last Updated**: May 26, 2026