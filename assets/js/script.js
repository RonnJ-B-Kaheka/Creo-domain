'use strict';



/**
 * add Event on elements
 */

const addEventOnElem = function(elem, type, callback) {
    if (!elem || !type || !callback) {
        console.warn('Missing required parameters for addEventOnElem');
        return;
    }

    try {
        if (elem.length > 1) {
            for (let i = 0; i < elem.length; i++) {
                if (elem[i] && typeof elem[i].addEventListener === 'function') {
                    elem[i].addEventListener(type, callback);
                }
            }
        } else {
            if (elem && typeof elem.addEventListener === 'function') {
                elem.addEventListener(type, callback);
            }
        }
    } catch (error) {
        console.error('Error adding event listener:', error);
    }
}



/**
 * navbar toggle
 */

// Safe element selection with error handling
let navbar, navTogglers, navbarLinks, overlay, navActions;

// Initialize all navbar functionality after DOM is loaded
function initNavbar() {
    // Select elements
    navbar = document.querySelector("[data-navbar]");
    navTogglers = document.querySelectorAll("[data-nav-toggler]");
    navbarLinks = document.querySelectorAll("[data-nav-link]");
    overlay = document.querySelector("[data-overlay]");
    navActions = document.querySelector('.nav-actions');

    const navOpenBtn = document.querySelector('.nav-open-btn');
    const navCloseBtn = document.querySelector('.nav-close-btn');

    // Validate elements
    if (!navbar) {
        console.error('ERROR: Navbar element not found');
        return;
    }

    if (navTogglers.length === 0) {
        console.error('ERROR: No nav toggler elements found');
        return;
    }

    if (navOpenBtn) {
        navOpenBtn.setAttribute('aria-expanded', 'false');
    }

    if (navCloseBtn) {
        navCloseBtn.setAttribute('aria-label', 'Close menu');
    }

    if (navbar) {
        navbar.setAttribute('aria-hidden', 'true');
    }

    if (overlay) {
        overlay.setAttribute('aria-hidden', 'true');
    }

    // Define toggle function
    const toggleNavbar = function(event) {
        if (event && event.currentTarget && event.currentTarget.matches('.nav-open-btn, .nav-close-btn')) {
            event.preventDefault();
        }

        try {
            if (!navbar) {
                console.error('ERROR: Navbar element not available');
                return;
            }

            const menuIsOpen = navbar.classList.contains('active');

            if (menuIsOpen) {
                closeNavbar();
                return;
            }

            navbar.classList.add('active');
            navbar.setAttribute('aria-hidden', 'false');

            if (navOpenBtn) {
                navOpenBtn.classList.add('is-active');
                navOpenBtn.setAttribute('aria-expanded', 'true');
            }

            if (overlay) {
                overlay.classList.add('active');
                overlay.setAttribute('aria-hidden', 'false');
            }

            if (navActions) {
                navActions.classList.add('faded');
            }

            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollBarWidth > 0) {
                document.body.style.paddingRight = `${scrollBarWidth}px`;
            }
            document.body.style.overflow = 'hidden';

            setupFocusTrap();

            setTimeout(() => {
                if (navbarLinks[0]) {
                    navbarLinks[0].focus();
                }
            }, 100);
        } catch (error) {
            console.error('Error in toggleNavbar function:', error);
        }
    }

    // Attach event listeners
    if (navTogglers.length > 0) {
        navTogglers.forEach((toggler) => {
            toggler.addEventListener('click', toggleNavbar);
        });
    } else {
        console.error('CRITICAL ERROR: No navbar toggler elements found');
    }

    // Close menu on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbar.classList.contains('active')) {
            e.preventDefault();
            closeNavbar();
        }
    });

    // Setup other navbar listeners
    setupNavbarLinkListeners();
    setupOverlayListener();
}

// Initialize navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initNavbar();
        setupNavbarKeyboardNavigation();
    });
} else {
    // DOM is already loaded, initialize immediately
    initNavbar();
    setupNavbarKeyboardNavigation();
}

function closeNavbar() {
    try {
        if (navbar) {
            navbar.classList.remove("active");
            navbar.setAttribute('aria-hidden', 'true');
            // Remove focus trap when closing navbar
            removeFocusTrap();
        }

        if (overlay) {
            overlay.classList.remove("active");
            overlay.setAttribute('aria-hidden', 'true');
        }

        // Reset hamburger animation
        const navOpenBtn = document.querySelector('.nav-open-btn');
        if (navOpenBtn) {
            navOpenBtn.classList.remove('is-active');
            navOpenBtn.setAttribute('aria-expanded', 'false');
            navOpenBtn.focus();
        }

        // Unfade nav actions when navbar is closed
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.classList.remove('faded');
        }

        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    } catch (error) {
        console.error('Error closing navbar:', error);
    }
}

// Focus trap functionality for accessibility
function setupFocusTrap() {
    if (!navbar || !navbar.classList.contains('active')) return;

    const focusableElements = navbar.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Set initial focus to the first element
    firstElement.focus();

    // Handle Tab and Shift+Tab
    function trapFocus(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }

        // Close menu if Escape key is pressed
        if (e.key === 'Escape') {
            closeNavbar();
            document.querySelector('.nav-open-btn').focus();
        }

        // Close menu if user tabs out of the navbar
        if (e.key === 'Tab' && !navbar.contains(document.activeElement)) {
            closeNavbar();
        }
    }

    // Add event listener to trap focus
    document.addEventListener('keydown', trapFocus);

    // Store the function to remove it later
    navbar.trapFocusHandler = trapFocus;
}

// Enhanced keyboard navigation for navbar
function setupNavbarKeyboardNavigation() {
    if (!navbar) return;

    // Add keyboard shortcuts for navbar navigation
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + M to toggle menu
        if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
            e.preventDefault();
            const navOpenBtn = document.querySelector('.nav-open-btn');
            if (navOpenBtn) {
                navOpenBtn.click();
            }
        }

        // Alt + 1-4 to navigate to menu items (if navbar is open)
        if (e.altKey && navbar.classList.contains('active')) {
            const menuItemIndex = parseInt(e.key) - 1;
            if (menuItemIndex >= 0 && menuItemIndex < navbarLinks.length) {
                e.preventDefault();
                navbarLinks[menuItemIndex].focus();
            }
        }
    });
}

function removeFocusTrap() {
    if (navbar && navbar.trapFocusHandler) {
        document.removeEventListener('keydown', navbar.trapFocusHandler);
        delete navbar.trapFocusHandler;
    }
}

