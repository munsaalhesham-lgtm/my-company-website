// Language Toggle
let currentLang = 'ar'; // Default to Arabic

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    updateLanguage();
    localStorage.setItem('language', currentLang);
}

function updateLanguage() {
    const html = document.documentElement;
    html.lang = currentLang;
    html.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all elements with data-ar and data-en attributes
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            // Check if element has data-ar-placeholder or data-en-placeholder
            if (el.hasAttribute('data-ar-placeholder') || el.hasAttribute('data-en-placeholder')) {
                el.placeholder = currentLang === 'ar' ? el.getAttribute('data-ar-placeholder') : el.getAttribute('data-en-placeholder');
            } else {
                el.placeholder = currentLang === 'ar' ? el.dataset.ar : el.dataset.en;
            }
        } else {
            el.textContent = currentLang === 'ar' ? el.dataset.ar : el.dataset.en;
        }
    });
    
    // Update button text
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.textContent = currentLang === 'ar' ? 'EN' : 'AR';
    }
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Load saved language preference
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage();
    }
    
    // Language toggle button
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active') 
                ? 'rotate(45deg) translate(10px, 10px)' 
                : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active') 
                ? 'rotate(-45deg) translate(7px, -7px)' 
                : 'none';
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Form Submission with Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            document.querySelectorAll('.error-message').forEach(msg => {
                msg.textContent = '';
            });

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            const submitMessage = document.getElementById('submitMessage');
            submitMessage.textContent = '';
            submitMessage.style.color = '';

            // Validation flags
            let isValid = true;
            
            // Validate name (required)
            if (!name) {
                document.getElementById('name').parentElement.classList.add('error');
                document.getElementById('nameError').textContent = currentLang === 'ar' 
                    ? 'الاسم مطلوب' 
                    : 'Name is required';
                isValid = false;
            }
            
            // Validate email and phone (at least one required)
            if (!email && !phone) {
                if (!email) {
                    document.getElementById('email').parentElement.classList.add('error');
                    document.getElementById('emailError').textContent = currentLang === 'ar'
                        ? 'البريد أو الهاتف مطلوب'
                        : 'Email or phone is required';
                }
                if (!phone) {
                    document.getElementById('phone').parentElement.classList.add('error');
                    document.getElementById('phoneError').textContent = currentLang === 'ar'
                        ? 'البريد أو الهاتف مطلوب'
                        : 'Email or phone is required';
                }
                isValid = false;
            } else {
                // Validate email format if provided
                if (email && !isValidEmail(email)) {
                    document.getElementById('email').parentElement.classList.add('error');
                    document.getElementById('emailError').textContent = currentLang === 'ar'
                        ? 'البريد الإلكتروني غير صحيح'
                        : 'Invalid email format';
                    isValid = false;
                }
                // Validate phone format if provided
                if (phone && !isValidPhone(phone)) {
                    document.getElementById('phone').parentElement.classList.add('error');
                    document.getElementById('phoneError').textContent = currentLang === 'ar'
                        ? 'رقم الهاتف غير صحيح'
                        : 'Invalid phone format';
                    isValid = false;
                }
            }

            if (!isValid) {
                submitMessage.textContent = currentLang === 'ar'
                    ? 'يرجى ملء الحقول المطلوبة بشكل صحيح'
                    : 'Please fill in required fields correctly';
                submitMessage.style.color = '#d32f2f';
                return;
            }

            // Send data to backend
            const formData = {
                name: name,
                email: email || null,
                phone: phone || null,
                message: message,
                timestamp: new Date().toISOString()
            };

            // Show loading state
            const button = contactForm.querySelector('button');
            const originalText = button.textContent;
            button.disabled = true;
            button.textContent = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';

            // Send to backend
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                // Success
                submitMessage.textContent = currentLang === 'ar'
                    ? '✓ تم إرسال رسالتك بنجاح!'
                    : '✓ Your message was sent successfully!';
                submitMessage.style.color = '#4caf50';
                
                // Reset form
                contactForm.reset();
                
                // Update language display
                updateLanguage();
            })
            .catch(error => {
                console.error('Error:', error);
                submitMessage.textContent = currentLang === 'ar'
                    ? 'حدث خطأ. يرجى المحاولة لاحقاً'
                    : 'An error occurred. Please try again later';
                submitMessage.style.color = '#d32f2f';
            })
            .finally(() => {
                button.disabled = false;
                button.textContent = originalText;
            });
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation (basic - accepts numbers, spaces, dashes, +)
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navigation
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and features
    document.querySelectorAll('.service-card, .feature, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
