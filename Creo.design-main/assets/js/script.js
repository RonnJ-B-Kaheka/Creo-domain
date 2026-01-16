'use strict';



/**
 * add Event on elements
 */

const addEventOnElem = function(elem, type, callback) {
    if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback);
        }
    } else {
        elem.addEventListener(type, callback);
    }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function() {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function() {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header & back top btn show when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function() {
    if (window.scrollY > 80) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
}

addEventOnElem(window, "scroll", headerActive);


/**
 * Enhanced Interactive Features
 */

// Smooth scrolling for all anchor links
const smoothScroll = function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#' && !this.closest('[data-no-smooth]')) {
                e.preventDefault();

                const targetElement = document.querySelector(href);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
};

// Counter animation for stats
const animateCounters = function() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetValue = parseInt(counter.getAttribute('data-target')) || 0;
                const duration = counter.getAttribute('data-duration') || 2000;
                const increment = targetValue / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetValue) {
                        counter.textContent = targetValue;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);

                observer.unobserve(entry.target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(observerCallback, observerOptions);
    document.querySelectorAll('[data-target]').forEach(counter => {
        counterObserver.observe(counter);
    });
};

// FAQ accordion
const faqAccordion = function() {
    const faqButtons = document.querySelectorAll('.faq-btn');

    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const faqCard = this.closest('.faq-card');

            // Toggle current FAQ
            faqCard.classList.toggle('active');
        });
    });
};

// Contact form validation
const contactFormValidation = function() {
    const contactForms = document.querySelectorAll('form');

    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');

            // Clear previous errors
            form.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

            inputs.forEach(input => {
                const errorElement = input.parentNode.querySelector('.error-message');

                if (!input.value.trim()) {
                    isValid = false;
                    if (errorElement) {
                        errorElement.textContent = `${input.name || input.id} is required`;
                        errorElement.style.display = 'block';
                    }
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                    if (errorElement) errorElement.style.display = 'none';

                    // Email validation
                    if (input.type === 'email' && !isValidEmail(input.value)) {
                        isValid = false;
                        if (errorElement) {
                            errorElement.textContent = 'Please enter a valid email';
                            errorElement.style.display = 'block';
                        }
                        input.classList.add('error');
                    }
                }
            });

            if (isValid) {
                // Show success message
                const messageEl = form.querySelector('[data-form-message]') || document.createElement('div');
                messageEl.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                messageEl.className = 'form-message success';
                messageEl.style.cssText = 'color: #2ecc71; padding: 10px; text-align: center; margin-top: 15px;';
                form.appendChild(messageEl);

                // Reset form
                form.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    messageEl.style.display = 'none';
                }, 5000);
            }
        });
    });
};

// Email validation helper
function isValidEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(String(email).toLowerCase());
}

// Portfolio filtering
const portfolioFiltering = function() {
    const filterButtons = document.querySelectorAll('[data-filter-btn]');
    const filterItems = document.querySelectorAll('[data-category]');

    if (filterButtons.length && filterItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                filterItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                        item.style.display = 'block';
                        item.classList.add('show');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('show');
                    }
                });
            });
        });
    }
};

// Scroll reveal animations
const scrollReveal = function() {
    const revealElements = document.querySelectorAll('.section, .reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
};

// Initialize all enhanced features when DOM is loaded
// Video Modal Functionality
const videoModal = document.getElementById('videoModal');
const videoBtn = document.querySelector('.hero-btn');
const closeVideo = document.getElementById('closeVideo');
const video = document.getElementById('marketingStrategyVideo');

if (videoBtn && videoModal && closeVideo && video) {
    // Open video modal when clicking the "Marketing Strategy" button
    videoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        videoModal.classList.add('active');
        // Play the video when modal opens
        video.play().catch(error => {
            console.log('Video play failed:', error);
        });
    });

    // Close video modal when clicking the close button
    closeVideo.addEventListener('click', function() {
        videoModal.classList.remove('active');
        // Pause the video when modal closes
        video.pause();
        video.load(); // Reset the video to the beginning and stop any background processes
        // Reset the video to the beginning
        video.currentTime = 0;
    });

    // Close video modal when clicking outside the video container
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            video.pause();
            video.load(); // Reset the video to the beginning and stop any background processes
            video.currentTime = 0;
        }
    });

    // Also pause video when user presses Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            videoModal.classList.remove('active');
            video.pause();
            video.load(); // Reset the video to the beginning and stop any background processes
            video.currentTime = 0;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    smoothScroll();
    animateCounters();
    faqAccordion();
    contactFormValidation();
    portfolioFiltering();
    scrollReveal();
});