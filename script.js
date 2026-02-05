// ===================================
// CuaTiemNho - Interactive JavaScript
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Navigation Scroll Effect
    // ===================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Active Navigation Link on Scroll
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (correspondingLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    // ===================================
    // Fade-in Animation on Scroll
    // ===================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Stagger animation
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // ===================================
    // Counter Animation for Stats
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isTime = target.includes('/');
        
        if (isTime || isNaN(parseInt(target))) {
            return; // Skip animation for non-numeric values
        }
        
        const finalValue = parseInt(target.replace(/\D/g, ''));
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = finalValue / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                element.textContent = target; // Set final value with formatting
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
            }
        }, duration / steps);
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    animateCounter(statNumber);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ===================================
    // Form Validation (for SMS Opt-In page)
    // ===================================
    const smsForm = document.getElementById('smsOptInForm');
    
    if (smsForm) {
        smsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phone = document.getElementById('phone');
            const consent = document.getElementById('consent');
            
            // Reset previous errors
            clearErrors();
            
            let isValid = true;
            
            // Validate phone number (Vietnamese format)
            const phoneRegex = /^(0|\+84)[0-9]{9}$/;
            if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
                showError(phone, 'Vui lòng nhập số điện thoại hợp lệ');
                isValid = false;
            }
            
            // Validate consent checkbox
            if (!consent.checked) {
                showError(consent, 'Bạn cần đồng ý với điều khoản để tiếp tục');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showSuccess();
                smsForm.reset();
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
        input.classList.add('error');
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    }
    
    function showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-icon">✓</div>
            <h3>Đăng ký thành công!</h3>
            <p>Bạn sẽ nhận được tin nhắn xác nhận trong giây lát.</p>
        `;
        
        const formContainer = document.querySelector('.form-container');
        formContainer.innerHTML = '';
        formContainer.appendChild(successDiv);
        
        // Add animation
        setTimeout(() => {
            successDiv.style.opacity = '1';
            successDiv.style.transform = 'scale(1)';
        }, 100);
    }
    
    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // ===================================
    // Cursor Trail Effect (Optional - Premium Touch)
    // ===================================
    let cursorTrail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 768) { // Only on desktop
            cursorTrail.push({ x: e.clientX, y: e.clientY });
            
            if (cursorTrail.length > trailLength) {
                cursorTrail.shift();
            }
        }
    });
    
    // ===================================
    // Console Easter Egg
    // ===================================
    console.log('%c🏪 CuaTiemNho', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%cChào mừng bạn đến với CuaTiemNho! 👋', 'font-size: 14px; color: #667eea;');
    console.log('%cWebsite được thiết kế với ❤️ bởi AI', 'font-size: 12px; color: #999;');
    
});

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
