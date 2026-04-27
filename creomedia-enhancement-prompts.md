# CREO MEDIA WEBSITE — MOAB-LEVEL UPGRADE PROMPTS
**Method of Action Based Development Framework**

---

## EXECUTIVE SUMMARY

This document contains 18 strategic, action-based prompts designed to systematically fix, enhance, and upgrade the Creo Media website (https://ronnj-b-kaheka.github.io/Creo-domain/). Each prompt is structured to address specific technical debt, missing features, UI/UX compromises, and functional failures across the platform.

**Scope**: Homepage, Services, About, Portfolio, Contact pages  
**Excluded**: Blog page, Resource page  
**Priority**: Critical fixes first → Enhancement features → UI/UX polish

---

## SECTION 1: CRITICAL FIXES — NAVBAR & NAVIGATION

### PROMPT 1: Audit & Rebuild Navbar Responsive Behavior
**Objective**: Fix navbar collapse/expand functionality and ensure consistent styling across all screen sizes.

**Action Brief**:
- Inspect current navbar implementation across all pages (index.html, service.html, about.html, portfolio.html, contact.html)
- Identify broken states: mobile menu not opening/closing, hamburger icon not functioning, navbar overlap with content
- Rebuild navbar with:
  - Working hamburger toggle (mobile <768px)
  - Smooth slide-in/slide-out animation for mobile menu
  - Proper z-index layering (navbar above all content, below modals)
  - Consistent padding/margin on all pages
  - Active state indicator for current page link
  - Clear visual distinction between mobile and desktop states
- Verify: Test on iPhone 12, iPad, desktop 1920px, tablet 768px

**Deliverables**:
- Updated navbar CSS (animations, responsive breakpoints)
- Updated navbar HTML structure (semantic markup, aria labels)
- Mobile menu toggle JavaScript (state management)
- Visual confirmation on 4+ device sizes

---

### PROMPT 2: Fix Navbar Link Hover States & Visual Feedback
**Objective**: Restore hover effects on navigation links to professional standards and ensure consistent interaction feedback.

**Action Brief**:
- Current issue: Hover effects are broken, links don't provide visual feedback
- Implement hover states:
  - Underline animation (gold color #c9a84c) that expands from center
  - Color transition to gold for 0.3s ease
  - Text weight change (400 to 600) on hover
  - Add subtle shadow beneath text on hover (0 2px 8px rgba(201,168,76,0.2))
- Add active state styling:
  - Permanent underline for current page link
  - Gold color (#c9a84c) for active link text
  - Distinguishable from hover state (more opaque, always visible)
- Apply same hover pattern to:
  - Main navigation links
  - Footer links
  - Breadcrumb navigation
  - CTA buttons throughout site

**Deliverables**:
- Hover state CSS with smooth transitions
- Active state markers on all navigation instances
- Tested on Chrome, Firefox, Safari (ensure no browser-specific issues)

---

### PROMPT 3: Implement Sticky Navbar with Scroll Behavior
**Objective**: Create sticky navbar that remains accessible while scrolling, with smart show/hide on scroll direction.

**Action Brief**:
- Make navbar sticky on scroll (position: sticky with fallback to fixed)
- Implement scroll direction detection:
  - Hide navbar on scroll down (smooth 0.3s transition)
  - Show navbar on scroll up
  - Keep navbar visible when user hovers over it
- Add subtle backdrop blur effect (blur(8px)) with semi-transparent background when scrolling
- Maintain shadow depth: box-shadow: 0 2px 16px rgba(0,0,0,0.3)
- Ensure navbar doesn't overlap hero images or critical content

**Deliverables**:
- JavaScript scroll listener with direction detection
- CSS transition animations for hide/show
- Tested scrolling behavior on long pages (About, Portfolio)

---

## SECTION 2: CRITICAL FIXES — FAQ DROPDOWNS

### PROMPT 4: Audit & Fix FAQ Accordion Functionality Site-Wide
**Objective**: Identify and repair all non-functioning FAQ accordion/dropdown components across the website.

**Action Brief**:
- Scan all pages for accordion/dropdown components:
  - Service page FAQs (service.html)
  - About page FAQs (about.html)
  - Contact page FAQs (contact.html)
  - Any hidden FAQ sections
- Current problem: Dropdowns don't open/close, clicking doesn't trigger state change
- Audit checklist:
  - Are JavaScript event listeners attached? Check console for errors
  - Is `<details>/<summary>` HTML used, or custom divs? (details/summary is native, preferred)
  - Are CSS classes toggling properly on click?
  - Is z-index preventing clicks? (check parent overflow: hidden)
- Implement robust FAQ system:
  - Use semantic `<details>` and `<summary>` tags (no JS required for basic functionality)
  - OR: Custom div structure with click event listener + CSS state class toggle
  - Add smooth height animation on open/close (max-height 0 → auto with transition)
  - Prevent multiple open at once (optional, depends on UX design)
  - Keyboard accessibility (Tab to focus, Enter/Space to toggle)

**Deliverables**:
- FAQ HTML audit report (pages, count, current implementation)
- Updated FAQ markup with working structure
- JavaScript for FAQ toggle (if not using native details element)
- CSS animations for expand/collapse (0.4s ease)
- Accessibility compliance check (keyboard navigation works)

---

### PROMPT 5: Design & Style FAQ Component for Creo Brand
**Objective**: Ensure all FAQ dropdowns match Creo Media's gold/ash/paper design system.

**Action Brief**:
- Apply Creo color palette to FAQs:
  - Background: #f5f2ec (paper) for closed state
  - Border: #c9a84c (gold) 1px solid when focused/open
  - Text (closed): #0e0e0e (ink)
  - Text (open): #c9a84c (gold) for question, #6b6b6b (muted) for answer
  - Hover background: #e8c97a (gold-light) with 0.1 opacity overlay
- Typography:
  - Question (summary): Syne 700, 16px, line-height 1.3
  - Answer (details): Syne 400, 14px, line-height 1.6, with max-width 500px
- Icons:
  - Chevron icon (rotate 0° → 180° on open)
  - Icon color: #c9a84c
  - Icon size: 20px, right-aligned
- Spacing:
  - Padding: 16px 20px on question
  - Padding: 0 20px 20px on answer (revealed on open)
  - Margin-bottom: 12px between each FAQ item
  - Container max-width: 600px

**Deliverables**:
- FAQ component CSS (fully styled, matches brand)
- Icon animations (chevron rotation, smooth 0.3s)
- Component screenshot showing open/closed states

---

## SECTION 3: CRITICAL FIXES — CHATBOT

### PROMPT 6: Debug & Fix Chatbot Response System
**Objective**: Repair chatbot that is not responding correctly to user input. Ensure all conversation flows work.

**Action Brief**:
- Identify chatbot implementation:
  - Is it embedded iframe from third-party service (Drift, Intercom, etc.)?
  - Is it custom JavaScript code?
  - Where is chatbot initialized? (head? body? footer?)
- Debug non-response issues:
  - Check browser console for JavaScript errors
  - Verify API endpoint/webhook is accessible (test with curl/Postman)
  - Is API key/token valid? (check environment variables, config file)
  - Are message payloads formatted correctly? (JSON structure match API spec)
  - Is CORS enabled on backend? (check response headers)
  - Is chatbot message history being stored? (localStorage, backend DB)
- Implement response fixes:
  - Add error handling: if API fails, show "Sorry, I'm having trouble connecting. Try again in a moment."
  - Add request timeout: 5000ms max wait before showing error
  - Log all messages to console in dev mode (console.log with timestamp)
  - Verify chatbot sends: user message, timestamp, conversation ID, page URL
  - Verify chatbot receives: bot response text, suggested replies (if applicable), typing indicator

**Deliverables**:
- Chatbot debugging report (current implementation, errors found)
- Fixed API integration code
- Error handling + fallback messages
- Console logs showing successful message flow

---

### PROMPT 7: Reposition Chatbot Icon to Opposite Side
**Objective**: Move chatbot icon/button from current position to opposite side of page while maintaining same vertical alignment.

**Action Brief**:
- Current state: Chatbot icon on right side (likely position: fixed, right: 24px, bottom: 24px)
- Move to left side:
  - Change `right: 24px` to `left: 24px`
  - Maintain `bottom: 24px` (same vertical position)
- Ensure repositioning doesn't break:
  - Click functionality
  - Visibility on all screen sizes
  - Z-index layering (should be above all content except modals)
  - Animation/entrance effect still works
- Add considerations:
  - On mobile (<768px), position should adapt if needed
  - Test that chatbot window opens correctly from left position
  - Verify left position doesn't obscure important left-side content
  - Check that footer/contact info not hidden by chatbot position

**Deliverables**:
- Updated chatbot CSS (left instead of right)
- Visual confirmation on desktop, tablet, mobile
- Screenshot showing new position from multiple viewports

---

### PROMPT 8: Style Chatbot to Match Creo Brand Identity
**Objective**: Ensure chatbot widget, window, and message bubbles align with Creo's gold/ash/paper aesthetic.

**Action Brief**:
- Chatbot icon/button styling:
  - Background: #c9a84c (gold) with gradient to #e8c97a (gold-light)
  - Icon color: #0e0e0e (ink) or white for contrast
  - Size: 56px × 56px (standard floating button size)
  - Border-radius: 50% for circular, or 8px for rounded square
  - Shadow: 0 4px 16px rgba(0,0,0,0.25)
  - Hover: scale(1.1), shadow increase to 0 8px 24px rgba(0,0,0,0.3)
  - Active/open state: different color or pulse animation
- Chatbot window styling:
  - Header background: #0e0e0e (ink)
  - Header text: #f5f2ec (paper)
  - Message bubbles (user): #c9a84c (gold) background, #0e0e0e text
  - Message bubbles (bot): #f5f2ec (paper) background, #0e0e0e text, 1px gold border
  - Input field: white background, #0e0e0e border, placeholder #6b6b6b (muted)
  - Send button: #c9a84c (gold) background, white text, hover: #e8c97a
- Typography:
  - Font: Syne (match site), 14px base
  - Line height: 1.5
- Animation:
  - Window entrance: slide-up from bottom-left with 0.3s ease
  - Button pulse on first visit (optional subtle animation)

**Deliverables**:
- Chatbot theme CSS (colors, typography, sizing)
- Screenshot of styled chatbot (open and closed states)
- Animation transitions defined

---

## SECTION 4: PORTFOLIO PAGE — VIDEO CAROUSEL INTEGRATION

### PROMPT 9: Integrate Vertical Video Carousel into Portfolio Page
**Objective**: Seamlessly embed the provided vertical video carousel component (vertical_video_carousel_case_studies__1_.html) into the portfolio.html page while maintaining design consistency.

**Action Brief**:
- Review provided carousel component:
  - 6 case study cards with metadata (client, title, description, stats)
  - Horizontal scroll with drag support
  - Dot navigation (page indicators)
  - Scroll hint ("Drag to explore")
  - Gold (#c9a84c) accent color matching Creo brand
- Integration steps:
  1. Extract carousel CSS from provided HTML → add to portfolio.html `<style>` or external stylesheet
  2. Extract carousel HTML structure → insert into portfolio page (likely after "Featured Work" section, before or replacing current case studies section)
  3. Extract carousel JavaScript → add to portfolio.html `<script>` or external JS file
  4. Update carousel data:
     - Replace placeholder case studies with actual Creo Media projects
     - Ensure client names, titles, descriptions, stats align with portfolio content
     - Add real images/gradients for each card (current: gradient backgrounds)
  5. Modify carousel for Creo projects:
     - Card 1: Tatekulu Barbershop (Content Production)
     - Card 2: NCRST (Digital Management)
     - Card 3: Drive-Through Movie Night (Event Management)
     - Cards 4-6: Additional case studies or placeholder for future work
  6. Test integration:
     - Carousel scrolls horizontally on desktop
     - Drag functionality works with mouse
     - Dot navigation updates as user scrolls
     - Responsive on tablet/mobile (may need to adjust card width for small screens)

**Deliverables**:
- Portfolio.html with fully integrated carousel
- Updated carousel data with Creo project information
- Responsive CSS adjustments for mobile (if needed)
- Testing confirmation: scroll, drag, dot navigation all functional

---

### PROMPT 10: Customize Carousel Colors & Typography for Portfolio Consistency
**Objective**: Ensure carousel visuals match portfolio page and overall site design language.

**Action Brief**:
- Color palette alignment:
  - Background: #0e0e0e (ink) — matches portfolio dark theme
  - Gold accents: #c9a84c (current gold) — already correct
  - Text: #f5f2ec (paper) — already correct
  - Borders/dividers: Adjust to match page divider lines (use rgba(245,242,236,0.12))
- Typography consistency:
  - Page label: Syne 700, 10px, uppercase, letter-spacing 0.25em — OK
  - Section title: Cormorant Garamond 48px, 300 italic — OK
  - Card titles (case-card .card-title): Cormorant Garamond 26px, 300 — OK
  - Card descriptions: Syne 400, 12px — OK
- Design refinements:
  - Hover scale effect (1.015) feels subtle — good, keep it
  - Border radius (4px) consistent with site buttons
  - Gradient overlays on cards: ensure readability of text (current gradient looks good)
  - Play icon on hover: verify it's visible and meaningful (for video cards if applicable)
- Spacing adjustments:
  - Carousel padding: 0 32px 32px — matches portfolio padding
  - Card gap: 16px — adequate spacing
  - Nav dots padding: 0 32px 20px — align with other sections

**Deliverables**:
- Carousel CSS with finalized colors/typography
- Visual before/after comparison
- Readability audit (text on gradient backgrounds, sufficient contrast)

---

### PROMPT 11: Add Video Play Functionality to Carousel Cards
**Objective**: Enable video playback from carousel cards (currently shows play icon on hover but doesn't link to video).

**Action Brief**:
- Current carousel has play icon (`.card-video-play`) that appears on hover
- Desired functionality:
  - Click on card → open video in modal/lightbox
  - Modal shows full-screen or large video player
  - Modal has close button (X) in top-right
  - Video controls: play/pause, volume, fullscreen, progress bar
- Implementation:
  1. Add data-video-url attribute to each case card:
     ```html
     <div class="case-card" data-index="0" data-video-url="URL_TO_VIDEO">
     ```
  2. Create modal HTML structure (hidden by default):
     ```html
     <div id="videoModal" class="video-modal hidden">
       <div class="video-modal-content">
         <button class="modal-close">&times;</button>
         <video id="modalVideo" controls width="100%" height="auto">
           <source src="" type="video/mp4">
         </video>
       </div>
     </div>
     ```
  3. Add JavaScript to:
     - Listen for card clicks
     - Get video URL from data attribute
     - Populate modal video src
     - Show modal (fade in, z-index 1000)
     - Close modal on X button or outside click
     - Pause video when modal closes
  4. Style modal:
     - Background: rgba(0,0,0,0.9) (darker overlay)
     - Center video on screen
     - Modal max-width: 900px
     - Responsive: 100% on mobile
     - Close button: positioned absolute top-right, size 40px, color gold

**Deliverables**:
- Updated carousel HTML with data-video-url attributes
- Modal HTML + CSS
- JavaScript video player logic
- Working demo with test video link

---

## SECTION 5: FEATURE FIXES — GENERAL SITE-WIDE

### PROMPT 12: Audit & Fix All CTA Button Functionality
**Objective**: Ensure all Call-to-Action buttons across the site are functional and navigate correctly.

**Action Brief**:
- Identify all CTA buttons:
  - "View Our Work" (homepage → portfolio page)
  - "Get Started" (homepage → contact page)
  - "Let's Talk 👋" (navbar → contact page)
  - "View Case Study" (carousel cards → individual case study or modal)
  - "Start Similar Project" (portfolio case studies → contact page)
  - "Contact us" (footer → contact page)
- Check each button:
  - Does link href point to correct page?
  - Are external links opening in new tab (_blank)?
  - Do buttons have proper hover states (scale, color change)?
  - Are buttons keyboard-accessible (Tab focus, Enter activates)?
  - Do disabled buttons (if any) have visual indicator?
- Fix broken links:
  - Test all href paths (relative paths for GitHub Pages: /Creo-domain/index.html)
  - Ensure contact form page is accessible
  - Verify portfolio page loads case study modal correctly
- Enhance button styling:
  - Hover state: scale 1.05 + shadow increase
  - Active state: darker color or shadow inset
  - Focus state (keyboard): visible outline (gold border)
  - Disabled state (if applicable): opacity 0.5, cursor not-allowed

**Deliverables**:
- CTA button audit report (all buttons, destinations, current state)
- Fixed HTML with corrected hrefs
- Updated CSS with hover/focus/active states
- Testing checklist confirmation

---

### PROMPT 13: Fix Contact Form Submission & Validation
**Objective**: Ensure contact form works end-to-end, validates input, and submits successfully.

**Action Brief**:
- Audit contact form (contact.html):
  - Does form have action attribute pointing to backend/handler? (e.g., Formspree, Netlify Forms, custom API)
  - Are form fields present: name, email, phone (optional), message, subject?
  - Is submit button functional and labeled clearly?
  - Current issues: form likely not submitting or showing errors
- Implement form validation:
  - Required fields: name, email, message
  - Email format validation (regex or HTML5 type="email")
  - Min length: name 2 chars, message 10 chars
  - Show validation errors inline (below field, red text, Syne 12px)
  - Clear errors on focus
- Submission flow:
  - On submit, disable button + show loading spinner
  - If success: show confirmation message ("Thanks for reaching out! We'll respond within 24 hours.")
  - If error: show error message ("Something went wrong. Please try again or email us directly.")
  - Form options:
    - Use Formspree.io (free, no backend needed) — send to contact.creomedia@gmail.com
    - Use Netlify Forms (if deployed on Netlify)
    - Implement custom backend API (Node.js + SendGrid or similar)
- Style form to match brand:
  - Input fields: white background, #0e0e0e border, placeholder #6b6b6b
  - Label text: Syne 400, 14px
  - Submit button: gold (#c9a84c) background, white text, hover effect

**Deliverables**:
- Working contact form with validation
- Backend integration (Formspree, Netlify, or custom API)
- Success/error message handling
- Confirmation screenshot showing submitted form

---

### PROMPT 14: Implement Smooth Page Scroll & Anchor Navigation
**Objective**: Add smooth scrolling behavior for anchor links and improve navigation to page sections.

**Action Brief**:
- Smooth scroll on anchor clicks:
  - When user clicks "Skip to main content" or section links, page should scroll smoothly (not jump)
  - CSS solution: html { scroll-behavior: smooth; } — add this to main stylesheet
  - Test on all browsers (fallback for older browsers will be instant scroll)
- Page navigation improvements:
  - Add anchor links to main sections on pages:
    - Homepage: #hero, #about, #services, #clients, #testimonials
    - About page: #mission, #vision, #team, #values
    - Portfolio page: #all-works, #featured-work, #case-studies
    - Service page: #services, #faq
  - Add "Back to Top" button (sticky, bottom-right, appears after scrolling 500px):
    - Position: fixed, right: 24px, bottom: 80px (above chatbot if chatbot present)
    - Size: 48px × 48px circle
    - Icon: up arrow, color gold
    - Hover: scale 1.1, shadow increase
    - Click: scroll to top with smooth behavior
  - Update navbar links to use anchor navigation where applicable

**Deliverables**:
- Updated HTML with anchor IDs on key sections
- Global CSS: scroll-behavior: smooth
- "Back to Top" button HTML + CSS + JavaScript
- Testing on different page lengths

---

## SECTION 6: UI/UX IMPROVEMENTS — DESIGN SYSTEM CONSISTENCY

### PROMPT 15: Audit & Standardize Button Styles Site-Wide
**Objective**: Ensure all buttons across the site use consistent styling and visual hierarchy.

**Action Brief**:
- Button audit:
  - Primary buttons (main CTAs): gold background, white text, size 16px, padding 12px 32px
  - Secondary buttons (less important): white background, gold text, size 14px, padding 10px 24px
  - Tertiary buttons (links styled as buttons): text-only, gold underline on hover
  - Button grouping: if multiple buttons together, use consistent spacing (gap: 16px)
- Standardize button properties:
  - Font: Syne 600, line-height 1.2
  - Border-radius: 4px (matches card borders)
  - Cursor: pointer
  - Transition: all 0.3s ease
  - States:
    - Default: as described above
    - Hover: scale(1.05), shadow: 0 4px 16px rgba(201,168,76,0.3)
    - Active: background darker by 10%, no scale
    - Disabled: opacity 0.5, cursor not-allowed
    - Focus (keyboard): outline 2px solid gold, offset 2px
- Apply to all buttons:
  - CTA buttons (homepage, portfolio, contact)
  - Form submit buttons (contact form)
  - Modal buttons (close, confirm, cancel)
  - Navigation buttons (next/prev in carousel)
- Document button system in CSS comments for future consistency

**Deliverables**:
- Standardized button CSS (primary, secondary, tertiary variants)
- Global button class definitions (.btn, .btn-primary, .btn-secondary, etc.)
- Screenshot showing all button states
- Component library reference

---

### PROMPT 16: Fix Image Responsive Scaling & Lazy Loading
**Objective**: Ensure images load efficiently, scale responsively, and don't cause layout shift.

**Action Brief**:
- Image audit across all pages:
  - Identify all images: hero banners, portfolio cards, partner logos, case study images
  - Check for oversized images (e.g., 4000px wide on small screens)
  - Current issues: images may load slowly, cause CLS (Cumulative Layout Shift)
- Implement responsive images:
  - Use srcset for hero images:
    ```html
    <img src="hero.jpg" 
         srcset="hero-small.jpg 640w, hero-medium.jpg 1200w, hero-large.jpg 1920w"
         sizes="(max-width: 640px) 100vw, (max-width: 1200px) 80vw, 100vw"
         alt="Hero banner">
    ```
  - Ensure images scale to container width (CSS: img { max-width: 100%; height: auto; })
- Add lazy loading:
  - Use native lazy loading: `<img loading="lazy">`
  - Or intersection observer for custom scroll animation
  - Exclude hero/above-fold images from lazy loading
- Optimize images:
  - Compress PNG/JPG (use TinyPNG or ImageOptim)
  - Use WebP format with fallback for newer browsers
  - Set explicit width/height on images to prevent layout shift
  - Add placeholder/skeleton while loading (optional, nice-to-have)
- CSS fixes:
  - img { max-width: 100%; height: auto; display: block; }
  - picture element for art direction (different images for mobile/desktop)

**Deliverables**:
- Updated image HTML with srcset and loading attributes
- Image optimization report (before/after file sizes)
- CSS improvements for image containers
- Performance testing (Lighthouse score improvement)

---

### PROMPT 17: Add Loading States & Skeleton Screens for Dynamic Content
**Objective**: Improve perceived performance by showing loading placeholders while content loads.

**Action Brief**:
- Identify dynamic content areas:
  - Carousel cards (if fetched from API)
  - Case study modals (if loading video/images)
  - Contact form submission (while sending)
  - Search results (if search functionality added)
- Implement skeleton screens:
  - Before carousel loads: show gray placeholder boxes matching card dimensions
  - CSS approach: create div with background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); animation shimmer
  - Skeleton timing: 1-2 seconds (if actual load is faster, show real content)
  - Replace skeleton with actual content seamlessly
- Loading indicators:
  - Contact form submit: show spinner + "Sending..." text while request in progress
  - Spinner design: gold color (#c9a84c), rotating animation (1s linear, infinite)
  - Timeout: 5 seconds, then show error if no response
- Error fallbacks:
  - If carousel fails to load: show error message + retry button
  - If form submission fails: show error with suggestion to email directly

**Deliverables**:
- Skeleton screen CSS (shimmer animation)
- Loading spinner SVG/CSS
- JavaScript logic for state management (loading → success/error)
- Applied to at least 2 dynamic content areas

---

### PROMPT 18: Performance Optimization & Accessibility Audit
**Objective**: Ensure site meets web standards for performance, accessibility, and SEO.

**Action Brief**:
- Performance optimization:
  - Run Lighthouse audit (Chrome DevTools) on all pages
  - Target scores: Accessibility 90+, Best Practices 90+, SEO 90+, Performance 80+ (mobile may be lower)
  - Identify and fix issues:
    - Unused CSS: minify, remove unused styles
    - JavaScript: split into modules, lazy-load non-critical JS
    - Third-party scripts (fonts, analytics): ensure optimized loading
    - Image optimization: ensure all images under 500KB, compressed
    - Minify HTML/CSS/JS
  - Use CDN for static assets if possible
- Accessibility audit:
  - Check color contrast: text on background should have 4.5:1 ratio for normal text, 3:1 for large text
  - Test keyboard navigation: Tab through all interactive elements in order
  - Test with screen reader: VoiceOver (Mac), NVDA (Windows)
  - Verify all images have alt text (descriptive, not "image" or "photo")
  - Check heading hierarchy: H1 → H2 → H3 (no skipping levels)
  - Verify form labels associated with inputs (for/id attributes)
  - Check for focus indicators (blue outline or gold border visible when using Tab)
  - Ensure video has captions/transcript
- SEO improvements:
  - Meta descriptions: 150-160 chars, include target keywords
  - Title tags: 50-60 chars, brand name + page topic
  - Heading structure: one H1 per page, relevant keywords
  - Internal linking: link related content, use descriptive anchor text
  - Open Graph tags: for social sharing (og:title, og:description, og:image)
  - Robots.txt and sitemap.xml present (for GitHub Pages, less critical)
- Mobile-first design check:
  - All text readable without zoom (minimum 16px)
  - Touch targets: buttons/links minimum 44x44px
  - Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`

**Deliverables**:
- Lighthouse audit reports (before/after) for all pages
- Accessibility checklist (all items passing)
- Performance optimization changes (minified assets, lazy loading)
- Updated meta tags and SEO improvements
- Mobile responsiveness validation

---

## IMPLEMENTATION ROADMAP

### Phase 1: Critical Fixes (Week 1-2)
- Prompt 1: Navbar responsive behavior
- Prompt 2: Navbar hover states
- Prompt 4: FAQ dropdown functionality
- Prompt 6: Chatbot response system
- Prompt 7: Chatbot repositioning

### Phase 2: Feature Integration (Week 2-3)
- Prompt 9: Carousel integration into portfolio
- Prompt 10: Carousel color/typography
- Prompt 11: Video modal functionality
- Prompt 12: CTA button audit

### Phase 3: Enhancement & Polish (Week 3-4)
- Prompt 3: Sticky navbar with scroll behavior
- Prompt 5: FAQ styling
- Prompt 8: Chatbot theming
- Prompt 13: Contact form fixes
- Prompt 14: Smooth scroll navigation
- Prompt 15: Button standardization
- Prompt 16: Image optimization
- Prompt 17: Loading states

### Phase 4: Quality Assurance (Week 4)
- Prompt 18: Performance & accessibility audit
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile testing (iOS, Android)
- Final visual polish and consistency check

---

## TESTING CHECKLIST

### Desktop (1920px, 1440px, 1024px)
- [ ] Navbar visible and sticky
- [ ] Hover effects on all links/buttons
- [ ] FAQs open/close smoothly
- [ ] Carousel scrolls horizontally with drag
- [ ] Video modal opens and plays
- [ ] Forms validate and submit
- [ ] Images load and display correctly
- [ ] All CTAs navigate correctly

### Tablet (768px - 1024px)
- [ ] Navbar collapses to hamburger menu
- [ ] Mobile menu opens/closes smoothly
- [ ] Touch scroll works on carousel
- [ ] All text readable without zoom
- [ ] Buttons properly sized (min 44x44px)

### Mobile (375px - 480px)
- [ ] Navbar hamburger menu functional
- [ ] Content reflows without horizontal scroll
- [ ] Images scale properly
- [ ] Carousel responsive (possibly single card view)
- [ ] Touch interactions work (tap, swipe)
- [ ] Forms usable on small screens
- [ ] Chatbot position doesn't obstruct content

### Accessibility
- [ ] Keyboard navigation: Tab through all interactive elements
- [ ] Screen reader: All text readable, alt tags present
- [ ] Color contrast: Pass WCAG AA or AAA
- [ ] Focus indicators: Visible on all interactive elements
- [ ] Form labels: Associated with inputs

### Performance
- [ ] Lighthouse Performance score: 80+ (desktop), 60+ (mobile)
- [ ] Lighthouse Accessibility score: 90+
- [ ] Page load time: under 3 seconds (desktop), under 5 seconds (mobile)
- [ ] No cumulative layout shift (CLS < 0.1)
- [ ] Core Web Vitals: LCP, FID, CLS passing

---

## REFERENCE: CREO MEDIA DESIGN SYSTEM

### Color Palette
```
--ink: #0e0e0e (primary dark, text, backgrounds)
--paper: #f5f2ec (light, backgrounds, text on dark)
--gold: #c9a84c (primary accent, hover states, accents)
--gold-light: #e8c97a (lighter gold, secondary accent)
--ash: #2a2a2a (dark gray, secondary backgrounds)
--muted: #6b6b6b (muted gray, secondary text)
```

### Typography
```
Primary Font (headers, nav): Syne (400, 600, 700, 800)
Secondary Font (body, serif): Cormorant Garamond (300, 400, 300i)
Base Size: 16px
Line Height: 1.5 (body), 1.3 (headers)
```

### Spacing (8px base unit)
```
xs: 8px
sm: 12px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

### Border Radius
```
Small elements (buttons, inputs): 4px
Medium elements (cards): 8px
Large elements (modals): 12px
Circles: 50%
```

### Shadows
```
sm: 0 2px 8px rgba(0,0,0,0.1)
md: 0 4px 16px rgba(0,0,0,0.15)
lg: 0 8px 24px rgba(0,0,0,0.2)
xl: 0 12px 32px rgba(0,0,0,0.25)
```

### Animation Timing
```
Fade/opacity: 0.2s - 0.3s ease
Scale/transform: 0.3s - 0.4s cubic-bezier(0.16, 1, 0.3, 1)
Height/expansion: 0.3s - 0.4s ease
Colors/background: 0.3s ease
```

---

## CONCLUSION

These 18 prompts provide a comprehensive, action-based framework for systematically fixing, enhancing, and upgrading the Creo Media website. Each prompt specifies exact objectives, technical actions, deliverables, and success criteria.

**Next Steps:**
1. Prioritize Phase 1 critical fixes (navbar, FAQs, chatbot)
2. Execute prompts in order of dependency
3. Test after each phase for cumulative functionality
4. Document changes for future maintenance
5. Archive this prompt document as development reference

---

**Document Version**: 1.0  
**Last Updated**: April 26, 2026  
**Prepared for**: Creo Media Solutions CC, Windhoek, Namibia
