// ==================== Global Variables ====================
const API_BASE_URL = '';
let currentStudents = [];

// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Application initialized');
    loadStudents();
    setupEventListeners();
});

// ==================== Event Listeners ====================
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// ==================== Section Navigation ====================
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Load students when list section is shown
    if (sectionId === 'list') {
        loadStudents();
    }

    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(sectionId)) {
            link.classList.add('active');
        }
    });
}

// ==================== Message Display ====================
function showMessage(elementId, message, type = 'info') {
    const messageEl = document.getElementById(elementId);
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `message show ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 5000);
    }
}

// ==================== API Functions ====================

/**
 * Fetch all students from the server
 */
async function loadStudents() {
    try {
        const tableBody = document.getElementById('tableBody');
        if (tableBody) {
            tableBody.innerHTML = '<tr class="loading-row"><td colspan="6">Loading students...</td></tr>';
        }

        const response = await fetch(`${API_BASE_URL}/api/students`);
        const result = await response.json();

        if (result.success) {
            currentStudents = result.data;
            displayStudentsTable(currentStudents);
            showMessage('tableMessage', `${currentStudents.length} students loaded successfully`, 'success');
        } else {
            showMessage('tableMessage', 'Failed to load students', 'error');
            if (tableBody) {
                tableBody.innerHTML = '<tr class="empty-row"><td colspan="6">No students found</td></tr>';
            }
        }
    } catch (error) {
        console.error('Error loading students:', error);
        showMessage('tableMessage', 'Error connecting to server: ' + error.message, 'error');
        const tableBody = document.getElementById('tableBody');
        if (tableBody) {
            tableBody.innerHTML = '<tr class="empty-row"><td colspan="6">Error loading students</td></tr>';
        }
    }
}

/**
 * Display students in the table
 */
function displayStudentsTable(students) {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    if (students.length === 0) {
        tableBody.innerHTML = '<tr class="empty-row"><td colspan="6">No students found</td></tr>';
        return;
    }

    tableBody.innerHTML = students.map(student => `
        <tr>
            <td>${escapeHtml(student.student_id)}</td>
            <td>${escapeHtml(student.full_name)}</td>
            <td>${escapeHtml(student.course)}</td>
            <td>${escapeHtml(student.year_level)}</td>
            <td>${escapeHtml(student.email_address)}</td>
            <td>
                <div class="actions">
                    <button class="btn btn-edit" onclick="openEditModal(${student.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteStudent(${student.id}, '${escapeHtml(student.full_name)}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

/**
 * Handle form submission for adding a new student
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = {
        student_id: document.getElementById('studentId').value.trim(),
        full_name: document.getElementById('fullName').value.trim(),
        course: document.getElementById('course').value.trim(),
        year_level: document.getElementById('yearLevel').value,
        email_address: document.getElementById('email').value.trim()
    };

    try {
        const response = await fetch(`${API_BASE_URL}/api/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            showMessage('formMessage', 'Student registered successfully! 🎉', 'success');
            document.getElementById('studentForm').reset();
            
            // Reload students in the background
            setTimeout(() => {
                loadStudents();
            }, 1000);
        } else {
            showMessage('formMessage', result.message || 'Error adding student', 'error');
        }
    } catch (error) {
        console.error('Error adding student:', error);
        showMessage('formMessage', 'Error: ' + error.message, 'error');
    }
}

/**
 * Open edit modal with student data
 */
async function openEditModal(studentId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/students/${studentId}`);
        const result = await response.json();

        if (result.success) {
            const student = result.data;
            
            document.getElementById('editId').value = student.id;
            document.getElementById('editStudentId').value = student.student_id;
            document.getElementById('editFullName').value = student.full_name;
            document.getElementById('editCourse').value = student.course;
            document.getElementById('editYearLevel').value = student.year_level;
            document.getElementById('editEmail').value = student.email_address;

            const modal = document.getElementById('editModal');
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        } else {
            showMessage('tableMessage', 'Failed to load student details', 'error');
        }
    } catch (error) {
        console.error('Error loading student:', error);
        showMessage('tableMessage', 'Error: ' + error.message, 'error');
    }
}

/**
 * Close edit modal
 */
function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    document.getElementById('editForm').reset();
    document.getElementById('editMessage').classList.remove('show');
}

/**
 * Handle edit form submission
 */
async function handleEditSubmit(event) {
    event.preventDefault();

    const studentId = document.getElementById('editId').value;
    const formData = {
        student_id: document.getElementById('editStudentId').value.trim(),
        full_name: document.getElementById('editFullName').value.trim(),
        course: document.getElementById('editCourse').value.trim(),
        year_level: document.getElementById('editYearLevel').value,
        email_address: document.getElementById('editEmail').value.trim()
    };

    try {
        const response = await fetch(`${API_BASE_URL}/api/students/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            showMessage('editMessage', 'Student updated successfully! ✨', 'success');
            
            setTimeout(() => {
                closeEditModal();
                loadStudents();
            }, 1000);
        } else {
            showMessage('editMessage', result.message || 'Error updating student', 'error');
        }
    } catch (error) {
        console.error('Error updating student:', error);
        showMessage('editMessage', 'Error: ' + error.message, 'error');
    }
}

/**
 * Delete a student with confirmation
 */
async function deleteStudent(studentId, studentName) {
    if (!confirm(`Are you sure you want to delete ${studentName}? This action cannot be undone.`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/students/${studentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.success) {
            showMessage('tableMessage', 'Student deleted successfully! 🗑️', 'success');
            loadStudents();
        } else {
            showMessage('tableMessage', result.message || 'Error deleting student', 'error');
        }
    } catch (error) {
        console.error('Error deleting student:', error);
        showMessage('tableMessage', 'Error: ' + error.message, 'error');
    }
}

// ==================== Search Functionality ====================
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    if (searchTerm === '') {
        displayStudentsTable(currentStudents);
        return;
    }

    const filteredStudents = currentStudents.filter(student => {
        return (
            student.student_id.toLowerCase().includes(searchTerm) ||
            student.full_name.toLowerCase().includes(searchTerm) ||
            student.email_address.toLowerCase().includes(searchTerm)
        );
    });

    displayStudentsTable(filteredStudents);
}

// ==================== Utility Functions ====================

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format date to readable format
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// ==================== Modal Management ====================

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeEditModal();
    }
});
