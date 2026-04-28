### MOAB Fixes and Upgrade Plan for Creo‑domain Site

Below is a ready‑to‑save Markdown file you can download as `creo-domain-fixes.md`. It contains **high‑impact, copy‑pasteable** instructions, code patches, and a rollout checklist to remove Blog and Resource pages, relocate the chatbot icon above the to‑top button on the opposite side, repair FAQ dropdowns, restore Navbar/hamburger/hover UX, fix chatbot responsiveness, and add recommended UX improvements.

---

# MOAB Fixes and Upgrade Plan for Creo‑domain

## Summary
**Goal**: Restore site functionality and UX quickly with minimal risk.  
**Scope**: Remove Blog and Resource pages; fix FAQ dropdowns; move and stabilize chatbot; repair Navbar, hamburger, hover and active states; add accessibility and small UX improvements.  
**Assumptions**: Repo is standard static site with `index.html`, shared header/footer partials, `assets/css/`, `assets/js/`. Back up the repo before applying mass deletions.

---

## Quick Priorities
1. Remove Blog and Resource pages and nav links.  
2. Repair FAQ dropdowns and CSS transitions.  
3. Move chatbot icon to opposite side above the to‑top button and stabilize chat responses.  
4. Restore Navbar/hamburger behavior and hover/click/focus states.  
5. Add accessibility, keyboard navigation, and small UX upgrades.  
6. QA, staging, and deploy.

---

## File Changes Checklist
- **Delete**: `blog.html`, `resources.html`, any `blog/` or `resources/` folders and assets.  
- **Update**: `index.html`, header/footer partials, `sitemap.xml`, `robots.txt`, `README.md`.  
- **Add/Modify**: `assets/js/site.js` and `assets/css/site.css` with the snippets below.  
- **Backup**: Create branch `pre-fix` before changes.

---

## Remove Blog and Resource Pages
**Steps**
- Remove files and folders for Blog and Resource pages.
- Remove nav `<li>` entries referencing Blog and Resource in header partials.
- Search repo for "Blog" and "Resource" and remove stray references.
- Update `sitemap.xml` and `robots.txt` if present.
- Commit: `chore: remove blog and resources pages and nav links`

---

## FAQ Dropdown Fixes

### Problem
FAQ toggles either do nothing or CSS transitions are broken. Keyboard access missing.

### Markup expectations
- Each FAQ question should be a button or element with class `.faq-toggle` or attribute `data-faq-toggle`.
- The answer panel should have class `.faq-panel`.

### JavaScript
Add or replace with this robust handler in `assets/js/site.js`:

```js
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.faq-toggle, .faq-question, [data-faq-toggle]');
  toggles.forEach(btn => {
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', toggleFaq);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq.call(btn, e);
      }
    });
  });

  function toggleFaq(e) {
    const btn = this;
    const panel = btn.nextElementSibling && btn.nextElementSibling.classList.contains('faq-panel')
      ? btn.nextElementSibling
      : document.querySelector(btn.dataset.target);
    if (!panel) return;
    const isOpen = panel.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '0px';
  }
});
```

### CSS
Add to `assets/css/site.css`:

```css
.faq-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease;
}
.faq-panel.open {
}
.faq-toggle, .faq-question {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.faq-toggle:focus {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}
```

---

## Chatbot Relocation and Stabilization

### Desired placement
- **Opposite side** of current placement, **on the same horizontal line** and **immediately above** the "to top" button.

### DOM relocation script
Place in `assets/js/site.js`:

```js
document.addEventListener('DOMContentLoaded', () => {
  const chatbot = document.querySelector('#chatbot, .chatbot, [data-chatbot]');
  const toTop = document.querySelector('#to-top, .to-top, [data-to-top]');
  if (!chatbot || !toTop) return;

  const parent = toTop.parentElement;
  parent.insertBefore(chatbot, toTop);

  chatbot.classList.remove('right', 'chat-right');
  chatbot.classList.add('left', 'chat-left');

  chatbot.setAttribute('aria-label', 'Site chatbot');
  chatbot.setAttribute('tabindex', '0');
});
```

### CSS to align controls

```css
.footer-controls, .floating-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}
.chat-left {
  position: relative;
  margin-right: 8px;
}
#chatbot, .chatbot {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--accent);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
}
```

### Stabilize chat responses

```js
function debounce(fn, wait=300){ let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), wait); }; }

async function sendMessage(payload) {
  const controller = new AbortController();
  const timeout = setTimeout(()=>controller.abort(), 8000);
  try {
    const res = await fetch('/api/chat', { method:'POST', body: JSON.stringify(payload), signal: controller.signal, headers:{'Content-Type':'application/json'} });
    clearTimeout(timeout);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    clearTimeout(timeout);
    return { error: true, message: 'Chat service unavailable. Please try again.' };
  }
}

const debouncedSend = debounce((payload, onResult) => {
  sendMessage(payload).then(onResult);
}, 400);
```

---

## Navbar Hamburger Hover and Active States

### Accessible hamburger JS

```js
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('#hamburger, .hamburger, [data-hamburger]');
  const nav = document.querySelector('#nav, .nav, [data-nav]');
  if (!hamburger || !nav) return;

  hamburger.setAttribute('aria-controls', nav.id || 'site-nav');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  });
});
```

### CSS

```css
.nav-link {
  color: var(--text);
  text-decoration: none;
  transition: color 160ms ease, transform 120ms ease;
}
.nav-link:hover, .nav-link:focus {
  color: var(--accent);
  transform: translateY(-2px);
}
.nav-link:active {
  transform: translateY(0);
  opacity: 0.9;
}
.hamburger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: transparent;
  border: none;
}
.nav.open {
  display: block;
}
@media(min-width: 900px) {
  .nav { display: flex !important; }
  .hamburger { display: none; }
}
```

---

## Recommended UX Additions

```js
document.querySelectorAll('a[href="#top"], #to-top, .to-top').forEach(el=>{
  el.addEventListener('click', e=>{
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
```

---

## QA Checklist

- Nav works
- Hamburger toggles
- FAQ works
- Chatbot works
- Blog/Resource removed

---

## Rollout Plan

1. Branch
2. Apply fixes
3. Test
4. Deploy

---

**Save this file** as `creo-domain-fixes.md`
