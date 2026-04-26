# CREO MEDIA WEBSITE - MOAB LEVEL ENHANCEMENT PROMPTS

**Last Updated:** April 26, 2026  
**Current Site:** https://ronnj-b-kaheka.github.io/Creo-domain/  
**Scope:** Full-site updates, enhancements, and critical fixes  
**Excludes:** Blog page (explicitly not included)

---

## TABLE OF CONTENTS

1. [Critical Fixes](#critical-fixes)
2. [Portfolio Page: Video Carousel Implementation](#portfolio-page-video-carousel)
3. [FAQ System Overhaul](#faq-system-overhaul)
4. [Chatbot Implementation & Fixes](#chatbot-implementation)
5. [General Site Enhancements](#general-site-enhancements)
6. [Performance & SEO Optimization](#performance--seo-optimization)
7. [UX/UI Improvements](#uxui-improvements)
8. [Content & Copy Refinements](#content--copy-refinements)

---

## CRITICAL FIXES

### 1. FAQ Dropdown Functionality Repair (Service & Contact Pages)

**Problem:** FAQ dropdowns across service.html and contact.html pages are non-functional. Clicking accordions doesn't expand/collapse content. State management is broken or completely absent.

**Implementation Requirements:**

- **Framework:** Implement using vanilla JavaScript with CSS transitions (no external jQuery dependency)
- **Structure:** Convert all FAQ sections to use `<details>` and `<summary>` HTML5 elements as the base, with custom styling via CSS
- **Alternative:** If `<details>` semantic HTML is not preferred, use aria-compliant accordion pattern with `role="region"` and `aria-expanded` attributes
- **State Management:** Each FAQ item must track open/closed state with:
  - Smooth height transitions (max-height animation from 0 to auto)
  - Rotation animation for indicator chevrons (0deg → 180deg)
  - Proper focus management for keyboard navigation
- **Keyboard Support:** Must support:
  - Tab navigation between FAQ items
  - Enter/Space to toggle expand/collapse
  - Escape to close open items (optional but recommended)
- **Mobile Responsiveness:** Touch-friendly click targets (min 44px height), prevent text selection during animations
- **Styling Requirements:**
  - Smooth easing function: `cubic-bezier(0.4, 0, 0.2, 1)` for all animations
  - Duration: 300ms for expand/collapse
  - Color scheme: Maintain brand consistency (dark background with light text on service.html, light background on contact.html based on current design)
  - Hover states for better UX feedback
- **Code Quality:**
  - Implement as reusable component/class that can be initialized on page load
  - Minimal DOM queries (cache references)
  - Event delegation for efficiency
  - No external dependencies beyond vanilla JS

**Testing Checklist:**
- [ ] All 9 FAQs on service.html expand/collapse independently
- [ ] All 12 FAQs on contact.html expand/collapse independently
- [ ] Keyboard navigation works across all items
- [ ] Mobile tap response is instant (< 100ms perceived delay)
- [ ] Only one FAQ can be open at a time (optional - note if implementing multiple-open support)
- [ ] Animation smooth on low-end devices (60fps target)

---

### 2. Chatbot Integration & Response Fix

**Problem:** Chatbot is not responding correctly. Likely issues:
- Backend API endpoint not properly connected
- Missing event listeners on message submit
- Response parsing logic broken
- UI state not updating after response

**Comprehensive Implementation:**

#### 2.1 Chatbot UI Component

**Location:** Footer or floating widget (specify based on current implementation)

**HTML Structure:**
```html
<div id="creomedia-chatbot" class="chatbot-widget" data-state="closed">
  <!-- Chat Header -->
  <div class="chatbot-header">
    <h3>CreoMedia Assistant</h3>
    <button class="chatbot-close" aria-label="Close chat">✕</button>
  </div>
  
  <!-- Messages Container -->
  <div class="chatbot-messages" role="log" aria-live="polite">
    <!-- Messages dynamically inserted here -->
  </div>
  
  <!-- Input Area -->
  <form class="chatbot-input-form" id="chatbot-form">
    <input 
      type="text" 
      id="chatbot-input" 
      placeholder="Ask about our services..." 
      aria-label="Chat message input"
      autocomplete="off"
    />
    <button type="submit" aria-label="Send message">
      <span>Send</span>
    </button>
  </form>
</div>
```

**CSS Requirements:**
- Floating widget: Position fixed bottom-right, z-index 1000
- Smooth slide-in animation from bottom
- Responsive: Adapt to mobile (full width bottom sheet) vs desktop (fixed 350px width)
- Dark mode friendly with proper contrast ratios (WCAG AA minimum)
- Message bubbles: User messages on right (brand accent color), bot messages on left (light gray)
- Loading states: Animated typing indicator with 3 dots

**JavaScript Functionality:**

```javascript
class CreomediaChat {
  constructor(config = {}) {
    this.apiEndpoint = config.apiEndpoint || '/api/chat';
    this.messages = [];
    this.isOpen = false;
    this.init();
  }
  
  init() {
    // DOM references
    this.widget = document.getElementById('creomedia-chatbot');
    this.messagesContainer = this.widget.querySelector('.chatbot-messages');
    this.form = document.getElementById('chatbot-form');
    this.input = document.getElementById('chatbot-input');
    this.closeBtn = this.widget.querySelector('.chatbot-close');
    
    // Event listeners
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.closeBtn.addEventListener('click', () => this.toggle());
    
    // Initial bot greeting
    this.addBotMessage('Hi! 👋 I\'m the CreoMedia Assistant. How can I help you today?');
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    const userMessage = this.input.value.trim();
    
    if (!userMessage) return;
    
    // Add user message to UI
    this.addUserMessage(userMessage);
    this.input.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    try {
      // Send to backend API
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: this.getContext()
        })
      });
      
      if (!response.ok) throw new Error('API error');
      
      const data = await response.json();
      this.removeTypingIndicator();
      this.addBotMessage(data.reply || 'I didn\'t understand that. Can you rephrase?');
    } catch (error) {
      this.removeTypingIndicator();
      this.addBotMessage('Sorry, I\'m having trouble connecting. Please contact us directly at contact.creomedia@gmail.com');
      console.error('Chat error:', error);
    }
  }
  
  addUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user-message';
    msgDiv.textContent = text;
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
  }
  
  addBotMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot-message';
    msgDiv.innerHTML = this.formatMessage(text);
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
  }
  
  formatMessage(text) {
    // Convert URLs to links, preserve line breaks
    return text
      .replace(/\n/g, '<br />')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
  }
  
  showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    this.messagesContainer.appendChild(typingDiv);
    this.scrollToBottom();
  }
  
  removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }
  
  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
  
  toggle() {
    this.isOpen = !this.isOpen;
    this.widget.setAttribute('data-state', this.isOpen ? 'open' : 'closed');
  }
  
  getContext() {
    // Return page context for smarter responses
    return {
      currentPage: window.location.pathname,
      userAgent: navigator.userAgent
    };
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new CreomediaChat({
    apiEndpoint: '/api/chat' // Update with actual endpoint
  });
});
```

#### 2.2 Backend Integration

**API Endpoint:** `POST /api/chat`

**Request Format:**
```json
{
  "message": "What services do you offer?",
  "context": {
    "currentPage": "/service.html",
    "userAgent": "Mozilla/5.0..."
  }
}
```

**Response Format:**
```json
{
  "reply": "We specialize in Content Production, Digital Management, Event Management, and Podcasting. Each service is tailored to elevate your brand presence. Would you like to know more about any specific service?",
  "suggestedFollowUps": ["Content Production", "Pricing", "Portfolio examples"]
}
```

**Knowledge Base Integration:**
- Chatbot should respond intelligently to common questions about:
  - Services (content production, digital management, events, podcasting)
  - Pricing packages (Starter N$5k, Professional N$15k, Enterprise N$35k+)
  - Portfolio projects
  - Contact info
  - Onboarding process
  - Turnaround times
- For unknown queries, provide helpful redirect: "I'm not sure about that. Would you like to speak with our team directly? [Link to contact form]"

**Smart Features:**
- Detect service-related keywords and provide relevant information
- If user asks about pricing, mention the questionnaire tool
- Maintain conversation history in session storage (not persistent)
- Suggest follow-up questions based on user queries

#### 2.3 Testing & Validation

- [ ] Chatbot appears on page load
- [ ] Messages send and receive responses within 2 seconds
- [ ] Typing indicator displays while waiting for response
- [ ] Multiple messages in conversation work correctly
- [ ] Links in bot responses open in new tabs
- [ ] Mobile: Chat widget responsive and usable on small screens
- [ ] Keyboard: Can submit message with Enter key
- [ ] Accessibility: Messages announced to screen readers via aria-live

---

## PORTFOLIO PAGE: VIDEO CAROUSEL IMPLEMENTATION

**Location:** `/portfolio.html`  
**Current State:** Portfolio items shown as static grid with filter buttons. NO video carousel.  
**Objective:** Implement interactive video carousel for portfolio showcase with autoplay, manual controls, and responsive design.

### 3.1 Video Carousel Component Architecture

**HTML Structure:**

```html
<section id="portfolio-carousel" class="portfolio-section">
  <div class="carousel-header">
    <h2>Featured Work</h2>
    <p>Scroll through our recent projects</p>
  </div>
  
  <div class="carousel-wrapper">
    <!-- Main Video Display -->
    <div class="carousel-main">
      <video 
        id="carousel-video" 
        class="carousel-video"
        controls
        controlsList="nodownload"
        poster="[thumbnail-url]"
        aria-label="Featured project video"
      >
        <source src="" type="video/mp4">
        Your browser doesn't support HTML5 video.
      </video>
      
      <!-- Overlay Info -->
      <div class="carousel-info">
        <h3 id="carousel-title">Project Title</h3>
        <p id="carousel-description">Project description</p>
        <a href="#" class="carousel-cta">View Full Case Study</a>
      </div>
    </div>
    
    <!-- Thumbnail Carousel -->
    <div class="carousel-thumbnails">
      <div class="thumbnails-track" role="tablist">
        <!-- Thumbnails dynamically generated -->
      </div>
      
      <!-- Navigation Buttons -->
      <button 
        class="carousel-btn carousel-prev" 
        aria-label="Previous video"
        id="carousel-prev"
      >
        ❮
      </button>
      <button 
        class="carousel-btn carousel-next" 
        aria-label="Next video"
        id="carousel-next"
      >
        ❯
      </button>
    </div>
    
    <!-- Autoplay Toggle & Indicators -->
    <div class="carousel-controls">
      <button 
        id="autoplay-toggle" 
        class="autoplay-btn"
        aria-pressed="true"
      >
        ⏯ Autoplay
      </button>
      
      <div class="carousel-indicators" role="tablist">
        <!-- Dots for each video -->
      </div>
    </div>
  </div>
</section>
```

### 3.2 Video Data Structure

**Data File:** `assets/data/portfolio-videos.json`

```json
{
  "portfolioVideos": [
    {
      "id": "tatekulu",
      "title": "Tatekulu Barbershop - Brand Revival",
      "description": "Transformed a local barbershop into a viral sensation through authentic storytelling and dynamic social media content.",
      "videoUrl": "assets/videos/tatekulu-campaign.mp4",
      "thumbnailUrl": "assets/images/tatekulu-thumb.jpg",
      "category": "content-production",
      "duration": "2:45",
      "client": "Tatekulu Barbershop",
      "results": ["300% Engagement Increase", "50K+ Video Views", "45% New Customer Growth"],
      "caseStudyUrl": "portfolio.html#case-tatekulu"
    },
    {
      "id": "drive-through",
      "title": "Drive-Through Movie Night - Event Experience",
      "description": "Executed a unique drive-through cinema experience that brought community together during challenging times.",
      "videoUrl": "assets/videos/drive-through-event.mp4",
      "thumbnailUrl": "assets/images/drive-through-thumb.jpg",
      "category": "event-management",
      "duration": "3:12",
      "client": "Drive-Through Movie Night",
      "results": ["500+ Attendees", "100% Safety Compliance", "4.8/5 Satisfaction"],
      "caseStudyUrl": "portfolio.html#case-drive-through"
    },
    {
      "id": "more-than-logic",
      "title": "More Than Logic - Podcast Series",
      "description": "Multi-episode podcast production showcasing entrepreneurial stories and insights for African creators.",
      "videoUrl": "assets/videos/podcast-more-than-logic.mp4",
      "thumbnailUrl": "assets/images/podcast-thumb.jpg",
      "category": "podcasting",
      "duration": "45:30",
      "client": "More Than Logic",
      "results": ["900+ Subscribers", "5-star ratings", "Growing audience"],
      "caseStudyUrl": "portfolio.html#case-podcast"
    }
  ]
}
```

### 3.3 JavaScript Carousel Controller

```javascript
class PortfolioVideoCarousel {
  constructor(config = {}) {
    this.config = {
      autoplayInterval: 5000, // 5 seconds between auto-advance
      autoplayEnabled: true,
      videoDataUrl: config.videoDataUrl || 'assets/data/portfolio-videos.json',
      thumbnailWidth: 100, // px
      ...config
    };
    
    this.currentIndex = 0;
    this.videos = [];
    this.autoplayTimer = null;
    this.init();
  }
  
  async init() {
    // Load video data
    try {
      const response = await fetch(this.config.videoDataUrl);
      this.videos = (await response.json()).portfolioVideos;
    } catch (error) {
      console.error('Failed to load portfolio videos:', error);
      this.videos = [];
      return;
    }
    
    // Cache DOM elements
    this.mainVideo = document.getElementById('carousel-video');
    this.thumbnailsTrack = document.querySelector('.thumbnails-track');
    this.prevBtn = document.getElementById('carousel-prev');
    this.nextBtn = document.getElementById('carousel-next');
    this.autoplayBtn = document.getElementById('autoplay-toggle');
    this.indicators = document.querySelector('.carousel-indicators');
    
    // Render initial state
    this.renderThumbnails();
    this.renderIndicators();
    this.loadVideo(0);
    
    // Event listeners
    this.prevBtn.addEventListener('click', () => this.previous());
    this.nextBtn.addEventListener('click', () => this.next());
    this.autoplayBtn.addEventListener('click', () => this.toggleAutoplay());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    
    // Start autoplay
    if (this.config.autoplayEnabled) this.startAutoplay();
    
    // Pause on video interaction
    this.mainVideo.addEventListener('play', () => this.pauseAutoplay());
    this.mainVideo.addEventListener('pause', () => {
      if (this.config.autoplayEnabled) this.startAutoplay();
    });
  }
  
  renderThumbnails() {
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
      
      thumb.appendChild(img);
      thumb.addEventListener('click', () => this.loadVideo(index));
      
      this.thumbnailsTrack.appendChild(thumb);
    });
  }
  
  renderIndicators() {
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
    
    // Update video element
    this.mainVideo.src = video.videoUrl;
    this.mainVideo.poster = video.thumbnailUrl;
    
    // Update info
    document.getElementById('carousel-title').textContent = video.title;
    document.getElementById('carousel-description').textContent = video.description;
    document.querySelector('.carousel-cta').href = video.caseStudyUrl;
    
    // Update active states
    this.updateActiveStates();
  }
  
  updateActiveStates() {
    // Update thumbnails
    document.querySelectorAll('.carousel-thumbnail').forEach((thumb, idx) => {
      const isActive = idx === this.currentIndex;
      thumb.classList.toggle('active', isActive);
      thumb.setAttribute('aria-selected', isActive);
    });
    
    // Update indicators
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
      if (!this.mainVideo.paused) {
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
    this.autoplayBtn.setAttribute('aria-pressed', this.config.autoplayEnabled);
    
    if (this.config.autoplayEnabled) {
      this.startAutoplay();
      this.autoplayBtn.classList.add('active');
    } else {
      this.pauseAutoplay();
      this.autoplayBtn.classList.remove('active');
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
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioVideoCarousel({
    autoplayInterval: 5000,
    videoDataUrl: 'assets/data/portfolio-videos.json'
  });
});
```

### 3.4 CSS Styling

**Key Styles:**

```css
.carousel-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem;
}

.carousel-main {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
}

.carousel-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 2rem;
  color: white;
}

.carousel-thumbnails {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.thumbnails-track {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  flex: 1;
  padding: 0.5rem 0;
  scroll-behavior: smooth;
}

.carousel-thumbnail {
  flex-shrink: 0;
  width: 100px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 300ms ease;
  background: none;
  padding: 0;
}

.carousel-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-thumbnail.active {
  border-color: var(--brand-accent);
  box-shadow: 0 0 0 2px var(--brand-accent);
}

.carousel-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--brand-accent);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 300ms ease;
}

.carousel-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.carousel-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.carousel-indicators {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ccc;
  border: none;
  cursor: pointer;
  transition: all 300ms ease;
}

.indicator-dot.active {
  background: var(--brand-accent);
  transform: scale(1.3);
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-wrapper {
    gap: 1rem;
    padding: 1rem;
  }
  
  .carousel-thumbnails {
    overflow-x: auto;
  }
  
  .carousel-info {
    padding: 1rem;
  }
  
  .carousel-info h3 {
    font-size: 1.2rem;
  }
}
```

### 3.5 Performance Considerations

- **Video Optimization:**
  - Use VP9/WebM for better compression (fallback to H.264/MP4)
  - Implement lazy loading for video files (only load when needed)
  - Provide multiple quality options (480p, 720p, 1080p)
  - Thumbnail generation: Create sprites for fast thumbnail loading
  
- **Lazy Loading:**
  ```javascript
  // Only load video when carousel item is clicked
  loadVideo(index) {
    const video = this.videos[index];
    if (!video.videoUrl.includes('blob:') && this.mainVideo.src !== video.videoUrl) {
      this.mainVideo.src = video.videoUrl;
    }
    // ... rest of loadVideo
  }
  ```

- **Storage:**
  - Store carousel state in sessionStorage to restore on page reload
  - Remember autoplay preference in localStorage

---

## FAQ SYSTEM OVERHAUL

### 4.1 Consolidated FAQ Data Structure

**Current Issue:** FAQs are hardcoded HTML on both service.html and contact.html. Difficult to maintain, update, and no DRY principle.

**Solution:** Create centralized FAQ data file with component-based rendering.

**File:** `assets/data/faqs.json`

```json
{
  "faqs": {
    "service-page": [
      {
        "id": "faq-turnaround",
        "question": "What is your typical turnaround time?",
        "answer": "Timeline varies by project complexity. Simple projects may take 2-3 weeks, while comprehensive campaigns can take 2-3 months. We provide estimates during consultation.",
        "category": "general",
        "relatedServices": ["content-production", "digital-management"]
      },
      {
        "id": "faq-international",
        "question": "Do you handle international projects?",
        "answer": "Absolutely! Though based in Namibia, we serve clients globally with our advanced digital collaboration tools and global creator network.",
        "category": "general",
        "relatedServices": []
      },
      {
        "id": "faq-onboarding",
        "question": "What is the onboarding process?",
        "answer": "After form submission, we schedule a 15-minute Discovery Call. If there's alignment, we issue a formal Protocol Proposal within 24 hours.",
        "category": "process",
        "relatedServices": []
      },
      {
        "id": "faq-refund",
        "question": "What is your refund policy?",
        "answer": "We offer project-specific refund policies outlined in our contract terms. Generally, refunds are considered based on project stage and deliverable completion.",
        "category": "billing",
        "relatedServices": []
      },
      {
        "id": "faq-support-after",
        "question": "Do you provide ongoing support after project completion?",
        "answer": "Yes, we offer maintenance and support packages to ensure continued success of your project. These can be customized to meet your specific needs.",
        "category": "support",
        "relatedServices": []
      },
      {
        "id": "faq-brand-consistency",
        "question": "How do you ensure brand consistency across different platforms?",
        "answer": "We develop comprehensive brand guidelines and style guides to maintain consistency across all touchpoints and platforms for your brand.",
        "category": "process",
        "relatedServices": ["digital-management"]
      },
      {
        "id": "faq-tech-stack",
        "question": "What technology stack do you use for web development?",
        "answer": "We work with modern technologies including React, Vue, Next.js, Node.js, and cloud platforms like AWS and Google Cloud, depending on project requirements.",
        "category": "technical",
        "relatedServices": ["digital-management"]
      },
      {
        "id": "faq-revisions",
        "question": "How do you handle revisions and feedback?",
        "answer": "We include a specified number of revision rounds in our contracts. We encourage structured feedback to ensure efficient project iteration and client satisfaction.",
        "category": "process",
        "relatedServices": []
      },
      {
        "id": "faq-portfolio",
        "question": "Can you provide examples of past work?",
        "answer": "Yes, visit our Portfolio section to see diverse projects across various industries. We showcase our work in content production, digital management, events, and podcasting.",
        "category": "general",
        "relatedServices": []
      }
    ],
    "contact-page": [
      {
        "id": "contact-response-time",
        "question": "What is the typical response time?",
        "answer": "We review all intake forms within 12 business hours. For urgent production requests, our executive team is notified immediately.",
        "category": "general",
        "relatedServices": []
      },
      {
        "id": "contact-international",
        "question": "Do you handle international projects?",
        "answer": "Yes. While based in Africa, we have a global creator network and have executed campaigns across 4 continents.",
        "category": "general",
        "relatedServices": []
      },
      {
        "id": "contact-onboarding",
        "question": "What is the onboarding process?",
        "answer": "After form submission, we schedule a 15-minute Discovery Call. If there's alignment, we issue a formal Protocol Proposal within 24 hours.",
        "category": "process",
        "relatedServices": []
      },
      {
        "id": "contact-services",
        "question": "What services do you offer?",
        "answer": "We specialize in Content Production, Digital Management, Event Management, and Podcasting. Each service is tailored to elevate your brand presence.",
        "category": "services",
        "relatedServices": []
      },
      {
        "id": "contact-pricing",
        "question": "How much do your services cost?",
        "answer": "Our pricing is customized based on project scope and requirements. We offer transparent packages designed to deliver premium results at competitive rates. Visit our Services page or contact us for a detailed quote.",
        "category": "billing",
        "relatedServices": []
      },
      {
        "id": "contact-timeline",
        "question": "How long does a typical project take?",
        "answer": "Timeline varies by project complexity. Simple projects may take 2-3 weeks, while comprehensive campaigns can take 2-3 months. We provide estimates during consultation.",
        "category": "general",
        "relatedServices": []
      },
      {
        "id": "contact-global",
        "question": "Do you work with international clients?",
        "answer": "Absolutely! Though based in Namibia, we serve clients globally with our advanced digital collaboration tools and global creator network.",
        "category": "general",
        "relatedServices": []
      },
      {
        "id": "contact-portfolio-examples",
        "question": "Can you provide examples of past work?",
        "answer": "Yes, visit our Portfolio section to see diverse projects across various industries. We showcase our work in content production, digital management, events, and podcasting.",
        "category": "general",
        "relatedServices": []
      },
      {
        "id": "contact-refund",
        "question": "What is your refund policy?",
        "answer": "We offer project-specific refund policies outlined in our contract terms. Generally, refunds are considered based on project stage and deliverable completion.",
        "category": "billing",
        "relatedServices": []
      },
      {
        "id": "contact-support-post",
        "question": "Do you provide ongoing support after project completion?",
        "answer": "Yes, we offer maintenance and support packages to ensure continued success of your project. These can be customized to meet your specific needs.",
        "category": "support",
        "relatedServices": []
      },
      {
        "id": "contact-brand-consistency",
        "question": "How do you ensure brand consistency across different platforms?",
        "answer": "We develop comprehensive brand guidelines and style guides to maintain consistency across all touchpoints and platforms for your brand.",
        "category": "process",
        "relatedServices": []
      },
      {
        "id": "contact-tech-stack",
        "question": "What technology stack do you use for web development?",
        "answer": "We work with modern technologies including React, Vue, Next.js, Node.js, and cloud platforms like AWS and Google Cloud, depending on project requirements.",
        "category": "technical",
        "relatedServices": []
      }
    ]
  }
}
```

### 4.2 FAQ Component Class

```javascript
class FAQAccordion {
  constructor(containerId, faqs = []) {
    this.container = document.getElementById(containerId);
    this.faqs = faqs;
    this.openItem = null;
    this.render();
    this.attachEventListeners();
  }
  
  render() {
    this.container.innerHTML = '';
    this.container.classList.add('faq-container');
    
    this.faqs.forEach((faq, index) => {
      const faqItem = document.createElement('details');
      faqItem.className = 'faq-item';
      faqItem.id = faq.id;
      faqItem.setAttribute('role', 'region');
      faqItem.setAttribute('aria-labelledby', `${faq.id}-summary`);
      
      const summary = document.createElement('summary');
      summary.className = 'faq-summary';
      summary.id = `${faq.id}-summary`;
      summary.setAttribute('role', 'button');
      summary.setAttribute('tabindex', '0');
      
      const summaryText = document.createElement('span');
      summaryText.className = 'faq-summary-text';
      summaryText.textContent = faq.question;
      
      const chevron = document.createElement('span');
      chevron.className = 'faq-chevron';
      chevron.setAttribute('aria-hidden', 'true');
      chevron.innerHTML = '▼';
      
      summary.appendChild(summaryText);
      summary.appendChild(chevron);
      
      const content = document.createElement('div');
      content.className = 'faq-content';
      content.innerHTML = faq.answer;
      
      faqItem.appendChild(summary);
      faqItem.appendChild(content);
      
      this.container.appendChild(faqItem);
    });
  }
  
  attachEventListeners() {
    const details = this.container.querySelectorAll('details');
    
    details.forEach((detail) => {
      detail.addEventListener('toggle', (e) => {
        // Only one FAQ can be open at a time (optional - remove if multiple open desired)
        if (e.target.open && this.openItem && this.openItem !== e.target) {
          this.openItem.open = false;
        }
        if (e.target.open) {
          this.openItem = e.target;
        }
      });
    });
  }
}

// Initialize FAQs on page load
document.addEventListener('DOMContentLoaded', async () => {
  // Load FAQ data
  const response = await fetch('assets/data/faqs.json');
  const faqData = await response.json();
  
  // Initialize service page FAQs
  if (document.getElementById('service-faqs')) {
    new FAQAccordion('service-faqs', faqData.faqs['service-page']);
  }
  
  // Initialize contact page FAQs
  if (document.getElementById('contact-faqs')) {
    new FAQAccordion('contact-faqs', faqData.faqs['contact-page']);
  }
});
```

### 4.3 CSS for FAQ Component

```css
.faq-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  transition: all 300ms ease;
}

.faq-item[open] {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: var(--brand-accent);
}

.faq-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  cursor: pointer;
  background: #f9f9f9;
  font-weight: 600;
  user-select: none;
  transition: background 300ms ease;
}

.faq-item[open] .faq-summary {
  background: #f0f8ff;
}

.faq-summary:hover {
  background: #f0f0f0;
}

.faq-summary:focus-visible {
  outline: 2px solid var(--brand-accent);
  outline-offset: 2px;
}

.faq-summary-text {
  flex: 1;
  font-size: 1rem;
  color: #333;
}

.faq-chevron {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--brand-accent);
  margin-left: 1rem;
  font-size: 0.75rem;
}

.faq-item[open] .faq-chevron {
  transform: rotate(180deg);
}

.faq-content {
  padding: 0 1.25rem;
  max-height: 0;
  overflow: hidden;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
}

.faq-item[open] .faq-content {
  padding: 1.25rem;
  opacity: 1;
  max-height: 500px;
}

.faq-content p {
  margin: 0;
  line-height: 1.6;
  color: #555;
}

.faq-content a {
  color: var(--brand-accent);
  text-decoration: none;
}

.faq-content a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .faq-summary {
    padding: 1rem;
  }
  
  .faq-content {
    max-height: 600px;
  }
  
  .faq-summary-text {
    font-size: 0.95rem;
  }
}
```

### 4.4 Testing Checklist

- [ ] All 9 service page FAQs expand/collapse independently
- [ ] All 12 contact page FAQs expand/collapse independently
- [ ] Only one FAQ open at a time (if configured that way)
- [ ] Keyboard navigation (Tab, Enter, Space) works
- [ ] Chevron rotates smoothly on expand/collapse
- [ ] Content text remains readable after expansion
- [ ] Mobile: Easy to tap on small devices
- [ ] Accessibility: Screen readers announce Q&A content
- [ ] Animation duration: 300ms (no jank on 60fps)

---

## GENERAL SITE ENHANCEMENTS

### 5.1 Homepage Hero Section Optimization

**Current State:** Static hero banner with text overlay, CTA buttons, and scroll indicator.

**Enhancements:**

1. **Animated Background Option:**
   - Add subtle parallax scrolling effect to hero banner
   - OR: Add animated gradient background (animated-gradient.css)
   - Alternative: Optimize video background (currently missing, only static image)

2. **Sticky Navigation Bar:**
   - Make navbar sticky on scroll with fade-in effect
   - Hide/show based on scroll direction (smart navbar)
   - Mobile: Hamburger menu with smooth slide-out

3. **CTA Button Microinteractions:**
   - Hover: Scale 1.05 with shadow
   - Click: Ripple effect
   - Loading state: Spinner inside button

4. **Scroll Indicator Enhancement:**
   - Replace static "Scroll" text with animated chevron
   - Fade out after first scroll
   - Mobile: Optimize for touch (larger tap area)

### 5.2 Client Testimonials Component Upgrade

**Current State:** Static testimonials with name, title, company, and 5-star rating.

**Enhancements:**

1. **Testimonial Carousel:**
   - Rotate testimonials every 5 seconds with fade transition
   - Manual navigation with prev/next buttons
   - Keyboard support (arrow keys)

2. **Testimonial Filtering:**
   - Filter by service type (Content Production, Digital Management, etc.)
   - Filter by industry (Hospitality, Government, Entertainment)

3. **Video Testimonials:**
   - Add video testimonials alongside text ones
   - Play on click with modal overlay
   - Autoplay when modal opens

### 5.3 Partner Logos Carousel

**Current State:** Grid of static partner logos, duplicated (possibly poor UX).

**Enhancements:**

1. **Infinite Scrolling Carousel:**
   - Smooth horizontal scroll animation
   - Auto-pause on hover
   - Responsive: Show 3-4 logos on desktop, 2 on tablet, 1-2 on mobile

2. **Logo Organization:**
   - Group by partner category (Government, Private, Startups)
   - Add filter tabs above carousel

3. **Lazy Loading:**
   - Only load visible logos
   - Cache logos in sessionStorage

### 5.4 Newsletter Subscription (Footer)

**Add Functionality:**
- Email input field with validation
- Subscribe button with loading state
- Success/error messages
- Integration with email service (Mailchimp, ConvertKit, etc.)

```html
<div class="newsletter-signup">
  <h3>Stay Updated</h3>
  <p>Get our latest projects and creative insights.</p>
  <form id="newsletter-form">
    <input 
      type="email" 
      placeholder="Your email address" 
      required
      aria-label="Email for newsletter"
    />
    <button type="submit">Subscribe</button>
  </form>
  <p id="newsletter-message" role="status"></p>
</div>
```

---

## PERFORMANCE & SEO OPTIMIZATION

### 6.1 Core Web Vitals

**Target Metrics:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Implementation:**

1. **Image Optimization:**
   - Convert all JPG to WebP with fallbacks
   - Lazy load images below fold with `loading="lazy"`
   - Serve responsive images with `srcset`
   - Use `<picture>` element for art direction

2. **JavaScript Optimization:**
   - Code splitting: Separate bundle for each page
   - Defer non-critical scripts with `defer` attribute
   - Preload critical resources

3. **CSS Optimization:**
   - Extract critical CSS for above-fold content
   - Inline critical CSS in `<head>`
   - Defer non-critical CSS with `rel="preload"`

4. **Caching Strategy:**
   - Set long cache headers (1 year) for assets with hashes
   - Short cache (5 minutes) for HTML

### 6.2 SEO Enhancements

1. **Meta Tags:**
   - Add unique `<title>` and `<meta description>` for each page
   - Add Open Graph tags for social sharing
   - Add Twitter Card tags

   Example:
   ```html
   <!-- Homepage -->
   <title>Creo Media - Premium Creative Agency in Namibia | Global Standards</title>
   <meta name="description" content="Award-winning creative agency based in Windhoek. Content production, digital management, events, and podcasting for global brands.">
   <meta property="og:title" content="Creo Media - Premium Creative Agency">
   <meta property="og:image" content="https://creomedia.com/og-image.jpg">
   ```

2. **Structured Data:**
   - Add JSON-LD for Organization, Service, LocalBusiness
   - Add FAQ schema for all FAQ sections

   ```json
   {
     "@context": "https://schema.org",
     "@type": "Organization",
     "name": "Creo Media",
     "url": "https://creomedia.com",
     "logo": "https://creomedia.com/logo.png",
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "Windhoek",
       "addressCountry": "Namibia"
     },
     "contactPoint": {
       "@type": "ContactPoint",
       "telephone": "+264-81-267-4321",
       "contactType": "Customer Service"
     }
   }
   ```

3. **XML Sitemap:**
   - Generate dynamic sitemap.xml with all pages
   - Include lastmod dates

4. **robots.txt:**
   ```
   User-agent: *
   Allow: /
   Disallow: /api/
   Sitemap: https://creomedia.com/sitemap.xml
   ```

### 6.3 Accessibility (WCAG 2.1 AA)

1. **Color Contrast:**
   - Verify all text meets 4.5:1 ratio for normal text
   - 3:1 for large text

2. **Keyboard Navigation:**
   - Tab order logical and visible (focus indicators)
   - All interactive elements keyboard accessible

3. **Screen Reader Support:**
   - Semantic HTML (`<nav>`, `<main>`, `<section>`, etc.)
   - ARIA labels for custom components
   - Skip links at top of page

4. **Form Accessibility:**
   - All inputs have associated `<label>` elements
   - Error messages linked to inputs with `aria-describedby`

---

## UX/UI IMPROVEMENTS

### 7.1 Dark Mode Support

**Implementation:**

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0a0a0a;
    --bg-secondary: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
  }
}
```

Add toggle switch in navigation:
```html
<button id="theme-toggle" aria-label="Toggle dark mode">
  <span>🌙</span>
</button>
```

### 7.2 Loading States

1. **Skeleton Screens:**
   - Show skeleton loaders while content loads
   - Reduces perceived load time

2. **Progress Indicators:**
   - Add progress bar during form submission
   - Show step indicators for multi-step forms

### 7.3 Micro-Animations

1. **Button Hover Effects:**
   - Scale, shadow, color shift on hover

2. **Link Underlines:**
   - Animated underline on hover (left to right)

3. **Page Transitions:**
   - Fade in/out between pages
   - Smooth scroll-to-anchor

4. **Form Feedback:**
   - Checkmark animation on successful submission
   - Shake animation on error

---

## CONTENT & COPY REFINEMENTS

### 8.1 Error Corrections & Consistency

**Current Issues Found:**

1. **"aviding" typo** (service page, "Why Choose Us" section):
   - Current: "Specialist in aviding clients of financial challenges"
   - Fix: "Specialists in helping clients avoid financial challenges" or "Specialists in safeguarding client investments"

2. **Inconsistent FAQ Duplicates:**
   - Some FAQs appear on both service.html and contact.html with slightly different wording
   - Consolidate to single source of truth (use data-driven approach above)

3. **Missing alt text:**
   - Some images missing descriptive alt text
   - Update all images with meaningful descriptions

### 8.2 Copy Enhancements

1. **Service Page:**
   - Add more compelling CTAs for service discovery tool
   - Include success metrics for each service

2. **About Page:**
   - Expand team bios and credentials
   - Add team photos
   - Include awards/certifications

3. **Contact Page:**
   - Simplify form (currently has name, email, subject, message)
   - Add optional fields: company, budget, timeline
   - Post-submission: Show estimated response time

4. **Footer:**
   - Add social media links (currently missing)
   - Add links to privacy policy and terms (present but emphasized)
   - Add newsletter signup

### 8.3 Call-to-Action Optimization

**Current CTAs:**
- "View Our Work" → Portfolio
- "Get Started" → Contact
- "Start a Similar Project" → Case study modals

**Enhancement:**
- A/B test CTA text:
  - "View Our Work" vs "See Our Portfolio" vs "Browse Case Studies"
  - "Get Started" vs "Book Consultation" vs "Start Your Project"
- Add urgency language (optional): "Limited spots available", "Book your call today"

---

## IMPLEMENTATION PRIORITY & TIMELINE

### Phase 1: Critical Fixes (Week 1-2)
- [ ] FAQ dropdown functionality fix
- [ ] Chatbot response fixes
- [ ] Copy error correction (aviding → safeguarding)

### Phase 2: Portfolio Enhancement (Week 3-4)
- [ ] Video carousel implementation
- [ ] Portfolio video data structure
- [ ] Video optimization and hosting

### Phase 3: General Enhancements (Week 5-6)
- [ ] Newsletter signup
- [ ] Dark mode support
- [ ] Testimonials carousel
- [ ] Loading states

### Phase 4: Optimization (Week 7-8)
- [ ] Core Web Vitals optimization
- [ ] SEO enhancements (meta tags, structured data)
- [ ] Accessibility audit and fixes
- [ ] Performance optimization (image compression, lazy loading)

### Phase 5: Polish (Week 9)
- [ ] Micro-animations
- [ ] QA testing across all devices
- [ ] User testing and feedback iteration

---

## TESTING & VALIDATION CHECKLIST

### Functionality Testing
- [ ] All FAQs expand/collapse smoothly
- [ ] Chatbot sends/receives messages correctly
- [ ] Video carousel loads and plays videos
- [ ] Navigation works across all pages
- [ ] Forms submit successfully

### Responsive Testing
- [ ] Desktop (1920px): All layouts render correctly
- [ ] Tablet (768px): Navigation and forms adjust properly
- [ ] Mobile (375px): Readable text, touchable elements (44px minimum)
- [ ] Landscape orientation: No horizontal scrolling issues

### Browser Compatibility
- [ ] Chrome/Edge (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Mobile Safari (iOS 14+)
- [ ] Chrome Mobile (Android)

### Accessibility Testing
- [ ] Keyboard only navigation (Tab, Enter, Escape)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Color contrast ratio validation (4.5:1 minimum)
- [ ] Focus indicators visible
- [ ] Form labels properly associated

### Performance Testing
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Page load time < 3s on 4G
- [ ] GTmetrix score > 85

### SEO Testing
- [ ] All meta tags present and unique
- [ ] Structured data validates (schema.org)
- [ ] Sitemap.xml generates correctly
- [ ] robots.txt configured
- [ ] Mobile-friendly test passes

---

## NOTES FOR DEVELOPERS

1. **Version Control:** Commit each phase separately with descriptive messages
2. **Documentation:** Update README with new features and components
3. **Backwards Compatibility:** Ensure changes don't break existing functionality
4. **Monitoring:** Set up analytics to track FAQ usage, chatbot conversations, carousel interactions
5. **Maintenance:** Plan for regular video carousel content updates
6. **Backups:** Maintain backup of original site before major changes

---

**Document Version:** 1.0  
**Last Updated:** April 26, 2026  
**Next Review:** After Phase 1 completion
