# Cross-Browser & Device Testing Checklist

## Overview
This checklist ensures the Creo Media website works perfectly across all platforms, browsers, and devices.

---

## 1. Browser Testing

### Desktop Browsers
- [ ] **Chrome/Edge (Latest)**
  - [ ] Homepage loads correctly
  - [ ] Navigation menu works
  - [ ] All links are functional
  - [ ] Videos play in carousel
  - [ ] Chatbot opens/closes
  - [ ] Forms submit properly
  - [ ] FAQ accordion works
  - [ ] Portfolio modal opens
  - [ ] Service pages load content

- [ ] **Firefox (Latest)**
  - [ ] Homepage loads correctly
  - [ ] Navigation menu works
  - [ ] All links are functional
  - [ ] Videos play in carousel
  - [ ] Chatbot opens/closes
  - [ ] Forms submit properly
  - [ ] FAQ accordion works
  - [ ] Portfolio modal opens
  - [ ] Service pages load content

- [ ] **Safari (Latest - macOS)**
  - [ ] Homepage loads correctly
  - [ ] Navigation menu works
  - [ ] All links are functional
  - [ ] Videos play in carousel
  - [ ] Chatbot opens/closes
  - [ ] Forms submit properly
  - [ ] FAQ accordion works
  - [ ] Portfolio modal opens
  - [ ] Service pages load content

### Mobile Browsers
- [ ] **Mobile Safari (iOS 14+)**
  - [ ] Homepage loads correctly
  - [ ] Hamburger menu works
  - [ ] Touch interactions work
  - [ ] Videos play inline
  - [ ] Chatbot is responsive
  - [ ] Forms are mobile-friendly
  - [ ] FAQ accordion works
  - [ ] Carousel swipe works
  - [ ] No horizontal scroll

- [ ] **Chrome Mobile (Android 11+)**
  - [ ] Homepage loads correctly
  - [ ] Hamburger menu works
  - [ ] Touch interactions work
  - [ ] Videos play inline
  - [ ] Chatbot is responsive
  - [ ] Forms are mobile-friendly
  - [ ] FAQ accordion works
  - [ ] Carousel swipe works
  - [ ] No horizontal scroll

---

## 2. Device Testing

### Desktop Resolutions
- [ ] **1920×1080 (Full HD)**
  - [ ] Layout displays correctly
  - [ ] No horizontal scroll
  - [ ] Images load properly
  - [ ] Text is readable

- [ ] **2560×1440 (2K/QHD)**
  - [ ] Layout displays correctly
  - [ ] No horizontal scroll
  - [ ] Images load properly
  - [ ] Text is readable

### Tablet
- [ ] **iPad (768×1024)**
  - [ ] Responsive layout works
  - [ ] Touch targets are adequate (44px minimum)
  - [ ] Navigation is accessible
  - [ ] Content is readable
  - [ ] No horizontal scroll

### Mobile
- [ ] **iPhone 12 (390×844)**
  - [ ] Responsive layout works
  - [ ] Touch targets are adequate
  - [ ] Hamburger menu works
  - [ ] Content is readable
  - [ ] No horizontal scroll

- [ ] **Android (360×720)**
  - [ ] Responsive layout works
  - [ ] Touch targets are adequate
  - [ ] Hamburger menu works
  - [ ] Content is readable
  - [ ] No horizontal scroll

---

## 3. Functionality Tests

### Navigation
- [ ] All navigation links load correct pages
- [ ] Hamburger menu opens/closes on mobile
- [ ] Dropdown menus work (if any)
- [ ] Active page state is visible
- [ ] Back button works in browser
- [ ] Breadcrumb navigation works

### Buttons & CTAs
- [ ] All buttons trigger expected actions
- [ ] Hover effects work on desktop
- [ ] Touch effects work on mobile
- [ ] Disabled buttons are properly styled
- [ ] Loading states display correctly
- [ ] Form submit buttons work

