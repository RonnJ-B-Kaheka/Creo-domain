# Creo Media Website — Critical Fixes Implementation Plan

## Problem Summary

A live browser audit and deep code analysis reveals **significant discrepancies** between the prior audit reports (which rated the site 97/100) and the actual state of the website. Multiple critical features are broken, missing, or non-functional. The site is **NOT production ready** in its current state.

## Critical Findings

| # | Issue | Severity | Location |
|---|-------|----------|----------|
| 1 | **"CORED VALUES" typo** — should be "CORE VALUES" | High | `about.html:406` |
| 2 | **"aviding" typo** — should be "aiding" | High | `index.html:566` |
| 3 | **Missing `#team` anchor** — linked from all 5 pages but no `id="team"` exists in about.html | Critical | `about.html` |
| 4 | **Service Discovery Quiz HTML missing** — JS logic exists in `script.js` but zero HTML markup in `service.html` | Critical | `service.html` |
| 5 | **Dead "Resources" nav link** — `href="#"` on all 5 main pages (mega menu trigger with no content) | High | All pages |
| 6 | **CSS layout regressions** — elements overlapping, buttons oversized, navbar cluttered on internal pages | Critical | All pages except index |
| 7 | **Portfolio carousel visually broken** — HTML and JS exist but layout is jumbled due to CSS issues | High | `portfolio.html` |
| 8 | **`blog.html` does not exist** — but may be linked from navigation | Medium | Global |

## User Review Required

> [!IMPORTANT]
> The previous audit reports (AUDIT_REPORT.md, QA_TEST_PLAN.md, README_AUDIT.md, FINAL_AUDIT_SUMMARY.txt) all claim features are fully implemented and the site scores 97/100. **This is factually incorrect.** The Service Discovery Quiz was never built in HTML, the `#team` section doesn't exist, and there are severe layout regressions across all internal pages.

> [!WARNING]
> The layout regression on all internal pages (about, service, portfolio, contact) appears to be caused by CSS conflicts in `style.css`. The massive 105KB stylesheet likely has conflicting rules that break the layout. A careful CSS audit is required.

## Open Questions

> [!IMPORTANT]
> 1. **Resources nav link**: The "Resources" mega menu trigger is a dead `href="#"` link. Should I: (a) remove it entirely from the nav, (b) link it to a specific page, or (c) create a simple resources/blog placeholder page?
> 2. **Team section**: Should I add a proper team section to `about.html` with placeholder team member cards, or simply add an anchor `id="team"` to the existing "Our Story" or "Core Values" section?
> 3. **Service Discovery Quiz**: The JS logic exists but no HTML widget was ever created. Should I build the full 4-step interactive quiz widget in `service.html` as described in the enhancement prompts?

## Proposed Changes

### Component 1: Typography Fixes

#### [MODIFY] [index.html](file:///c:/Users/wwwze/Desktop/Work/Creo-domain/index.html)
- Line 566: Fix "aviding" → "aiding"

#### [MODIFY] [about.html](file:///c:/Users/wwwze/Desktop/Work/Creo-domain/about.html)
- Line 406: Fix "CORED VALUES" → "CORE VALUES"

---

### Component 2: Missing `#team` Anchor

#### [MODIFY] [about.html](file:///c:/Users/wwwze/Desktop/Work/Creo-domain/about.html)
- Add a proper Team section with `id="team"` to satisfy the 5 mega-menu links pointing to `about.html#team`
- This should include team member cards matching the existing design system (glass-card, brand colors)

---

### Component 3: Service Discovery Quiz Widget

#### [MODIFY] [service.html](file:///c:/Users/wwwze/Desktop/Work/Creo-domain/service.html)
- Add the complete 4-step discovery quiz widget HTML markup before the FAQ section
- The JS logic already exists in `script.js` (lines 633-787) — it expects `.discovery-widget`, `.discovery-step`, `.discovery-option`, `.discovery-results`, `#prevBtn`, `#nextBtn`, `#recIcon`, `#recTitle`, `#recDesc`, `#recMetric1`, `#recMetric2` elements
- Build the HTML to match these selectors exactly

---

### Component 4: CSS Layout Regression Fix

#### [MODIFY] [style.css](file:///c:/Users/wwwze/Desktop/Work/Creo-domain/assets/css/style.css)
- Audit and fix layout conflicts causing element overlap and oversized buttons on internal pages
- Ensure consistent header/navbar rendering across all pages
- Fix the portfolio carousel visual rendering

---

### Component 5: Dead Navigation Links

#### [MODIFY] All HTML pages (index, about, service, portfolio, contact)
- Fix the "Resources" mega menu trigger — either remove or convert to a useful link
- Verify all mega-menu dropdown links point to valid anchors

---

## Verification Plan

### Automated Tests
- Launch local dev server and browser-test each page
- Verify FAQ accordion opens/closes on service.html and contact.html
- Verify chatbot widget appears and responds on all pages
- Verify carousel scroll and dot navigation on portfolio.html
- Verify all internal links resolve (no 404s, no blank anchors)
- Verify no console errors on any page

### Manual Verification
- Visual inspection of all 5 pages at desktop (1440px) and mobile (375px) widths
- Test Service Discovery Quiz flow (if approved for build)
- Test Contact Form multi-step flow