// Close navbar when clicking on a link
function setupNavbarLinkListeners() {
    if (navbarLinks && navbarLinks.length > 0) {
        addEventOnElem(navbarLinks, "click", function(e) {
            const isMegaMenuTrigger = this.classList.contains('mega-menu-trigger');
            const isDesktop = window.innerWidth >= 992;

            // On desktop, mega menu triggers should navigate to their href
            // On mobile, they should just toggle the menu without navigating
            if (isMegaMenuTrigger && isDesktop) {
                // Let the link navigate normally on desktop
                setTimeout(() => {
                    closeNavbar();
                }, 50);
            } else if (!isMegaMenuTrigger || !isDesktop) {
                // For regular links or mega menu links on mobile
                setTimeout(() => {
                    closeNavbar();
                }, 100);
            }

            updateActiveNavLink(this);
        });

        // Set initial active link based on current page
        setActiveNavLinkByPage();
    } else {
        console.warn('No navbar link elements found');
    }
}

// Update active navigation link
function updateActiveNavLink(clickedLink) {
    try {
        // Remove active state from all links
        navbarLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });

        // Add active state to the clicked link
        if (clickedLink) {
            clickedLink.classList.add('active');
            clickedLink.setAttribute('aria-current', 'page');
        }
    } catch (error) {
        console.error('Error updating active nav link:', error);
    }
}

// Set active link based on current page
function setActiveNavLinkByPage() {
    try {
        const fullPath = window.location.pathname;
        const currentPage = fullPath.split('/').pop() || 'index.html';
        const currentPageName = currentPage.replace('.html', '').toLowerCase();
        const pathParts = fullPath.split('/').filter(Boolean);

        navbarLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');

            const href = link.getAttribute('href') || '';
            const linkPage = href.split('/').pop().replace('.html', '').toLowerCase();

            let isActive = false;

            // Direct match
            if (currentPageName === linkPage ||
                (currentPageName === 'index' && linkPage === '#home') ||
                (currentPageName === '' && linkPage === '#home')) {
                isActive = true;
            }

            // Service sub-page handling: if on a service sub-page, highlight Services
            if (!isActive && pathParts.includes('services') && linkPage === 'service') {
                isActive = true;
            }

            // Portfolio sub-page handling
            if (!isActive && pathParts.includes('portfolio') && linkPage === 'portfolio') {
                isActive = true;
            }

            if (isActive) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    } catch (error) {
        console.error('Error setting active nav link by page:', error);
    }
}

// Close navbar when clicking on overlay
function setupOverlayListener() {
    if (overlay) {
        overlay.addEventListener('click', closeNavbar);
    }
}



/**
 * header & back top btn show when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function() {
    try {
        if (window.scrollY > 80) {
            if (header) {
                header.classList.add("active");
            }
            if (backTopBtn) {
                backTopBtn.classList.add("active");
            }
        } else {
            if (header) {
                header.classList.remove("active");
            }
            if (backTopBtn) {
                backTopBtn.classList.remove("active");
            }
        }
    } catch (error) {
        console.error('Error in headerActive function:', error);
    }
}

addEventOnElem(window, "scroll", headerActive);


/**
 * Smooth scroll for back to top button
 */

