# Email & SMS Reply Setup Guide

## ✅ Features Added

The admin panel can now:
- **Send Email replies** to users who provided email addresses
- **Send SMS replies** to users who provided phone numbers
- Both features accessible directly from the messages table

## 📧 Email Setup (Gmail)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification**

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Other (Custom name)** → Enter "OMC Website"
4. Click **Generate**
5. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 3: Configure Email in server.js
Update lines 13-17 in `server.js`:

```javascript
const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',  // ← Your Gmail address
        pass: 'abcdefghijklmnop'        // ← Your 16-char app password (no spaces)
    }
});
```

**Alternative: Use Environment Variables (Recommended for production)**
1. Create a file named `.env` in the project root
2. Add:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcdefghijklmnop
```
3. Install dotenv: `npm install dotenv`
4. Add to top of server.js: `require('dotenv').config();`

## 📱 SMS Setup (Twilio)

### Step 1: Create Twilio Account
1. Sign up at: https://www.twilio.com/try-twilio
2. Verify your email and phone number
3. Complete the onboarding process

### Step 2: Get Credentials
1. Go to Twilio Console: https://console.twilio.com/
2. Copy your:
   - **Account SID** (e.g., `AC1234567890abcdef...`)
   - **Auth Token** (click to reveal)

### Step 3: Get Phone Number
1. In Twilio Console, go to **Phone Numbers** → **Manage** → **Buy a number**
2. Select a number (free trial provides $15 credit)
3. Copy your Twilio phone number (e.g., `+1234567890`)

### Step 4: Configure SMS in server.js
Update lines 20-24 in `server.js`:

```javascript
const twilioClient = twilio(
    'AC1234567890abcdef...',  // ← Your Account SID
    'your-auth-token'          // ← Your Auth Token
);
const twilioPhoneNumber = '+1234567890'; // ← Your Twilio phone number
```

**Alternative: Use Environment Variables (Recommended)**
In `.env` file:
```
TWILIO_ACCOUNT_SID=AC1234567890abcdef...
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE=+1234567890
```

## 🚀 Usage

### In Admin Panel:
1. Login at http://localhost:3000/admin
2. View messages in the dashboard
3. For each message:
   - **Email button** appears if user provided email
   - **SMS button** appears if user provided phone
4. Click button to open compose modal
5. Edit subject/message and send

### Email Features:
- Pre-filled recipient and subject
- HTML formatted messages
- Automatic signature

### SMS Features:
- 320 character limit
- Instant delivery
- Character counter

## ⚠️ Important Notes

### Email:
- Gmail may block "less secure apps" - use App Passwords
- For production, consider services like SendGrid or AWS SES
- Test emails might go to spam initially

### SMS:
- Twilio trial account can only send to verified numbers
- Upgrade for production use ($0.0075 per SMS to US numbers)
- International SMS costs vary by country
- SMS length over 160 chars = multiple messages charged

### Testing:
1. Submit a test message via contact form
2. Login to admin panel
3. Try sending email/SMS reply
4. Check for errors in browser console and terminal

## 🔒 Security Best Practices

1. **Never commit credentials to git**
   - Add `.env` to `.gitignore`
   - Use environment variables

2. **Rotate credentials regularly**
   - Change app passwords monthly
   - Rotate Twilio tokens quarterly

3. **Monitor usage**
   - Check Gmail sent folder
   - Review Twilio usage dashboard
   - Set up usage alerts

## 🛠️ Troubleshooting

### Email not sending:
- Check Gmail credentials
- Verify 2FA and App Password setup
- Check terminal for error messages
- Test with: `npm test` (if test script added)

### SMS not sending:
- Verify Twilio credentials
- Check phone number format (must include country code)
- For trial accounts, verify recipient numbers
- Check Twilio console logs

### "Configuration error" messages:
- Ensure all credentials are set in server.js
- Check for typos in environment variables
- Restart server after config changes

## 📊 Cost Estimates

### Email (Gmail):
- **Free**: Up to 500 emails/day
- For higher volume: Use SendGrid (100 emails/day free)

### SMS (Twilio):
- **Trial**: $15 credit (≈2000 SMS to verified numbers)
- **Production US**: $0.0075/SMS
- **Production International**: $0.02-$0.10/SMS
- Monthly phone number: $1.15/month

## 🔄 Alternative Services

### Email:
- **SendGrid**: 100 emails/day free
- **AWS SES**: $0.10 per 1000 emails
- **Mailgun**: 5000 emails/month free

### SMS:
- **Vonage (Nexmo)**: Similar to Twilio
- **AWS SNS**: $0.00645/SMS
- **MessageBird**: Competitive pricing

## 📝 Next Steps

1. Set up Gmail App Password
2. Configure email credentials in server.js
3. Test email functionality
4. (Optional) Set up Twilio for SMS
5. Test SMS functionality
6. Move credentials to environment variables
7. Add `.env` to `.gitignore`

---

**Need help?** Check the terminal output for detailed error messages when testing send functions.
