/**
 * Portfolio Video Carousel Controller
 * Implements interactive video carousel for portfolio showcase
 */

class PortfolioVideoCarousel {
  constructor(config = {}) {
    this.config = {
      autoplayInterval: 5000,
      autoplayEnabled: true,
      videoDataUrl: config.videoDataUrl || 'assets/data/portfolio-videos.json',
      thumbnailWidth: 100,
      ...config
    };
    
    this.currentIndex = 0;
    this.videos = [];
    this.autoplayTimer = null;
    this.init();
  }
  
  async init() {
    try {
      const response = await fetch(this.config.videoDataUrl);
      if (!response.ok) {
        console.error('Failed to load portfolio videos:', response.statusText);
        return;
      }
      this.videos = (await response.json()).portfolioVideos;
    } catch (error) {
      console.error('Failed to load portfolio videos:', error);
      this.videos = [];
      return;
    }
    
    if (this.videos.length === 0) {
      console.warn('No videos found in portfolio data');
      return;
    }
    
    this.cacheDOM();
    this.renderThumbnails();
    this.renderIndicators();
    this.loadVideo(0);
    this.attachEventListeners();
    
    if (this.config.autoplayEnabled) this.startAutoplay();
  }
  
  cacheDOM() {
    this.mainVideo = document.getElementById('carousel-video');
    this.thumbnailsTrack = document.querySelector('.thumbnails-track');
    this.prevBtn = document.getElementById('carousel-prev');
    this.nextBtn = document.getElementById('carousel-next');
    this.autoplayBtn = document.getElementById('autoplay-toggle');
    this.indicators = document.querySelector('.carousel-indicators');
    this.carouselTitle = document.getElementById('carousel-title');
    this.carouselDescription = document.getElementById('carousel-description');
    this.carouselCTA = document.querySelector('.carousel-cta');
  }
  
  renderThumbnails() {
    if (!this.thumbnailsTrack) return;
    
    this.thumbnailsTrack.innerHTML = '';
    
    this.videos.forEach((video, index) => {
      const thumb = document.createElement('button');
      thumb.className = `carousel-thumbnail ${index === 0 ? 'active' : ''}`;
      thumb.role = 'tab';
      thumb.setAttribute('aria-selected', index === 0);
      thumb.setAttribute('aria-label', `View ${video.title}`);
      
      const img = document.createElement('img');
      img.src = video.thumbnailUrl;
      img.alt = video.title;
      img.loading = 'lazy';
      
      thumb.appendChild(img);
      thumb.addEventListener('click', () => this.loadVideo(index));
      
      this.thumbnailsTrack.appendChild(thumb);
    });
  }
  
  renderIndicators() {
    if (!this.indicators) return;
    
    this.indicators.innerHTML = '';
    
    this.videos.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `indicator-dot ${index === 0 ? 'active' : ''}`;
      dot.role = 'tab';
      dot.setAttribute('aria-selected', index === 0);
      dot.setAttribute('aria-label', `Go to video ${index + 1}`);
      dot.addEventListener('click', () => this.loadVideo(index));
      
      this.indicators.appendChild(dot);
    });
  }
  
  loadVideo(index) {
    if (index < 0 || index >= this.videos.length) return;
    
    this.currentIndex = index;
    const video = this.videos[index];
    
    if (this.mainVideo) {
      this.mainVideo.src = video.videoUrl;
      this.mainVideo.poster = video.thumbnailUrl;
    }
    
    if (this.carouselTitle) this.carouselTitle.textContent = video.title;
    if (this.carouselDescription) this.carouselDescription.textContent = video.description;
    if (this.carouselCTA) this.carouselCTA.href = video.caseStudyUrl;
    
    this.updateActiveStates();
  }
  
  updateActiveStates() {
    document.querySelectorAll('.carousel-thumbnail').forEach((thumb, idx) => {
      const isActive = idx === this.currentIndex;
      thumb.classList.toggle('active', isActive);
      thumb.setAttribute('aria-selected', isActive);
    });
    
    document.querySelectorAll('.indicator-dot').forEach((dot, idx) => {
      const isActive = idx === this.currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive);
    });
  }
  
  next() {
    const nextIndex = (this.currentIndex + 1) % this.videos.length;
    this.loadVideo(nextIndex);
    this.pauseAutoplay();
  }
  
  previous() {
    const prevIndex = (this.currentIndex - 1 + this.videos.length) % this.videos.length;
    this.loadVideo(prevIndex);
    this.pauseAutoplay();
  }
  
  startAutoplay() {
    if (this.autoplayTimer) return;
    
    this.autoplayTimer = setInterval(() => {
      if (this.mainVideo && this.mainVideo.paused) {
        this.next();
      }
    }, this.config.autoplayInterval);
  }
  
  pauseAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
  
  toggleAutoplay() {
    this.config.autoplayEnabled = !this.config.autoplayEnabled;
    if (this.autoplayBtn) {
      this.autoplayBtn.setAttribute('aria-pressed', this.config.autoplayEnabled);
    }
    
    if (this.config.autoplayEnabled) {
      this.startAutoplay();
      if (this.autoplayBtn) this.autoplayBtn.classList.add('active');
    } else {
      this.pauseAutoplay();
      if (this.autoplayBtn) this.autoplayBtn.classList.remove('active');
    }
  }
  
  handleKeyboard(e) {
    switch(e.key) {
      case 'ArrowRight':
        this.next();
        break;
      case 'ArrowLeft':
        this.previous();
        break;
    }
  }
  
  attachEventListeners() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previous());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
    if (this.autoplayBtn) this.autoplayBtn.addEventListener('click', () => this.toggleAutoplay());
    
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    
    if (this.mainVideo) {
      this.mainVideo.addEventListener('play', () => this.pauseAutoplay());
      this.mainVideo.addEventListener('pause', () => {
        if (this.config.autoplayEnabled) this.startAutoplay();
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.getElementById('portfolio-carousel');
  if (carouselContainer) {
    new PortfolioVideoCarousel({
      autoplayInterval: 5000,
      videoDataUrl: 'assets/data/portfolio-videos.json'
    });
  }
});
