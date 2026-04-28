/**
 * Image & Media Optimization
 * Handles lazy loading, responsive images, and performance optimization
 */

class ImageOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.initLazyLoading();
        this.initResponsiveImages();
        this.initVideoOptimization();
        this.trackImagePerformance();
    }

    initLazyLoading() {
        // Native lazy loading with fallback
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                img.addEventListener('error', () => {
                    img.classList.add('error');
                });
            });
        } else {
            // Fallback to Intersection Observer
            this.initIntersectionObserver();
        }
    }

    initIntersectionObserver() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        const lazyImages = document.querySelectorAll('img[data-src], img.lazy-load');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.dataset.src || img.src;
        const srcset = img.dataset.srcset;
        
        if (srcset) {
            img.srcset = srcset;
        }
        
        if (src && img.dataset.src) {
            img.src = src;
        }

        img.addEventListener('load', () => {
            img.classList.add('loaded');
            img.classList.remove('lazy-load');
        });

        img.addEventListener('error', () => {
            img.classList.add('error');
            this.handleImageError(img);
        });
    }

    handleImageError(img) {
        // Add placeholder or fallback image
        const placeholder = document.createElement('div');
        placeholder.className = 'img-placeholder';
        placeholder.style.width = img.width || '100%';
        placeholder.style.height = img.height || 'auto';
        img.parentNode.replaceChild(placeholder, img);
    }

    initResponsiveImages() {
        // Add srcset to images that don't have it
        const images = document.querySelectorAll('img:not([srcset])');
        images.forEach(img => {
            if (img.src && !img.dataset.skipResponsive) {
                this.generateSrcset(img);
            }
        });
    }

    generateSrcset(img) {
        const src = img.src;
        const ext = src.split('.').pop().toLowerCase();
        
        // Only process jpg, png, webp
        if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) return;

        // Generate srcset with different sizes
        const sizes = [320, 640, 768, 1024, 1280, 1920];
        const srcset = sizes.map(size => {
            return `${src}?w=${size} ${size}w`;
        }).join(', ');

        img.srcset = srcset;
        img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    }

    initVideoOptimization() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // Add poster if not present
            if (!video.poster && video.dataset.poster) {
                video.poster = video.dataset.poster;
            }

            // Optimize for mobile
            if (window.innerWidth < 768) {
                this.optimizeVideoForMobile(video);
            }

            // Add loading attribute
            video.setAttribute('loading', 'lazy');
        });
    }

    optimizeVideoForMobile(video) {
        // Reduce quality for mobile
        if (video.dataset.mobileSrc) {
            video.src = video.dataset.mobileSrc;
        }
    }

    trackImagePerformance() {
        if ('PerformanceObserver' in window) {
            const imageObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.entryType === 'resource' && 
                        (entry.initiatorType === 'img' || entry.initiatorType === 'css')) {
                        this.logImagePerformance(entry);
                    }
                });
            });

            imageObserver.observe({ entryTypes: ['resource'] });
        }
    }

    logImagePerformance(entry) {
        const duration = entry.duration;
        const size = entry.transferSize / 1024; // KB
        
        // Log slow images
        if (duration > 1000) {
            console.warn(`Slow image loaded: ${entry.name} (${duration.toFixed(0)}ms, ${size.toFixed(0)}KB)`);
        }
    }

    // Preload critical images
    preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('[data-critical="true"]');
        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src || img.dataset.src;
            document.head.appendChild(link);
        });
    }
}

// Initialize on DOM ready
let imageOptimizerInstance;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        imageOptimizerInstance = new ImageOptimizer();
        window.imageOptimizer = imageOptimizerInstance;
    });
} else {
    imageOptimizerInstance = new ImageOptimizer();
    window.imageOptimizer = imageOptimizerInstance;
}

// Export for use in other scripts
window.ImageOptimizer = ImageOptimizer;
