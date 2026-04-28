/**
 * CREO-ORION AI ASSISTANT
 * A dynamic, personality-driven AI interface for Creo Media
 */

const chatbotKnowledge = {
    intents: [{
            keywords: ["service", "what do you do", "pillars", "offer", "services"],
            responses: [
                "We specialize in Content Production, Digital Management, Event Management, and Podcasting. Each service is tailored to elevate your brand presence.",
                "Our ecosystem is built on end-to-end creative solutions. We handle everything from high-end video sets to digital growth strategies.",
                "Creo Media isn't just an agency; we're a creative powerhouse focusing on Vision, Strategy, and global-standard Execution."
            ]
        },
        {
            keywords: ["namibia", "location", "based", "windhoek", "where"],
            responses: [
                "Our headquarters is strategically located in Windhoek, Namibia. From the heart of Africa, we deliver global standards.",
                "We are Namibian-born but globally focused. We operate out of Windhoek to bridge the gap between African creativity and the world.",
                "You'll find us in Windhoek, Namibia—defining the modern digital landscape of the region."
            ]
        },
        {
            keywords: ["price", "cost", "standard", "budget", "expensive", "pricing"],
            responses: [
                "Our pricing is customized based on project scope and requirements. We offer transparent packages designed to deliver premium results at competitive rates.",
                "Every project is unique. We attract global clients who value first-world standards of excellence. Let's discuss your specific mission.",
                "Our pricing reflects the high-energy brutalism and technical precision we bring to every frame and pixel."
            ]
        },
        {
            keywords: ["contact", "email", "talk", "reach", "call", "hello"],
            responses: [
                "The most direct line is contact.creomedia@gmail.com. Or head to our Contact page to start the briefing process.",
                "Ready to reach the forefront? Let's talk. You can find our details on the Contact page or ping contact.creomedia@gmail.com.",
                "Communication is the first step to innovation. Use our Contact link or email us at contact.creomedia@gmail.com."
            ]
        },
        {
            keywords: ["aim", "vision", "mission", "goal", "philosophy", "objectives"],
            responses: [
                "Our vision? To compete internationally and empower the African creative ecosystem. We don't just follow standards—we set them.",
                "Every question deserves a creative answer. That's our brand heartbeat. We keep brands at the forefront of innovation.",
                "We make it our responsibility to keep our clients well-adjusted for stability and growth in the marketplace."
            ]
        },
        {
            keywords: ["who", "leadership", "team", "founder", "creo media"],
            responses: [
                "Our leadership is driven by a singular mission to elevate African content. Check out our 'About' page for the full intelligence on the team.",
                "We are a collective of designers, creators, and strategists obsessed with perfection. We are Creo Media."
            ]
        },
        {
            keywords: ["time", "timeline", "delivery", "schedule", "deadline", "how long", "project take", "duration"],
            responses: [
                "Timeline varies by project complexity. Simple projects may take 2-3 weeks, while comprehensive campaigns can take 2-3 months. We provide estimates during consultation."
            ]
        },
        {
            keywords: ["international", "global", "worldwide", "abroad", "international clients", "foreign clients"],
            responses: [
                "Absolutely! Though based in Namibia, we serve clients globally with our advanced digital collaboration tools and global creator network."
            ]
        },
        {
            keywords: ["portfolio", "examples", "work", "case study", "past work", "previous projects", "projects", "work experience"],
            responses: [
                "Certainly! Visit our Portfolio section to see diverse projects across various industries. We showcase our expertise in content production, digital management, events, and podcasting."
            ]
        },
        {
            keywords: ["process", "workflow", "steps", "procedure", "process", "workflow"],
            responses: [
                "After form submission, we schedule a 15-minute Discovery Call. If there's alignment, we issue a formal Protocol Proposal within 24 hours."
            ]
        },
        {
            keywords: ["payment", "billing", "invoice", "money", "pricing"],
            responses: [
                "We offer transparent pricing with options for deposits and milestone-based billing. Payment terms are discussed during the proposal phase."
            ]
        },
        {
            keywords: ["support", "help", "assistance", "maintenance", "ongoing support", "after completion", "post-project support", "customer support"],
            responses: [
                "Absolutely! We offer maintenance and support packages to ensure sustained success of your project. These can be customized to suit your specific requirements."
            ]
        },
        {
            keywords: ["content", "production", "video", "photography", "graphic design", "copywriting", "social media content"],
            responses: [
                "Our content production covers video, photography, graphic design, copywriting, and social media content."
            ]
        },
        {
            keywords: ["digital", "management", "strategy", "online", "brand presence", "digital marketing", "social media management", "website design"],
            responses: [
                "Digital management includes website design, social media management, digital marketing strategies, and online brand presence."
            ]
        },
        {
            keywords: ["event", "management", "conference", "launch", "corporate events", "brand activations", "product launches", "brand experiences"],
            responses: [
                "Event management covers corporate events, brand activations, conferences, product launches, and brand experiences."
            ]
        },
        {
            keywords: ["podcasting", "audio", "studio", "recording", "podcast production", "audio production", "studio recording", "on-location recording", "podcast editing", "audio distribution"],
            responses: [
                "Our podcasting services include video & audio production, studio & on-location recording, editing, and distribution."
            ]
        }
    ],
    default: [
        "That's an interesting question. I'm optimized for creative strategy. Try asking about our Services, Pricing, or how to Contact us.",
        "I'm processing that. While I do, why not explore our Portfolio to see our recent impact?",
        "Every question deserves a creative answer. Ask me about our core pillars or our Namibian roots."
    ],
    greeting: {
        keywords: ["hello", "hi", "hey", "greetings", "welcome", "orion", "bot", "assistant", "good morning", "good afternoon", "good evening", "morning", "afternoon", "evening", "sup", "what's up", "whats up", "howdy", "yo", "hey there", "hi there", "hello there", "Good Day", "good day", "Good day"],
        responses: [
            "Hello! I am Orion AI. How can I assist you today?",
            "Hi there! I'm Orion. How can I assist you today?",
            "Greetings! I'm Orion. How can I assist you today?",
            "Welcome! I'm Orion. How can I assist you today?",
            "Hey Hi, Orion AI bot, Here to help you today! How can I assist you?",
            "Good Day, Orion AI here. How can I assist you today?",
            "Salutations! Orion Intelligence Online. What brings you to Creo Media today?",
            "Ah, a new visitor! I'm Orion, your creative navigator. How may I illuminate your path?",
            "Greetings, human! Orion AI at your service. Ready to explore our creative universe?",
            "Well met! I'm Orion, the digital consciousness of Creo Media. What creative challenge shall we tackle?"
        ]
    },
    // Enhanced FAQs for better matching
    enhancedFaqs: [{
            keywords: ["refund", "policy", "money back", "return", "refund policy", "cancellation", "cancellation policy"],
            responses: [
                "We offer project-specific refund policies detailed in our contract terms. Generally, refunds are evaluated based on project stage and deliverable completion."
            ]
        },
        {
            keywords: ["brand consistency", "consistency", "brand guidelines", "identity", "standards", "branding"],
            responses: [
                "We create comprehensive brand guidelines and style guides to maintain consistency across all touchpoints and platforms for your brand."
            ]
        },
        {
            keywords: ["technology stack", "tech stack", "programming languages", "tools", "platforms", "development tools", "software development", "coding languages"],
            responses: [
                "We leverage modern technologies including React, Vue, Next.js, Node.js, and cloud platforms like AWS and Google Cloud, tailored to project requirements."
            ]
        },
        {
            keywords: ["revisions", "feedback", "changes", "iterations", "revision history", "iteration process"],
            responses: [
                "We include a specified number of revision rounds in our contracts. We encourage structured feedback to ensure efficient project iteration and client satisfaction."
            ]
        },
        {
            keywords: ["response time", "response", "reply time", "how long to reply", "answer time", "customer service", "support response time"],
            responses: [
                "We review all inquiries within 12 business hours. For urgent production requests, our executive team is notified immediately."
            ]
        }
    ]
};

