# Node.js Installation Guide

## Step 1: Download Node.js

1. Go to https://nodejs.org/
2. Download the **LTS (Long Term Support)** version (recommended for production)
3. Currently recommended: v20 LTS or higher

## Step 2: Install Node.js

### Windows Installation:

1. Run the downloaded `.msi` installer file
2. Follow the installation wizard:
   - Click "Next" on welcome screen
   - Accept the license agreement
   - Choose installation path (default is fine)
   - Click "Install"
   - Allow UAC (User Account Control) prompt
   - Click "Finish"

3. **Restart your computer** (important!)

### Verify Installation

Open PowerShell and run:
```bash
node --version
npm --version
```

You should see version numbers like:
```
v20.x.x
9.x.x
```

## Step 3: Navigate to Project

```bash
cd c:\Users\munir\PROJECTS\my-company-website
```

## Step 4: Install Dependencies

```bash
npm install
```

This will download and install all required packages (may take 1-2 minutes).

## Step 5: Start the Server

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
...
```

## Step 6: Access the Website

- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
  - Username: `admin`
  - Password: `admin123`

## Troubleshooting

### Still getting "npm: The term 'npm' is not recognized"

1. **Restart PowerShell** after installing Node.js
2. Or **restart your computer** if you just installed Node.js
3. Then try again

### Port 3000 Already in Use

If you get "Port 3000 already in use" error:
```bash
set PORT=3001
npm start
```

Then access at http://localhost:3001

### Other Issues

If you need help, check:
1. Node.js is properly installed: `node --version`
2. npm is working: `npm --version`
3. You're in the correct directory: `cd c:\Users\munir\PROJECTS\my-company-website`

---

**Once Node.js is installed, run these commands in PowerShell:**

```bash
cd c:\Users\munir\PROJECTS\my-company-website
npm install
npm start
```

Then visit: http://localhost:3000
