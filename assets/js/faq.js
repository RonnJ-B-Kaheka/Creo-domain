/**
 * FAQ Accordion Module
 * Handles accordion expand/collapse with smooth animations and accessibility
 *
 * Features:
 * - Single item open at a time (true accordion behavior)
 * - Smooth max-height animation
 * - Icon rotation on state change
 * - Keyboard support (Enter, Space, Escape)
 * - Focus management
 * - Auto-scroll into view on open
 * - Screen reader announcements
 * - Search/filter functionality (optional)
 */

class FAQAccordion {
    constructor(containerSelector = '.faq-container') {
        this.container = document.querySelector(containerSelector);
        this.items = [];
        this.openItem = null;

        if (!this.container) {
            console.error(`FAQ: Container not found: ${containerSelector}`);
            return;
        }

        this.init();
    }

    /**
     * Initialize accordion
     */
    init() {
        this.items = Array.from(this.container.querySelectorAll('.faq-item'));

        if (this.items.length === 0) {
            console.warn('FAQ: No FAQ items found');
            return;
        }

        // Attach event listeners to each item
        this.items.forEach((item, index) => {
            this.setupItem(item, index);
        });

        console.log(`FAQ: Initialized with ${this.items.length} items`);
    }

    /**
     * Setup individual FAQ item
     */
    setupItem(item, index) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const answerId = `faq-answer-${index}`;

        if (!question || !answer) {
            console.warn(`FAQ: Question or answer missing for item ${index}`);
            return;
        }

        // Set up ARIA attributes
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', answerId);
        answer.setAttribute('id', answerId);
        answer.setAttribute('hidden', '');

        // Store references
        item.faqQuestion = question;
        item.faqAnswer = answer;
        item.faqIndex = index;

        // Attach click listener
        question.addEventListener('click', () => this.toggleItem(item));

        // Attach keyboard listeners
        question.addEventListener('keydown', (e) => this.handleKeydown(e, item));
    }

    /**
     * Toggle FAQ item open/close
     */
    toggleItem(item) {
        if (this.isOpen(item)) {
            this.closeItem(item);
        } else {
            this.openItem(item);
        }
    }

    /**
     * Open FAQ item
     */
    openItem(item) {
        // Close currently open item if different
        if (this.openItem && this.openItem !== item) {
            this.closeItem(this.openItem);
        }

        const question = item.faqQuestion;
        const answer = item.faqAnswer;

        // Remove hidden attribute
        answer.removeAttribute('hidden');

        // Update ARIA attributes
        question.setAttribute('aria-expanded', 'true');
        question.classList.add('active');

        // Calculate and set max-height for animation
        const height = answer.scrollHeight;
        answer.style.maxHeight = height + 'px';

        // Store reference to open item
        this.openItem = item;

        // Auto-scroll into view on mobile
        if (window.innerWidth < 768) {
            setTimeout(() => {
                question.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }

        // Announce to screen readers
        this.announceToScreenReader(`${question.textContent.trim()} expanded`);
    }

    /**
     * Close FAQ item
     */
    closeItem(item) {
        const question = item.faqQuestion;
        const answer = item.faqAnswer;

        // Set max-height to 0 for animation
        answer.style.maxHeight = '0';

        // Update ARIA attributes
        question.setAttribute('aria-expanded', 'false');
        question.classList.remove('active');

        // Add hidden attribute after animation completes
        setTimeout(() => {
            if (!this.isOpen(item)) {
                answer.setAttribute('hidden', '');
            }
        }, 300);

        if (this.openItem === item) {
            this.openItem = null;
        }

        // Announce to screen readers
        this.announceToScreenReader(`${question.textContent.trim()} collapsed`);
    }

    /**
     * Check if item is open
     */
    isOpen(item) {
        return !item.faqAnswer.hasAttribute('hidden');
    }

    /**
     * Handle keyboard navigation
     */
    handleKeydown(e, item) {
        const question = item.faqQuestion;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.toggleItem(item);
                break;

            case 'Escape':
                if (this.isOpen(item)) {
                    e.preventDefault();
                    this.closeItem(item);
                    question.focus();
                }
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (item.faqIndex > 0) {
                    this.items[item.faqIndex - 1].faqQuestion.focus();
                }
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (item.faqIndex < this.items.length - 1) {
                    this.items[item.faqIndex + 1].faqQuestion.focus();
                }
                break;

            case 'Home':
                e.preventDefault();
                this.items[0].faqQuestion.focus();
                break;

            case 'End':
                e.preventDefault();
                this.items[this.items.length - 1].faqQuestion.focus();
                break;
        }
    }

    /**
     * Announce to screen readers
     */
    announceToScreenReader(message) {
        const announcer = document.getElementById('faq-announcer');
        if (announcer) {
            announcer.textContent = message;
        }
    }

    /**
     * Search/filter FAQs by keyword
     */
    filterByKeyword(keyword) {
        if (!keyword) {
            this.items.forEach(item => {
                item.style.display = '';
            });
            return;
        }

        const searchTerm = keyword.toLowerCase();
        let visibleCount = 0;

        this.items.forEach(item => {
            const question = item.faqQuestion.textContent.toLowerCase();
            const answer = item.faqAnswer.textContent.toLowerCase();

            const isMatch = question.includes(searchTerm) || answer.includes(searchTerm);
            item.style.display = isMatch ? '' : 'none';

            if (isMatch) visibleCount++;
        });

        console.log(`FAQ: Showing ${visibleCount} of ${this.items.length} items`);
        return visibleCount;
    }

    /**
     * Close all open items
     */
    closeAll() {
        if (this.openItem) {
            this.closeItem(this.openItem);
        }
    }

    /**
     * Open item by index
     */
    openByIndex(index) {
        if (index >= 0 && index < this.items.length) {
            this.openItem(this.items[index]);
        }
    }

    /**
     * Destroy accordion and clean up
     */
    destroy() {
        this.items.forEach(item => {
            if (item.faqQuestion) {
                item.faqQuestion.onclick = null;
                item.faqQuestion.onkeydown = null;
            }
        });
        this.items = [];
        this.openItem = null;
    }
}

/**
 * Auto-initialize all FAQ containers on page load
 */
function initAllFAQs() {
    const containers = document.querySelectorAll('[data-faq-accordion]');

    if (containers.length === 0) {
        console.log('FAQ: No FAQ containers found');
        return;
    }

    containers.forEach((container, index) => {
        const selector = `[data-faq-accordion][data-faq-id="${index}"]`;
        new FAQAccordion(selector);
    });

    // Create screen reader announcer if it doesn't exist
    if (!document.getElementById('faq-announcer')) {
        const announcer = document.createElement('div');
        announcer.id = 'faq-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'visually-hidden';
        document.body.appendChild(announcer);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllFAQs);
} else {
    initAllFAQs();
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FAQAccordion, initAllFAQs };
}