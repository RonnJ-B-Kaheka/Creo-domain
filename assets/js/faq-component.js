/**
 * FAQ Accordion Component
 * Implements accessible, performant FAQ accordion using HTML5 <details> and <summary> elements
 */

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
        // Only one FAQ can be open at a time
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
  try {
    // Load FAQ data
    const response = await fetch('assets/data/faqs.json');
    if (!response.ok) {
      console.error('Failed to load FAQ data:', response.statusText);
      return;
    }
    const faqData = await response.json();
    
    // Initialize service page FAQs
    if (document.getElementById('service-faqs')) {
      new FAQAccordion('service-faqs', faqData.faqs['service-page']);
    }
    
    // Initialize contact page FAQs
    if (document.getElementById('contact-faqs')) {
      new FAQAccordion('contact-faqs', faqData.faqs['contact-page']);
    }
  } catch (error) {
    console.error('Error initializing FAQ system:', error);
  }
});
