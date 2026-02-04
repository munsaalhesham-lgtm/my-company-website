# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Server
```bash
npm start
```

You'll see confirmation that the server is running on http://localhost:3000

### Step 3: Access the Website
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

---

## 📋 Form Validation

### Required Fields (Red Asterisk *)

The contact form now validates:

1. **Name** - REQUIRED (cannot be empty)
2. **Email OR Phone** - At least ONE is REQUIRED
   - Email must be valid format: user@example.com
   - Phone must have at least 7 digits
3. **Message** - Optional

### What Happens When User Submits?

✅ **Valid Form**:
- Green success message appears
- Data is saved to database
- Admin can view it in the panel
- Form clears for next submission

❌ **Invalid Form**:
- Fields turn red with red border
- Error messages appear below each field
- Form does NOT submit
- User can fix errors and try again

---

## 👨‍💼 Admin Panel

### Login
```
Username: admin
Password: admin123
```

**Change password on first login!** (Click "Change Password" button)

### View Messages
1. All contact submissions appear in a table
2. Unread messages have yellow background
3. Click "View" to see full details
4. Click "Mark Read" to mark as read
5. Click "Delete" to remove message

### Admin Features
- ✓ View all contact submissions
- ✓ See message details
- ✓ Mark messages as read/unread
- ✓ Delete messages
- ✓ Change admin password
- ✓ Logout
- ✓ Auto-refresh every 30 seconds

---

## 🔐 Security

### Default Credentials
```
Username: admin
Password: admin123
```

⚠️ **IMPORTANT**: Change this password immediately after first login!

Only the admin can:
- View submitted messages
- Mark messages as read
- Delete messages
- Change admin password

---

## 📊 Database

A SQLite database (`database.db`) is automatically created containing:

- **messages table**: All contact form submissions
- **admin_users table**: Admin login credentials

Data is persistent - it remains after server restart.

---

## 🛑 Stop the Server

Press `Ctrl + C` in PowerShell to stop the server.

---

## ❓ Common Issues

### "Port 3000 is already in use"
```bash
set PORT=3001
npm start
```

### Form not sending?
Check:
1. Name field is filled
2. Email OR Phone is provided
3. Check browser console for errors (F12)

### Can't login to admin panel?
1. Make sure server is running
2. Check username and password (default: admin/admin123)
3. Try refreshing the page

---

## 📧 Contact Information

- **Email**: omc.sa@hotmail.com
- **Phone**: 0555756581 or 0505770258

---

**That's it! Your website is ready to use!** 🎉