const scrollToTop = function(e) {
    e.preventDefault();

    // Use Lenis smooth scrolling if available, otherwise fallback to native
    if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
        // Native smooth scroll
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// Add event listener to back to top button
const backTopBtn2 = document.querySelector("[data-back-top-btn]");
if (backTopBtn2) {
    backTopBtn2.addEventListener('click', scrollToTop);
}



/**
 * project filtering
 */

const filterBtns = document.querySelectorAll("[data-filter-btn]");
const projectItems = document.querySelectorAll("[data-filter-item]");

let lastClickedBtn = filterBtns[0] || null;

const filterProjectItems = function() {
    try {
        if (lastClickedBtn) {
            lastClickedBtn.classList.remove("active");
        }

        this.classList.add("active");
        lastClickedBtn = this;

        const selectedValue = this.textContent.trim().toLowerCase();

        if (projectItems && projectItems.length > 0) {
            projectItems.forEach(item => {
                if (!item || !item.dataset) return;

                const itemCategory = item.dataset.filterItem ? item.dataset.filterItem.toLowerCase() : '';

                if (selectedValue === "all" || selectedValue === "all projects" || selectedValue.includes(itemCategory) || itemCategory.includes(selectedValue)) {
                    item.classList.remove("filtered-out");
                    item.style.display = "block";
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                } else {
                    item.classList.add("filtered-out");
                    item.style.display = "none";
                    item.style.opacity = "0";
                    item.style.transform = "scale(0.9)";
                }
            });
        }
    } catch (error) {
        console.error('Error in filterProjectItems function:', error);
    }
}

// Set the first filter button as active if available
if (filterBtns.length > 0 && filterBtns[0]) {
    filterBtns[0].classList.add("active");
} else {
    console.warn('No filter buttons found for project filtering');
}

if (filterBtns.length > 0) {
    addEventOnElem(filterBtns, "click", filterProjectItems);
} else {
    console.warn('No filter buttons available to attach event');
}


/**
 * Card Navigation and Scroll Functionality
 */

// Add card navigation functionality
const cardElements = document.querySelectorAll('.project-card, .service-card, .feature-card');

// Add keyboard navigation support for cards
if (cardElements.length > 0) {
    cardElements.forEach(card => {
        // Add tabindex for keyboard accessibility
        card.setAttribute('tabindex', '0');

        // Add event listeners for mouse and keyboard interaction
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(255, 0, 85, 0.2)';

            // Prevent card images from vanishing on hover
            const cardImages = this.querySelectorAll('img');
            cardImages.forEach(img => {
                img.style.opacity = '1';
                img.style.visibility = 'visible';
            });
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';

            // Ensure card images remain visible after hover
            const cardImages = this.querySelectorAll('img');
            cardImages.forEach(img => {
                img.style.opacity = '1';
                img.style.visibility = 'visible';
            });
        });

        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Add scroll functionality to ensure cards are accessible
const scrollContainers = document.querySelectorAll('.grid-list');

scrollContainers.forEach(container => {
    // Enable horizontal scrolling if needed
    container.addEventListener('wheel', function(e) {
        if (e.deltaX === 0) {
            e.preventDefault();
            this.scrollLeft += e.deltaY;
        }
    }, { passive: false });
});

// Add exit functionality for modal-like cards
// Continue with card enhancements from the first section
// (No need to redeclare cardElements or scrollContainers as they're already defined)

// Analytics for contact form button
const contactButton = document.querySelector('.contact-button');
if (contactButton) {
    contactButton.addEventListener('click', function(e) {
        // Fire analytics events if globals exist
        try {
            if (window.gtag) {
                gtag('event', 'click', {
                    event_category: 'Contact',
                    event_label: 'Open Google Form'
                });
            }

            if (window.dataLayer) {
                dataLayer.push({
                    event: 'open_google_form',
                    category: 'Contact',
                    label: 'Open Google Form'
                });
            }
        } catch (error) {
            console.warn('Error firing analytics events:', error);
        }
    });
}

// Contact Form Validation and Multi-step Functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nextStepBtn = document.getElementById('nextStepBtn');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const submitBtn = document.getElementById('submitBtn');
    const formSteps = form.querySelectorAll('.form-step');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const charCount = document.getElementById('charCount');
    const messageField = document.getElementById('message');

    let currentStep = 1;
    const totalSteps = 2;

    // Character count for message field
    if (messageField && charCount) {
        messageField.addEventListener('input', () => {
            const current = messageField.value.length;
            const max = messageField.getAttribute('maxlength') || 1000;
            charCount.textContent = `${current}/${max}`;
        });
    }

    // Field validation
    const validateField = (field) => {
        const value = field.value.trim();
        const errorSpan = document.getElementById(`${field.id}-error`);
        let isValid = true;
        let errorMessage = '';

        // Required field check
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Min length validation
        const minLength = field.getAttribute('minlength');
        if (minLength && value.length < parseInt(minLength)) {
            isValid = false;
            errorMessage = `Minimum ${minLength} characters required`;
        }

        // Update error display
        if (errorSpan) {
            errorSpan.textContent = errorMessage;
            errorSpan.style.display = isValid ? 'none' : 'block';
        }

        // Update field styling
        if (isValid) {
            field.style.borderColor = 'var(--primary-color)';
        } else {
            field.style.borderColor = '#ff4444';
        }

        return isValid;
    };

    // Validate all fields in current step
    const validateStep = (stepNum) => {
        const step = form.querySelector(`.form-step[data-step="${stepNum}"]`);
        if (!step) return true;

        const requiredFields = step.querySelectorAll('[required]');
        let allValid = true;

        requiredFields.forEach(field => {
            if (!validateField(field)) {
                allValid = false;
            }
        });

        return allValid;
    };

    // Update progress bar
    const updateProgress = () => {
        const progress = (currentStep / totalSteps) * 100;
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        if (progressText) {
            progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
        }
    };

    // Show step
    const showStep = (stepNum) => {
        formSteps.forEach(step => {
            step.style.display = 'none';
        });
        const targetStep = form.querySelector(`.form-step[data-step="${stepNum}"]`);
        if (targetStep) {
            targetStep.style.display = 'block';
            targetStep.style.opacity = '0';
            setTimeout(() => {
                targetStep.style.opacity = '1';
            }, 50);
        }
        updateProgress();
    };

    // Next step button
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
                if (currentStep === totalSteps) {
                    validateStep(currentStep);
                }
            }
        });
    }

    // Previous step button
    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }

    // Real-time validation on blur
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', () => {
            validateField(field);
        });

        field.addEventListener('input', () => {
            // Clear error on input
            const errorSpan = document.getElementById(`${field.id}-error`);
            if (errorSpan && field.style.borderColor === 'rgb(255, 68, 68)') {
                field.style.borderColor = '';
                errorSpan.style.display = 'none';
            }

            // Check if step is valid to enable/disable submit
            if (currentStep === totalSteps) {
                const stepValid = validateStep(currentStep);
                if (submitBtn) {
                    submitBtn.disabled = !stepValid;
                }
            }
        });
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', async(e) => {
            e.preventDefault();

            if (!validateStep(currentStep)) {
                return;
            }

            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="span">Sending...</span><ion-icon name="refresh-outline" class="spin"></ion-icon>';
            }

            // Check honeypot
            const honeypot = document.getElementById('_honeypot');
            if (honeypot && honeypot.value) {
                // Bot detected - pretend success
                showSuccessMessage();
                return;
            }

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showSuccessMessage();
                } else {
                    showErrorMessage();
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showErrorMessage();
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span class="span">Send Message</span><ion-icon name="send-outline"></ion-icon>';
                }
            }
        });
    }

    function showSuccessMessage() {
        const feedback = document.getElementById('form-feedback');
        if (feedback) {
            feedback.innerHTML = `
                <div style="background: rgba(0, 255, 136, 0.1); border: 1px solid #00ff88; padding: 20px; border-radius: 8px; text-align: center;">
                    <ion-icon name="checkmark-circle" style="font-size: 48px; color: #00ff88; margin-bottom: 10px;"></ion-icon>
                    <h3 style="color: #00ff88; margin-bottom: 10px;">Message Sent Successfully!</h3>
                    <p style="color: var(--text-secondary);">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
            `;
            feedback.style.display = 'block';
            feedback.setAttribute('aria-hidden', 'false');
        }
        form.reset();
        currentStep = 1;
        showStep(1);
    }

    function showErrorMessage() {
        const feedback = document.getElementById('form-feedback');
        if (feedback) {
            feedback.innerHTML = `
                <div style="background: rgba(255, 68, 68, 0.1); border: 1px solid #ff4444; padding: 20px; border-radius: 8px; text-align: center;">
                    <ion-icon name="alert-circle" style="font-size: 48px; color: #ff4444; margin-bottom: 10px;"></ion-icon>
                    <h3 style="color: #ff4444; margin-bottom: 10px;">Submission Failed</h3>
                    <p style="color: var(--text-secondary);">Something went wrong. Please try again or contact us directly at contact.creomedia@gmail.com</p>
                </div>
            `;
            feedback.style.display = 'block';
            feedback.setAttribute('aria-hidden', 'false');
        }
    }
}

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', initContactForm);

// FAQ Accordion Functionality
function initFAQAccordions() {
    window.faqInitCalled = true;
    const faqButtons = document.querySelectorAll('button.faq-item');

    faqButtons.forEach(button => {
        // Click handler
        button.addEventListener('click', () => {
            toggleFAQ(button);
        });

        // Keyboard navigation
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(button);
            } else if (e.key === 'Escape') {
                const isOpen = button.getAttribute('aria-expanded') === 'true';
                if (isOpen) {
                    toggleFAQ(button);
                }
            }
        });
    });

    // Initialize search if search input exists
    const faqSearch = document.getElementById('faq-search');
    if (faqSearch) {
        faqSearch.addEventListener('input', (e) => {
            filterFAQs(e.target.value);
        });
    }
}