### Forms
- [ ] Contact form submits successfully
- [ ] Validation works in real-time
- [ ] Error messages display correctly
- [ ] Success message shows after submission
- [ ] File uploads work (if applicable)
- [ ] Form is accessible via keyboard

### FAQ Accordion
- [ ] FAQs expand/collapse smoothly
- [ ] Only one FAQ open at a time (if configured)
- [ ] Animation is smooth (60fps)
- [ ] Keyboard navigation works (Enter/Space)
- [ ] Close on Escape key works
- [ ] Search functionality works (if implemented)

### Carousel
- [ ] Carousel drag works on desktop
- [ ] Carousel swipe works on touch devices
- [ ] Auto-play functions correctly
- [ ] Pause on hover works
- [ ] Navigation dots work
- [ ] Keyboard navigation works (Arrow keys)

### Videos
- [ ] Videos play on all devices
- [ ] Poster images display before play
- [ ] Controls are accessible
- [ ] Muted autoplay works (if implemented)
- [ ] Mobile video optimization works
- [ ] No layout shift when video loads

### Chatbot
- [ ] Chatbot opens/closes properly
- [ ] Chat window is responsive on mobile
- [ ] Quick actions work
- [ ] Messages display correctly
- [ ] Input field works
- [ ] Send button works
- [ ] Close button works
- [ ] Keyboard shortcuts work (Escape to close)

### Modal
- [ ] Portfolio modal opens correctly
- [ ] Modal content populates from data
- [ ] Close button works
- [ ] Click outside to close works
- [ ] Escape key to close works
- [ ] Modal is responsive on mobile
- [ ] No body scroll when modal is open

---

## 4. Visual Tests

### Layout
- [ ] No layout shifts (CLS < 0.1)
- [ ] Consistent spacing across pages
- [ ] No overlapping elements
- [ ] No horizontal scroll on any page
- [ ] Footer stays at bottom
- [ ] Header stays fixed (if configured)

### Typography
- [ ] All text is readable (min 16px body text)
- [ ] Headings have proper hierarchy
- [ ] Line height is comfortable (1.5-1.6)
- [ ] Text contrast meets WCAG AA (4.5:1 for normal text)
- [ ] Font loads correctly (no FOUT/FoIT)
- [ ] Text wraps properly on mobile

