{
    // PROJECT DATA
    // PROJECT DATA
    const projectData = {
        'tatekulu-barbershop': {
            title: 'Tatekulu Barbershop',
            tags: ['Brand Identity', 'Commercial', 'Storytelling'],
            challenge: 'Tatekulu Barbershop needed a brand identity that spoke to the "real man" - rugged, reliable, and timeless. The challenge was to create a narrative that felt authentic and grounded.',
            approach: 'We crafted a story around the "Tatekulu Man" - someone who is capable and dependable. The visual language uses warm tones, classic typography, and candid photography to evoke a sense of tradition and trust.',
            results: [{
                number: 'Increased',
                label: 'Foot Traffic'
            }, {
                number: 'High',
                label: 'Brand Loyalty'
            }],
            testimonial: {
                text: "Creo Media captured the essence of what we stand for. The campaign resonated deeply with our customers.",
                author: "Owner",
                role: "Tatekulu Barbershop"
            }
        },
        'Drive-Through Movie Night': {
            title: 'Drive-Through Movie Night',
            tags: ['Event Management', 'Community', 'Entertainment'],
            challenge: 'Creating a safe and entertaining community event during a time when traditional gatherings were restricted. The goal was to bring people together while maintaining safety protocols.',
            approach: 'We organized a nostalgic drive-through movie experience. This involved securing a large venue, setting up a massive projection screen, and coordinating FM radio audio transmission. We also managed ticketing and food delivery to cars.',
            results: [{
                number: 'Sold Out',
                label: 'Tickets'
            }, {
                number: '500+',
                label: 'happy attendees'
            }],
            beforeAfter: {
                before: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
                after: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=80'
            }
        },
        'More Than Logic': {
            title: 'More Than Logic',
            tags: ['Podcast', 'Entrepreneurship', 'Community'],
            challenge: 'To build a platform that inspires and connects entrepreneurs in Namibia. The aim was to move beyond just business advice and foster a genuine community of growth and support.',
            approach: 'We launched the "More Than Logic" podcast/channel. We focus on high-quality production and authentic conversations with entrepreneurs at all stages. The content runs the gamut from practical tools to personal stories of overcoming challenges.',
            results: [{
                number: '900+',
                label: 'Subscribers'
            }, {
                number: 'Growing',
                label: 'Community'
            }],
            testimonial: {
                text: "More Than Logic has become a go-to resource for local entrepreneurs. The quality of the content is world-class.",
                author: "Subscriber",
                role: "Community Member"
            }
        },
        'urban-flow': {
            title: 'Urban Flow - Viral Social Campaign',
            tags: ['Instagram Reels', 'Viral Strategy', 'UGC', 'Influencer'],
            challenge: 'Urban Flow, a new streetwear brand, had zero social presence and needed to generate buzz before their product drop. Budget was limited, so organic reach was critical.',
            approach: 'We created a "style challenge" Reels series featuring local micro-influencers. Each video was optimized for the algorithm: hook in first 0.5s, trending audio, vertical 9:16 format. We posted at peak engagement times (6-8pm SAST) and used strategic hashtag clusters.',
            results: [{
                number: '2M+',
                label: 'Organic Views'
            }, {
                number: '+340%',
                label: 'Follower Growth'
            }, {
                number: '8.5%',
                label: 'Engagement Rate'
            }]
        },
        'luxury-editorial': {
            title: 'Luxury Fashion Editorial',
            tags: ['Photography', 'Art Direction', 'Retouching', 'Lookbook'],
            challenge: 'A premium fashion brand needed a lookbook that would position them as "the African answer to European luxury." The imagery had to be editorial-quality and culturally resonant.',
            approach: 'We scouted unique Cape Town locations (Bo-Kaap, Kirstenbosch) and cast local models. Shot on Phase One medium format camera for maximum detail. Art direction focused on blending traditional African textiles with modern silhouettes. Post-production involved meticulous retouching while preserving skin texture.',
            results: [{
                number: '120+',
                label: 'Final Assets'
            }, {
                number: '15',
                label: 'Magazine Features'
            }, {
                number: '+200%',
                label: 'Website Traffic'
            }]
        },
        'ecom-scale': {
            title: 'E-Commerce Black Friday Blitz',
            tags: ['Meta Ads', 'ROAS', 'Conversion Optimization', 'A/B Testing'],
            challenge: 'A luxury e-commerce brand wanted to maximize Black Friday sales without diluting their premium positioning. They had tried Facebook Ads before with poor results (1.2x ROAS).',
            approach: 'We rebuilt their entire funnel: new creative (UGC-style videos), dynamic product ads, and retargeting sequences. Implemented Advantage+ campaigns with strict audience exclusions to avoid bargain hunters. Ran 50+ A/B tests on ad copy, visuals, and CTAs. Monitored hourly and reallocated budget to top performers.',
            results: [{
                number: '5.2x',
                label: 'Return on Ad Spend'
            }, {
                number: 'R2.1M',
                label: 'Revenue Generated'
            }, {
                number: '3.8%',
                label: 'Conversion Rate'
            }]
        }
    };

    // FILTER LOGIC
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // MODAL LOGIC
    const modal = document.getElementById('portfolioModal');
    const modalClose = document.getElementById('modalClose');
    let currentFilteredProjects = [];
    let currentProjectIndex = -1;

    // Helper to get currently visible projects
    const getVisibleProjects = () => {
        return Array.from(document.querySelectorAll('.portfolio-item:not(.hidden)'));
    };

    const openProject = (index) => {
        currentFilteredProjects = getVisibleProjects();
        if (index < 0 || index >= currentFilteredProjects.length) return;

        currentProjectIndex = index;
        const item = currentFilteredProjects[currentProjectIndex];
        const projectId = item.dataset.project;
        const data = projectData[projectId];

        if (!data) return;

        // Populate modal
        const img = item.querySelector('.portfolio-img');
        if (img) {
            document.getElementById('modalHeroImg').src = img.src;
        }

        document.getElementById('modalTitle').textContent = data.title;

        const tagsHtml = data.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('');
        document.getElementById('modalTags').innerHTML = tagsHtml;

        // Use card description if available, otherwise fallback to data.challenge
        const cardDesc = item.querySelector('.portfolio-desc');
        document.getElementById('modalChallenge').textContent = cardDesc ? cardDesc.textContent : data.challenge;

        document.getElementById('modalApproach').textContent = data.approach;

        const resultsHtml = data.results.map(r =>
            `<div class="result-card">
            <div class="result-number">${r.number}</div>
            <div class="result-label">${r.label}</div>
        </div>`
        ).join('');
        document.getElementById('modalResults').innerHTML = resultsHtml;

        // Before/After (if exists)
        const baSection = document.getElementById('beforeAfterSection');
        if (data.beforeAfter) {
            baSection.style.display = 'block';
            document.getElementById('baBeforeImg').src = data.beforeAfter.before;
            document.getElementById('baAfterImg').src = data.beforeAfter.after;
        } else {
            baSection.style.display = 'none';
        }

        // Testimonial (if exists)
        const testimonialSection = document.getElementById('testimonialSection');
        if (data.testimonial) {
            testimonialSection.style.display = 'block';
            document.getElementById('modalTestimonialText').textContent = data.testimonial.text;
            document.getElementById('modalTestimonialAuthor').textContent = data.testimonial.author;
            document.getElementById('modalTestimonialRole').textContent = data.testimonial.role;
        } else {
            testimonialSection.style.display = 'none';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset scroll position
        const modalBody = document.querySelector('.modal-body');
        if (modalBody) modalBody.scrollTop = 0;
    };

    // Event Delegation for Portfolio Items
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const visibleProjects = getVisibleProjects();
            const index = visibleProjects.indexOf(item);
            if (index !== -1) {
                openProject(index);
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // SWIPE NAVIGATION
        let touchStartX = 0;
        let touchStartY = 0;
        const minSwipeDistance = 50;

        modal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        modal.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Check if horizontal swipe dominant
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX < 0) {
                    // Swipe Left -> Next Project
                    const nextIndex = (currentProjectIndex + 1) % currentFilteredProjects.length;
                    openProject(nextIndex);
                } else {
                    // Swipe Right -> Previous Project
                    const prevIndex = (currentProjectIndex - 1 + currentFilteredProjects.length) % currentFilteredProjects.length;
                    openProject(prevIndex);
                }
            }
        }, { passive: true });
    }


    // BEFORE/AFTER SLIDER
    const baSlider = document.getElementById('baSlider');
    const baAfter = document.querySelector('.ba-after');
    if (baSlider && baAfter) {
        let isDragging = false;

        baSlider.addEventListener('mousedown', () => isDragging = true);
        document.addEventListener('mouseup', () => isDragging = false);
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const container = document.querySelector('.before-after-container');
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = (x / rect.width) * 100;

            if (percent >= 0 && percent <= 100) {
                baSlider.style.left = percent + '%';
                baAfter.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
            }
        });
    }

    // Manual swipe scrolling removed to allow native browser scrolling

    // Reveal animation
    document.addEventListener('DOMContentLoaded', () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    });
}
