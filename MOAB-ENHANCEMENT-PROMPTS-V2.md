# CREOMEDIA WEBSITE - MOAB LEVEL ENHANCEMENT PROMPTS V2.0

**Status:** Critical Bug Fixes + Feature Completion  
**Scope:** Complete site overhaul (excluding Blog & Resource pages)  
**Live URL:** https://ronnj-b-kaheka.github.io/Creo-domain/index.html  
**Last Updated:** 2026-04-28

---

## TABLE OF CONTENTS
1. [Critical Fixes (P0 - Immediate)](#critical-fixes-p0---immediate)
2. [Portfolio Video Carousel Implementation](#portfolio-video-carousel-implementation)
3. [FAQ Accordion System (Global)](#faq-accordion-system-global)
4. [Chatbot Implementation & Repositioning](#chatbot-implementation--repositioning)
5. [Navigation & UI/UX Overhaul](#navigation--uiux-overhaul)
6. [Feature Completion & Enhancements](#feature-completion--enhancements)
7. [Testing & Quality Assurance](#testing--quality-assurance)

---

## CRITICAL FIXES (P0 - IMMEDIATE)

### PROMPT 1: Navbar UI/UX Fix - Hamburger Menu, Hover States, Active Links

**Objective:** Fix broken navbar functionality, hamburger menu glitches, broken hover/click effects, and active link indicators

**Current Issues Identified:**
- Hamburger menu transitions are glitchy on mobile viewports
- Hover states on navbar links are not working smoothly
- Active page indicators are not highlighting correctly
- Hamburger animation (3-line to X) is incomplete or broken
- Dropdown submenus (Services, Portfolio) positioning is incorrect on mobile
- Click effects on links have no visual feedback
- Navbar z-index conflicts causing overlays to appear behind content

**Requirements:**

1. **Hamburger Menu Animation:**
   - Implement smooth 3-line to X transformation (300ms)
   - Use CSS transforms (no absolute positioning changes)
   - Proper rotation: top line +45°, bottom line -45°, middle line opacity 0
   - Add backdrop overlay (semi-transparent, blurred) when menu open
   - Backdrop click closes menu
   - Escape key closes menu

2. **Hover Effects:**
   - Text links: color transition to gold (#c9a84c) in 200ms ease
   - Background subtle highlight on hover (rgba(201, 168, 76, 0.1))
   - Scale effect: 1.02x on text link hover
   - No jumping or layout shifts during hover

3. **Active Link Indicator:**
   - Detect current page and highlight in navbar
   - Use gold underline (3px) with slide-in animation
   - Update dynamically when navigating
   - Apply to both main menu and submenu items

4. **Submenu Positioning & Mobile:**
   - Ensure all dropdown items fully visible on mobile (768px and below)
   - Stack vertically with proper spacing (12px gap)
   - Full-width on mobile with side padding (16px)
   - Touch-friendly target size (min 44px height)
   - Proper focus states for keyboard navigation

5. **Visual Feedback:**
   - Add smooth background color transition on link hover (200ms)
   - Implement focus outline (3px gold, 2px offset) for keyboard users
   - Show cursor change to pointer on all interactive elements
   - Clear visible state for touched/active elements on mobile

6. **Accessibility:**
   - Proper aria-expanded and aria-haspopup attributes
   - Tab navigation through all menu items
   - Focus trap when menu is open (Tab cycles through menu items only)
   - Announce menu state to screen readers

**Files to Modify:**
- `style.css` - navbar styling, animations, z-index stacking
- `assets/js/config.js` or new `assets/js/navbar.js` - event listeners

**Testing Checklist:**
- [ ] Hamburger menu opens/closes smoothly
- [ ] Hover effects on desktop are instant and smooth
- [ ] Mobile menu is fully accessible below 768px
- [ ] Active page indicator updates correctly
- [ ] No console errors
- [ ] Focus states visible for keyboard users
- [ ] Touch events work on mobile devices

**Expected Output:**
- Fully functional navbar with smooth animations
- Mobile hamburger menu without lag
- Clear visual feedback for all user interactions
- Keyboard navigation support

---

### PROMPT 2: Global Button & Link Click States - Complete Implementation

**Objective:** Restore smooth, consistent hover/click effects across all buttons and links

**Current Issues:**
- Button hover effects are not scaling/transitioning smoothly
- Link colors aren't changing on hover
- Card hover animations are too slow or not triggering
- Clicked state styling is not visible
- Transition timing is inconsistent

**Requirements:**

1. **Button State System:**
   - **Default:** Base styling with no shadow
   - **Hover:** Scale 1.05, shadow increase (0 2px 12px rgba(0,0,0,0.15)), color transition
   - **Clicked/Active:** Scale 0.98, shadow decrease (0 1px 4px rgba(0,0,0,0.1))
   - **Focus:** Visible outline (3px gold #c9a84c, offset 2px)
   - **Disabled:** Opacity 0.5, cursor not-allowed

2. **Transition Timing:**
   - All button state transitions: 150ms cubic-bezier(0.16, 1, 0.3, 1)
   - Color transitions: 200ms ease
   - Box-shadow transitions: 200ms ease

3. **All Button Types:**
   - Primary CTA buttons (.btn-primary): Gold background, white text
   - Secondary buttons (.btn-secondary): Gold outline, gold text
   - Tertiary/Link buttons: Text only, underline on hover
   - Icon buttons: Proper sizing and spacing

4. **Card Hover Effects:**
   - Service cards: Lift 4px with shadow increase
   - Portfolio cards: Image brightness 110%, overlay opacity 0.9
   - Case study cards: Play button visibility on hover with fade-in (300ms)
   - All transitions: smooth, no jank

5. **Link States:**
   - Text links: Gold (#c9a84c) color, underline on hover
   - Navigation links: Color change to gold (#c9a84c) on hover, 200ms
   - Footer links: Opacity 0.7 default, opacity 1 on hover
   - Visited links: Darker gold (#a68835) color

6. **Performance:**
   - Use GPU-accelerated properties (transform, opacity)
   - Avoid animating width, height, left, right
   - Test on low-end devices (4x CPU throttle in DevTools)
   - No stuttering or 60fps drop

**Files to Modify:**
- `assets/css/style.css` - all button and link styling
- `assets/css/portfolio.css` - card hover effects
- `assets/js/config.js` - click feedback (if any)

**Testing Checklist:**
- [ ] All buttons respond to hover instantly
- [ ] Click/active state is visible
- [ ] Focus outline visible when tabbing
- [ ] Card hover effects smooth on all devices
- [ ] No layout shifts or jank
- [ ] Works on mobile (touch states)
- [ ] Accessibility maintained (focus visible)

**Expected Output:**
- Consistent, smooth hover/click effects on all interactive elements
- Clear visual feedback for all user interactions
- Proper focus states for keyboard users
- 60fps animations, no jank

---

### PROMPT 3: Fix FAQ Dropdown/Accordion Issues - Site-Wide

**Objective:** Fix non-functional FAQ accordions and implement working accordion component across all pages

**Current Issues:**
- FAQs on contact.html and other pages display all Q&A at once
- Click handlers are NOT attached to FAQ items
- No visual indication of expanded/collapsed state
- No smooth animations between states
- Plus/minus icons don't rotate or change

**Root Cause Analysis:**
- FAQ JavaScript likely missing or not loading
- Event listeners not properly attached
- CSS animations not defined
- HTML structure may not have proper attributes (aria-expanded, hidden)

**Requirements:**

1. **FAQ HTML Structure (All Pages):**
   ```html
   <div class="faq-container">
     <div class="faq-item">
       <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-0">
         <span class="faq-question-text">Your question here?</span>
         <span class="faq-icon">+</span>
       </button>
       <div class="faq-answer" id="faq-answer-0" hidden>
         <div class="faq-answer-content">
           Answer content goes here.
         </div>
       </div>
     </div>
     <!-- More FAQ items -->
   </div>
   ```

2. **JavaScript Functionality (New File: `assets/js/faq.js`):**
   - Click question button to toggle expanded state
   - Only one FAQ item open at a time (accordion behavior)
   - Toggle aria-expanded attribute (true/false)
   - Toggle hidden attribute on answer div
   - Add/remove "active" class on question button
   - Smooth max-height animation during open/close
   - Auto-scroll FAQ into view on open (on mobile)

3. **CSS Animations (style.css or faq.css):**
   ```css
   .faq-question {
     transition: all 200ms ease;
     background-color: transparent;
     border-bottom: 1px solid rgba(201, 168, 76, 0.2);
     padding: 16px;
     cursor: pointer;
   }
   
   .faq-question:hover {
     background-color: rgba(201, 168, 76, 0.05);
   }
   
   .faq-question.active {
     background-color: rgba(201, 168, 76, 0.1);
   }
   
   .faq-icon {
     transition: transform 300ms ease;
     display: inline-block;
   }
   
   .faq-question.active .faq-icon {
     transform: rotate(45deg);
   }
   
   .faq-answer {
     max-height: 0;
     overflow: hidden;
     transition: max-height 300ms ease;
   }
   
   .faq-question[aria-expanded="true"] + .faq-answer {
     max-height: 1000px; /* Adjust based on content */
   }
   ```

4. **Apply to All Pages:**
   - `contact.html` - General services FAQs (12 items)
   - `about.html` - Company/culture FAQs (8 items)
   - `portfolio.html` - Project & process FAQs (6 items)
   - Individual service pages: Service-specific FAQs (5-7 items)

5. **Enhanced Features:**
   - Search/filter FAQ by keyword (optional but recommended)
   - Track most-opened FAQs with localStorage
   - Auto-expand first FAQ on page load (optional)
   - Keyboard support: Enter/Space to toggle, Arrow keys to navigate

6. **Accessibility:**
   - aria-expanded properly set
   - aria-controls linking question to answer
   - Proper heading hierarchy (h3 for questions)
   - Focus visible on all buttons
   - Screen reader announces expanded state

**Files to Modify/Create:**
- `assets/js/faq.js` - NEW FILE with full FAQ functionality
- `style.css` - FAQ styling and animations
- `contact.html` - Update FAQ markup
- `about.html` - Update FAQ markup
- `portfolio.html` - Update FAQ markup
- Service pages - Update FAQ markup

**Script Inclusion (Add to all HTML pages with FAQs):**
```html
<script src="./assets/js/faq.js" defer></script>
```

**Testing Checklist:**
- [ ] Click FAQ opens/closes smoothly
- [ ] Icon rotates 45° when opened
- [ ] Only one FAQ open at a time
- [ ] Focus states visible when tabbing
- [ ] Mobile touch works properly
- [ ] Smooth animation (no jank)
- [ ] Screen reader announces state
- [ ] No console errors

**Expected Output:**
- Fully functional accordion on all pages
- Smooth animations and transitions
- Complete keyboard and screen reader support
- Professional interaction feel

---

### PROMPT 4: Chatbot Implementation - Functional AI Assistant with Proper Positioning

**Objective:** Fix chatbot non-responsiveness and reposition to opposite side of page with full functionality

**Current Issues:**
- Chatbot icon exists but chatbot is NOT responding to messages
- Chatbot positioned on wrong side of page (user wants opposite side)
- No proper message handling or conversation context
- No API integration for intelligent responses
- Possibly missing event listeners

**Requirements:**

1. **Positioning & Layout:**
   - Position on **RIGHT SIDE** of page (bottom-right corner)
   - Fixed position: bottom 24px, right 24px
   - Z-index: 9999 (above all elements)
   - On mobile (< 768px): bottom 16px, right 16px
   - Chat bubble: 60px × 60px circular button
   - Chat window: 360px width × 600px height (responsive on mobile)
   - Smooth fade-in animation on page load

2. **Visual Design:**
   - Match luxury aesthetic (gold, dark, premium feel)
   - Floating chat bubble with hover scale effect (1.1x)
   - Subtle rotation on hover (5-10 degrees)
   - Backdrop blur on message area
   - Proper shadow and depth
   - Mobile: full-screen modal when opened

3. **Chat Window Components:**
   - Header: Creo Media branding + close button (X)
   - Close button: Top-right corner, 32×32px
   - Message history area: Scrollable, max-height with scrollbar
   - Input field: Bottom-fixed, with send button
   - Typing indicator: Dot animation when bot is responding
   - Timestamp on each message (optional)

4. **Conversation Functionality:**
   - **Claude API Integration:**
     - Use Anthropic Claude API (claude-opus-4-6 or latest)
     - Implement proper system prompt for Creo Media assistant
     - Maintain conversation history during session
     - Rate limit: 5 messages per minute (prevent abuse)
     - Debounce API calls: 500ms
   
   - **System Prompt:**
   ```
   You are a helpful AI assistant for Creo Media, a premium creative agency based in Windhoek, Namibia.
   You help visitors learn about our services (Content Production, Digital Management, Event Management, Podcasting),
   explore our portfolio, and start projects. Be professional yet friendly, concise but informative.
   For complex requests, suggest they contact us directly at contact.creomedia@gmail.com.
   Always include relevant page links when mentioning services.
   ```

5. **Message Handling & Routing:**
   - Service-related questions → Suggest relevant service page + FAQ
   - Portfolio/case study questions → Link to portfolio page
   - Contact questions → Suggest contact form or phone number
   - General questions → Provide helpful context
   - Quick replies (chips): "View Services", "See Portfolio", "Contact Us"

6. **Features:**
   - Persistent chat history (sessionStorage during visit)
   - Suggested quick replies (button chips)
   - Rich message support (links formatted properly)
   - User messages: right-aligned, light background
   - Bot messages: left-aligned, subtle background
   - User avatar: Initials or default avatar
   - Bot avatar: Creo Media logo or icon
   - Typing animation: "Creo is typing..."
   - Clear chat option in menu

7. **Mobile Optimization:**
   - Full-screen modal on mobile when opened
   - Simplified header on mobile
   - Touch-friendly send button (min 44px height)
   - Better font sizing (16px minimum on input)
   - Proper keyboard handling (no overlap)
   - Virtual keyboard support

8. **Accessibility:**
   - aria-label on chat bubble: "Open chat assistant"
   - Proper heading in modal (h2)
   - Focus management: Focus chat input on open
   - Keyboard support: Enter to send, Escape to close
   - Screen reader announcements for new messages
   - WCAG 2.1 AA compliance

9. **Error Handling:**
   - Show error message if API fails: "Unable to respond right now. Please contact us directly."
   - Retry button for failed messages
   - Connection timeout: 30 seconds
   - Graceful degradation if no internet

**Implementation Steps:**

1. Create `assets/js/chatbot.js` with full chatbot logic
2. Create `assets/css/chatbot.css` for styling
3. Add HTML markup to all pages (base template)
4. Set up Claude API integration (see below)
5. Test thoroughly on all pages and devices

**Claude API Setup:**
```javascript
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY; // Set in environment
const CLAUDE_MODEL = "claude-opus-4-6";
const CLAUDE_ENDPOINT = "https://api.anthropic.com/v1/messages";

async function sendMessageToBot(userMessage, conversationHistory) {
  // Implementation in chatbot.js
}
```

**Files to Create/Modify:**
- `assets/js/chatbot.js` - NEW FILE with full chatbot functionality
- `assets/css/chatbot.css` - NEW FILE with styling
- All HTML files - Add chatbot markup
- `.env` - Store CLAUDE_API_KEY securely

**Environment Configuration:**
- Store API key in `.env` file (DO NOT commit to git)
- Use server-side proxy for API calls (security best practice)
- Alternative: Firebase Cloud Functions for backend

**HTML Markup (Add to all pages in body, before closing tag):**
```html
<!-- CHATBOT -->
<div class="chatbot-widget">
  <button class="chat-bubble" id="chat-toggle" aria-label="Open chat assistant">
    <svg class="chat-icon" viewBox="0 0 24 24"><!-- Chat icon SVG --></svg>
  </button>
  
  <div class="chat-window" id="chat-window" hidden>
    <div class="chat-header">
      <div class="chat-brand">
        <span class="creo-text">Creo</span><span class="media-text">Media</span>
      </div>
      <button class="chat-close" id="chat-close" aria-label="Close chat">×</button>
    </div>
    
    <div class="chat-messages" id="chat-messages"></div>
    <div class="chat-typing" id="chat-typing" hidden>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
    
    <div class="chat-input-area">
      <input type="text" id="chat-input" placeholder="Type your message..." autocomplete="off">
      <button class="chat-send" id="chat-send" aria-label="Send message">
        <svg class="send-icon" viewBox="0 0 24 24"><!-- Send icon SVG --></svg>
      </button>
    </div>
  </div>
</div>

<script src="./assets/js/chatbot.js" defer></script>
```

**Testing Checklist:**
- [ ] Chatbot bubble appears on right side
- [ ] Click opens chat window
- [ ] User can type message
- [ ] Message appears in chat history
- [ ] Bot responds with Claude API
- [ ] Typing indicator shows
- [ ] Close button works
- [ ] Focus management works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Keyboard navigation works
- [ ] API key secure (not in code)

**Expected Output:**
- Fully functional chatbot on right side of all pages
- Proper message handling with Claude API
- Smooth animations and professional design
- Complete mobile responsiveness
- Full accessibility compliance

---

## PORTFOLIO VIDEO CAROUSEL IMPLEMENTATION

### PROMPT 5: Integrate Video Carousel on Portfolio Page

**Objective:** Seamlessly integrate the provided video carousel into Portfolio page with matching design

**Design Reference:**
- 320px × 520px cards (responsive)
- Featured indicator strip
- Play button overlay on hover
- Dynamic stats display
- Progress bars
- Navigation dots
- Bottom ticker scrolling effect

**Requirements:**

1. **Visual Integration:**
   - Match site color scheme:
     - Ink: #0e0e0e (background)
     - Paper: #f5f2ec (text)
     - Gold: #c9a84c (accents)
     - Ash: #2a2a2a (secondary)
   - Use existing typography (Syne, Cormorant Garamond)
   - Maintain luxury aesthetic

2. **Data Structure (case-studies.json):**
   ```json
   {
     "caseStudies": [
       {
         "id": 1,
         "client": "Tatekulu Barbershop",
         "title": "From Local Barbershop to Social Media Sensation",
         "category": "Content Production",
         "image": "/assets/images/case-studies/tatekulu.jpg",
         "video": "/assets/videos/tatekulu-showcase.mp4",
         "gradient": "linear-gradient(135deg, #1a1209 0%, #3d2810 40%, #1f1208 100%)",
         "stats": {
           "engagement": "300%",
           "reach": "50K+ views",
           "growth": "45% new customers"
         }
       },
       // Additional case studies...
     ]
   }
   ```

3. **Carousel Functionality:**
   - Drag-to-scroll with momentum scrolling (RequestAnimationFrame)
   - Keyboard navigation: Arrow keys to scroll, Enter to open case study
   - Auto-play with pause on hover (cycle every 8 seconds)
   - Smooth scrolling animation (300-500ms)
   - Touch support on mobile devices

4. **Responsive Design:**
   - Desktop: 320px × 520px cards
   - Tablet: 280px × 480px cards (max-width: 1024px)
   - Mobile: 240px × 400px cards (max-width: 768px)
   - Full-width carousel container with horizontal scroll

5. **Features:**
   - Loading states for video thumbnails (skeleton or blur-up)
   - Play icon overlay (appears on hover, 50×50px centered)
   - Featured indicator: "FEATURED" badge on selected card
   - Stats display: Engagement %, Reach, Growth metrics
   - Progress bars for each metric
   - Navigation dots: Clickable to jump to card
   - Card hover effects: Scale 1.02, shadow increase

6. **Video Implementation:**
   - Poster image (video first frame)
   - MP4 + WebM formats for compatibility
   - Auto-pause all videos when carousel scrolls
   - Playback controls included
   - No autoplay (user initiates with click)

7. **Accessibility:**
   - aria-label on carousel: "Portfolio carousel"
   - aria-labels on cards: "Project 1 of 6: Tatekulu Barbershop"
   - Keyboard-only navigation support
   - Focus visible on cards and navigation dots
   - Screen reader announcement for carousel position
   - Captions/transcripts for video content (if applicable)

8. **Performance:**
   - Use RequestAnimationFrame for smooth scrolling
   - Lazy-load video thumbnails
   - Debounce scroll events
   - Implement CSS containment for carousel section
   - Test on low-end devices (4x CPU throttle)

**Files to Create/Modify:**
- `assets/js/carousel.js` - NEW FILE with carousel logic
- `assets/css/carousel.css` - NEW FILE with carousel styling
- `assets/json/case-studies.json` - Case study data
- `portfolio.html` - Update markup to include carousel
- `assets/images/case-studies/` - Store case study images

**HTML Structure (Insert in portfolio.html):**
```html
<section class="portfolio-carousel-section">
  <h2 class="section-title">Featured Work</h2>
  
  <div class="carousel-container" id="portfolio-carousel">
    <div class="carousel-track" id="carousel-track">
      <!-- Carousel cards will be populated by JavaScript -->
    </div>
    
    <div class="carousel-nav">
      <button class="carousel-nav-dot active" data-index="0"></button>
      <!-- More dots... -->
    </div>
  </div>
</section>
```

**Script Inclusion:**
```html
<script src="./assets/json/case-studies.json"></script>
<script src="./assets/js/carousel.js" defer></script>
```

**Testing Checklist:**
- [ ] Carousel displays all case studies
- [ ] Drag/scroll works smoothly
- [ ] Auto-play cycles through cards
- [ ] Hover pauses auto-play
- [ ] Play button visible on hover
- [ ] Stats display correctly
- [ ] Navigation dots work
- [ ] Responsive on mobile
- [ ] Keyboard navigation works
- [ ] 60fps performance maintained
- [ ] No console errors

**Expected Output:**
- Fully functional, luxury carousel on portfolio page
- Smooth drag and scroll interaction
- Professional hover animations
- Responsive across all devices
- Integrated with site design system

---

## FAQ ACCORDION SYSTEM (GLOBAL)

### PROMPT 6: Deploy FAQ Accordions Across All Pages

**Objective:** Implement FAQ systems on all relevant pages with consistent design and functionality

**Pages Requiring FAQs:**
- contact.html - General services & process FAQs (12-15 items)
- about.html - Company/culture/team FAQs (8-10 items)
- portfolio.html - Portfolio & process FAQs (6-8 items)
- service.html - General service FAQs (5-7 items)
- Individual service pages:
  - content-production.html
  - digital-management.html
  - event-management.html
  - podcasting.html

**Requirements (Apply to all pages):**

1. **FAQ Data Structure (Create faqs.json):**
   ```json
   {
     "faqs": {
       "contact": [
         {"id": 1, "question": "How long does a typical project take?", "answer": "..."},
         {"id": 2, "question": "What's your pricing model?", "answer": "..."}
       ],
       "about": [...],
       "portfolio": [...]
     }
   }
   ```

2. **Consistent HTML & Styling:**
   - Use same accordion component on all pages
   - Consistent colors, spacing, animations
   - Gold accent (#c9a84c) for active states
   - Smooth 300ms transitions

3. **JavaScript Functionality:**
   - Single accordion instance per page
   - Multiple items, one open at a time
   - Smooth max-height animation
   - Icon rotation on state change

4. **Mobile Optimization:**
   - Full-width on mobile with proper padding
   - Larger touch targets (min 44px)
   - Auto-scroll into view on open
   - Simplified layout on small screens

5. **Search/Filter (Optional Enhancement):**
   - Add search input above FAQs
   - Filter items by keyword in real-time
   - Highlight matching text
   - Show count of results

**Files to Create/Modify:**
- `assets/json/faqs.json` - FAQ data
- `assets/js/faq.js` - Accordion logic
- All HTML pages - Update FAQ markup
- `assets/css/style.css` - FAQ styling

**Testing Checklist:**
- [ ] FAQs load correctly on all pages
- [ ] Accordions function properly
- [ ] Smooth animations
- [ ] Mobile responsive
- [ ] Search works (if implemented)
- [ ] Keyboard navigation works
- [ ] Accessibility compliant

**Expected Output:**
- FAQ systems on all relevant pages
- Consistent design and interaction
- Fully functional and accessible

---

## NAVIGATION & UI/UX OVERHAUL

### PROMPT 7: Comprehensive Navigation System Fix

**Objective:** Fix all navigation issues including mega menus, breadcrumbs, page links, and active states

**Issues to Address:**
- Service submenu links lead to nonexistent or broken pages
- Portfolio filter links (?filter=) don't filter
- Breadcrumbs don't update
- Active page indicators don't highlight
- Mega menu positioning and functionality

**Requirements:**

1. **Service Navigation:**
   - Verify all service page links work:
     - `/services/content-production.html` ✓
     - `/services/digital-management.html` ✓
     - `/services/event-management.html` ✓
     - `/services/podcasting.html` ✓
   - Update navbar mega menu links to point to correct pages
   - Add smooth page transitions (fade 400ms)

2. **Portfolio Filtering:**
   - Implement ?filter= URL parameter handling
   - Filter categories:
     - `?filter=content-production`
     - `?filter=digital-management`
     - `?filter=event-management`
     - `?filter=podcasting`
   - Show/hide portfolio items based on filter
   - Update active filter button styling
   - Maintain URL history with back button support

3. **Breadcrumb Navigation:**
   - Dynamic breadcrumbs on all pages:
     - Home > Current Page
     - Home > Services > [Service Name]
     - Home > Portfolio > [Filter Type]
   - Update on route change
   - Proper styling (gold accent, separators)

4. **Active Page Detection:**
   - Highlight current page in navbar
   - Update on navigation
   - Visual indicator: gold underline or background
   - Works with dynamic content

**Files to Modify:**
- `assets/js/config.js` or new `assets/js/navigation.js`
- `assets/css/style.css` - breadcrumb styling
- All HTML files - breadcrumb markup

**Testing Checklist:**
- [ ] All service links work
- [ ] Portfolio filtering works
- [ ] Breadcrumbs update correctly
- [ ] Active page highlighted in navbar
- [ ] Smooth page transitions
- [ ] URL history maintained

**Expected Output:**
- Fully functional navigation system
- All pages accessible and working
- Smooth user experience
- Proper visual feedback

---

## FEATURE COMPLETION & ENHANCEMENTS

### PROMPT 8: Case Study Modal/Detail Page Enhancement

**Objective:** Create complete, functional case study detail views

**Current Issues:**
- "View Case Study" links don't navigate or open anything
- Modal incomplete (missing sections)
- Image paths are placeholders
- No close mechanisms

**Requirements:**

1. **Modal Content Structure:**
   - Hero image (full-width at top)
   - Case study title and client info
   - Challenge section with description
   - Approach/Solution section
   - Results section with metrics (KPIs)
   - Before/After visual comparison
   - Client testimonial
   - CTA button ("Start Similar Project")

2. **Modal Interactions:**
   - Fade-in animation (300ms)
   - Slide-up content (400ms) with stagger
   - Blur backdrop
   - Close button (X) top-right
   - Click outside to close
   - Escape key to close
   - Body scroll locked when modal open

3. **Mobile Optimization:**
   - Full-height modal on mobile
   - Touch-friendly close button
   - Scrollable content

4. **Accessibility:**
   - Focus trap (Tab cycles through modal only)
   - aria-modal="true"
   - Proper heading hierarchy
   - Focus on close button initially

**Expected Output:**
- Fully functional case study detail modals
- Professional presentation
- Complete accessibility

---

### PROMPT 9: Contact Form Enhancement & Validation

**Objective:** Implement proper form validation and submission handling

**Requirements:**

1. **Form Fields:**
   - Name (required, min 2 chars)
   - Email (required, valid email format)
   - Company (optional)
   - Service type (required, dropdown)
   - Project timeline (required, radio buttons)
   - Budget range (optional, dropdown)
   - Message (required, min 20 chars)
   - File attachment (optional, max 3 files, max 10MB each)

2. **Validation:**
   - Real-time validation on blur
   - Inline error messages
   - Disable submit until valid
   - Red border on invalid fields
   - Clear errors when corrected

3. **Feedback States:**
   - Default: Normal styling
   - Focused: Gold border, shadow
   - Valid: Green checkmark indicator
   - Invalid: Red border, error text
   - Submitting: Spinner, disabled

4. **Success Handling:**
   - Show success message
   - Clear form fields
   - Show next steps
   - Option to send another message

5. **Integration:**
   - Send to: contact.creomedia@gmail.com
   - Auto-reply to user
   - Save to database (if available)

**Expected Output:**
- Fully functional contact form
- Proper validation and feedback
- Good UX and accessibility

---

### PROMPT 10: Button & Link Standardization

**Objective:** Ensure consistent button and link styling across site

**Requirements:**

1. **Button Hierarchy:**
   - Primary: Gold bg, white text
   - Secondary: Gold outline, gold text
   - Tertiary: Text only, underline on hover

2. **Button Sizes:**
   - Large: 56px height, 32px padding
   - Medium: 48px height, 24px padding (default)
   - Small: 40px height, 16px padding

3. **All States:**
   - Default, Hover (1.05x scale), Active (0.98x scale)
   - Focus (3px gold outline)
   - Disabled (0.5 opacity)

4. **Link States:**
   - Default: Gold color, underline
   - Hover: Brightness increase, underline moves down 2px
   - Visited: Darker gold
   - Focus: Visible outline

**Expected Output:**
- Standardized button component library
- Consistent styling across site
- 60fps animations, smooth

---

### PROMPT 11: Image & Media Optimization

**Objective:** Ensure all images load fast and render properly

**Requirements:**

1. **Image Formats:**
   - Use WebP with JPEG fallback
   - Create responsive images (srcset for 1x, 2x, 3x)
   - Proper aspect ratios
   - Lazy-load images below fold
   - Blur-up placeholder while loading

2. **Image Sizes:**
   - Hero: 1920 × 1080 (mobile: 1080 × 720)
   - Service icons: 64 × 64, 128 × 128
   - Case study cards: 320 × 520
   - Portfolio items: 400 × 300
   - Testimonial avatars: 64 × 64

3. **Video Optimization:**
   - MP4 + WebM formats
   - Poster image (first frame)
   - Autoplay only with muted attribute
   - Playback controls
   - Mobile: reduced bitrate

**Expected Output:**
- Fast-loading images and media
- Responsive and optimized
- Better Core Web Vitals

---

## TESTING & QUALITY ASSURANCE

### PROMPT 12: Comprehensive Testing & QA

**Objective:** Ensure site works perfectly on all platforms

**Test Coverage:**

1. **Browsers:**
   - Chrome/Edge (latest)
   - Firefox (latest)
   - Safari (latest)
   - Mobile Safari (iOS 14+)
   - Chrome Mobile (Android 11+)

2. **Devices:**
   - Desktop (1920×1080, 2560×1440)
   - Tablet (iPad: 768×1024)
   - Mobile (iPhone 12: 390×844, Android: 360×720)

3. **Functionality:**
   - [ ] All navigation links load correct pages
   - [ ] All buttons trigger expected actions
   - [ ] Forms submit successfully
   - [ ] FAQs expand/collapse smoothly
   - [ ] Carousel drag works on touch
   - [ ] Videos play on all devices
   - [ ] Chatbot opens/closes properly
   - [ ] Hover effects work smoothly

4. **Visual:**
   - [ ] No layout shifts (CLS < 0.1)
   - [ ] All text readable (min 16px)
   - [ ] Colors meet WCAG AA contrast
   - [ ] Images load without distortion
   - [ ] Icons render properly

5. **Performance:**
   - [ ] Lighthouse score > 85
   - [ ] LCP < 2.5s
   - [ ] FID < 100ms
   - [ ] CLS < 0.1
   - [ ] Page size < 3MB

6. **Accessibility:**
   - [ ] Keyboard navigation works
   - [ ] Screen reader announces content
   - [ ] Focus visible on all elements
   - [ ] WCAG 2.1 AA compliance
   - [ ] Color not only distinguishing feature
   - [ ] Forms have proper labels

**Checklist Template:**
```markdown
## Testing Checklist

### Functionality
- [ ] Navbar hamburger menu opens/closes
- [ ] All hover effects work smoothly
- [ ] FAQ accordions function
- [ ] Chatbot responds
- [ ] Forms validate
- [ ] Carousel scrolls smoothly
- [ ] Videos play
- [ ] All links work
- [ ] No 404 errors

### Visual
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] No text overflow
- [ ] Images display correctly
- [ ] Colors match design

### Performance
- [ ] Lighthouse > 85
- [ ] No jank/stuttering
- [ ] Page loads < 3s
- [ ] Animations smooth (60fps)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus visible
- [ ] Screen reader friendly
- [ ] Color contrast WCAG AA
- [ ] Proper headings
```

**Expected Output:**
- Site works perfectly on all platforms
- Excellent performance scores
- Complete accessibility compliance
- Professional user experience

---

## IMPLEMENTATION PRIORITY & TIMELINE

### Phase 1: Critical (Week 1 - Do First)
1. **Navbar Fix** (Prompt 1) - HIGHEST PRIORITY
2. **Button/Link Hover States** (Prompt 2)
3. **FAQ Accordion System** (Prompt 3 & 6)
4. **Chatbot Implementation** (Prompt 4)

### Phase 2: Portfolio (Week 2)
5. **Video Carousel** (Prompt 5)
6. **Case Study Modals** (Prompt 8)

### Phase 3: Navigation & Forms (Week 2-3)
7. **Navigation System Fix** (Prompt 7)
8. **Contact Form** (Prompt 9)

### Phase 4: Polish & Optimize (Week 3-4)
9. **Button Standardization** (Prompt 10)
10. **Image Optimization** (Prompt 11)
11. **Comprehensive Testing** (Prompt 12)

---

## DESIGN SYSTEM REFERENCE

### Color Palette
- **Primary Ink:** #0e0e0e
- **Paper/Light:** #f5f2ec
- **Gold/Accent:** #c9a84c
- **Gold Light:** #e8c97a
- **Ash/Secondary:** #2a2a2a
- **Muted:** #6b6b6b

### Typography
- **Headlines:** Cormorant Garamond (serif), weights 300-400
- **Body/UI:** Syne (sans-serif), weights 400-800

### Spacing Scale
- 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 56px, 64px

### Breakpoints
- Mobile: max-width 480px
- Tablet: 481px - 768px
- Desktop: 769px+

### Animation Timing
- Quick: 150-200ms
- Standard: 300-400ms
- Smooth: 500-600ms

---

## DELIVERABLES CHECKLIST

**Critical (P0):**
- [ ] Navbar fully functional with smooth animations
- [ ] All hover/click effects working
- [ ] FAQ accordions working on all pages
- [ ] Chatbot responding and properly positioned

**High Priority (P1):**
- [ ] Video carousel integrated into portfolio
- [ ] Case study modals complete
- [ ] Service navigation working
- [ ] Portfolio filtering working

**Medium Priority (P2):**
- [ ] Contact form with validation
- [ ] Button standardization complete
- [ ] Image optimization complete
- [ ] All pages responsive

**Final (P3):**
- [ ] Comprehensive QA testing complete
- [ ] Lighthouse score > 85
- [ ] WCAG 2.1 AA compliance verified
- [ ] All cross-browser testing done

---

## NOTES FOR DEVELOPERS

### Important Files
- `assets/js/config.js` - Main configuration
- `assets/css/style.css` - Global styles
- `.env` - Environment variables (API keys)
- `assets/json/case-studies.json` - Data

### Git Workflow
1. Create feature branch: `git checkout -b feature/navbar-fix`
2. Make changes
3. Test thoroughly
4. Commit: `git commit -m "Fix: navbar hover states and hamburger animation"`
5. Push and create PR

### Testing Tools
- Lighthouse (DevTools)
- WAVE (accessibility)
- WebPageTest (performance)
- BrowserStack (cross-browser)

### Performance Targets
- Lighthouse: > 85
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

---

**Document Version:** 2.0  
**Status:** Ready for Implementation  
**Last Updated:** 2026-04-28  
**Author:** Creo Media Development Team

---

## QUICK START REFERENCE

**For Developers Implementing This:**

1. Start with **Prompt 1** (Navbar fix) - most critical
2. Then **Prompt 2** (Button/hover effects)
3. Then **Prompt 3** (FAQ accordions)
4. Then **Prompt 4** (Chatbot)
5. Continue through phases sequentially

**Testing After Each Prompt:**
- Open site in browser
- Test functionality
- Check console for errors
- Test on mobile (DevTools)
- Run Lighthouse audit

**Key Files to Watch:**
- `style.css` - All styling changes
- `config.js` - All JS changes
- HTML files - Markup updates
- `.env` - API keys (secure!)

---

**END OF MOAB ENHANCEMENT PROMPTS V2.0**

Compiled for: **Creo Media Website Enhancement Project**  
Reference: https://ronnj-b-kaheka.github.io/Creo-domain/index.html