// Merge enhanced FAQs into intents
chatbotKnowledge.intents = chatbotKnowledge.intents.concat(chatbotKnowledge.enhancedFaqs);
// Remove the enhancedFaqs property to prevent duplication
delete chatbotKnowledge.enhancedFaqs;

class CreoChatbot {
    constructor() {
        this.isOpen = false;
        this.messageHistory = [];
        this.loadFromSession();
        this.createUI();
        this.addEventListeners();
        this.addQuickActions();
        this.addKeyboardShortcut();
        if (this.messageHistory.length === 0) {
            // Don't auto-greet - wait for user interaction
            // this.greet();
        } else {
            this.restoreMessages();
        }
    }

    loadFromSession() {
        const saved = sessionStorage.getItem('creoChatHistory');
        if (saved) {
            try {
                this.messageHistory = JSON.parse(saved);
            } catch (e) {
                this.messageHistory = [];
            }
        }
    }

    saveToSession() {
        sessionStorage.setItem('creoChatHistory', JSON.stringify(this.messageHistory));
    }

    restoreMessages() {
        this.messageHistory.forEach(msg => {
            this.addMessage(msg.text, msg.side, false);
        });
    }

    createUI() {
        const chatbotHTML = `
            <div id="creo-chatbot" class="creo-chatbot">
                <div class="chat-window glass-card" role="dialog" aria-modal="true" aria-labelledby="chat-title" aria-hidden="true">
                    <div class="chat-header">
                        <div class="header-info">
                            <div class="status-dot"></div>
                            <span class="bot-name" id="chat-title">ORION AI</span>
                        </div>
                        <button class="chat-close" aria-label="Close chat"><ion-icon name="close-outline"></ion-icon></button>
                    </div>
                    <div id="chat-messages" class="chat-messages" role="log" aria-live="polite"></div>
                    <div id="typing-indicator" class="typing-indicator">Orion is thinking...</div>
                    <div class="chat-input-area">
                        <input type="text" id="chat-input" placeholder="Ask Orion anything..." autocomplete="off" aria-label="Ask Orion anything">
                        <button id="chat-send" aria-label="Send message"><ion-icon name="paper-plane-outline"></ion-icon></button>
                    </div>
                </div>
                <button class="chat-trigger" aria-label="Open chat with Orion" aria-expanded="false" aria-controls="creo-chatbot">
                    <img src="./assets/images/robot-avatar.png" alt="Orion AI" class="robot-avatar-img">
                </button>
            </div>
            <a href="https://wa.me/264812442161" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
                <ion-icon name="logo-whatsapp"></ion-icon>
            </a>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);

        this.window = document.querySelector('.chat-window');
        this.trigger = document.querySelector('.chat-trigger');
        this.input = document.querySelector('#chat-input');
        this.sendBtn = document.querySelector('#chat-send');
        this.messagesContainer = document.querySelector('#chat-messages');
        this.closeBtn = document.querySelector('.chat-close');
        this.typingIndicator = document.querySelector('#typing-indicator');

        if (this.window) {
            this.window.setAttribute('aria-hidden', 'true');
        }

        if (this.messagesContainer) {
            this.messagesContainer.setAttribute('aria-live', 'polite');
        }
    }

    addEventListeners() {
        this.trigger.addEventListener('click', () => this.toggle());
        this.closeBtn.addEventListener('click', () => this.toggle());
        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.window.contains(e.target) && !this.trigger.contains(e.target)) {
                this.toggle();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (this.isOpen && e.key === 'Escape') {
                this.toggle();
            }
        });
    }

    addQuickActions() {
        const quickActionsHTML = `
            <div class="quick-actions">
                <button class="quick-action" data-action="portfolio" aria-label="View Portfolio">
                    <ion-icon name="grid-outline"></ion-icon>
                    <span>Portfolio</span>
                </button>
                <button class="quick-action" data-action="quote" aria-label="Get Quote">
                    <ion-icon name="pricetag-outline"></ion-icon>
                    <span>Get Quote</span>
                </button>
                <button class="quick-action" data-action="call" aria-label="Call Us">
                    <ion-icon name="call-outline"></ion-icon>
                    <span>Call Us</span>
                </button>
                <button class="quick-action" data-action="services" aria-label="Services">
                    <ion-icon name="apps-outline"></ion-icon>
                    <span>Services</span>
                </button>
                <button class="quick-action clear-chat" data-action="clear" aria-label="Clear Chat">
                    <ion-icon name="trash-outline"></ion-icon>
                    <span>Clear</span>
                </button>
            </div>
        `;
        this.messagesContainer.insertAdjacentHTML('beforebegin', quickActionsHTML);

        // Add event listeners to quick action buttons
        document.querySelectorAll('.quick-action').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuickAction(e));
        });
    }

    addKeyboardShortcut() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    handleQuickAction(e) {
        const action = e.currentTarget.dataset.action;
        switch (action) {
            case 'portfolio':
                this.addMessage("Show me the portfolio", 'user');
                this.addMessage("Certainly! Visit our <a href='portfolio.html' target='_blank' style='color: var(--cyan); text-decoration: underline;'>Portfolio section</a> to see diverse projects across various industries. We showcase our expertise in content production, digital management, events, and podcasting.", 'bot');
                break;
            case 'quote':
                this.addMessage("I want a quote", 'user');
                this.addMessage("I'd be happy to help you get a quote! Please visit our <a href='contact.html' target='_blank' style='color: var(--cyan); text-decoration: underline;'>Contact page</a> to provide details about your project, and we'll get back to you with a customized quote.", 'bot');
                break;
            case 'call':
                this.addMessage("I want to call you", 'user');
                this.addMessage("You can reach us at <a href='tel:0812674321' style='color: var(--cyan); text-decoration: underline;'>081 267 4321</a> or message us on WhatsApp for immediate assistance.", 'bot');
                break;
            case 'services':
                this.addMessage("Tell me about your services", 'user');
                this.addMessage("We specialize in four main pillars: <strong>Content Production</strong> (video, photography, graphics), <strong>Digital Management</strong> (web design, social media, digital strategy), <strong>Event Management</strong> (corporate events, activations, conferences), and <strong>Podcasting</strong> (studio production, audio editing, distribution). Would you like to learn more about any specific service?", 'bot');
                break;
            case 'clear':
                this.clearChat();
                break;
        }
    }

    clearChat() {
        this.messageHistory = [];
        this.messagesContainer.innerHTML = '';
        this.saveToSession();
        this.greet();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('active', this.isOpen);
        this.trigger.classList.toggle('active', this.isOpen);
        this.trigger.setAttribute('aria-expanded', String(this.isOpen));
        this.window.setAttribute('aria-hidden', String(!this.isOpen));

        // Random spin animation
        const spinClasses = ['spin-cw', 'spin-ccw', 'spin-double'];
        const randomClass = spinClasses[Math.floor(Math.random() * spinClasses.length)];

        this.trigger.classList.add(randomClass);
        setTimeout(() => this.trigger.classList.remove(randomClass), 1000);

        if (this.isOpen) {
            this.input.focus();
        }
    }

    greet() {
        const msg = chatbotKnowledge.greeting.responses[Math.floor(Math.random() * chatbotKnowledge.greeting.responses.length)];
        this.addMessage(msg, 'bot');
    }

    handleSend() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.input.value = '';
        this.getResponse(text);
    }

    async getResponse(query) {
        this.showTyping(true);

        try {
            await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));

            let foundResponse = null;
            const normalizedQuery = query.toLowerCase();

            // Check for greetings first
            if (chatbotKnowledge.greeting.keywords.some(k => normalizedQuery.includes(k))) {
                foundResponse = chatbotKnowledge.greeting.responses[Math.floor(Math.random() * chatbotKnowledge.greeting.responses.length)];
            } else {
                // Check other intents
                for (const intent of chatbotKnowledge.intents) {
                    if (intent.keywords.some(k => normalizedQuery.includes(k))) {
                        foundResponse = intent.responses[Math.floor(Math.random() * intent.responses.length)];
                        break;
                    }
                }
            }

            if (!foundResponse) {
                foundResponse = chatbotKnowledge.default[Math.floor(Math.random() * chatbotKnowledge.default.length)];
            }

            this.showTyping(false);
            this.addMessage(foundResponse, 'bot');
        } catch (error) {
            console.error('Error getting response:', error);
            this.showTyping(false);
            this.addMessage("I'm having trouble processing your request. Please try again.", 'bot');
        }
    }

    addMessage(text, side, save = true) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const msgEl = document.createElement('div');
        msgEl.className = `message ${side}`;
        msgEl.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-timestamp">${timestamp}</div>
        `;
        this.messagesContainer.appendChild(msgEl);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        if (save) {
            this.messageHistory.push({ text, side, timestamp });
            this.saveToSession();
        }
    }

    showTyping(show) {
        this.typingIndicator.style.display = show ? 'block' : 'none';
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.orionAssistant = new CreoChatbot();
});