// Import required modules
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize database and create table if not exists
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create students table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id VARCHAR(50) UNIQUE NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        course VARCHAR(100) NOT NULL,
        year_level VARCHAR(50) NOT NULL,
        email_address VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(createTableQuery);
    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// ==================== API Routes ====================

// CREATE - Add a new student
app.post('/api/students', async (req, res) => {
  try {
    const { student_id, full_name, course, year_level, email_address } = req.body;
    
    // Validate required fields
    if (!student_id || !full_name || !course || !year_level || !email_address) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    const connection = await pool.getConnection();
    
    // Check if student_id already exists
    const [existingStudent] = await connection.execute(
      'SELECT * FROM students WHERE student_id = ?',
      [student_id]
    );
    
    if (existingStudent.length > 0) {
      connection.release();
      return res.status(409).json({ 
        success: false, 
        message: 'Student ID already exists' 
      });
    }
    
    // Insert new student
    const [result] = await connection.execute(
      'INSERT INTO students (student_id, full_name, course, year_level, email_address) VALUES (?, ?, ?, ?, ?)',
      [student_id, full_name, course, year_level, email_address]
    );
    
    connection.release();
    
    res.status(201).json({ 
      success: true, 
      message: 'Student added successfully',
      data: { id: result.insertId, student_id, full_name, course, year_level, email_address }
    });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding student',
      error: error.message 
    });
  }
});

// READ - Get all students
app.get('/api/students', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [students] = await connection.execute('SELECT * FROM students ORDER BY created_at DESC');
    connection.release();
    
    res.status(200).json({ 
      success: true, 
      data: students 
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching students',
      error: error.message 
    });
  }
});

// READ - Get a single student by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    const [students] = await connection.execute(
      'SELECT * FROM students WHERE id = ?',
      [id]
    );
    
    connection.release();
    
    if (students.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: students[0] 
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching student',
      error: error.message 
    });
  }
});

// UPDATE - Update student information
app.put('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, full_name, course, year_level, email_address } = req.body;
    
    // Validate required fields
    if (!student_id || !full_name || !course || !year_level || !email_address) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    const connection = await pool.getConnection();
    
    // Check if student exists
    const [existingStudent] = await connection.execute(
      'SELECT * FROM students WHERE id = ?',
      [id]
    );
    
    if (existingStudent.length === 0) {
      connection.release();
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }
    
    // Check if new student_id conflicts with another student
    if (student_id !== existingStudent[0].student_id) {
      const [conflictStudent] = await connection.execute(
        'SELECT * FROM students WHERE student_id = ?',
        [student_id]
      );
      
      if (conflictStudent.length > 0) {
        connection.release();
        return res.status(409).json({ 
          success: false, 
          message: 'Student ID already exists' 
        });
      }
    }
    
    // Update student
    await connection.execute(
      'UPDATE students SET student_id = ?, full_name = ?, course = ?, year_level = ?, email_address = ? WHERE id = ?',
      [student_id, full_name, course, year_level, email_address, id]
    );
    
    connection.release();
    
    res.status(200).json({ 
      success: true, 
      message: 'Student updated successfully',
      data: { id, student_id, full_name, course, year_level, email_address }
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating student',
      error: error.message 
    });
  }
});

// DELETE - Delete a student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    // Check if student exists
    const [existingStudent] = await connection.execute(
      'SELECT * FROM students WHERE id = ?',
      [id]
    );
    
    if (existingStudent.length === 0) {
      connection.release();
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }
    
    // Delete student
    await connection.execute(
      'DELETE FROM students WHERE id = ?',
      [id]
    );
    
    connection.release();
    
    res.status(200).json({ 
      success: true, 
      message: 'Student deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting student',
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is running' 
  });
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: err.message 
  });
});

// Initialize and start server
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
