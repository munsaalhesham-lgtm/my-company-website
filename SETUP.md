# OMC Website - Setup Instructions

## Prerequisites

- Node.js (v14 or higher) - Download from https://nodejs.org/
- npm (comes with Node.js)

## Installation & Setup

### 1. Install Dependencies

Open PowerShell in the website directory and run:

```bash
npm install
```

This will install all required packages:
- Express.js (web server)
- SQLite3 (database)
- Body Parser (form data)
- Express Session (user sessions)
- Bcryptjs (password encryption)

### 2. Start the Server

Run the server:

```bash
npm start
```

You should see:

```
╔════════════════════════════════════════════════════════════════╗
║  OMC Website Server Started Successfully                       ║
╠════════════════════════════════════════════════════════════════╣
║  Server running at: http://localhost:3000                       ║
║  Website: http://localhost:3000                                 ║
║  Admin Panel: http://localhost:3000/admin                       ║
║                                                                ║
║  Default Credentials:                                          ║
║  Username: admin                                               ║
║  Password: admin123                                            ║
║                                                                ║
║  ⚠️  IMPORTANT: Change password after first login!            ║
╚════════════════════════════════════════════════════════════════╝
```

### 3. Access the Website

- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

## Admin Panel Usage

### Login
- **Default Username**: admin
- **Default Password**: admin123

**⚠️ IMPORTANT**: Change the password after first login!

### Features

1. **View Messages**: See all contact form submissions
2. **Message Details**: Click "View" to see the full message
3. **Mark as Read**: Mark unread messages as read
4. **Delete Messages**: Remove messages from the database
5. **Change Password**: Update admin password (required on first login)

### Message Status
- **Unread** (Yellow badge): New message, not yet viewed
- **Read** (Green badge): Message has been viewed

## Contact Form Validation

The contact form requires:

1. **Name** (Mandatory) - Red asterisk (*)
2. **Email OR Phone** (At least one required) - Red asterisks (*)
3. **Message** (Optional)

### Validation Rules

- **Email**: Must be valid email format (e.g., user@example.com)
- **Phone**: Must have at least 7 digits (supports +, -, spaces)
- **Name**: Cannot be empty

### Error Messages

When validation fails:
- Fields turn red with error border
- Specific error messages appear below each field
- Form cannot be submitted until fixed

## Database

The application uses SQLite3. A database file `database.db` is automatically created on first run.

### Database Structure

```
messages table:
- id: Unique message ID
- name: Visitor's name
- email: Visitor's email (optional)
- phone: Visitor's phone (optional)
- message: The message content
- timestamp: When message was received
- read: Whether admin has viewed it (0/1)

admin_users table:
- id: Admin ID
- username: Login username
- password: Encrypted password
- created_at: Account creation date
```

## Development

For development with auto-reload on file changes:

```bash
npm run dev
```

This requires `nodemon` (already installed in devDependencies).

## Production Deployment

For production:

1. Change default admin password
2. Set environment variables:
   ```bash
   set NODE_ENV=production
   set SESSION_SECRET=your-secure-secret-key
   ```
3. Use HTTPS instead of HTTP
4. Consider using a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js
   ```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
set PORT=3001
npm start
```

### Database Locked Error
The database is being accessed by another process. Make sure only one server instance is running.

### Cannot find module 'sqlite3'
Run `npm install` again to ensure all dependencies are installed.

## File Structure

```
my-company-website/
├── server.js              # Node.js server
├── package.json           # Dependencies
├── database.db            # SQLite database (auto-created)
├── index.html             # Home page
├── about.html             # About page
├── contact.html           # Contact page (with form)
├── services.html          # Services page
├── [service pages]        # Individual service pages
├── script.js              # Frontend JavaScript
├── styles.css             # Styles
├── logo.png               # Company logo
└── admin/
    └── index.html         # Admin dashboard
```

## Security Notes

⚠️ **Important Security Considerations**:

1. **Change Default Password**: Immediately after first login
2. **HTTPS**: Use HTTPS in production
3. **Session Secret**: Change the session secret in `server.js` for production
4. **Input Validation**: All inputs are validated and escaped
5. **Database**: Keep `database.db` in a secure location

## Support

For issues or questions, contact: omc.sa@hotmail.com

## Version History

- **v1.0.0** - Initial release with contact form and admin panel
