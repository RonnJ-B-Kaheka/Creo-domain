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
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function() {
    try {
        if (navbar) {
            navbar.classList.toggle("active");
        } else {
            console.warn('Navbar element not found');
        }

        if (overlay) {
            overlay.classList.toggle("active");
        } else {
            console.warn('Overlay element not found');
        }
    } catch (error) {
        console.error('Error toggling navbar:', error);
    }
}

if (navTogglers.length > 0) {
    addEventOnElem(navTogglers, "click", toggleNavbar);
} else {
    console.warn('No navbar toggler elements found');
}

const closeNavbar = function() {
    try {
        if (navbar) {
            navbar.classList.remove("active");
        }

        if (overlay) {
            overlay.classList.remove("active");
        }
    } catch (error) {
        console.error('Error closing navbar:', error);
    }
}

if (navbarLinks.length > 0) {
    addEventOnElem(navbarLinks, "click", closeNavbar);
} else {
    console.warn('No navbar link elements found');
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