function toggleFAQ(button) {
    const contentId = button.getAttribute('aria-controls');
    const content = document.getElementById(contentId);
    const icon = button.querySelector('.faq-icon');
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    // Close all other FAQs
    const allFaqButtons = document.querySelectorAll('button.faq-item');
    allFaqButtons.forEach(otherButton => {
        if (otherButton !== button) {
            otherButton.setAttribute('aria-expanded', 'false');
            const otherContentId = otherButton.getAttribute('aria-controls');
            const otherContent = document.getElementById(otherContentId);
            const otherIcon = otherButton.querySelector('.faq-icon');

            if (otherContent) {
                otherContent.style.maxHeight = '0px';
                otherContent.style.opacity = '0';
            }

            if (otherIcon) {
                otherIcon.style.transform = 'rotate(0deg)';
                otherIcon.setAttribute('name', 'chevron-forward-outline');
            }

            otherButton.classList.remove('active');
        }
    });

    // Toggle current FAQ
    if (!isOpen) {
        button.setAttribute('aria-expanded', 'true');
        button.classList.add('active');

        if (content) {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
        }
        if (icon) {
            icon.style.transform = 'rotate(90deg)';
            icon.setAttribute('name', 'chevron-down-outline');
        }

        trackFAQClick(button);
    } else {
        button.setAttribute('aria-expanded', 'false');
        button.classList.remove('active');

        if (content) {
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
        }
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
            icon.setAttribute('name', 'chevron-forward-outline');
        }
    }
}

function filterFAQs(searchTerm) {
    const term = searchTerm.toLowerCase();
    const faqButtons = document.querySelectorAll('button.faq-item');
    let visibleCount = 0;

    faqButtons.forEach(button => {
        const questionText = button.textContent.toLowerCase();
        const contentId = button.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        const answerText = content ? content.textContent.toLowerCase() : '';

        const matches = questionText.includes(term) || answerText.includes(term);

        if (matches || term === '') {
            button.style.display = 'block';
            if (content) {
                content.parentElement.style.display = 'block';
            }
            visibleCount++;
        } else {
            button.style.display = 'none';
            if (content) {
                content.parentElement.style.display = 'none';
            }
        }
    });

    // Update result count
    const resultCount = document.getElementById('faq-result-count');
    if (resultCount) {
        resultCount.textContent = term === '' ? '' : `${visibleCount} results found`;
    }
}

function trackFAQClick(button) {
    // Track FAQ opens in localStorage for analytics
    const questionText = button.textContent.trim();
    const faqStats = JSON.parse(localStorage.getItem('faqStats') || '{}');

    if (!faqStats[questionText]) {
        faqStats[questionText] = 0;
    }
    faqStats[questionText]++;

    localStorage.setItem('faqStats', JSON.stringify(faqStats));
}

// Initialize FAQ accordions when DOM is ready
window.faqInitPoint = 'REACHED_FAQ_INIT';
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // DOM is ready, call init immediately
    setTimeout(initFAQAccordions, 50);
}
document.addEventListener('DOMContentLoaded', initFAQAccordions);

/**
 * Reveal Elements on Scroll
 */
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            revealObserver.observe(el);
        });
    }

    // SERVICE DISCOVERY MODULE
    const discoveryWidget = document.querySelector('.discovery-widget');
    if (discoveryWidget) {
        let currentStep = 1;
        const totalSteps = 4;
        const answers = {};

        const steps = document.querySelectorAll('.discovery-step');
        const progressSteps = document.querySelectorAll('.progress-step');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const options = document.querySelectorAll('.discovery-option');
        const resultsSection = document.querySelector('.discovery-results');

        // Service recommendations data
        const recommendations = {
            content: {
                title: 'Content Production',
                icon: 'videocam-outline',
                desc: 'Based on your needs, we recommend our content production services to bring your vision to life with cinematic storytelling.',
                metric1: '300%',
                metric2: '50K+'
            },
            digital: {
                title: 'Digital Management',
                icon: 'desktop-outline',
                desc: 'Based on your needs, we recommend our digital management services to optimize your online presence and drive engagement.',
                metric1: '250%',
                metric2: '85%'
            },
            events: {
                title: 'Event Management',
                icon: 'calendar-outline',
                desc: 'Based on your needs, we recommend our event management services to create memorable experiences for your audience.',
                metric1: '500+',
                metric2: '100%'
            },
            podcasting: {
                title: 'Podcasting',
                icon: 'mic-outline',
                desc: 'Based on your needs, we recommend our podcasting services to help you command the airwaves with authority.',
                metric1: '900+',
                metric2: '4.8/5'
            }
        };

        // Update progress bar
        const updateProgress = () => {
            progressSteps.forEach((step, index) => {
                if (index < currentStep) {
                    step.style.background = 'var(--cyan)';
                } else {
                    step.style.background = 'rgba(255,255,255,0.1)';
                }
            });
        };

        // Show step
        const showStep = (stepNum) => {
            steps.forEach(step => {
                step.style.display = 'none';
            });
            const targetStep = document.querySelector(`.discovery-step[data-step="${stepNum}"]`);
            if (targetStep) {
                targetStep.style.display = 'block';
                targetStep.style.opacity = '0';
                targetStep.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    targetStep.style.opacity = '1';
                    targetStep.style.transform = 'translateY(0)';
                }, 50);
            }

            // Update nav buttons
            prevBtn.style.display = stepNum > 1 ? 'block' : 'none';
            nextBtn.textContent = stepNum === totalSteps ? 'See Results' : 'Next';
        };

        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                const value = option.dataset.value;
                const step = option.closest('.discovery-step');
                const stepNum = parseInt(step.dataset.step);

                answers[stepNum] = value;

                // Highlight selected option
                const stepOptions = step.querySelectorAll('.discovery-option');
                stepOptions.forEach(opt => {
                    opt.style.borderColor = '';
                    opt.style.background = '';
                });
                option.style.borderColor = 'var(--cyan)';
                option.style.background = 'rgba(0,229,255,0.1)';

                // Auto-advance after selection
                if (stepNum < totalSteps) {
                    setTimeout(() => {
                        currentStep++;
                        updateProgress();
                        showStep(currentStep);
                    }, 300);
                }
            });
        });

        // Navigation
        nextBtn.addEventListener('click', () => {
            if (currentStep === totalSteps && answers[currentStep]) {
                // Show results
                showResults();
            } else if (currentStep < totalSteps) {
                currentStep++;
                updateProgress();
                showStep(currentStep);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateProgress();
                showStep(currentStep);
            }
        });

        // Show results
        const showResults = () => {
            steps.forEach(step => step.style.display = 'none');
            document.querySelector('.discovery-nav').style.display = 'none';
            resultsSection.style.display = 'block';
            resultsSection.style.opacity = '0';

            setTimeout(() => {
                resultsSection.style.opacity = '1';
            }, 50);

            // Get recommendation based on project type
            const projectType = answers[1] || 'content';
            const rec = recommendations[projectType];

            // Update results
            document.getElementById('recIcon').setAttribute('name', rec.icon);
            document.getElementById('recTitle').textContent = rec.title;
            document.getElementById('recDesc').textContent = rec.desc;
            document.getElementById('recMetric1').textContent = rec.metric1;
            document.getElementById('recMetric2').textContent = rec.metric2;

            // Update progress bar to complete
            progressSteps.forEach(step => {
                step.style.background = 'var(--cyan)';
            });
        };
    }

    // HERO PARALLAX EFFECT
    const heroBgLayer = document.querySelector('.hero-bg-layer');
    if (heroBgLayer) {
        heroBgLayer.classList.add('parallax-enabled');

        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.3;
            heroBgLayer.style.transform = `scale(1.1) translateY(${rate}px)`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateParallax();
                    ticking = true;
                });
            }
        });
    }
});

