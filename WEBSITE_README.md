# OMC Company Website

A modern, responsive website template for OMC company. Built with HTML5, CSS3, and vanilla JavaScript.

## Features

- ✨ **Modern Design** - Clean and professional layout
- 📱 **Responsive** - Works perfectly on all devices (desktop, tablet, mobile)
- ⚡ **Fast** - No heavy frameworks, lightweight and performant
- 🎨 **Customizable** - Easy to modify colors, content, and sections
- ♿ **Accessible** - Semantic HTML and proper ARIA labels
- 🔍 **SEO Friendly** - Proper meta tags and structure

## File Structure

```
my-company-website/
├── index.html       # Main HTML file
├── styles.css       # CSS styling
├── script.js        # JavaScript functionality
└── README.md        # This file
```

## Sections

1. **Navigation Bar** - Sticky navigation with mobile menu
2. **Hero Section** - Eye-catching welcome section
3. **About Section** - Company information with features
4. **Services Section** - Display of services/products
5. **Contact Section** - Contact form and information
6. **Footer** - Copyright and links

## Customization Guide

### Change Company Name
Open `index.html` and find the `<title>` tag and `.logo` section. Replace "OMC" with your company name.

### Update Colors
Edit `styles.css` and modify the CSS variables at the top:
```css
:root {
    --primary-color: #0066cc;      /* Change this */
    --secondary-color: #00a3ff;    /* Change this */
    --dark-color: #1a1a1a;
    --light-color: #f4f4f4;
    --text-color: #333;
}
```

### Update Contact Information
In `index.html`, find the Contact Section and update:
- Phone number
- Email address
- Physical address
- Social media links

### Add Your Services
Add or modify service cards in the Services Section. Each card has:
- Icon (using Font Awesome)
- Title
- Description

### Custom Content
All text content can be easily modified directly in the HTML file. Look for section headings and descriptions to customize them to your needs.

### Add Images
To add images:
1. Place image files in a `images` folder
2. Update the HTML to reference them: `<img src="images/your-image.jpg" alt="Description">`

## Colors Explanation

- **Primary Blue** (#0066cc) - Main brand color for headings and buttons
- **Secondary Blue** (#00a3ff) - Accent color for icons and hover states
- **Dark** (#1a1a1a) - Footer background
- **Light** (#f4f4f4) - Section backgrounds

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Font Awesome Icons

The website uses Font Awesome 6.4.0 for icons. Visit [FontAwesome.com](https://fontawesome.com/icons) to find more icons and update the icon classes.

## Performance Tips

1. Optimize images before adding them
2. Keep content concise and relevant
3. Test on mobile devices regularly
4. Monitor page load speed

## SEO Optimization

Update these for better search results:
- Page title in `<title>` tag
- Meta description in `<meta name="description">`
- Keywords in your headings
- Alt text for images

## Contact Form

The contact form currently logs data to the browser console and shows a success message. To actually send emails, you'll need to:

1. Use a backend service (Node.js, Python, PHP)
2. Use a third-party service like Formspree, EmailJS, or Netlify Forms
3. Connect to your email service

Example with Formspree:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Deployment

You can host this website on:
- **Netlify** - Drag and drop deployment
- **GitHub Pages** - Free hosting for static sites
- **Vercel** - Modern hosting platform
- **Traditional Web Hosting** - Any hosting provider

## Future Enhancements

Consider adding:
- Blog section
- Team member profiles
- Testimonials/Reviews
- Portfolio/Gallery
- Pricing table
- FAQ section
- Newsletter signup

## Support

For questions or issues:
1. Check the HTML comments in the files
2. Review the CSS variable definitions
3. Test in different browsers
4. Check browser console for errors (F12)

## License

Free to use and modify for your business.

---

**Last Updated:** February 2024
**Version:** 1.0
