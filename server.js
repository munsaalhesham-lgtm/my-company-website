const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Email configuration (Gmail example - update with your credentials)
let emailTransporter = null;
try {
    emailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'your-email@gmail.com',
            pass: process.env.EMAIL_PASS || 'your-app-password'
        }
    });
} catch (error) {
    console.log('⚠️  Email not configured. Update credentials in server.js to enable email replies.');
}

// SMS configuration (Twilio - update with your credentials)
let twilioClient = null;
let twilioPhoneNumber = null;
try {
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || '';
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || '';
    
    // Only initialize Twilio if credentials are provided
    if (twilioAccountSid.startsWith('AC') && twilioAuthToken.length > 10) {
        const twilio = require('twilio');
        twilioClient = twilio(twilioAccountSid, twilioAuthToken);
        twilioPhoneNumber = process.env.TWILIO_PHONE || '+1234567890';
        console.log('✓ SMS service configured');
    } else {
        console.log('⚠️  SMS not configured. Update Twilio credentials in server.js to enable SMS replies.');
    }
} catch (error) {
    console.log('⚠️  SMS initialization failed:', error.message);
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Session configuration
app.use(session({
    secret: 'omc-website-secret-key-2024',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Database setup
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Database error:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    db.serialize(() => {
        // Messages table
        db.run(`
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT,
                phone TEXT,
                message TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                read INTEGER DEFAULT 0
            )
        `);

        // Admin users table
        db.run(`
            CREATE TABLE IF NOT EXISTS admin_users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (!err) {
                // Create default admin user if not exists
                const defaultUsername = '0531301008';
                const defaultPassword = bcrypt.hashSync('123123', 10);
                
                db.get('SELECT * FROM admin_users WHERE username = ?', [defaultUsername], (err, row) => {
                    if (!err && !row) {
                        db.run('INSERT INTO admin_users (username, password) VALUES (?, ?)', 
                            [defaultUsername, defaultPassword], 
                            (err) => {
                                if (!err) {
                                    console.log('Admin user created. Username: 0531301008');
                                }
                            }
                        );
                    }
                });
            }
        });
    });
}

// API Routes

// Submit contact form
app.post('/api/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || (!email && !phone)) {
        return res.status(400).json({ 
            error: 'Name and at least one contact method (email or phone) are required' 
        });
    }

    const stmt = db.prepare('INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)');
    stmt.run(name, email || null, phone || null, message || null, function(err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to save message' });
        }
        
        res.json({ 
            success: true, 
            message: 'Message saved successfully',
            id: this.lastID 
        });
    });
    stmt.finalize();
});

// Admin login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    db.get('SELECT * FROM admin_users WHERE username = ?', [username], (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        req.session.adminId = user.id;
        req.session.adminUsername = user.username;
        res.json({ success: true, message: 'Login successful' });
    });
});

// Check admin session
app.get('/api/admin/check', (req, res) => {
    if (req.session.adminId) {
        res.json({ authenticated: true, username: req.session.adminUsername });
    } else {
        res.json({ authenticated: false });
    }
});

// Get all messages (requires authentication)
app.get('/api/admin/messages', (req, res) => {
    if (!req.session.adminId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    db.all(`
        SELECT * FROM messages 
        ORDER BY timestamp DESC
    `, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch messages' });
        }
        res.json(rows);
    });
});

// Mark message as read
app.put('/api/admin/messages/:id/read', (req, res) => {
    if (!req.session.adminId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const id = req.params.id;
    db.run('UPDATE messages SET read = 1 WHERE id = ?', [id], function(err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to update message' });
        }
        res.json({ success: true, message: 'Message marked as read' });
    });
});

// Delete message
app.delete('/api/admin/messages/:id', (req, res) => {
    if (!req.session.adminId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const id = req.params.id;
    db.run('DELETE FROM messages WHERE id = ?', [id], function(err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to delete message' });
        }
        res.json({ success: true, message: 'Message deleted' });
    });
});

// Admin logout
app.post('/api/admin/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Change admin password
app.post('/api/admin/change-password', (req, res) => {
    if (!req.session.adminId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current password and new password required' });
    }

    db.get('SELECT * FROM admin_users WHERE id = ?', [req.session.adminId], (err, user) => {
        if (err || !user) {
            return res.status(500).json({ error: 'User not found' });
        }

        if (!bcrypt.compareSync(currentPassword, user.password)) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        db.run('UPDATE admin_users SET password = ? WHERE id = ?', 
            [hashedPassword, req.session.adminId], 
            (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to change password' });
                }
                res.json({ success: true, message: 'Password changed successfully' });
            }
        );
    });
});

// Send email reply
app.post('/api/admin/send-email', (req, res) => {
    if (!req.session.adminId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!emailTransporter) {
        return res.status(503).json({ 
            error: 'Email service not configured. Please update email credentials in server.js' 
        });
    }

    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
        return res.status(400).json({ error: 'Recipient, subject, and message are required' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: to,
        subject: subject,
        text: message,
        html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
                <hr style="margin-top: 20px; border: none; border-top: 1px solid #ddd;">
                <p style="color: #999; font-size: 0.9em;">This message was sent from OMC Admin Panel</p>
               </div>`
    };

    emailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email send error:', error);
            return res.status(500).json({ 
                error: 'Failed to send email. Please check email configuration.',
                details: error.message 
            });
        }
        res.json({ success: true, message: 'Email sent successfully', info: info.messageId });
    });
});

// Send SMS reply
app.post('/api/admin/send-sms', (req, res) => {
    if (!req.session.adminId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!twilioClient) {
        return res.status(503).json({ 
            error: 'SMS service not configured. Please update Twilio credentials in server.js' 
        });
    }

    const { to, message } = req.body;

    if (!to || !message) {
        return res.status(400).json({ error: 'Phone number and message are required' });
    }

    twilioClient.messages
        .create({
            body: message,
            from: twilioPhoneNumber,
            to: to
        })
        .then((twilioMessage) => {
            res.json({ 
                success: true, 
                message: 'SMS sent successfully',
                sid: twilioMessage.sid 
            });
        })
        .catch((error) => {
            console.error('SMS send error:', error);
            res.status(500).json({ 
                error: 'Failed to send SMS. Please check Twilio configuration.',
                details: error.message 
            });
        });
});

// Serve admin panel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║  OMC Website Server Started Successfully                       ║
╠════════════════════════════════════════════════════════════════╣
║  Server running at: http://localhost:${PORT}                     ║
║  Website: http://localhost:${PORT}                               ║
║  Admin Panel: http://localhost:${PORT}/admin                     ║
║                                                                ║
║  Admin Credentials:                                            ║
║  Username: 0531301008                                          ║
║  Password: 123123                                              ║
╚════════════════════════════════════════════════════════════════╝
    `);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed');
        }
        process.exit(0);
    });
});
