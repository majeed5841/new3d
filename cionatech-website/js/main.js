// Ciona Tech LLC - Main JavaScript File

// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const scrollTopBtn = document.getElementById('scroll-top');
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollTopBtn.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollTopBtn.classList.remove('visible');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Scroll to Top Button
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Live Chat Toggle
chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
});

chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter, .stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        
        const updateCounter = () => {
            const count = +counter.innerText.replace(/[^0-9]/g, '');
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when in view
const resultsSection = document.getElementById('results');
if (resultsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(resultsSection);
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Toggle current FAQ
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Form Submissions
const ctaForm = document.getElementById('cta-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(ctaForm);
        const data = Object.fromEntries(formData);
        
        // Show success message (in production, send to backend)
        alert('Thank you for your interest! We will contact you within 24 hours.');
        ctaForm.reset();
    });
}

// Video Testimonial Modal (Placeholder)
const playButtons = document.querySelectorAll('.play-btn');
playButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // In production, this would open a video modal
        alert('Video testimonial would play here. Integrate with YouTube/Vimeo API.');
    });
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Parallax Effect for Hero Section
const heroBg = document.querySelector('.hero-bg-animation');
if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// Logo Marquee Duplication (for seamless infinite scroll)
const logosTrack = document.querySelector('.logos-track');
if (logosTrack) {
    const logoItems = logosTrack.querySelectorAll('.logo-item');
    logoItems.forEach(item => {
        const clone = item.cloneNode(true);
        logosTrack.appendChild(clone);
    });
}

// Service Card Hover Effect Enhancement
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        serviceCards.forEach(c => {
            if (c !== this) {
                c.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        serviceCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// Case Study Card Animation
const caseStudyCards = document.querySelectorAll('.case-study-card');
caseStudyCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        caseStudyCards.forEach(c => {
            if (c !== this) {
                c.style.transform = 'scale(0.95)';
                c.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        caseStudyCards.forEach(c => {
            c.style.transform = 'translateY(0)';
            c.style.opacity = '1';
        });
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance Optimization: Lazy Load Images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Console Welcome Message
console.log('%c🚀 Ciona Tech LLC - Digital Marketing Agency', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cReady to grow your business? Contact us at info@cionatech.com', 'color: #7c3aed; font-size: 14px;');

// Error Handling for Lottie Players
document.addEventListener('DOMContentLoaded', () => {
    const lottiePlayers = document.querySelectorAll('lottie-player');
    lottiePlayers.forEach(player => {
        player.addEventListener('error', () => {
            console.warn('Lottie animation failed to load:', player.getAttribute('src'));
            // Fallback: Replace with icon or static image
            player.parentElement.innerHTML = '<i class="fas fa-chart-line" style="font-size: 3rem; color: var(--primary-color);"></i>';
        });
    });
});

// ROI Calculator (Bonus Feature)
function calculateROI(adSpend, revenue) {
    return ((revenue - adSpend) / adSpend) * 100;
}

// Export functions for potential use in other pages
window.CionaTech = {
    calculateROI,
    animateCounters
};