/**
 * Portfolio Video Carousel Functionality
 */
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('videoCarousel');
    const dots = document.querySelectorAll('.carousel-dot');
    const cards = document.querySelectorAll('.video-card');

    if (!carousel || dots.length === 0) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;
    let autoPlayInterval;
    let isAutoPlaying = true;

    // Auto-play functionality
    const startAutoPlay = () => {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            if (!isAutoPlaying) return;
            const currentIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));
            const nextIndex = (currentIndex + 1) % cards.length;
            cards[nextIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }, 8000); // 8 seconds per slide
    };

    const stopAutoPlay = () => {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    };

    // Start auto-play
    startAutoPlay();

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        isAutoPlaying = false;
    });

    carousel.addEventListener('mouseleave', () => {
        isAutoPlaying = true;
    });

    // Pause on drag
    carousel.addEventListener('mousedown', () => {
        isAutoPlaying = false;
    });

    carousel.addEventListener('mouseup', () => {
        setTimeout(() => { isAutoPlaying = true; }, 3000); // Resume after 3 seconds
    });

    // Drag to scroll functionality
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        isDragging = false;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        const prevScrollLeft = carousel.scrollLeft;
        carousel.scrollLeft = scrollLeft - walk;
        if (Math.abs(carousel.scrollLeft - prevScrollLeft) > 5) {
            isDragging = true;
        }
    });

    // Touch support
    let touchStartX;
    let touchScrollLeft;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - carousel.offsetLeft;
        touchScrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - touchStartX) * 2;
        carousel.scrollLeft = touchScrollLeft - walk;
    });

    carousel.addEventListener('touchend', () => {
        touchStartX = null;
    });

    // Navigation dots click handlers
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            const card = cards[index];
            if (card) {
                card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        });
    });

    // Update active dot on scroll
    const observerOptions = {
        root: carousel,
        threshold: 0.5
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = parseInt(entry.target.dataset.index);
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                    dot.setAttribute('aria-selected', i === index);
                });
            }
        });
    }, observerOptions);

    cards.forEach(card => cardObserver.observe(card));

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
        const currentIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % cards.length;
            cards[nextIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
            cards[prevIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    });

    // Make carousel focusable for keyboard navigation
    carousel.setAttribute('tabindex', '0');
});

/**
 * Portfolio Modal Functionality
 * Updated to work with CaseStudiesLoader
 */
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('portfolioModal');
    const modalClose = document.getElementById('modalClose');

    // Open modal function - now uses CaseStudiesLoader
    function openModal(caseStudyId) {
        // Wait for CaseStudiesLoader to be available
        if (window.CaseStudiesLoader && window.caseStudiesLoader) {
            const data = window.caseStudiesLoader.getCaseStudyById(caseStudyId);
            if (!data) return;

            populateModal(data);
        } else {
            console.error('CaseStudiesLoader not available');
        }
    }

    function populateModal(data) {
        // Populate modal data
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalTags').innerHTML = `<span class="modal-tag">${data.category}</span>`;
        document.getElementById('modalChallenge').textContent = data.challenge;
        document.getElementById('modalApproach').textContent = data.approach;

        // Populate results
        const resultsGrid = document.getElementById('modalResults');
        resultsGrid.innerHTML = Object.entries(data.results).map(([key, result]) => `
            <div class="result-item">
                <span class="result-value">${result.value}</span>
                <span class="result-label">${result.label}</span>
            </div>
        `).join('');

        // Populate testimonial if available
        if (data.testimonial) {
            document.getElementById('testimonialSection').style.display = 'block';
            document.getElementById('modalTestimonialText').textContent = data.testimonial.text;
            document.getElementById('modalTestimonialAuthor').textContent = data.testimonial.author;
            document.getElementById('modalTestimonialRole').textContent = data.testimonial.role;
        } else {
            document.getElementById('testimonialSection').style.display = 'none';
        }

        // Show modal
        modal.style.display = 'block';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }

    // Attach click handlers to view case study links using event delegation
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.card-cta[data-id], .portfolio-item[data-id]');
        if (link) {
            e.preventDefault();
            const caseStudyId = link.dataset.id;
            if (caseStudyId) {
                openModal(caseStudyId);
            }
        }
    });

    // Close button handler
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

