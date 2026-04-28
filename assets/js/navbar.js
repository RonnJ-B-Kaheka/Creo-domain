/**
 * Enhanced Navbar Module for Creo Media
 * Handles all navbar interactions, animations, and accessibility
 *
 * Features:
 * - Smooth hamburger menu animation
 * - Auto-detect and highlight active page
 * - Keyboard navigation (Tab, Escape, Arrow keys)
 * - Focus trap for accessibility
 * - Mobile-optimized touch handling
 * - Smooth hover/click transitions
 */

class NavbarManager {
    constructor() {
        this.navbar = null;
        this.navTogglers = [];
        this.navbarLinks = [];
        this.overlay = null;
        this.isOpen = false;
        this.focusTrapActive = false;

        this.init();
    }

    /**
     * Initialize navbar functionality
     */
    init() {
        // Get DOM elements
        this.navbar = document.querySelector('[data-navbar]');
        this.navTogglers = document.querySelectorAll('[data-nav-toggler]');
        this.navbarLinks = document.querySelectorAll('[data-nav-link]');
        this.overlay = document.querySelector('[data-overlay]');

        // Validate elements exist
        if (!this.navbar || this.navTogglers.length === 0) {
            console.error('Navbar: Required elements not found');
            return;
        }

        // Attach event listeners
        this.attachEventListeners();

        // Set initial active link based on current page
        this.setActiveLink();

        // Setup keyboard navigation
        this.setupKeyboardNav();

        console.log('Navbar initialized successfully');
    }

    /**
     * Attach all event listeners
     */
    attachEventListeners() {
        // Hamburger menu toggle
        this.navTogglers.forEach(toggler => {
            toggler.addEventListener('click', (e) => this.toggleMenu(e));
        });

        // Navbar links - close menu and set active
        this.navbarLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleLinkClick(e, link));
        });

        // Overlay click - close menu
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.closeMenu());
        }

        // Prevent clicks on mega menu triggers from closing menu
        const megaMenuTriggers = document.querySelectorAll('.mega-menu-trigger');
        megaMenuTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth > 991) {
                    e.stopPropagation();
                }
            });
        });

        // Close menu on window resize (mobile to desktop transition)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991 && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    /**
     * Toggle hamburger menu
     */
    toggleMenu(e) {
        if (e) e.preventDefault();

        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    /**
     * Open hamburger menu
     */
    openMenu() {
        if (this.isOpen) return;

        this.isOpen = true;

        // Add active class to navbar
        this.navbar.classList.add('active');

        // Add active class to hamburger buttons
        this.navTogglers.forEach(btn => {
            btn.classList.add('is-active');
            btn.setAttribute('aria-expanded', 'true');
        });

        // Show overlay
        if (this.overlay) {
            this.overlay.classList.add('active');
        }

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Setup focus trap for accessibility
        this.setupFocusTrap();

        // Focus first menu item
        setTimeout(() => {
            const firstLink = this.navbarLinks[0];
            if (firstLink) firstLink.focus();
        }, 100);
    }

    /**
     * Close hamburger menu
     */
    closeMenu() {
        if (!this.isOpen) return;

        this.isOpen = false;

        // Remove active class from navbar
        this.navbar.classList.remove('active');

        // Remove active class from hamburger buttons
        this.navTogglers.forEach(btn => {
            btn.classList.remove('is-active');
            btn.setAttribute('aria-expanded', 'false');
        });

        // Hide overlay
        if (this.overlay) {
            this.overlay.classList.remove('active');
        }

        // Unlock body scroll
        document.body.style.overflow = '';

        // Remove focus trap
        this.removeFocusTrap();

        // Focus back on hamburger button
        setTimeout(() => {
            const openBtn = document.querySelector('.nav-open-btn');
            if (openBtn) openBtn.focus();
        }, 100);
    }

    /**
     * Handle navbar link clicks
     */
    handleLinkClick(e, link) {
        // Don't close menu for mega menu triggers on desktop
        const isMegaTrigger = link.classList.contains('mega-menu-trigger');
        const isDesktop = window.innerWidth > 991;

        if (!isMegaTrigger || !isDesktop) {
            // Close menu after a short delay to allow navigation
            setTimeout(() => {
                this.closeMenu();
            }, 100);
        }

        // Update active link
        this.updateActiveLink(link);
    }

    /**
     * Auto-detect and highlight active page
     */
    setActiveLink() {
        const currentPage = this.getCurrentPage();

        if (!currentPage) return;

        this.navbarLinks.forEach(link => {
            link.classList.remove('active');

            const href = link.getAttribute('href');
            if (!href) return;

            // Check if link matches current page
            if (this.isCurrentPage(href, currentPage)) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Get current page filename
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename;
    }

    /**
     * Check if link matches current page
     */
    isCurrentPage(href, currentPage) {
        // Normalize URLs for comparison
        let linkPage = href;

        // Handle root/index cases
        if (href === '.' || href === './' || href === '') {
            linkPage = 'index.html';
        } else if (href.startsWith('./')) {
            linkPage = href.substring(2);
        } else if (href.startsWith('/')) {
            linkPage = href.substring(1);
        }

        // Handle both with and without .html extension
        const linkPageBase = linkPage.split('?')[0];
        const currentPageBase = currentPage.split('?')[0];

        // Direct match
        if (linkPageBase === currentPageBase) {
            return true;
        }

        // Match with/without .html
        if (linkPageBase.replace('.html', '') === currentPageBase.replace('.html', '')) {
            return true;
        }

        // Handle index.html cases
        if ((linkPageBase === 'index.html' || linkPageBase === '') &&
            (currentPageBase === 'index.html' || currentPageBase === '')) {
            return true;
        }

        return false;
    }

    /**
     * Update active link when clicked
     */
    updateActiveLink(clickedLink) {
        this.navbarLinks.forEach(link => {
            link.classList.remove('active');
        });

        if (clickedLink) {
            clickedLink.classList.add('active');
        }
    }

    /**
     * Setup focus trap for keyboard accessibility
     */
    setupFocusTrap() {
        if (this.focusTrapActive) return;

        this.focusTrapActive = true;

        const focusableElements = this.navbar.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        this.focusTrapHandler = (e) => {
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

            if (e.key === 'Escape') {
                this.closeMenu();
            }
        };

        document.addEventListener('keydown', this.focusTrapHandler);
    }

    /**
     * Remove focus trap
     */
    removeFocusTrap() {
        if (!this.focusTrapActive) return;

        this.focusTrapActive = false;

        if (this.focusTrapHandler) {
            document.removeEventListener('keydown', this.focusTrapHandler);
            this.focusTrapHandler = null;
        }
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + M to toggle menu
            if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
                e.preventDefault();
                this.toggleMenu();
            }

            // Alt + 1-4 to navigate menu items (when menu open)
            if (e.altKey && this.isOpen) {
                const index = parseInt(e.key) - 1;
                if (index >= 0 && index < this.navbarLinks.length) {
                    e.preventDefault();
                    this.navbarLinks[index].focus();
                }
            }
        });
    }
}

// Initialize navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NavbarManager();
    });
} else {
    new NavbarManager();
}