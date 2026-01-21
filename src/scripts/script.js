document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithData = document.querySelectorAll('[data-en]');
    const html = document.documentElement;
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    let currentLang = 'en';

    // Burger menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Load saved language preference
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
        });
    });

    function setLanguage(lang) {
        currentLang = lang;
        html.lang = lang;
        html.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';

        langButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.lang === lang) {
                button.classList.add('active');
            }
        });

        elementsWithData.forEach(element => {
            if (lang === 'ar') {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.dataset.ar;
                } else {
                    element.textContent = element.dataset.ar;
                }
            } else {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.dataset.en;
                } else {
                    element.textContent = element.dataset.en;
                }
            }
        });

        localStorage.setItem('language', lang);
    }
});