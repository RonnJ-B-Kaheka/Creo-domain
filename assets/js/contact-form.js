/**
 * Contact Form Handler for Creomedia
 * Handles background submission to Formspree, offline queue, and retry logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const submitBtnText = submitBtn.querySelector('.span');

    // Load queued messages from localStorage
    let offlineQueue = JSON.parse(localStorage.getItem('contact_form_queue')) || [];

    /**
     * Update UI feedback message
     * @param {string} message 
     * @param {string} type - 'success', 'error', or 'info'
     */
    const setFeedback = (message, type = 'info') => {
        formFeedback.textContent = message;
        formFeedback.className = `form-feedback ${type}`;
        formFeedback.setAttribute('aria-hidden', 'false');

        // Auto-hide success messages after 10 seconds
        if (type === 'success') {
            setTimeout(() => {
                formFeedback.setAttribute('aria-hidden', 'true');
            }, 10000);
        }
    };

    /**
     * Send individual payload to Formspree
     * @param {Object} payload 
     * @returns {Promise}
     */
    const sendToProvider = async (payload) => {
        const formId = SiteConfig.formspreeId || 'mnnjpqyv'; // Use config ID
        const url = `https://formspree.io/f/${formId}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    };

    /**
     * Process the offline queue
     */
    const processQueue = async () => {
        if (!navigator.onLine || offlineQueue.length === 0) return;

        console.log('Creomedia: Processing offline queue...');
        const remainingQueue = [];

        for (const item of offlineQueue) {
            try {
                await sendToProvider(item.payload);
                console.log('Creomedia: Queued message sent successfully.');
            } catch (err) {
                console.error('Creomedia: Retry failed for queued item.', err);
                item.retryCount++;
                if (item.retryCount < 5) {
                    remainingQueue.push(item);
                }
            }
        }

        offlineQueue = remainingQueue;
        localStorage.setItem('contact_form_queue', JSON.stringify(offlineQueue));

        if (offlineQueue.length === 0) {
            console.log('Creomedia: Queue cleared.');
        }
    };

    // Attempt to process queue on load and when coming back online
    processQueue();
    window.addEventListener('online', processQueue);

    /**
     * Handle form submission
     */
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Gather Data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Anti-abuse: Honeypot check
        if (data._honeypot) {
            console.warn('Bot detected via honeypot.');
            return;
        }
        delete data._honeypot;

        // Metadata
        data.pageUrl = window.location.href;
        data.timestamp = new Date().toISOString();
        data.subject = `[Website] ${data.subject || 'New Contact Message'}`;

        // 2. UI Loading State
        submitBtn.disabled = true;
        const originalBtnText = submitBtnText.textContent;
        submitBtnText.textContent = 'Sending...';
        setFeedback('Sending your message...', 'info');

        try {
            if (!navigator.onLine) {
                throw new Error('offline');
            }

            // 3. Send
            await sendToProvider(data);

            // 4. Success
            setFeedback('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
        } catch (err) {
            if (err.message === 'offline' || !navigator.onLine) {
                // 5. Offline Queueing
                const queueItem = {
                    payload: data,
                    retryCount: 0,
                    id: Date.now()
                };
                offlineQueue.push(queueItem);
                localStorage.setItem('contact_form_queue', JSON.stringify(offlineQueue));

                setFeedback('You appear to be offline. Your message has been saved and will be sent automatically when your connection is restored.', 'info');
            } else {
                // 6. Generic Error
                console.error('Submission error:', err);
                setFeedback('Oops! There was a problem sending your message. Please try again later or email us directly.', 'error');
            }
        } finally {
            submitBtn.disabled = false;
            submitBtnText.textContent = originalBtnText;
        }
    });
});
