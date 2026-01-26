'use strict';



/**
 * add Event on elements
 */

const addEventOnElem = function (elem, type, callback) {
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
let navbar, navTogglers, navbarLinks, overlay;

// Initialize all navbar functionality after DOM is loaded
function initNavbar() {
    // Select elements
    navbar = document.querySelector("[data-navbar]");
    navTogglers = document.querySelectorAll("[data-nav-toggler]");
    navbarLinks = document.querySelectorAll("[data-nav-link]");
    overlay = document.querySelector("[data-overlay]");

    // Validate elements
    if (!navbar) {
        console.error('ERROR: Navbar element not found');
        return;
    }

    if (navTogglers.length === 0) {
        console.error('ERROR: No nav toggler elements found');
        return;
    }

    // Define toggle function
    const toggleNavbar = function (event) {
        // Prevent default behavior
        if (event) {
            event.preventDefault();
        }

        try {
            // Ensure navbar exists
            if (!navbar) {
                console.error('ERROR: Navbar element not available');
                return;
            }

            // Toggle navbar active class
            navbar.classList.toggle('active');

            // Fade nav actions when navbar is active
            const navActions = document.querySelector('.nav-actions');
            if (navActions) {
                if (navbar.classList.contains('active')) {
                    navActions.classList.add('faded');
                } else {
                    navActions.classList.remove('faded');
                }
            }

            // Toggle overlay if it exists
            if (overlay) {
                overlay.classList.toggle('active');
            }

        } catch (error) {
            console.error('Error in toggleNavbar function:', error);
        }
    }

    // Attach event listeners
    if (navTogglers.length > 0) {
        // Use direct event listener attachment for better reliability
        navTogglers.forEach((toggler) => {
            toggler.addEventListener('click', toggleNavbar);
        });
    } else {
        console.error('CRITICAL ERROR: No navbar toggler elements found');
    }

    // Setup other navbar listeners
    setupNavTogglers();
    setupNavbarLinkListeners();
    setupOverlayListener();
}

// Initialize navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        initNavbar();
        setupNavbarKeyboardNavigation();
    });
} else {
    // DOM is already loaded, initialize immediately
    initNavbar();
    setupNavbarKeyboardNavigation();
}

const closeNavbar = function () {
    try {
        if (navbar) {
            navbar.classList.remove("active");
            // Remove focus trap when closing navbar
            removeFocusTrap();
        }

        if (overlay) {
            overlay.classList.remove("active");
        }

        // Unfade nav actions when navbar is closed
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.classList.remove('faded');
        }
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
    document.addEventListener('keydown', function (e) {
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

// Add event listener to nav togglers to handle focus trap
function setupNavTogglers() {
    if (navTogglers && navTogglers.length > 0) {
        navTogglers.forEach(toggler => {
            toggler.addEventListener('click', function () {
                // Small delay to ensure the navbar is rendered before setting up focus trap
                setTimeout(() => {
                    if (navbar && navbar.classList.contains('active')) {
                        setupFocusTrap();
                    }
                }, 100);
            });
        });
    }
}

// Initialize all navbar event listeners
function setupAllNavbarListeners() {
    setupNavTogglers();
    setupNavbarLinkListeners();
    setupOverlayListener();
}

// Close navbar when clicking on a link
function setupNavbarLinkListeners() {
    if (navbarLinks && navbarLinks.length > 0) {
        addEventOnElem(navbarLinks, "click", function () {
            closeNavbar();
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
        // Remove active class from all links
        navbarLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link
        if (clickedLink) {
            clickedLink.classList.add('active');
        }
    } catch (error) {
        console.error('Error updating active nav link:', error);
    }
}

// Set active link based on current page
function setActiveNavLinkByPage() {
    try {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const currentPageName = currentPage.replace('.html', '').toLowerCase();

        navbarLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            const linkPage = href.split('/').pop().replace('.html', '').toLowerCase();

            // Match current page with link
            if (currentPageName === linkPage ||
                (currentPageName === 'index' && linkPage === '#home') ||
                (currentPageName === '' && linkPage === '#home')) {
                link.classList.add('active');
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

const headerActive = function () {
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

const scrollToTop = function (e) {
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

const filterProjectItems = function () {
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
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(255, 0, 85, 0.2)';

            // Prevent card images from vanishing on hover
            const cardImages = this.querySelectorAll('img');
            cardImages.forEach(img => {
                img.style.opacity = '1';
                img.style.visibility = 'visible';
            });
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';

            // Ensure card images remain visible after hover
            const cardImages = this.querySelectorAll('img');
            cardImages.forEach(img => {
                img.style.opacity = '1';
                img.style.visibility = 'visible';
            });
        });

        card.addEventListener('keydown', function (e) {
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
    container.addEventListener('wheel', function (e) {
        if (e.deltaX === 0) {
            e.preventDefault();
            this.scrollLeft += e.deltaY;
        }
    }, { passive: false });
});

// Add exit functionality for modal-like cards
// Continue with card enhancements from the first section
// (No need to redeclare cardElements or scrollContainers as they're already defined)


// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('ion-icon');
        const isOpen = content.style.maxHeight !== '0px';

        // Close all others
        faqItems.forEach(other => {
            other.querySelector('.faq-content').style.maxHeight = '0px';
            other.querySelector('ion-icon').name = 'add-outline';
        });

        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.name = 'remove-outline';
        }
    });
});

// Analytics for contact form button
const contactButton = document.querySelector('.contact-button');
if (contactButton) {
    contactButton.addEventListener('click', function (e) {
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
});