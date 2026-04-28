/**
 * Case Studies Data Loader
 * Dynamically loads and populates case study data from JSON
 */

class CaseStudiesLoader {
    constructor() {
        this.caseStudies = [];
        this.init();
    }

    async init() {
        try {
            await this.loadCaseStudies();
            this.populateCarousel();
            this.populateCaseStudies();
            this.initFiltering();
        } catch (error) {
            console.error('Error loading case studies:', error);
        }
    }

    async loadCaseStudies() {
        const response = await fetch('/assets/data/case-studies.json');
        this.caseStudies = (await response.json()).case_studies;
    }

    populateCarousel() {
        const carousel = document.getElementById('videoCarousel');
        if (!carousel) return;

        // Get featured case studies
        const featuredStudies = this.caseStudies.filter(cs => cs.featured).slice(0, 6);
        
        carousel.innerHTML = featuredStudies.map((study, index) => this.createCarouselCard(study, index)).join('');
    }

    createCarouselCard(study, index) {
        const statsHtml = Object.entries(study.results).map(([key, stat]) => `
            <div class="stat">
                <span class="stat-value">${stat.value}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('');

        return `
            <div class="video-card" data-index="${index}" data-category="${this.getCategoryFilter(study.category)}" role="article" aria-label="${study.client} project">
                <div class="card-bg" style="background: ${study.gradient};">
                    <div class="card-overlay">
                        <div class="card-content">
                            <div class="card-top">
                                <span class="category-tag">${study.category}</span>
                                <span class="card-index">${String(index + 1).padStart(2, '0')}/${String(this.caseStudies.length).padStart(2, '0')}</span>
                            </div>
                            <div class="card-bottom">
                                <span class="client-name">${study.client.toUpperCase()}</span>
                                <h3 class="project-title">${study.title}</h3>
                                <p class="project-desc">${study.tagline}</p>
                                <div class="project-stats">
                                    ${statsHtml}
                                </div>
                                <a href="#case-studies" class="card-cta" data-id="${study.id}">View Case Study</a>
                            </div>
                        </div>
                        <div class="play-button">
                            <ion-icon name="play-circle-outline"></ion-icon>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    populateCaseStudies() {
        const caseStudiesSection = document.getElementById('case-studies');
        if (!caseStudiesSection) return;

        const gridList = caseStudiesSection.querySelector('.grid-list');
        if (!gridList) return;

        gridList.innerHTML = this.caseStudies.map(study => this.createProjectCard(study)).join('');
    }

    createProjectCard(study) {
        return `
            <div class="project-card" data-category="${this.getCategoryFilter(study.category)}" data-id="${study.id}">
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
        `;
    }

    getCategoryFilter(category) {
        const categoryMap = {
            'Content Production': 'content',
            'Branding & Identity': 'branding',
            'Digital Marketing': 'digital',
            'Events': 'events',
            'Podcasting': 'podcasting'
        };
        return categoryMap[category] || 'all';
    }

    initFiltering() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        const videoCards = document.querySelectorAll('.video-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter project cards
                projectCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    if (filter === 'all' || cardCategory === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Filter video cards
                videoCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    if (filter === 'all' || cardCategory === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    getCaseStudyById(id) {
        return this.caseStudies.find(study => study.id === parseInt(id));
    }
}

// Initialize on DOM ready
let caseStudiesLoaderInstance;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        caseStudiesLoaderInstance = new CaseStudiesLoader();
        window.caseStudiesLoader = caseStudiesLoaderInstance;
    });
} else {
    caseStudiesLoaderInstance = new CaseStudiesLoader();
    window.caseStudiesLoader = caseStudiesLoaderInstance;
}

// Export for use in modal
window.CaseStudiesLoader = CaseStudiesLoader;
