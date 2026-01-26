{
    // PROJECT DATA
    const projectData = {
        'apex-sport': {
            title: 'Apex Sport - Brand Campaign',
            tags: ['4K Video', 'RED Raptor', 'Commercial', 'Color Grading'],
            challenge: 'Apex Sport needed a high-impact TVC to launch their new performance line. The brief demanded cinematic quality on a tight 2-week timeline, with dynamic action sequences that would resonate with Gen-Z athletes.',
            approach: 'We deployed a 3-camera RED Raptor setup with gimbal rigs for fluid motion. Shot on-location at a Cape Town skate park, we used Aputure 600D lights to create dramatic contrast. Post-production involved advanced color grading in DaVinci Resolve to achieve the signature "neon grit" aesthetic.',
            results: [{
                number: '2.4M',
                label: 'Views in 30 Days'
            }, {
                number: '+180%',
                label: 'Brand Awareness Lift'
            }, {
                number: '4.2%',
                label: 'Click-Through Rate'
            }],
            beforeAfter: {
                before: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&q=80',
                after: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1200&q=80'
            },
            testimonial: {
                text: "Creo Media completely transformed our brand's visual language. The cinematic quality of the Apex campaign exceeded everything we've done in the past decade.",
                author: "Marcus Thorne",
                role: "Chief Marketing Officer, Apex Sport"
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
        'neon-nights': {
            title: 'Neon Nights Gala',
            tags: ['Event Production', 'Stage Design', 'Lighting', 'AV'],
            challenge: 'A corporate client wanted to transform their annual awards night from "boring ballroom" into an unforgettable experience that would energize their 500-person team.',
            approach: 'We designed a cyberpunk-themed environment with custom LED stage panels, intelligent moving lights, and projection mapping. The venue was divided into "zones" (Lounge, Main Stage, VR Experience). We coordinated with caterers, security, and AV teams to ensure seamless execution.',
            results: [{
                number: '500',
                label: 'Attendees'
            }, {
                number: '100%',
                label: 'Client Satisfaction'
            }, {
                number: '0',
                label: 'Technical Issues'
            }],
            beforeAfter: {
                before: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
                after: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=80'
            }
        },
        'daily-grind': {
            title: 'The Daily Grind - Full Production',
            tags: ['Podcast', '4K Video', 'Audio Mixing', 'Distribution'],
            challenge: 'The Daily Grind wanted to scale from audio-only to full video podcast while maintaining their signature conversational style. They needed a partner who could handle everything from recording to YouTube optimization.',
            approach: 'We set up a permanent studio with 3-cam Sony FX3 setup, Shure SM7B mics, and Rodecaster Pro II. Each episode is recorded, edited, color-graded, and uploaded to Spotify + YouTube within 48 hours. We also create 10+ vertical clips per episode for social distribution.',
            results: [{
                number: '50k+',
                label: 'Monthly Downloads'
            }, {
                number: 'Top 10',
                label: 'Business Podcast (SA)'
            }, {
                number: '5M+',
                label: 'Social Clip Views'
            }],
            testimonial: {
                text: "The transition to video podcasting was seamless thanks to the Creo team. Our engagement on YouTube alone has jumped by 400% since we partnered with them.",
                author: "Elena Vance",
                role: "Producer, The Daily Grind"
            }
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

    // Event Delegation for Portfolio Items (if new items are added dynamically, this might need check, but for now they are static or already in DOM)
    // Actually standard listener is fine as items are in DOM
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
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

            document.getElementById('modalChallenge').textContent = data.challenge;
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
        });
    });

    // HOVER TO PLAY VIDEO
    portfolioItems.forEach(item => {
        const video = item.querySelector('video');
        if (video) {
            item.addEventListener('mouseenter', () => {
                video.play();
            });
            item.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
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

    // SWIPE SCROLLING FOR MODAL
    let startY;
    let currentScroll;
    const modalBody = document.querySelector('.modal-body');

    if (modalBody) {
        modalBody.addEventListener('touchstart', (e) => {
            startY = e.touches[0].pageY;
            currentScroll = modalBody.scrollTop;
            modalBody.style.overflow = 'hidden';
        });

        modalBody.addEventListener('touchmove', (e) => {
            if (!startY) return;

            const deltaY = e.touches[0].pageY - startY;
            const newScroll = currentScroll - deltaY;

            // Check if we're at the top or bottom of the scrollable area
            const isAtTop = newScroll <= 0;
            const isAtBottom = newScroll >= modalBody.scrollHeight - modalBody.clientHeight;

            // Only allow scrolling if we're not at the extremes
            if ((deltaY > 0 && !isAtTop) || (deltaY < 0 && !isAtBottom)) {
                modalBody.scrollTop = newScroll;
                e.preventDefault();
            }
        });

        modalBody.addEventListener('touchend', () => {
            startY = null;
            modalBody.style.overflow = 'auto';
        });
    }

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
