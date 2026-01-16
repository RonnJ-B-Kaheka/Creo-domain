/**
 * SERVICES.JS
 * Specific interactions for the Service Sub-pages
 */

document.addEventListener('DOMContentLoaded', function () {

  // 1. CONTENT PRODUCTION: Filterable Gallery
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }


  // 2. EVENT MANAGEMENT: Concept Reality Slider
  const slider = document.getElementById('compSlider');
  const afterImage = document.getElementById('compAfter');
  const handle = document.getElementById('compHandle');

  if (slider) {
    slider.addEventListener('input', (e) => {
      const sliderPos = e.target.value;
      // Update clip-path of the 'After' image (which is on top)
      // If we want to reveal the 'After' image from the left, we clip the right side.
      // But standard before/after usually has 'Before' on left, 'After' on right.
      // Let's assume 'img-after' is the top layer. 
      // clip-path: inset(0 0 0 X%) cuts off the left X%.

      afterImage.style.clipPath = `inset(0 0 0 ${sliderPos}%)`;
      handle.style.left = `${sliderPos}%`;
    });
  }

  // EVENT MANAGEMENT: Testimonial Carousel
  const testimonials = document.querySelectorAll('.testimonial-item');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  let currentTestimonial = 0;

  if (testimonials.length > 0) {
    function showTestimonial(index) {
      testimonials.forEach(item => item.classList.remove('active'));
      testimonials[index].classList.add('active');
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
      });
    }
  }


  // 3. DIGITAL MANAGEMENT: FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  if (faqQuestions.length > 0) {
    faqQuestions.forEach(q => {
      q.addEventListener('click', () => {
        const item = q.parentElement;
        item.classList.toggle('active');
      });
    });
  }


  // 4. PODCASTING: Audio Player Demo
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  let isPlaying = false;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playIcon.setAttribute('name', 'pause');
        // Here you would normally play the audio
      } else {
        playIcon.setAttribute('name', 'play');
        // Pause audio
      }
    });
  }

  // PODCASTING: Booking Slots
  const slots = document.querySelectorAll('.slot:not(.disabled)');
  slots.forEach(slot => {
    slot.addEventListener('click', () => {
      slots.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');
    });
  });


  /* =========================================
     GLOBAL ANIMATIONS
     ========================================= */

  // 1. Reveal on Scroll
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));


  // 2. Smooth Page Transitions
  // Add overlay to body if not present
  if (!document.querySelector('.page-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'page-overlay';
    document.body.appendChild(overlay);
  }

  const overlay = document.querySelector('.page-overlay');

  // Fade in on load
  window.addEventListener('load', () => {
    overlay.classList.remove('active');
  });

  // Handle link clicks
  const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Filter out same-page links or empty links
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      e.preventDefault();
      overlay.classList.add('active');

      setTimeout(() => {
        window.location.href = href;
      }, 400); // Match CSS transition duration
    });
  });

  /* =========================================
     PODCASTING EXTENSION (Lightbox & Slider)
     ========================================= */

  // Comparison Slider (Color Grading)
  const gradeSlider = document.getElementById('gradeSlider');
  const gradeAfter = document.getElementById('gradeAfter');
  const gradeHandle = document.getElementById('gradeHandle');

  if (gradeSlider && gradeAfter) {
    gradeSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      gradeAfter.style.clipPath = `inset(0 0 0 ${val}%)`;
      gradeHandle.style.left = `${val}%`;
    });
  }

  // Lightbox Video
  const lightboxTrigger = document.getElementById('lightboxTrigger');
  const lightboxModal = document.getElementById('videoLightbox');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightboxTrigger && lightboxModal) {
    // Open
    lightboxTrigger.addEventListener('click', () => {
      lightboxModal.classList.add('active');
      const iframe = lightboxModal.querySelector('iframe');
      // Start Autoplay
      let src = iframe.src;
      if (!src.includes('autoplay=1')) {
        src = src.replace('autoplay=0', 'autoplay=1');
        iframe.src = src;
      }
    });

    // Close
    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      const iframe = lightboxModal.querySelector('iframe');
      // Stop Autoplay
      let src = iframe.src;
      src = src.replace('autoplay=1', 'autoplay=0');
      iframe.src = src;
    };

    lightboxClose.addEventListener('click', closeLightbox);

    // Close on background click
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

});
