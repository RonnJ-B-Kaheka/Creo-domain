/**
 * Contact Form Handler for Creomedia
 * Handles multi-step form, real-time validation, background submission to Formspree, offline queue, and retry logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submitBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    // Form state
    let currentStep = 1;
    const totalSteps = 2;
    let isValidStep1 = false;
    let isValidStep2 = false;

    // Load queued messages from localStorage
    let offlineQueue = JSON.parse(localStorage.getItem('contact_form_queue')) || [];

    // URL Parameter Pre-fill
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = serviceParam;
        }
    }

    /**
     * Validation Functions
     */
    const validators = {
        name: (value) => {
            if (!value || value.trim().length < 2) {
                return 'Name must be at least 2 characters';
            }
            return '';
        },
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                return 'Please enter a valid email address';
            }
            return '';
        },
        phone: (value) => {
            if (value && value.length < 7) {
                return 'Phone number must be at least 7 digits';
            }
            return '';
        },
        service: (value) => {
            if (!value) {
                return 'Please select a service';
            }
            return '';
        },
        budget: () => {
            const selectedBudget = document.querySelector('input[name="budget"]:checked');
            if (!selectedBudget) {
                return 'Please select a budget range';
            }
            return '';
        },
        timeline: (value) => {
            if (!value) {
                return 'Please select a timeline';
            }
            return '';
        },
        subject: (value) => {
            if (!value || value.trim().length < 2) {
                return 'Subject must be at least 2 characters';
            }
            return '';
        },
        message: (value) => {
            if (!value || value.trim().length < 10) {
                return 'Message must be at least 10 characters';
            }
            return '';
        }
    };

    /**
     * Validate a single field
     */
    const validateField = (fieldId) => {
        const field = document.getElementById(fieldId);
        const errorSpan = document.getElementById(`${fieldId}-error`);
        if (!field || !errorSpan) return true;

        const value = field.value;
        let error = '';

        if (fieldId === 'budget') {
            error = validators.budget();
        } else {
            error = validators[fieldId] ? validators[fieldId](value) : '';
        }

        if (error) {
            field.classList.add('invalid');
            field.classList.remove('valid');
            errorSpan.textContent = error;
            return false;
        } else {
            field.classList.remove('invalid');
            if (value && field.required) {
                field.classList.add('valid');
            }
            errorSpan.textContent = '';
            return true;
        }
    };

    /**
     * Validate all fields in a step
     */
    const validateStep = (step) => {
        let isValid = true;
        
        if (step === 1) {
            isValid = validateField('name') && isValid;
            isValid = validateField('email') && isValid;
            isValid = validateField('phone') && isValid;
        } else if (step === 2) {
            isValid = validateField('service') && isValid;
            isValid = validateField('budget') && isValid;
            isValid = validateField('timeline') && isValid;
            isValid = validateField('subject') && isValid;
            isValid = validateField('message') && isValid;
        }
        
        return isValid;
    };

    /**
     * Update progress indicator
     */
    const updateProgress = () => {
        const percentage = (currentStep / totalSteps) * 100;
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
    };

    /**
     * Show/hide form steps
     */
    const showStep = (step) => {
        document.querySelectorAll('.form-step').forEach(s => {
            s.style.display = 'none';
        });
        const targetStep = document.querySelector(`.form-step[data-step="${step}"]`);
        if (targetStep) {
            targetStep.style.display = 'block';
        }
        currentStep = step;
        updateProgress();
    };

    /**
     * Update submit button state
     */
    const updateSubmitButton = () => {
        if (currentStep === 2) {
            submitBtn.disabled = !isValidStep2;
        }
    };

    /**
     * Add real-time validation listeners
     */
    const addValidationListeners = () => {
        const fields = ['name', 'email', 'phone', 'service', 'subject', 'message'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => {
                    validateField(fieldId);
                    if (currentStep === 1) {
                        isValidStep1 = validateStep(1);
                    } else {
                        isValidStep2 = validateStep(2);
                        updateSubmitButton();
                    }
                });
                
                field.addEventListener('input', () => {
                    if (field.classList.contains('invalid')) {
                        validateField(fieldId);
                    }
                });
            }
        });

        // Budget radio buttons
        document.querySelectorAll('input[name="budget"]').forEach(radio => {
            radio.addEventListener('change', () => {
                validateField('budget');
                isValidStep2 = validateStep(2);
                updateSubmitButton();
            });
        });

        // Timeline select
        const timelineSelect = document.getElementById('timeline');
        if (timelineSelect) {
            timelineSelect.addEventListener('change', () => {
                validateField('timeline');
                isValidStep2 = validateStep(2);
                updateSubmitButton();
            });
        }

        // Character count for message
        if (messageField && charCount) {
            messageField.addEventListener('input', () => {
                const currentLength = messageField.value.length;
                charCount.textContent = `${currentLength}/1000`;
                if (currentLength > 1000) {
                    charCount.style.color = 'var(--hot-pink)';
                } else {
                    charCount.style.color = 'var(--text-muted)';
                }
            });
        }
    };

    /**
     * Step navigation handlers
     */
    nextStepBtn.addEventListener('click', () => {
        if (validateStep(1)) {
            isValidStep1 = true;
            showStep(2);
            isValidStep2 = validateStep(2);
            updateSubmitButton();
        } else {
            setFeedback('Please fix the errors before proceeding', 'error');
        }
    });

    prevStepBtn.addEventListener('click', () => {
        showStep(1);
    });

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
        const formId = SiteConfig.formspreeId || 'mrepdvzz'; // Use config ID or fallback
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

        // Validate step 2 before submission
        if (!validateStep(2)) {
            setFeedback('Please fix the errors before submitting', 'error');
            return;
        }

        // 1. Gather Data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Anti-abuse: Honeypot check
        if (data._honeypot) {
            console.warn('Bot detected via honeypot.');
            return;
        }
        delete data._honeypot;

        // Combine country code with phone
        if (data.country_code && data.phone) {
            data.phone = `${data.country_code} ${data.phone}`;
        }
        delete data.country_code;

        // Metadata
        data.pageUrl = window.location.href;
        data.timestamp = new Date().toISOString();
        data.subject = `[Website] ${data.subject || 'New Contact Message'}`;

        // 2. UI Loading State
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        setFeedback('Sending your message...', 'info');

        try {
            if (!navigator.onLine) {
                throw new Error('offline');
            }

            // 3. Send
            await sendToProvider(data);

            // 4. Success
            setFeedback('Thank you! We\'ll contact you within 12 hours. Check your email for confirmation.', 'success');
            contactForm.reset();
            charCount.textContent = '0/1000';
            showStep(1);
            isValidStep1 = false;
            isValidStep2 = false;
            
            // Remove validation classes
            document.querySelectorAll('.form-field').forEach(field => {
                field.classList.remove('valid', 'invalid');
            });
            
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
                setFeedback('Oops! There was a problem sending your message. Please try again later or email us directly at contact.creomedia@gmail.com', 'error');
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });

    // Initialize
    addValidationListeners();
    updateProgress();
});
