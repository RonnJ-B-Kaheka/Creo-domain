# CREOMEDIA WEBSITE - MOAB LEVEL ENHANCEMENT PROMPTS

**Status:** Critical UI/UX fixes + Feature Implementation  
**Scope:** Complete site overhaul (excluding Blog & Resource pages)  
**Reference URL:** https://ronnj-b-kaheka.github.io/Creo-domain/index.html  

---

## TABLE OF CONTENTS
1. [Critical Fixes](#critical-fixes)
2. [Portfolio Page Enhancement](#portfolio-page-enhancement)
3. [Navigation System](#navigation-system)
4. [FAQ Accordion Implementation](#faq-accordion-implementation)
5. [Chatbot Implementation](#chatbot-implementation)
6. [Global UI/UX Improvements](#global-uiux-improvements)
7. [Feature Restoration](#feature-restoration)

---

## CRITICAL FIXES

### PROMPT 1: Navbar & Navigation Stability Audit & Fix
**Objective:** Restore full navbar functionality, fix hamburger menu, correct hover/active states

**Details:**
- The navbar currently has broken hover effects and inconsistent active link styling
- Hamburger menu transitions are glitchy on mobile viewports
- Dropdown submenus (Services, Portfolio) are not responding to clicks/hovers properly
- Active page indicators are not updating when users navigate
- Submenu positioning is off-screen on smaller viewports

**Requirements:**
1. Audit current navbar CSS and JavaScript
2. Implement smooth hamburger animation (3-line to X transition)
3. Fix all dropdown functionality with proper event listeners (click + keyboard)
4. Create persistent visual indicator for current page in navbar
5. Ensure submenu items are fully visible and clickable on mobile (max-width: 768px)
6. Add smooth backdrop blur when hamburger menu is open
7. Fix z-index stacking context for navbar overlays
8. Implement proper focus states for keyboard navigation (a11y)
9. Test hover states with proper transition timing (300ms ease)
10. Ensure logo click returns to home and closes any open menus

**Expected Output:**
- Fully functional navbar with smooth animations
- Mobile hamburger menu that works without lag
- All dropdown menus accessible and properly positioned
- Clear visual feedback on active page
- Keyboard navigation support

---

### PROMPT 2: Global Hover & Click Effect Restoration
**Objective:** Fix broken hover states and click effects across the entire site

**Details:**
- Button hover effects are not scaling/transitioning smoothly
- Link colors aren't changing on hover (especially in footer and service cards)
- Card hover animations are too slow or not triggering
- Clicked state styling is not visible on CTAs
- Transition timing is inconsistent across elements

**Requirements:**
1. Establish global hover standard (scale: 1.05, opacity transitions)
2. Define consistent transition timing (250ms for interactions, 400ms for complex animations)
3. Fix all button states: default, hover, active, focus, disabled
4. Implement active/visited state for internal links
5. Add smooth color transitions for text links (from gold #c9a84c on hover)
6. Create hover animations for service cards (lift effect with shadow)
7. Fix case study card hover states (play button visibility, overlay opacity)
8. Implement ripple/wave effect on primary CTA buttons
9. Test cursor changes (pointer on clickables, grab on draggables)
10. Ensure accessibility: maintain visible focus indicators

**Expected Output:**
- Consistent, smooth hover effects on all interactive elements
- Clear visual feedback for all user interactions
- Proper focus states for keyboard users
- Performance-optimized transitions (no jank)

---

## PORTFOLIO PAGE ENHANCEMENT

### PROMPT 3: Integrate Video Carousel Component (Premium Priority)
**Objective:** Seamlessly integrate the provided video carousel into the Portfolio page with matching design

**Design Reference:** The provided HTML file contains a luxury carousel with:
- 320px × 520px cards with gradient backgrounds
- Featured strip indicator
- Play button overlay on hover
- Dynamic stats display
- Progress bars
- Navigation dots
- Bottom ticker scrolling effect

**Requirements:**
1. Replace the current "Video Showcase" section with the integrated carousel
2. Match the site's color scheme:
   - Ink: #0e0e0e (background)
   - Paper: #f5f2ec (text)
   - Gold: #c9a84c (accents)
   - Ash: #2a2a2a (secondary)
3. Adapt the carousel data to use real Creo Media case studies:
   - Tatekulu Barbershop (300% engagement, 50K+ views)
   - NCRST Digital Transformation (250% traffic, 85% satisfaction)
   - Drive-Through Movie Night (500+ attendees, 100% satisfaction)
   - Brand Identity - Arca Ventures equivalent
   - Digital Product - Meridian Health equivalent
   - E-Commerce - Sorel Studio equivalent
4. Implement drag-to-scroll with proper momentum scrolling
5. Add keyboard navigation (arrow keys to scroll, Enter to open case study)
6. Make carousel responsive (adjust card size on tablet: 280px, mobile: 240px)
7. Implement auto-play with pause on hover (cycle every 8 seconds)
8. Add loading states for video thumbnails
9. Integrate with existing "View Case Study" modal/lightbox
10. Ensure performance: use RequestAnimationFrame for smooth scrolling

**Video Integration:**
- Add placeholder video backgrounds for each case study card
- Implement Play icon overlay (appears on hover)
- Support MP4 + WebM formats for compatibility
- Auto-pause all videos when carousel scrolls

**Accessibility:**
- Add aria-labels to carousel cards
- Screen reader announcement for carousel position ("Card 1 of 6")
- Keyboard-only navigation support
- Captions for any video content

**Expected Output:**
- Fully functional, luxury carousel on portfolio page
- Smooth drag interaction and auto-scroll
- Professional hover animations with play button
- Responsive across all devices
- Integrated with site's data and design system

---

### PROMPT 4: Portfolio Page Case Study Modal Enhancement
**Objective:** Fix broken case study detail view and create proper modal experience

**Details:**
- Current "View Case Study" links don't navigate or open anything
- Modal HTML structure is incomplete (missing Challenge, Approach, Results sections)
- Images in modal are placeholder paths that don't load
- No close button or escape key handling
- Modal overlay opacity is too light

**Requirements:**
1. Create full modal component with all sections:
   - Hero image (full-width at top)
   - Case study title and client info
   - Challenge section with description
   - Approach/Solution section with detailed explanation
   - Results section with metrics and KPIs
   - Before/After visual comparison
   - Client testimonial quote
   - CTA button ("Start a Similar Project")
2. Implement modal animations:
   - Fade-in on open (300ms)
   - Slide-up content (400ms) with stagger effect
   - Blur backdrop with proper z-index
3. Add closing mechanisms:
   - Close button (X) in top-right
   - Click outside modal to close
   - Escape key to close
   - Back button in header
4. Replace all placeholder image paths with real URLs
5. Add scroll behavior: lock body scroll when modal open
6. Implement share buttons (LinkedIn, Twitter, WhatsApp) on case study
7. Add breadcrumb navigation showing case study progress (1 of 6)
8. Mobile optimization: full-height modal with top close button
9. Add loading state for images and video content
10. Implement keyboard focus trap (Tab cycles through modal elements only)

**Expected Output:**
- Fully functional case study detail modals
- Smooth, professional animations
- All data properly displayed and formatted
- Accessibility-compliant focus management
- Mobile-responsive design

---

## NAVIGATION SYSTEM

### PROMPT 5: Service Page Navigation Enhancement
**Objective:** Fix service page links and category filtering

**Details:**
- Service submenu links lead to /services/[category].html but pages don't exist or don't load
- Portfolio filter links (filter=content, filter=digital, filter=events) don't filter
- Navigation breadcrumbs don't update

**Requirements:**
1. Create /services/ subdirectory structure with proper pages:
   - content-production.html (4K Video, Photography, Motion Graphics)
   - digital-management.html (UI/UX Design, Social Media, Growth Marketing)
   - event-management.html (Brand Activations, Hybrid Events, Tech Production)
   - podcasting.html (Studio Production, Audio Post-Production, Distribution)
2. Each service page should have:
   - Hero section with service title and description
   - Process/methodology section (3-5 steps)
   - Case studies relevant to that service
   - Pricing tiers (Basic, Professional, Premium)
   - FAQ section specific to service
   - CTA button for consultation
3. Implement portfolio filtering:
   - Add JavaScript to detect ?filter= URL parameter
   - Show/hide portfolio items based on filter
   - Update active filter button styling
   - Maintain URL history with browser back button
4. Add breadcrumb navigation:
   - Home > Services > [Service Name]
   - Home > Portfolio > [Filter Type]
5. Implement active page detection in navbar
6. Add smooth page transitions (fade between sections)

**Expected Output:**
- All service pages fully functional and accessible
- Proper portfolio filtering by category
- Correct breadcrumb navigation
- Clean URL handling with query parameters

---

## FAQ ACCORDION IMPLEMENTATION

### PROMPT 6: FAQ Accordion Component - Full Implementation
**Objective:** Convert static FAQ text into fully functional accordion with smooth animations

**Current Issues:**
- FAQs on contact.html display all Q&A at once (no collapse)
- Click handlers are not attached to FAQ items
- No visual indication of expanded/collapsed state
- No smooth animations between states

**Requirements:**
1. Create reusable accordion component:
   ```html
   <div class="faq-item" data-index="0">
     <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-0">
       Question text here
       <span class="faq-icon">+</span>
     </button>
     <div class="faq-answer" id="faq-answer-0" hidden>
       Answer content here
     </div>
   </div>
   ```
2. Implement JavaScript functionality:
   - Click question to toggle expanded state
   - Only one FAQ item open at a time (accordion behavior)
   - Toggle aria-expanded attribute
   - Toggle hidden attribute on answer div
   - Add/remove "active" class on question button
3. CSS animations:
   - Answer slides down smoothly (max-height animation, 300ms)
   - Question background color changes on hover (gold tint)
   - Plus icon rotates 45° when expanded
   - Proper padding/margin during animation
4. Keyboard navigation:
   - Tab to navigate between questions
   - Enter/Space to toggle
   - Escape to close current (optional)
5. Mobile optimization:
   - Larger touch targets (min 44px height)
   - Simplified icon (easier to see on small screens)
6. Add multiple FAQ sections on different pages:
   - Contact page: General services FAQs (12 items)
   - About page: Company/culture FAQs (8 items)
   - Portfolio page: Project & process FAQs (6 items)
   - Individual service pages: Service-specific FAQs (5-7 items)
7. Implement "Frequently Asked" analytics:
   - Track which FAQs are opened most (localStorage)
   - Auto-reorder based on popularity
8. Add search functionality:
   - Input field to filter FAQs by keyword
   - Highlight matching text
   - Show count of matching items

**CSS Standards:**
- Use CSS custom properties for animations
- Ensure smooth transitions with ease-in-out timing
- Maintain gold (#c9a84c) accent color for active states
- Proper contrast for WCAG AA compliance

**Expected Output:**
- Fully functional accordion on all pages with FAQs
- Smooth animations and transitions
- Complete keyboard and screen reader support
- Search functionality working across FAQ databases
- Mobile-optimized with proper touch targets

---

## CHATBOT IMPLEMENTATION

### PROMPT 7: AI Chatbot Integration - Complete Implementation
**Objective:** Implement functional chatbot with proper positioning and response handling

**Current Issues:**
- Chatbot icon exists but chatbot is not responding
- Chatbot appears to be on one side; user wants it on the opposite side
- No proper message handling or conversation context

**Requirements:**
1. Chatbot positioning and layout:
   - Position on **right side** of page (opposite from current)
   - Fixed position, bottom-right corner with 24px padding
   - Z-index: 9999 (above all other elements)
   - On mobile (width < 768px): adjust to 16px padding, smaller dimensions
2. Visual design:
   - Match site's luxury aesthetic with gold accents
   - Floating chat bubble icon (60px × 60px)
   - Smooth hover scale effect (1.1x)
   - Smooth rotation on hover (5-10 degrees)
   - Chat window: 360px width × 600px height (responsive on mobile: full minus 20px)
   - Backdrop blur on message area
3. Chatbot window components:
   - Header with Creo Media branding
   - Close button (X) in top-right
   - Message history area (scrollable)
   - Input field at bottom with send button
   - Typing indicator when bot is responding
4. Conversation functionality:
   - Accept user messages and display in chat
   - Integrate with Claude API for intelligent responses
   - System prompt should position bot as Creo Media AI assistant
   - Maintain conversation history during session
   - Clear chat option in menu
5. Response handling:
   - Route questions about services to service pages
   - Route portfolio/case study questions to portfolio
   - Route contact questions to contact form
   - Provide quick replies for common questions
   - Include suggested follow-up questions
6. Features:
   - Persistent chat history (sessionStorage during visit)
   - Suggested quick replies (chips/buttons)
   - Rich message support (links, code blocks if needed)
   - Typing animation before responses
   - User avatar (initials) vs bot avatar (Creo logo)
   - Timestamp on messages
7. Mobile optimization:
   - Full-screen modal on mobile when opened
   - Simplified header
   - Touch-friendly send button
   - Better readability with adjusted font sizes
8. Accessibility:
   - aria-label on chat bubble
   - Proper heading in modal
   - Focus management (focus chat input on open)
   - Keyboard support (Enter to send, Escape to close)
   - Screen reader announcements for new messages
9. Performance:
   - Lazy load chatbot script
   - Debounce API calls
   - Cache common responses
   - Implement message rate limiting

**System Prompt for AI:**
```
You are a helpful AI assistant for Creo Media, a premium creative agency based in Windhoek, Namibia. 
You help visitors learn about our services (Content Production, Digital Management, Event Management, Podcasting),
view our portfolio, and get started with a project. Be professional but friendly, concise but informative.
Always suggest relevant pages or contact options when appropriate.
```

**Expected Output:**
- Fully functional chatbot on right side of all pages
- Proper message handling with Claude API integration
- Smooth animations and professional design
- Complete mobile responsiveness
- Full accessibility compliance
- Session-based message history

---

## GLOBAL UI/UX IMPROVEMENTS

### PROMPT 8: Button & CTA Standardization Across Site
**Objective:** Create consistent button system with proper states and animations

**Current Issues:**
- Buttons have inconsistent padding and font sizes
- No standard focus states for keyboard users
- Click animations are missing or inconsistent
- Disabled state is not properly styled

**Requirements:**
1. Define button hierarchy:
   - **Primary CTA:** Gold background (#c9a84c), white text
   - **Secondary:** Gold outline, gold text (#c9a84c)
   - **Tertiary:** Text-only with underline on hover
2. Button sizes:
   - Large: 56px height, 32px padding (full-width on mobile)
   - Medium: 48px height, 24px padding (default)
   - Small: 40px height, 16px padding
3. Button states:
   - Default: Base styling
   - Hover: Scale 1.05, shadow increase
   - Active/Clicked: Slight scale down (0.98), shadow decrease
   - Focus: Visible outline (3px gold, offset 2px)
   - Disabled: Opacity 0.5, cursor not-allowed
4. All state transitions:
   - Background color: 200ms ease
   - Transform: 150ms cubic-bezier(0.16, 1, 0.3, 1)
   - Box-shadow: 200ms ease
5. Text styling:
   - Font: Syne (sans-serif)
   - Weight: 700 (bold)
   - Letter-spacing: 0.1em
   - Text-transform: uppercase
6. Icon support:
   - Icons can appear before or after text
   - Proper spacing (8px gap)
   - Responsive sizing with text
7. Button groups:
   - Multiple buttons together use proper spacing (12px gap)
   - Stack vertically on mobile (full-width each)
8. Loading state:
   - Show spinner icon instead of text
   - Disable interaction during loading
   - Maintain button dimensions
9. Apply to all instances:
   - "View Our Work" / "Get Started" on homepage
   - "View Case Study" on portfolio
   - "Send Message" on contact
   - "Book Consultation" throughout
   - "View Full Portfolio" buttons
   - Service inquiry buttons

**Expected Output:**
- Standardized button component library
- Consistent styling across entire site
- Smooth, performant animations
- Full accessibility support

---

### PROMPT 9: Link State Improvements Site-Wide
**Objective:** Ensure all links have proper hover, focus, and visited states

**Requirements:**
1. Text link styling:
   - Color: #c9a84c (gold)
   - Decoration: underline (gold, 2px)
   - On hover: brightness increase, underline moves down 2px
   - On visited: darker gold (#a68835)
   - On focus: visible outline (same as buttons)
2. Navigation links:
   - Color: #f5f2ec (paper)
   - On hover: color change to gold (#c9a84c)
   - On active (current page): gold color + underline (3px, animated)
   - Transition: 200ms ease
3. Footer links:
   - Color: rgba(245, 242, 236, 0.7)
   - On hover: opacity 1, color gold
   - On focus: visible outline
4. CTA links (like "View Case Study"):
   - Style as buttons or arrow-based links
   - Consistent with button hover effects
5. Service card links:
   - Entire card should be clickable (expand click area)
   - Cursor: pointer
   - Hover: card lifts slightly, shadow increases
6. Portfolio item links:
   - Hover: image brightness increases, overlay appears with text
   - Click: opens modal or detail page
7. Breadcrumb links:
   - Color: gold
   - Separator text (> or /) in muted color
   - Hover: underline appears
   - Current page: no link styling, bold

**Expected Output:**
- Consistent link styling across site
- Clear visual feedback for all link interactions
- Proper accessibility with focus states
- Better user experience and navigation clarity

---

### PROMPT 10: Performance & Animation Optimization
**Objective:** Ensure all animations are smooth and performant (60fps)

**Requirements:**
1. Audit all animations for jank/stuttering
2. Use transform and opacity for animations (GPU-accelerated)
3. Avoid animating: width, height, left, right, margin, padding
4. Use will-change sparingly and remove after animation
5. Set consistent animation timing:
   - Hover interactions: 250ms
   - Page transitions: 400-600ms
   - Carousel slides: 300-500ms
   - Modal opens: 300ms
6. Use appropriate easing functions:
   - cubic-bezier(0.16, 1, 0.3, 1) for delight/interaction
   - ease-in-out for smooth transitions
   - ease-out for entrance animations
7. Implement requestAnimationFrame for scroll/drag animations
8. Add loading states with spinners (CSS-based, not images)
9. Lazy-load images with placeholder blur effect
10. Test on low-end devices (throttle CPU 4x in DevTools)
11. Preload critical images and fonts
12. Use CSS containment for complex layouts

**Expected Output:**
- All animations running at 60fps
- No stuttering or lag on interactions
- Proper performance on mobile devices
- Optimized rendering performance

---

## FEATURE RESTORATION

### PROMPT 11: Case Study Data Population & Dynamic Content
**Objective:** Populate all case studies with real Creo Media data instead of placeholders

**Current Issues:**
- Case study cards show placeholder Arca Ventures, Meridian Health, etc. data
- Actual Creo Media clients (Tatekulu, NCRST, Music Festival) not properly featured
- Stats and metrics are placeholder numbers

**Requirements:**
1. Create case study data structure (JSON):
   ```json
   {
     "case_studies": [
       {
         "id": 1,
         "client": "Tatekulu Barbershop",
         "title": "From Local Barbershop to Social Media Sensation",
         "category": "Content Production",
         "tagline": "300% engagement increase with viral content strategy",
         "description": "Transformed a local barbershop into a viral sensation through authentic content strategy and consistent social media presence.",
         "featured": true,
         "image": "/assets/case-studies/tatekulu-1.jpg",
         "video": "/assets/videos/tatekulu-showcase.mp4",
         "gradient": "linear-gradient(135deg, #1a1209 0%, #3d2810 40%, #1f1208 100%)",
         "challenge": "Low brand awareness, limited social presence, competing with larger franchises",
         "approach": "Created authentic brand narrative, produced weekly video content, implemented consistent brand messaging",
         "results": {
           "engagement": { "value": "300%", "label": "Engagement Increase" },
           "reach": { "value": "50K+", "label": "Video Views" },
           "customers": { "value": "45%", "label": "New Customer Growth" },
           "content": { "value": "12", "label": "Content Pieces" }
         },
         "testimonial": {
           "text": "Creo Media transformed our brand presence completely. Their creative approach and attention to detail delivered results beyond expectations.",
           "author": "Tatekulu Owner",
           "role": "Barbershop Owner"
         }
       },
       // Similar structure for NCRST, Music Festival, etc.
     ]
   }
   ```
2. Update carousel component to pull from this data
3. Populate case study modal with complete information
4. Add before/after section (if available)
5. Include client testimonial with avatar/initials
6. Add CTA with project type (e.g., "Start a Content Production Project")
7. Implement case study filtering by category
8. Add related case studies section at bottom
9. Implement case study sharing (LinkedIn, Twitter, WhatsApp)
10. Add view count and engagement metrics

**Expected Output:**
- All case studies populated with real Creo Media data
- Dynamic content population from JSON data source
- Proper filtering and categorization
- Professional presentation of client results

---

### PROMPT 12: Service Page Dynamic Content & Integration
**Objective:** Create dynamic service pages with proper content and CTAs

**Requirements:**
1. Each service page must include:
   - Hero section with service description
   - "What We Deliver" section (3-5 key deliverables)
   - Process/methodology section (step-by-step visual guide)
   - Related case studies carousel (2-4 cases)
   - Pricing tiers (if applicable):
     - Starter: min-cost option with key features
     - Professional: mid-tier recommended option
     - Premium: all-inclusive white-glove service
   - FAQ section (5-7 service-specific questions)
   - Client testimonials relevant to service
   - CTA: "Get a Quote" or "Book Consultation"
2. Content structure:
   - Content Production: specs, turnaround times, equipment list
   - Digital Management: services, reporting, support tiers
   - Event Management: event types, capacity, capabilities
   - Podcasting: studio specs, distribution options, package types
3. Dynamic links:
   - Case studies link to detailed modal
   - FAQ items expand/collapse with smooth animation
   - Testimonials carousel
4. Mobile optimization:
   - Stack content vertically
   - Simplify pricing tables to cards
   - Full-width CTAs
5. Performance:
   - Lazy-load images
   - Optimize video for web

**Expected Output:**
- Complete, functional service pages
- Dynamic content from data source
- Professional presentation
- Clear conversion paths

---

### PROMPT 13: Contact Form Enhancement & Validation
**Objective:** Fix and enhance contact form with proper validation and feedback

**Current Issues:**
- Form likely has no validation
- No visual feedback on submission
- No success/error messages

**Requirements:**
1. Form fields to include:
   - Name (required, min 2 chars)
   - Email (required, valid email format)
   - Company (optional)
   - Service type (required, dropdown with options)
   - Project timeline (required, radio buttons)
   - Budget range (optional, dropdown)
   - Message/Details (required, min 20 chars, max 2000)
   - Files attachment (optional, max 3 files, max 10MB each)
2. Validation:
   - Real-time validation on blur
   - Show error messages inline
   - Disable submit until all required fields valid
   - Highlight invalid fields with red border
   - Clear errors when user corrects
3. Feedback states:
   - Default: normal styling
   - Focused: gold border, shadow
   - Valid: green checkmark indicator
   - Invalid: red border, error text below
   - Submitting: submit button shows spinner, disabled
4. Success handling:
   - Show success message with checkmark
   - Clear form fields
   - Show next steps (e.g., "We'll contact you within 24 hours")
   - Option to send another message
5. Error handling:
   - Show error message if submission fails
   - Preserve form data on error
   - Suggest retry or contact alternative
6. Integration:
   - Send to email: contact.creomedia@gmail.com
   - Save to database/sheet (if available)
   - Auto-reply email to user
7. Mobile optimization:
   - Larger input areas
   - Better keyboard handling
   - Full-width fields
   - Bottom-fixed submit button on long forms

**Expected Output:**
- Fully functional contact form
- Proper validation and error handling
- Good user feedback and experience
- Accessible and mobile-optimized

---

### PROMPT 14: Image & Media Optimization Across Site
**Objective:** Ensure all images load properly and are optimized

**Issues:**
- Some images may be loading slowly
- Different image sizes needed for responsive design
- Media content needs proper lazy-loading

**Requirements:**
1. Image optimization:
   - Use WebP format with JPEG fallback
   - Create responsive images (srcset for 1x, 2x, 3x)
   - Proper aspect ratios maintained (no distortion)
   - Lazy-load images below fold
   - Blur-up placeholder while loading
2. Image sizes:
   - Hero: 1920 × 1080 (mobile: 1080 × 720)
   - Service icons: 64 × 64, 128 × 128
   - Case study cards: 320 × 520
   - Portfolio grid: 400 × 300
   - Partner logos: 200 × 100
   - Testimonial avatars: 64 × 64
3. Video optimization:
   - Provide MP4 + WebM formats
   - Add poster image (first frame)
   - Autoplay only with muted attribute
   - Provide playback controls
   - Mobile: reduce bitrate for faster loading
4. Implement:
   - Native lazy-loading (loading="lazy")
   - Intersection Observer for custom lazy-load
   - Image CDN caching if possible
   - Proper alt text on all images
   - Srcset for responsive images
5. Analytics:
   - Track image load times
   - Monitor Core Web Vitals impact
   - Optimize based on performance data

**Expected Output:**
- All images properly optimized
- Fast loading across devices
- Proper responsive image handling
- Better Core Web Vitals scores

---

## TESTING & QUALITY ASSURANCE

### PROMPT 15: Cross-Browser & Device Testing Checklist
**Objective:** Ensure site works perfectly on all platforms

**Test Coverage Required:**
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

3. **Functionality Tests:**
   - All navigation links load correct pages
   - All buttons trigger expected actions
   - Forms submit successfully
   - FAQs expand/collapse smoothly
   - Carousel drag works on touch devices
   - Videos play on all devices
   - Chatbot opens/closes properly

4. **Visual Tests:**
   - No layout shifts (CLS < 0.1)
   - All text is readable (min 16px)
   - Colors meet WCAG AA contrast requirements
   - Images load without distortion
   - Icons render properly on all sizes

5. **Performance Tests:**
   - Lighthouse score > 85
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1
   - Page size < 3MB

6. **Accessibility Tests:**
   - Keyboard navigation works (Tab through all elements)
   - Screen reader announces content properly
   - Focus visible on all interactive elements
   - Color not only distinguishing feature
   - Forms have proper labels
   - WCAG 2.1 Level AA compliance

7. **SEO Tests:**
   - Meta descriptions on all pages
   - Title tags descriptive and unique
   - H1-H6 hierarchy proper
   - Images have alt text
   - Structured data (Schema.org)
   - Mobile viewport meta tag

**Expected Output:**
- Full compatibility across all tested platforms
- Excellent performance scores
- Complete accessibility compliance
- Better search engine visibility

---

## IMPLEMENTATION PRIORITY MATRIX

### Phase 1: Critical (Week 1-2)
1. **Navbar & Navigation Fix** (Prompt 1) - Highest Priority
2. **Hover & Click Effects** (Prompt 2)
3. **FAQ Accordion** (Prompt 6)
4. **Contact Form** (Prompt 13)

### Phase 2: Core Enhancement (Week 3-4)
5. **Portfolio Carousel Integration** (Prompt 3) - Highest Priority
6. **Portfolio Modal** (Prompt 4)
7. **Service Pages** (Prompt 5)
8. **Button Standardization** (Prompt 8)

### Phase 3: Polish & Optimization (Week 5-6)
9. **Chatbot Implementation** (Prompt 7)
10. **Link States** (Prompt 9)
11. **Animation Optimization** (Prompt 10)
12. **Case Study Data** (Prompt 11)
13. **Dynamic Content** (Prompt 12)
14. **Image Optimization** (Prompt 14)
15. **Testing & QA** (Prompt 15)

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
- **Headlines:** Cormorant Garamond (serif), weights 300-400, italic
- **Body/UI:** Syne (sans-serif), weights 400-800

### Spacing Scale
- 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 40px, 48px, 56px, 64px

### Responsive Breakpoints
- Mobile: max-width 480px
- Tablet: 481px - 768px
- Desktop: 769px - 1200px
- Large Desktop: 1201px+

### Animation Timing
- Quick: 150-200ms (hover, click feedback)
- Standard: 300-400ms (transitions, modals)
- Smooth: 500-600ms (page transitions, complex animations)

### Easing Functions
- Interaction: cubic-bezier(0.16, 1, 0.3, 1)
- Smooth: ease-in-out
- Quick: ease-out

---

## DELIVERABLES CHECKLIST

- [ ] Fully functional navbar with proper mobile menu
- [ ] All hover and click effects working smoothly
- [ ] Video carousel integrated into portfolio page
- [ ] Case study modal with complete information
- [ ] Service pages with content and CTAs
- [ ] FAQ accordions on all relevant pages
- [ ] Functional AI chatbot on all pages
- [ ] Standardized button system
- [ ] Proper link states throughout
- [ ] Optimized animations at 60fps
- [ ] Case studies populated with real data
- [ ] Enhanced contact form with validation
- [ ] Optimized images and media
- [ ] Cross-browser and device compatibility
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Lighthouse score > 85

---

**END OF MOAB PROMPTS DOCUMENT**

---

## NOTES FOR IMPLEMENTATION TEAMS

### Important Considerations:
1. **Version Control:** Use GitHub/GitLab with feature branches
2. **Testing:** Implement after each prompt completion
3. **Documentation:** Update README with changes
4. **Backup:** Keep original files before major updates
5. **Timeline:** Estimate 2-4 weeks for complete implementation
6. **Budget:** Consider if any services require API keys (Claude for chatbot, image CDN, etc.)

### Resource Requirements:
- 1-2 Full-stack developers
- 1 QA/Testing specialist
- 1 Designer for review (optional)
- Performance monitoring tools (Lighthouse, WebPageTest)

### Success Metrics:
- Lighthouse score improvement (current baseline → > 85)
- User interaction engagement (chatbot, carousels)
- Form submission rate increase
- Reduced bounce rate
- Improved mobile conversion rate

---

**Document Version:** 1.0  
**Last Updated:** April 27, 2026  
**Status:** Ready for Implementation
