/**
 * Services Data Loader
 * Dynamically loads and populates service pages with data from JSON
 */

class ServicesLoader {
    constructor() {
        this.services = [];
        this.currentService = null;
        this.init();
    }

    async init() {
        try {
            await this.loadServices();
            this.detectCurrentService();
            if (this.currentService) {
                this.populateServicePage();
            }
        } catch (error) {
            console.error('Error loading services:', error);
        }
    }

    async loadServices() {
        const response = await fetch('/assets/data/services.json');
        this.services = (await response.json()).services;
    }

    detectCurrentService() {
        const path = window.location.pathname;
        const serviceId = path.split('/').pop().replace('.html', '');
        this.currentService = this.services.find(service => service.id === serviceId);
    }

    populateServicePage() {
        if (!this.currentService) return;

        // Populate hero section
        this.populateHero();
        
        // Populate deliverables
        this.populateDeliverables();
        
        // Populate process
        this.populateProcess();
        
        // Populate related case studies
        this.populateRelatedCaseStudies();
        
        // Populate pricing
        this.populatePricing();
        
        // Populate FAQ
        this.populateFAQ();
        
        // Populate testimonials
        this.populateTestimonials();
        
        // Update CTA
        this.updateCTA();
    }

    populateHero() {
        const heroTitle = document.querySelector('.hero-title, .section-title');
        const heroDesc = document.querySelector('.hero-description, .section-text');
        
        if (heroTitle) {
            heroTitle.textContent = this.currentService.title;
        }
        
        if (heroDesc) {
            heroDesc.textContent = this.currentService.description;
        }
    }

    populateDeliverables() {
        const deliverablesSection = document.getElementById('deliverables');
        if (!deliverablesSection) return;

        const deliverablesList = deliverablesSection.querySelector('.deliverables-list, ul');
        if (!deliverablesList) return;

        deliverablesList.innerHTML = this.currentService.deliverables.map(deliverable => `
            <li class="deliverable-item">
                <ion-icon name="checkmark-circle" class="deliverable-icon"></ion-icon>
                <span>${deliverable}</span>
            </li>
        `).join('');
    }

    populateProcess() {
        const processSection = document.getElementById('process');
        if (!processSection) return;

        const processSteps = processSection.querySelector('.process-steps, .steps-container');
        if (!processSteps) return;

        processSteps.innerHTML = this.currentService.process.map(step => `
            <div class="process-step">
                <div class="step-number">${step.step}</div>
                <div class="step-content">
                    <h3 class="step-title">${step.title}</h3>
                    <p class="step-description">${step.description}</p>
                </div>
            </div>
        `).join('');
    }

    populateRelatedCaseStudies() {
        const relatedSection = document.getElementById('related-case-studies');
        if (!relatedSection || this.currentService.relatedCaseStudies.length === 0) return;

        // Wait for CaseStudiesLoader to be available
        if (window.caseStudiesLoader) {
            const caseStudies = window.caseStudiesLoader.caseStudies;
            const relatedStudies = caseStudies.filter(cs => 
                this.currentService.relatedCaseStudies.includes(cs.id)
            );

            const relatedGrid = relatedSection.querySelector('.related-grid, .grid-list');
            if (!relatedGrid) return;

            relatedGrid.innerHTML = relatedStudies.map(study => `
                <div class="related-case-card" data-id="${study.id}">
                    <figure class="card-banner">
                        <img src="${study.image}" alt="${study.client}" loading="lazy" class="lazy-load">
                        <div class="card-overlay">
                            <div class="card-content">
                                <span class="card-tag">${study.category}</span>
                                <h3 class="card-title">${study.title}</h3>
                                <p class="card-text">${study.tagline}</p>
                            </div>
                        </div>
                    </figure>
                </div>
            `).join('');
        }
    }

    populatePricing() {
        const pricingSection = document.getElementById('pricing');
        if (!pricingSection) return;

        const pricingGrid = pricingSection.querySelector('.pricing-grid, .pricing-cards');
        if (!pricingGrid) return;

        pricingGrid.innerHTML = this.currentService.pricing.map(tier => `
            <div class="pricing-card ${tier.recommended ? 'recommended' : ''}">
                ${tier.recommended ? '<span class="recommended-badge">Recommended</span>' : ''}
                <h3 class="pricing-name">${tier.name}</h3>
                <div class="pricing-price">${tier.price}</div>
                <ul class="pricing-features">
                    ${tier.features.map(feature => `
                        <li class="pricing-feature">
                            <ion-icon name="checkmark"></ion-icon>
                            <span>${feature}</span>
                        </li>
                    `).join('')}
                </ul>
                <a href="contact.html?service=${this.currentService.id}&tier=${tier.name.toLowerCase()}" 
                   class="btn btn-primary pricing-cta">Get Started</a>
            </div>
        `).join('');
    }

    populateFAQ() {
        const faqSection = document.getElementById('faq');
        if (!faqSection || this.currentService.faq.length === 0) return;

        const faqList = faqSection.querySelector('.faq-list, .faq-container');
        if (!faqList) return;

        faqList.innerHTML = this.currentService.faq.map((item, index) => `
            <div class="faq-item">
                <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
                    <span>${item.question}</span>
                    <ion-icon name="chevron-down" class="faq-icon"></ion-icon>
                </button>
                <div id="faq-answer-${index}" class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');

        // Initialize FAQ accordion
        this.initFAQAccordion();
    }

    initFAQAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                const answer = document.getElementById(question.getAttribute('aria-controls'));
                
                // Close all other FAQs
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        q.setAttribute('aria-expanded', 'false');
                        q.classList.remove('active');
                        const otherAnswer = document.getElementById(q.getAttribute('aria-controls'));
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                            otherAnswer.style.opacity = '0';
                        }
                    }
                });

                // Toggle current FAQ
                question.setAttribute('aria-expanded', !isExpanded);
                question.classList.toggle('active');
                
                if (!isExpanded) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                } else {
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                }
            });
        });
    }

    populateTestimonials() {
        const testimonialsSection = document.getElementById('testimonials');
        if (!testimonialsSection || this.currentService.testimonials.length === 0) return;

        const testimonialsList = testimonialsSection.querySelector('.testimonials-list, .testimonials-carousel');
        if (!testimonialsList) return;

        testimonialsList.innerHTML = this.currentService.testimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <div class="testimonial-author">
                        <span class="author-name">${testimonial.author}</span>
                        <span class="author-role">${testimonial.role}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateCTA() {
        const ctaButtons = document.querySelectorAll('.service-cta, .page-cta');
        ctaButtons.forEach(btn => {
            btn.textContent = this.currentService.cta;
            btn.href = `contact.html?service=${this.currentService.id}`;
        });
    }

    getServiceById(id) {
        return this.services.find(service => service.id === id);
    }
}

// Initialize on DOM ready
let servicesLoaderInstance;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        servicesLoaderInstance = new ServicesLoader();
        window.servicesLoader = servicesLoaderInstance;
    });
} else {
    servicesLoaderInstance = new ServicesLoader();
    window.servicesLoader = servicesLoaderInstance;
}

// Export for use in other scripts
window.ServicesLoader = ServicesLoader;
