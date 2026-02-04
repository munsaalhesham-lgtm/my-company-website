# Contact Form & Admin System - Complete Implementation

## ✅ What's Been Implemented

### 1. Contact Form Validation
- **Name**: MANDATORY (red asterisk *)
- **Email**: REQUIRED OR Phone (red asterisk *)
- **Phone**: REQUIRED OR Email (red asterisk *)
- **Message**: Optional

### 2. Form Features
- ✓ Red asterisks for required fields
- ✓ Real-time error messages
- ✓ Field highlighting on errors (red border)
- ✓ Email format validation
- ✓ Phone format validation (7+ digits)
- ✓ Success message on submission
- ✓ Form auto-clears after successful submission
- ✓ Bilingual support (Arabic/English)

### 3. Backend Database System
- ✓ SQLite3 database (auto-created)
- ✓ All submissions stored with timestamp
- ✓ Secure connection handling
- ✓ Error handling and logging

### 4. Admin Panel
Located at: `http://localhost:3000/admin`

#### Admin Features:
- ✓ Secure login system
- ✓ View all contact submissions
- ✓ Message details view
- ✓ Mark messages as read/unread
- ✓ Delete messages
- ✓ Change admin password
- ✓ Auto-refresh messages every 30 seconds
- ✓ Message count display
- ✓ Status indicators (Unread/Read)
- ✓ Search-friendly table layout

#### Admin Access Only:
- Only authenticated admins can view messages
- Messages cannot be viewed by website visitors
- Admin sessions are secure with password encryption (bcryptjs)
- Password change enforced on first login

---

## 🔧 Installation & Usage

### Prerequisites
- Node.js installed (https://nodejs.org/)

### Installation
```bash
npm install
```

### Start Server
```bash
npm start
```

### Access Points
- **Website**: http://localhost:3000
- **Contact Form**: http://localhost:3000/contact.html
- **Admin Panel**: http://localhost:3000/admin

---

## 👤 Default Admin Credentials

```
Username: admin
Password: admin123
```

**⚠️ MUST BE CHANGED ON FIRST LOGIN**

---

## 📝 Form Submission Flow

1. **User fills form** with Name (required), Email or Phone (at least one), Message (optional)
2. **Form validates** on submit:
   - Checks name is not empty
   - Checks at least email or phone provided
   - Validates email format
   - Validates phone format
3. **If invalid**:
   - Shows red error messages
   - Highlights fields in red
   - Prevents submission
4. **If valid**:
   - Sends data to `/api/contact` endpoint
   - Shows "Sending..." state
   - Data stored in database with timestamp
   - Shows success message: "✓ Message sent successfully!"
   - Form clears automatically
5. **Admin review**:
   - Message appears in admin panel
   - Marked as "Unread" (yellow)
   - Admin can view, mark read, or delete

---

## 🗄️ Database Structure

### Messages Table
```
id          | INTEGER | Auto-increment unique ID
name        | TEXT    | Visitor's name (required)
email       | TEXT    | Visitor's email (optional)
phone       | TEXT    | Visitor's phone (optional)
message     | TEXT    | Message content
timestamp   | TEXT    | When message was received
read        | INTEGER | 0=Unread, 1=Read
```

### Admin Users Table
```
id          | INTEGER | Auto-increment unique ID
username    | TEXT    | Login username (unique)
password    | TEXT    | Encrypted password (bcryptjs)
created_at  | TEXT    | Account creation date
```

---

## 🔒 Security Features

1. **Password Encryption**: bcryptjs for secure password hashing
2. **Session Management**: express-session for secure admin sessions
3. **Input Validation**: All inputs validated on frontend AND backend
4. **Input Escaping**: HTML/SQL injection prevention
5. **Authentication**: Admin panel requires login
6. **Authorization**: Only logged-in admins can access message data

---

## 📂 New Files Added

```
my-company-website/
├── server.js                    # Node.js Express server
├── package.json                 # Dependencies list
├── database.db                  # SQLite database (auto-created)
├── SETUP.md                     # Detailed setup instructions
├── QUICKSTART.md                # Quick start guide
└── admin/
    └── index.html               # Admin panel interface
```

---

## 🚀 API Endpoints

### Public Endpoints
- `POST /api/contact` - Submit contact form
  - Body: `{ name, email, phone, message }`
  - Returns: `{ success: true, message: "...", id: ... }`

### Admin Endpoints (Authentication Required)
- `POST /api/admin/login` - Admin login
  - Body: `{ username, password }`
  - Returns: `{ success: true }`

- `GET /api/admin/check` - Check admin session
  - Returns: `{ authenticated: true/false, username: "..." }`

- `GET /api/admin/messages` - Get all messages
  - Returns: Array of message objects

- `PUT /api/admin/messages/:id/read` - Mark as read
  - Returns: `{ success: true }`

- `DELETE /api/admin/messages/:id` - Delete message
  - Returns: `{ success: true }`

- `POST /api/admin/change-password` - Change password
  - Body: `{ currentPassword, newPassword }`
  - Returns: `{ success: true }`

- `POST /api/admin/logout` - Logout
  - Returns: `{ success: true }`

---

## 📞 Contact Form in Action

### Example Valid Submission
```
Name: محمد أحمد (Required)
Email: customer@example.com (At least one)
Phone: [empty]
Message: I'm interested in your services
```
✓ **ACCEPTED** - Name and Email provided

### Example Valid Submission
```
Name: John Smith (Required)
Email: [empty]
Phone: 0555756581 (At least one)
Message: Please call me
```
✓ **ACCEPTED** - Name and Phone provided

### Example Invalid Submission
```
Name: [empty] (Required)
Email: customer@example.com
Phone: [empty]
Message: Contact me
```
❌ **REJECTED** - Name is empty

### Example Invalid Submission
```
Name: Ahmed
Email: [empty] (At least one required)
Phone: [empty] (At least one required)
Message: Hello
```
❌ **REJECTED** - Neither email nor phone provided

---

## 🎯 What Happens Next

After user submits valid form:

1. ✓ Message saved to database with timestamp
2. ✓ Success message shown to user
3. ✓ Admin receives new submission notification
4. ✓ Admin can view, manage, and respond to submissions

---

## 📊 Admin Dashboard

### Message Table Shows:
- Name (bold if unread)
- Email
- Phone
- Message preview
- Status badge (Unread/Read)
- Date received
- Action buttons (View, Mark Read, Delete)

### Unread Messages
- Yellow background highlighting
- Status badge: "Unread"
- "Mark Read" button available
- Automatically marked as read when viewed

### Message Details
- Click "View" button
- Full message appears in modal
- All contact information visible
- Can delete from detail view
- Auto-marks as read

---

## ⚙️ Configuration

### To Change Default Port
```bash
set PORT=3001
npm start
```

### To Change Admin Secret (Production)
Edit `server.js` line with:
```javascript
secret: 'your-new-secret-key-here'
```

### To Change Default Admin Credentials
Edit `server.js` in `initializeDatabase()` function to change `admin` and `admin123`

---

## 📞 Support & Contact

**Company**: Oriental Metal Company for Industry (OMC)
- **Email**: omc.sa@hotmail.com
- **Phone**: 0555756581
- **Phone**: 0505770258

---

## ✨ Summary

Your website now has:
- ✅ Complete contact form with validation
- ✅ Red asterisks for required fields
- ✅ Database for message storage
- ✅ Secure admin panel
- ✅ Admin authentication
- ✅ Message management system
- ✅ Admin password management
- ✅ Bilingual support (Arabic/English)

**Ready to go!** 🎉
