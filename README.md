# OMC Website

Official website for OMC (Oriental Metal Company for Industry) with full contact form and admin management system.

## 🚀 Quick Start

```bash
npm install
npm start
```

Visit: **http://localhost:3000**

## 🔐 Admin Access

**Admin Panel:** http://localhost:3000/admin

**Credentials:**
- Username: `0531301008`
- Password: `123123`

## ✨ Features

### Website
- ✅ Company information pages
- ✅ Services showcase (Salt Mining, Industrial Apps, R&D, Consulting, Packaging, Processing)
- ✅ Contact form with validation
- ✅ Bilingual support (Arabic/English)
- ✅ Responsive design

### Contact Form
- ✅ Name (required)
- ✅ Email OR Phone (at least one required)
- ✅ Message (optional)
- ✅ Real-time validation
- ✅ Database storage with timestamps

### Admin Panel
- ✅ Secure login system
- ✅ View all contact submissions
- ✅ Mark messages as read/unread
- ✅ Delete messages
- ✅ **Send Email replies** to users
- ✅ **Send SMS replies** to users
- ✅ Change admin password
- ✅ Auto-refresh every 30 seconds

## 📧 Email & SMS Setup

Email and SMS features are **ready but require configuration**:

1. **Email Setup** (Gmail):
   - See detailed guide in `EMAIL_SMS_SETUP.md`
   - Update credentials in `server.js` lines 13-22
   - Or use environment variables (recommended)

2. **SMS Setup** (Twilio):
   - See detailed guide in `EMAIL_SMS_SETUP.md`
   - Get free trial account at twilio.com
   - Update credentials in `server.js` lines 25-42

**Note:** The system works without these services configured. Email/SMS buttons will show helpful error messages until configured.

## 📁 Project Structure

```
my-company-website/
├── admin/              # Admin panel
│   └── index.html      # Admin dashboard
├── index.html          # Homepage
├── about.html          # About page
├── services.html       # Services page
├── contact.html        # Contact form
├── server.js           # Backend server
├── styles.css          # Global styles
├── script.js           # Frontend scripts
├── database.db         # SQLite database (auto-created)
└── EMAIL_SMS_SETUP.md  # Email/SMS configuration guide
```

## 🛠️ Technologies

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express
- **Database:** SQLite3
- **Email:** Nodemailer (Gmail)
- **SMS:** Twilio
- **Security:** bcryptjs, express-session

## 📝 Usage

1. **Submit Contact Form:** http://localhost:3000/contact.html
2. **Login to Admin:** http://localhost:3000/admin
3. **View Messages:** See all submissions in the dashboard
4. **Reply:** Click Email or SMS button for users who provided contact info
5. **Manage:** Mark as read or delete messages

## 🔒 Security

- ✅ Password hashing with bcryptjs
- ✅ Session-based authentication
- ✅ SQL injection prevention
- ✅ XSS protection
- ⚠️ **Remember:** Change admin password after first login
- ⚠️ **Production:** Use environment variables for credentials

## 📚 Documentation

- `FORM_AND_ADMIN.md` - Complete form and admin system documentation
- `EMAIL_SMS_SETUP.md` - Email and SMS configuration guide
- `SITE_STRUCTURE.md` - Website structure and pages
- `SETUP.md` - Initial setup guide

## 🐛 Troubleshooting

**Server won't start:**
- Check if port 3000 is in use
- Run: `Get-NetTCPConnection -LocalPort 3000` (Windows)

**Email not sending:**
- Verify Gmail credentials and App Password
- Check `EMAIL_SMS_SETUP.md` for setup instructions

**SMS not sending:**
- Verify Twilio credentials
- For trial accounts, verify recipient numbers
- Check Twilio console for error logs

## 📊 Database

SQLite database is automatically created with:
- **messages** table: Contact form submissions
- **admin_users** table: Admin accounts

Database file: `database.db` (auto-created on first run)

## 🔄 Maintenance

**Reset Admin Password:**
1. Delete `database.db`
2. Restart server
3. New admin created with credentials: 0531301008 / 123123

**Backup Database:**
```bash
copy database.db database.backup.db
```

## 📞 Support

For issues or questions, contact OMC admin at 0531301008