### Colors
- [ ] Colors meet WCAG AA contrast requirements
- [ ] Gold accent (#c9a84c) is visible on all backgrounds
- [ ] Hover states are clearly visible
- [ ] Focus states are clearly visible
- [ ] No color alone used to convey meaning
- [ ] Dark mode colors work correctly

### Images
- [ ] Images load without distortion
- [ ] Aspect ratios are maintained
- [ ] Lazy loading works
- [ ] Placeholder blur effect works
- [ ] Images are responsive
- [ ] Alt text is present on all images
- [ ] No broken image links

### Icons
- [ ] Icons render properly on all sizes
- [ ] Ionicons load correctly
- [ ] Icons are aligned with text
- [ ] Icons have proper spacing
- [ ] Icons are accessible (aria-labels present)

---

## 5. Performance Tests

### Lighthouse Score
Run Lighthouse audit on:
- [ ] Homepage
- [ ] Portfolio page
- [ ] Contact page
- [ ] Service page

Target scores:
- [ ] Performance > 85
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

### Page Size
- [ ] Homepage < 3MB
- [ ] Portfolio page < 3MB
- [ ] Contact page < 2MB
- [ ] Service pages < 2MB

### Load Time
- [ ] Initial load < 3s on 4G
- [ ] Time to Interactive < 4s
- [ ] First Contentful Paint < 1.8s

---

## 6. Accessibility Tests

### Keyboard Navigation
- [ ] Tab through all interactive elements works
- [ ] Focus order is logical
- [ ] Focus visible on all interactive elements (3px gold outline)
- [ ] Skip to main content link works (if present)
- [ ] Escape key closes modals/menus
- [ ] Enter/Space activates buttons
- [ ] Arrow keys navigate carousels

### Screen Reader
- [ ] Screen reader announces page title
- [ ] Screen reader announces navigation
- [ ] Screen reader announces all links
- [ ] Screen reader announces form fields
- [ ] Screen reader announces errors
- [ ] ARIA labels are present on interactive elements
- [ ] Alt text describes images meaningfully

### ARIA Attributes
- [ ] aria-expanded on accordion buttons
- [ ] aria-controls on accordion buttons
- [ ] aria-label on icon-only buttons
- [ ] aria-hidden on decorative elements
- [ ] role attributes where necessary
- [ ] aria-live for dynamic content

### Color Contrast
- [ ] Normal text contrast ≥ 4.5:1
- [ ] Large text contrast ≥ 3:1
- [ ] UI components contrast ≥ 3:1
- [ ] Focus indicator contrast ≥ 3:1

### Touch Targets
- [ ] All touch targets ≥ 44×44px
- [ ] Touch targets have adequate spacing
- [ ] No overlapping touch targets

---

## 7. Cross-Browser Specific Issues

### Chrome/Edge
- [ ] No -webkit- prefix issues
- [ ] Flexbox displays correctly
- [ ] Grid displays correctly
- [ ] Backdrop-filter works
- [ ] Custom scrollbars work

### Firefox
- [ ] No -moz- prefix issues
- [ ] Flexbox displays correctly
- [ ] Grid displays correctly
- [ ] Backdrop-filter works (with vendor prefix)
- [ ] Custom scrollbars work

### Safari
- [ ] No -webkit- prefix issues
- [ ] Flexbox displays correctly
- [ ] Grid displays correctly
- [ ] Backdrop-filter works
- [ ] Custom scrollbars work
- [ ] 100vh works correctly (mobile Safari issue)
- [ ] Font smoothing works

---

## 8. Mobile Specific Tests

### iOS Safari
- [ ] 100vh height issue addressed
- [ ] Bottom safe area respected
- [ ] Notch area respected
- [ ] Rubber-band scrolling doesn't break layout
- [ ] Zoom on input focus doesn't break layout
- [ ] -webkit-overflow-scrolling works

### Android Chrome
- [ ] 100vh height works correctly
- [ ] Bottom navigation bar respected
- [ ] Chrome custom tabs work
- [ ] Pull-to-refresh doesn't interfere
- [ ] Text selection works

---

## 9. Testing Tools

### Recommended Tools
- **Browser Testing:**
  - Chrome DevTools (Device Mode)
  - Firefox Responsive Design Mode
  - Safari Web Inspector (Responsive Design Mode)
  - BrowserStack (for cross-browser testing)

- **Performance Testing:**
  - Google Lighthouse
  - WebPageTest
  - Chrome DevTools Performance tab

- **Accessibility Testing:**
  - axe DevTools
  - WAVE
  - Lighthouse Accessibility audit
  - NVDA (Windows screen reader)
  - VoiceOver (macOS screen reader)

- **Mobile Testing:**
  - iOS Simulator (Xcode)
  - Android Emulator (Android Studio)
  - Real device testing

---

## 10. Bug Tracking

### Found Issues
Document any issues found during testing:

| Issue | Browser/Device | Severity | Status |
|-------|---------------|----------|--------|
|       |               |          |        |
|       |               |          |        |
|       |               |          |        |
|       |               |          |        |

### Severity Levels
- **Critical:** Blocks core functionality
- **High:** Major functionality broken
- **Medium:** Minor functionality broken
- **Low:** Cosmetic issues

---

## 11. Sign-off

### Testing Completed By
- **Name:** _______________
- **Date:** _______________
- **Browsers Tested:** _______________
- **Devices Tested:** _______________

### Approval
- **Approved for Production:** [ ] Yes [ ] No
- **Notes:** _______________

---

## Testing Notes

### Known Limitations
- List any known limitations or issues that are acceptable:

### Future Improvements
- List any improvements for future testing cycles:

### Additional Resources
- Link to design mockups for comparison
- Link to requirements document
- Link to user stories