/**
 * Portfolio Filtering
 */
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (filterBtns.length === 0 || portfolioItems.length === 0) return;

    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');
    if (urlFilter) {
        applyFilter(urlFilter);
        updateActiveFilterButtons(urlFilter);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.dataset.filter;
            const filterType = btn.dataset.value || filterValue;
            const newUrl = new URL(window.location);
            if (filterType === 'all') {
                newUrl.searchParams.delete('filter');
            } else {
                newUrl.searchParams.set('filter', filterType);
            }
            window.history.pushState({}, '', newUrl);
            applyFilter(filterType);
            updateActiveFilterButtons(filterType);
        });
    });

    window.addEventListener('popstate', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlFilter = urlParams.get('filter');
        applyFilter(urlFilter || 'all');
        updateActiveFilterButtons(urlFilter || 'all');
    });

    function applyFilter(filterValue) {
        portfolioItems.forEach(item => {
            const itemCategory = item.dataset.category;
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = 'block';
                item.style.opacity = '0';
                setTimeout(() => { item.style.opacity = '1'; }, 50);
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    }

    function updateActiveFilterButtons(filterValue) {
        const filterGroups = document.querySelectorAll('.filter-bar, .filter-buttons');
        filterGroups.forEach(group => {
            const buttons = group.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {
                const btnValue = btn.dataset.value || btn.dataset.filter;
                if (btnValue === filterValue || (filterValue === 'all' && btnValue === 'all')) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        });
    }
});

/*-----------------------------------*\
  #TESTIMONIALS CAROUSEL FUNCTIONALITY
\*-----------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playPauseBtn = document.querySelector('.carousel-play-pause');
    const playPauseIcon = playPauseBtn ? playPauseBtn.querySelector('ion-icon') : null;

    let currentIndex = 0;
    let autoPlayInterval;
    let isPlaying = true;
    const autoPlayDelay = 5000;

    // Function to show a specific slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.transform = 'scale(0.95)';
            slide.style.position = 'absolute';
        });

        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        slides[index].style.transform = 'scale(1)';
        slides[index].style.position = 'relative';

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
            dot.style.background = i === index ? '#c9a84c' : 'rgba(255,255,255,0.3)';
        });

        currentIndex = index;
    }

    // Next slide
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Previous slide
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        isPlaying = true;
        if (playPauseIcon) {
            playPauseIcon.setAttribute('name', 'pause-outline');
        }
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
        isPlaying = false;
        if (playPauseIcon) {
            playPauseIcon.setAttribute('name', 'play-outline');
        }
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });
    }

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });

    // Initialize
    showSlide(0);
    startAutoPlay();

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            stopAutoPlay();
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            startAutoPlay();
        }
    }
});

/*-----------------------------------*\
  #PROCESS TIMELINE ANIMATION
\*-----------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    const processTimeline = document.querySelector('.process-timeline');
    if (!processTimeline) return;

    const timelineLine = document.querySelector('.timeline-line');
    const timelineCircles = document.querySelectorAll('.timeline-circle');
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const tooltips = document.querySelectorAll('.tooltip');

    // Animate timeline on page load
    function animateTimeline() {
        // Animate the line
        setTimeout(() => {
            if (timelineLine) {
                timelineLine.style.transform = 'scaleX(1)';
            }
        }, 100);

        // Animate circles sequentially
        timelineCircles.forEach((circle, index) => {
            setTimeout(() => {
                circle.style.transform = 'scale(1)';
            }, 500 + (index * 300));
        });
    }

    // Run animation
    animateTimeline();

    // Hover effects for circles
    timelineCircles.forEach((circle, index) => {
        const step = circle.closest('.timeline-step');
        const tooltip = step.querySelector('.tooltip');
        const color = getComputedStyle(circle).background;

        circle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15)';
            this.style.boxShadow = `0 0 30px ${color}`;
            if (tooltip) {
                tooltip.style.opacity = '1';
            }
        });

        circle.addEventListener('mouseleave', function() {
            if (!this.getAttribute('aria-expanded') || this.getAttribute('aria-expanded') === 'false') {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
            }
            if (tooltip) {
                tooltip.style.opacity = '0';
            }
        });

        // Click to expand step details
        circle.addEventListener('click', function() {
            toggleStep(step);
        });

        // Keyboard navigation
        circle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleStep(step);
            }
        });
    });

    // Toggle step expansion
    function toggleStep(step) {
        const circle = step.querySelector('.timeline-circle');
        const stepCard = step.querySelector('.step-card');
        const stepDetails = step.querySelector('.step-details');
        const isExpanded = circle.getAttribute('aria-expanded') === 'true';

        // Close all other steps
        timelineSteps.forEach(otherStep => {
            if (otherStep !== step) {
                const otherCircle = otherStep.querySelector('.timeline-circle');
                const otherCard = otherStep.querySelector('.step-card');
                const otherDetails = otherStep.querySelector('.step-details');
                const color = getComputedStyle(otherCircle).background;

                otherCircle.setAttribute('aria-expanded', 'false');
                otherCircle.style.transform = 'scale(1)';
                otherCircle.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
                otherCard.style.maxHeight = '120px';
                otherCard.style.padding = '30px';
                if (otherDetails) {
                    otherDetails.style.opacity = '0';
                }
            }
        });

        // Toggle current step
        if (!isExpanded) {
            circle.setAttribute('aria-expanded', 'true');
            circle.style.transform = 'scale(1.15)';
            circle.style.boxShadow = `0 0 30px ${getComputedStyle(circle).background}`;
            stepCard.style.maxHeight = '500px';
            stepCard.style.padding = '30px';
            if (stepDetails) {
                stepDetails.style.opacity = '1';
            }
        } else {
            circle.setAttribute('aria-expanded', 'false');
            circle.style.transform = 'scale(1)';
            circle.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
            stepCard.style.maxHeight = '120px';
            if (stepDetails) {
                stepDetails.style.opacity = '0';
            }
        }
    }

    // Mobile responsiveness - switch to vertical layout
    function handleMobileTimeline() {
        if (window.innerWidth <= 768) {
            if (timelineLine) {
                timelineLine.style.top = '50px';
                timelineLine.style.left = '50px';
                timelineLine.style.right = 'auto';
                timelineLine.style.bottom = 'auto';
                timelineLine.style.width = '3px';
                timelineLine.style.height = 'calc(100% - 100px)';
                timelineLine.style.transform = 'scaleY(0)';
                timelineLine.style.transformOrigin = 'top';
            }

            timelineSteps.forEach(step => {
                step.style.flex = '0 0 100%';
                step.style.textAlign = 'left';
                step.style.padding = '30px 0 30px 80px';
                step.style.position = 'relative';
            });

            timelineCircles.forEach(circle => {
                circle.style.position = 'absolute';
                circle.style.left = '0';
                circle.style.top = '30px';
                circle.style.margin = '0';
            });

            tooltips.forEach(tooltip => {
                tooltip.style.top = '50%';
                tooltip.style.left = '120px';
                tooltip.style.transform = 'translateY(-50%)';
            });
        } else {
            if (timelineLine) {
                timelineLine.style.top = '50px';
                timelineLine.style.left = '0';
                timelineLine.style.right = '0';
                timelineLine.style.bottom = 'auto';
                timelineLine.style.width = '100%';
                timelineLine.style.height = '3px';
                timelineLine.style.transform = 'scaleX(0)';
                timelineLine.style.transformOrigin = 'left';
            }

            timelineSteps.forEach(step => {
                step.style.flex = '1';
                step.style.textAlign = 'center';
                step.style.padding = '0 15px';
                step.style.position = 'relative';
            });

            timelineCircles.forEach(circle => {
                circle.style.position = 'relative';
                circle.style.left = 'auto';
                circle.style.top = 'auto';
                circle.style.margin = '0 auto 20px';
            });

            tooltips.forEach(tooltip => {
                tooltip.style.top = '-40px';
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
            });
        }

        // Re-animate timeline on resize
        setTimeout(() => {
            if (window.innerWidth <= 768) {
                if (timelineLine) {
                    timelineLine.style.transform = 'scaleY(1)';
                }
            } else {
                if (timelineLine) {
                    timelineLine.style.transform = 'scaleX(1)';
                }
            }
        }, 100);
    }

    // Initialize mobile layout
    handleMobileTimeline();
    window.addEventListener('resize', handleMobileTimeline);

    // Intersection Observer for scroll animation
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineObserver.observe(processTimeline);
});

/*-----------------------------------*\
  #PORTFOLIO FILTERING & SORTING SYSTEM
\*-----------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    const filterSystem = document.querySelector('.portfolio-filter-system');
    if (!filterSystem) return;

    const filterBtns = document.querySelectorAll('.filter-btn');
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    const sortSelect = document.getElementById('sortSelect');
    const viewToggles = document.querySelectorAll('.view-toggle');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const filterToggleBtn = document.querySelector('.filter-toggle-btn');
    const filterPanel = document.querySelector('.filter-panel');
    const filteredCountEl = document.getElementById('filteredCount');
    const totalCountEl = document.getElementById('totalCount');
    const caseStudiesGrid = document.querySelector('.case-studies-grid');

    // Filter state
    let activeFilters = {
        service: 'all',
        industry: 'all',
        impact: 'all'
    };
    let currentSort = 'latest';
    let currentView = 'grid';

    // Initialize
    totalCountEl.textContent = caseStudyCards.length;
    filteredCountEl.textContent = caseStudyCards.length;

    // Filter button click handler
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            const filterValue = this.dataset.value;

            // Update active state within same filter group
            const sameGroupBtns = document.querySelectorAll(`.filter-btn[data-filter="${filterType}"]`);
            sameGroupBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update filter state
            activeFilters[filterType] = filterValue;

            // Show/hide clear filters button
            updateClearFiltersButton();

            // Apply filters with debounce
            debounce(applyFilters, 100)();
        });
    });

    // Sort select change handler
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            applyFilters();
        });
    }

    // View toggle handlers
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const view = this.dataset.view;
            currentView = view;

            // Update active state
            viewToggles.forEach(t => {
                t.classList.remove('active');
                t.style.background = 'rgba(255,255,255,0.05)';
                t.style.borderColor = 'rgba(255,255,255,0.1)';
                t.style.color = 'var(--text-secondary)';
            });
            this.classList.add('active');
            this.style.background = 'rgba(201,168,76,0.2)';
            this.style.borderColor = 'rgba(201,168,76,0.3)';
            this.style.color = '#c9a84c';

            // Apply view
            applyView(view);
        });
    });

    // Clear filters handler
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // Reset all filters
            activeFilters = {
                service: 'all',
                industry: 'all',
                impact: 'all'
            };

            // Reset button states
            filterBtns.forEach(btn => {
                if (btn.dataset.value === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Hide clear button
            clearFiltersBtn.style.display = 'none';

            // Apply filters
            applyFilters();
        });
    }

    // Mobile filter toggle
    if (filterToggleBtn && filterPanel) {
        filterToggleBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);

            const toggleIcon = this.querySelector('.toggle-icon');
            if (toggleIcon) {
                toggleIcon.style.transform = !isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
            }

            filterPanel.style.display = !isExpanded ? 'block' : 'none';
        });
    }

    // Update clear filters button visibility
    function updateClearFiltersButton() {
        const hasActiveFilters = Object.values(activeFilters).some(value => value !== 'all');
        if (clearFiltersBtn) {
            clearFiltersBtn.style.display = hasActiveFilters ? 'block' : 'none';
        }
    }

    // Apply filters with animation
    function applyFilters() {
        // Fade out all cards
        caseStudyCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
        });

        setTimeout(() => {
            // Filter cards
            let visibleCards = [];

            caseStudyCards.forEach(card => {
                const category = card.dataset.category;
                const industry = card.dataset.industry;
                const impact = card.dataset.impact;

                const serviceMatch = activeFilters.service === 'all' ||
                    (activeFilters.service === 'content' && category === 'content') ||
                    (activeFilters.service === 'digital' && category === 'digital') ||
                    (activeFilters.service === 'events' && category === 'events') ||
                    (activeFilters.service === 'podcasting' && category === 'podcasting');

                const industryMatch = activeFilters.industry === 'all' ||
                    industry === activeFilters.industry;

                const impactMatch = activeFilters.impact === 'all' ||
                    impact === activeFilters.impact;

                if (serviceMatch && industryMatch && impactMatch) {
                    card.style.display = 'block';
                    visibleCards.push(card);
                } else {
                    card.style.display = 'none';
                }
            });

            // Sort visible cards
            sortCards(visibleCards);

            // Update count
            filteredCountEl.textContent = visibleCards.length;

            // Fade in visible cards with staggered animation
            visibleCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 100);
            });

            // Update URL
            updateURL();

            // Show empty state if no results
            showEmptyState(visibleCards.length === 0);

        }, 200);
    }

    // Sort cards
    function sortCards(cards) {
        const cardArray = Array.from(cards);

        cardArray.sort((a, b) => {
            switch (currentSort) {
                case 'latest':
                    // Default order (as they appear in HTML)
                    return 0;
                case 'impactful':
                    const impactA = parseInt(a.dataset.impactValue) || 0;
                    const impactB = parseInt(b.dataset.impactValue) || 0;
                    return impactB - impactA;
                case 'rated':
                    // For now, use impact value as a proxy for rating
                    const ratingA = parseInt(a.dataset.impactValue) || 0;
                    const ratingB = parseInt(b.dataset.impactValue) || 0;
                    return ratingB - ratingA;
                case 'alphabetical':
                    const titleA = a.dataset.title || '';
                    const titleB = b.dataset.title || '';
                    return titleA.localeCompare(titleB);
                default:
                    return 0;
            }
        });

        // Reorder in DOM
        cardArray.forEach(card => {
            caseStudiesGrid.appendChild(card);
        });
    }

    // Apply view (grid/list)
    function applyView(view) {
        if (view === 'list') {
            caseStudiesGrid.style.gridTemplateColumns = '1fr';
            caseStudyCards.forEach(card => {
                card.style.display = 'flex';
                card.style.flexDirection = 'row';
                card.style.alignItems = 'flex-start';
                card.style.gap = '20px';
            });
        } else {
            caseStudiesGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
            caseStudyCards.forEach(card => {
                card.style.display = '';
                card.style.flexDirection = '';
                card.style.alignItems = '';
                card.style.gap = '';
            });
        }
    }

    // Update URL with filter state
    function updateURL() {
        const params = new URLSearchParams();

        if (activeFilters.service !== 'all') {
            params.set('service', activeFilters.service);
        }
        if (activeFilters.industry !== 'all') {
            params.set('industry', activeFilters.industry);
        }
        if (activeFilters.impact !== 'all') {
            params.set('impact', activeFilters.impact);
        }
        if (currentSort !== 'latest') {
            params.set('sort', currentSort);
        }

        const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
        window.history.replaceState({}, '', newURL);
    }

    // Load filters from URL
    function loadFiltersFromURL() {
        const params = new URLSearchParams(window.location.search);

        if (params.has('service')) {
            activeFilters.service = params.get('service');
            const serviceBtn = document.querySelector(`.filter-btn[data-filter="service"][data-value="${activeFilters.service}"]`);
            if (serviceBtn) {
                document.querySelectorAll('.filter-btn[data-filter="service"]').forEach(b => b.classList.remove('active'));
                serviceBtn.classList.add('active');
            }
        }

        if (params.has('industry')) {
            activeFilters.industry = params.get('industry');
            const industryBtn = document.querySelector(`.filter-btn[data-filter="industry"][data-value="${activeFilters.industry}"]`);
            if (industryBtn) {
                document.querySelectorAll('.filter-btn[data-filter="industry"]').forEach(b => b.classList.remove('active'));
                industryBtn.classList.add('active');
            }
        }

        if (params.has('impact')) {
            activeFilters.impact = params.get('impact');
            const impactBtn = document.querySelector(`.filter-btn[data-filter="impact"][data-value="${activeFilters.impact}"]`);
            if (impactBtn) {
                document.querySelectorAll('.filter-btn[data-filter="impact"]').forEach(b => b.classList.remove('active'));
                impactBtn.classList.add('active');
            }
        }

        if (params.has('sort')) {
            currentSort = params.get('sort');
            if (sortSelect) {
                sortSelect.value = currentSort;
            }
        }

        updateClearFiltersButton();
        applyFilters();
    }

    // Show empty state
    function showEmptyState(show) {
        let emptyState = document.querySelector('.empty-state');

        if (show) {
            if (!emptyState) {
                emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.02); border-radius: var(--radius-12); border: 1px dashed rgba(255,255,255,0.2);">
                        <ion-icon name="search-outline" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 20px;"></ion-icon>
                        <h3 style="color: var(--text-main); margin-bottom: 10px;">No projects found</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 20px;">Try adjusting your filters to see more results.</p>
                        <button onclick="document.getElementById('clearFilters').click()" class="btn btn-primary" style="padding: 12px 24px;">Clear All Filters</button>
                    </div>
                `;
                caseStudiesGrid.appendChild(emptyState);
            }
            emptyState.style.display = 'block';
        } else {
            if (emptyState) {
                emptyState.style.display = 'none';
            }
        }
    }

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Mobile responsiveness for filter toggle
    function handleMobileFilter() {
        if (window.innerWidth <= 768) {
            if (filterToggleBtn) {
                filterToggleBtn.style.display = 'flex';
            }
            if (filterPanel) {
                filterPanel.style.display = 'none';
            }
        } else {
            if (filterToggleBtn) {
                filterToggleBtn.style.display = 'none';
            }
            if (filterPanel) {
                filterPanel.style.display = 'block';
            }
        }
    }

    // Initialize mobile filter state
    handleMobileFilter();
    window.addEventListener('resize', handleMobileFilter);

    // Load filters from URL on page load
    loadFiltersFromURL();
});

/*-----------------------------------*\
  #MEGA MENU FUNCTIONALITY
\*-----------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle for mega menu items
    const megaMenuTriggers = document.querySelectorAll('.mega-menu-trigger');

    megaMenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            // On desktop, let the link navigate normally (don't prevent default)
            // The hover will show the mega menu, clicking will navigate
            if (window.innerWidth <= 991) {
                // On mobile, toggle the menu
                e.preventDefault();
                const parentItem = this.closest('.navbar-item');
                const isExpanded = this.getAttribute('aria-expanded') === 'true';

                // Close all other mega menus
                document.querySelectorAll('.navbar-item.has-mega-menu').forEach(item => {
                    if (item !== parentItem) {
                        item.classList.remove('active');
                        item.querySelector('.mega-menu-trigger').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current mega menu
                parentItem.classList.toggle('active');
                this.setAttribute('aria-expanded', !isExpanded);
            }
            // On desktop (>991px), let the link navigate to service.html or portfolio.html
        });
    });

    // Desktop mega menu hover delay
    const megaMenuItems = document.querySelectorAll('.navbar-item.has-mega-menu');
    let hoverTimeout;

    megaMenuItems.forEach(item => {
        const trigger = item.querySelector('.mega-menu-trigger');

        item.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            if (window.innerWidth > 1024) {
                trigger.setAttribute('aria-expanded', 'true');
            }
        });

        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 1024) {
                hoverTimeout = setTimeout(() => {
                    trigger.setAttribute('aria-expanded', 'false');
                }, 300);
            }
        });
    });

    // Keyboard navigation for mega menu
    megaMenuTriggers.forEach(trigger => {
        trigger.addEventListener('keydown', function(e) {
            const parentItem = this.closest('.navbar-item');

            // Enter or Space to toggle
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isExpanded = this.getAttribute('aria-expanded') === 'true';

                // Close all other mega menus
                document.querySelectorAll('.navbar-item.has-mega-menu').forEach(item => {
                    if (item !== parentItem) {
                        item.classList.remove('active');
                        item.querySelector('.mega-menu-trigger').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current mega menu
                parentItem.classList.toggle('active');
                this.setAttribute('aria-expanded', !isExpanded);
            }

            // Escape to close
            if (e.key === 'Escape') {
                parentItem.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                this.focus();
            }

            // Arrow keys for navigation
            if (e.key === 'ArrowDown' && this.getAttribute('aria-expanded') === 'true') {
                e.preventDefault();
                const firstLink = parentItem.querySelector('.mega-menu-list a');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        });
    });

    // Keyboard navigation within mega menu
    const megaMenuLinks = document.querySelectorAll('.mega-menu-list a');
    megaMenuLinks.forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
            const allLinks = Array.from(this.closest('.mega-menu-content').querySelectorAll('.mega-menu-list a'));
            const currentIndex = allLinks.indexOf(this);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % allLinks.length;
                allLinks[nextIndex].focus();
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + allLinks.length) % allLinks.length;
                allLinks[prevIndex].focus();
            }

            if (e.key === 'Escape') {
                e.preventDefault();
                const parentItem = this.closest('.navbar-item');
                const trigger = parentItem.querySelector('.mega-menu-trigger');
                parentItem.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
                trigger.focus();
            }
        });
    });

    // Close mega menus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar-item.has-mega-menu')) {
            document.querySelectorAll('.navbar-item.has-mega-menu').forEach(item => {
                item.classList.remove('active');
                const trigger = item.querySelector('.mega-menu-trigger');
                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset mega menu states on resize
            if (window.innerWidth > 1024) {
                document.querySelectorAll('.navbar-item.has-mega-menu').forEach(item => {
                    item.classList.remove('active');
                    const trigger = item.querySelector('.mega-menu-trigger');
                    if (trigger) {
                        trigger.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        }, 250);
    });
});