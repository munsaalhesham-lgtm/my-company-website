# OMC Website - Complete Structure

## 📋 Site Overview
Your company website now has a **fully separated page structure** with menu-based navigation. All pages are accessible through the navigation menu only (no scrolling through anchor links).

---

## 🏠 Page Structure

### **Home Page** (`index.html`)
- **Content**: Hero section with centered logo and bilingual company name
- **Features**:
  - Centered hero section with gradient background
  - Logo (160px) positioned in center above company name
  - Bilingual text (Arabic company name + English subtitle)
  - Language toggle button in navbar
  - Responsive design
- **Navigation**: Links to About, Services, and Contact pages

### **About Page** (`about.html`)
- **Content**: Company information and features
- **Sections**:
  - Section header with company mission
  - Company story and description
  - Features grid (3 items: Quality, Experience, Innovation)
- **Navigation**: Full navbar + footer with quick links
- **Styling**: Light blue backgrounds, feature cards with hover effects

### **Services Page** (`services.html`)
- **Content**: All 6 service offerings as clickable cards
- **Services Listed**:
  1. Salt Mining (salt-mining.html)
  2. Processing (processing.html)
  3. Packaging (packaging.html)
  4. Industrial Applications (industrial-apps.html)
  5. Research & Development (research-dev.html)
  6. Consulting (consulting.html)
- **Design**: Clickable cards with hover effects, each links to detailed service page
- **Navigation**: Full navbar + footer

### **Contact Page** (`contact.html`)
- **Content**: Contact information and form
- **Sections**:
  - Contact information cards (Phone, Email, Location)
  - Contact form with fields: Name, Email, Phone, Message
  - All form fields with bilingual placeholders
- **Form Handling**: JavaScript-based submission with success message
- **Navigation**: Full navbar + footer

### **Service Detail Pages** (6 pages)
1. `salt-mining.html` - Salt Extraction service
2. `processing.html` - Processing & Purification service
3. `packaging.html` - Packaging & Distribution service
4. `industrial-apps.html` - Industrial Applications service
5. `research-dev.html` - Research & Development service
6. `consulting.html` - Industrial Consulting service

**Features of each service page**:
- Page header with service title and description
- Photo gallery section
- Service details in grid layout
- Back button to services page
- Full navbar + footer

---

## 🗂️ File Structure

```
my-company-website/
├── index.html              (Home - Hero only)
├── about.html              (About Us page)
├── services.html           (All Services listing)
├── contact.html            (Contact & Form)
├── salt-mining.html        (Service detail)
├── processing.html         (Service detail)
├── packaging.html          (Service detail)
├── industrial-apps.html    (Service detail)
├── research-dev.html       (Service detail)
├── consulting.html         (Service detail)
├── styles.css              (All CSS styling)
├── script.js               (JavaScript functionality)
├── logo.png                (Company logo - transparent background)
├── README.md               (Project documentation)
└── WEBSITE_README.md       (Additional documentation)
```

---

## 🎨 Design Features

### **Bilingual Support**
- **Language Toggle**: Spherical button (40x40px) in navbar
- **Automatic RTL/LTR**: Arabic sets right-to-left, English sets left-to-right
- **Language Persistence**: Selected language saved in localStorage
- **All Content Bilingual**: Using data-ar and data-en attributes

### **Color Scheme**
- **Primary Dark**: #1a3a52 (navy blue)
- **Primary Blue**: #2c5aa0 (professional blue)
- **Secondary Blue**: #5B9BD5 (light accent blue)
- **Light Blue Background**: #e8f0f8
- **Text Color**: #333 (dark gray)

### **Typography**
- **Arabic Font**: Almarai (weights: 400, 700, 800)
- **English Font**: Roboto (weights: 400, 500, 700)
- **All fonts imported from Google Fonts**

### **Responsive Design**
- Mobile hamburger menu (hamburger icon)
- Tablet optimization (768px breakpoint)
- Mobile optimization (480px breakpoint)
- Touch-friendly navigation

---

## 🔗 Navigation Menu Structure

All pages include the same navbar with links to:
1. **Home** → index.html
2. **About** → about.html
3. **Services** → services.html
4. **Contact** → contact.html

**No anchor links (#)** - All navigation uses separate page URLs.

---

## 💼 Company Information

**Company Name**: 
- Arabic: شركة المعدن الشرقي للصناعة
- English: Oriental Metal Company for Industry

**Contact Details**:
- Phone 1: 0555756581
- Phone 2: 0505770258
- Email: omc.sa@hotmail.com

**Services**:
- Salt Mining & Extraction
- Processing & Purification
- Packaging & Distribution
- Industrial Applications
- Research & Development
- Consulting Services

---

## 🚀 Key Features

✅ **Centered Hero Section** - Logo and text positioned in the middle
✅ **Separate Pages** - No single-page scrolling, menu-driven navigation
✅ **Bilingual Support** - Full Arabic/English with RTL/LTR support
✅ **Responsive Design** - Works on all devices
✅ **Professional Styling** - Modern UI with gradients and hover effects
✅ **Contact Form** - Functional form with validation and success feedback
✅ **Consistent Branding** - Logo appears in navbar, hero, and footer on all pages
✅ **Mobile Menu** - Hamburger menu for mobile devices
✅ **Smooth Animations** - Hover effects, transitions, and scroll behaviors

---

## 📱 How to Use

1. **Navigate** using the menu buttons at the top
2. **Toggle Language** with the circular button in navbar (EN/AR)
3. **Fill Contact Form** on the Contact page
4. **View Services** by clicking service cards on the Services page
5. **Learn About** the company on the About page

---

## 🎯 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 Last Updated

Website structure completed with:
- ✅ Separated page architecture
- ✅ Menu-driven navigation
- ✅ Centered homepage design
- ✅ Bilingual support on all pages
- ✅ Professional styling and animations
- ✅ Responsive mobile design
- ✅ Contact form functionality
- ✅ Company branding and information
