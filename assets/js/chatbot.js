/**
 * CREO-ORION AI ASSISTANT
 * A dynamic, personality-driven AI interface for Creo Media
 */

const chatbotKnowledge = {
    intents: [{
            keywords: ["service", "what do you do", "pillars", "offer"],
            responses: [
                "We dominate four core pillars: Content Production, Digital Management, Event Management, and Podcasting. Which one should we scale for you today?",
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
            keywords: ["price", "cost", "standard", "budget", "expensive"],
            responses: [
                "We deliver premium storytelling executed at global standards. Quality is our baseline, not a variable.",
                "Every project is unique. We attract global clients who value first-world standards of excellence. Let's discuss your specific mission.",
                "Our pricing reflects the high-energy brutalism and technical precision we bring to every frame and pixel."
            ]
        },
        {
            keywords: ["contact", "email", "talk", "reach", "call", "hello"],
            responses: [
                "The most direct line is hello@creomedia.com. Or head to our Contact page to start the briefing process.",
                "Ready to reach the forefront? Let's talk. You can find our details on the Contact page or ping hello@creomedia.com.",
                "Communication is the first step to innovation. Use our Contact link or email us at hello@creomedia.com."
            ]
        },
        {
            keywords: ["vision", "mission", "goal", "philosophy"],
            responses: [
                "Our vision? To compete internationally and empower the African creative ecosystem. We don't just follow standards—we set them.",
                "Every question deserves a creative answer. That's our brand heartbeat. We keep brands at the forefront of innovation.",
                "We make it our responsibility to keep our clients well-adjusted for stability and growth in the marketplace."
            ]
        },
        {
            keywords: ["who", "leadership", "team", "founder"],
            responses: [
                "Our leadership is driven by a singular mission to elevate African content. Check out our 'About' page for the full intelligence on the team.",
                "We are a collective of designers, creators, and strategists obsessed with perfection. We are Creo Media."
            ]
        },
        {
            keywords: ["timeline", "delivery", "schedule", "deadline"],
            responses: [
                "Project timelines vary by complexity. Simple projects take 2-3 weeks, while comprehensive campaigns can take 2-3 months. We provide estimates during consultation."
            ]
        },
        {
            keywords: ["international", "global", "worldwide", "abroad"],
            responses: [
                "Yes, we handle international projects with our global creator network. We've executed campaigns across 4 continents."
            ]
        },
        {
            keywords: ["portfolio", "examples", "work", "case study"],
            responses: [
                "Visit our Portfolio section to see diverse projects across industries. We showcase work in content production, digital management, events, and podcasting."
            ]
        },
        {
            keywords: ["process", "workflow", "steps", "procedure"],
            responses: [
                "After form submission, we schedule a 15-minute Discovery Call. If there's alignment, we issue a formal Protocol Proposal within 24 hours."
            ]
        },
        {
            keywords: ["payment", "billing", "invoice", "money"],
            responses: [
                "We offer transparent pricing with options for deposits and milestone-based billing. Payment terms are discussed during the proposal phase."
            ]
        },
        {
            keywords: ["support", "help", "assistance", "maintenance"],
            responses: [
                "We provide ongoing support and maintenance packages for our clients. Our 24/7 availability ensures your projects stay on track."
            ]
        },
        {
            keywords: ["content", "production", "video", "photography"],
            responses: [
                "Our content production covers video, photography, graphic design, copywriting, and social media content."
            ]
        },
        {
            keywords: ["digital", "management", "strategy", "online"],
            responses: [
                "Digital management includes website design, social media management, digital marketing strategies, and online brand presence."
            ]
        },
        {
            keywords: ["event", "management", "conference", "launch"],
            responses: [
                "Event management covers corporate events, brand activations, conferences, product launches, and brand experiences."
            ]
        },
        {
            keywords: ["podcasting", "audio", "studio", "recording"],
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
    greeting: [
        "Systems online. I am Orion. How can I help you redefine your brand today?",
        "Welcome to the Creo intelligence layer. What's on your creative radar?",
        "Orion initialized. Ready to bridge the gap between your brand and global standards."
    ],
    // Additional FAQs for enhanced functionality
    additional_faqs: [
        // Original additional FAQs
        {
            keywords: ["refund", "policy", "money back", "return"],
            responses: [
                "Our refund approach is tailored to each project and detailed in our agreement. Refunds typically depend on the current project phase and how much work has been completed."
            ]
        },
        {
            keywords: ["support", "after delivery", "maintenance", "ongoing"],
            responses: [
                "Absolutely! We craft bespoke support packages to guarantee your project's sustained success. These can be tailored specifically to your operational requirements."
            ]
        },
        {
            keywords: ["brand consistency", "guidelines", "identity", "standards"],
            responses: [
                "We construct thorough brand manuals and style frameworks to ensure uniformity across every customer interaction point and digital platform."
            ]
        },
        {
            keywords: ["technology", "stack", "frameworks", "tools"],
            responses: [
                "Our tech arsenal encompasses cutting-edge solutions like React, Vue, Next.js, Node.js, and cloud infrastructures from AWS and Google Cloud, selected based on your project's unique demands."
            ]
        },
        {
            keywords: ["revisions", "feedback", "changes", "iterations"],
            responses: [
                "Our agreements specify the number of revision cycles. We promote organized feedback mechanisms to ensure streamlined project development and client contentment."
            ]
        },

        // Service Page FAQs
        {
            keywords: ["response time", "reply time", "how long to respond", "turnaround"],
            responses: [
                "We typically review all submissions within 12 business hours. For time-sensitive production needs, our executive team receives immediate notifications."
            ]
        },
        {
            keywords: ["international projects", "global clients", "worldwide", "abroad"],
            responses: [
                "Certainly! While rooted in Namibia, our global creator network enables us to execute campaigns across multiple continents."
            ]
        },
        {
            keywords: ["onboarding", "getting started", "process", "initiation"],
            responses: [
                "Following form completion, we arrange a brief 15-minute Discovery Session. Upon mutual alignment, a formal proposal is delivered within 24 hours."
            ]
        },
        {
            keywords: ["pricing", "cost", "rates", "investment"],
            responses: [
                "Our pricing structure is tailored to project scope. We provide transparent packages engineered to produce premium outcomes at competitive prices."
            ]
        },
        {
            keywords: ["timeline", "duration", "project length", "delivery time"],
            responses: [
                "Delivery schedules vary with project complexity. Basic projects might span 2-3 weeks, whereas comprehensive initiatives can range from 2-3 months. Detailed estimates are provided during consultation."
            ]
        },
        {
            keywords: ["examples", "past work", "portfolio", "showcase"],
            responses: [
                "Our Portfolio section displays a variety of projects spanning multiple sectors. You'll find our work showcased in content creation, digital strategies, events, and podcast production."
            ]
        },

        // Contact Page FAQs (exact text from the page)
        {
            keywords: ["response time", "reply time", "how long to respond", "turnaround"],
            responses: [
                "We review all intake forms within 12 business hours. For urgent production requests, our executive team is notified immediately."
            ]
        },
        {
            keywords: ["international projects", "global clients", "worldwide", "abroad"],
            responses: [
                "Yes. While based in Africa, we have a global creator network and have executed campaigns across 4 continents."
            ]
        },
        {
            keywords: ["onboarding", "getting started", "process", "initiation"],
            responses: [
                "After form submission, we schedule a 15-minute Discovery Call. If there's alignment, we issue a formal Protocol Proposal within 24 hours."
            ]
        },
        {
            keywords: ["services", "what do you offer", "offerings"],
            responses: [
                "We specialize in Content Production, Digital Management, Event Management, and Podcasting. Each service is tailored to elevate your brand presence."
            ]
        },
        {
            keywords: ["pricing", "cost", "rates", "investment"],
            responses: [
                "Our pricing is customized based on project scope and requirements. We offer transparent packages designed to deliver premium results at competitive rates."
            ]
        },
        {
            keywords: ["timeline", "duration", "project length", "delivery time"],
            responses: [
                "Timeline varies by project complexity. Simple projects may take 2-3 weeks, while comprehensive campaigns can take 2-3 months. We provide estimates during consultation."
            ]
        },
        {
            keywords: ["international clients", "global clients", "worldwide", "abroad"],
            responses: [
                "Absolutely! Though based in Namibia, we serve clients globally with our advanced digital collaboration tools and global creator network."
            ]
        },
        {
            keywords: ["examples", "past work", "portfolio", "showcase"],
            responses: [
                "Yes, visit our Portfolio section to see diverse projects across various industries. We showcase our work in content production, digital management, events, and podcasting."
            ]
        }
    ]
};

// Merge additional FAQs into intents
chatbotKnowledge.intents = chatbotKnowledge.intents.concat(chatbotKnowledge.additional_faqs);
// Remove the additional_faqs property to prevent duplication
delete chatbotKnowledge.additional_faqs;

class CreoChatbot {
    constructor() {
        this.isOpen = false;
        this.createUI();
        this.addEventListeners();
        this.greet();
    }

    createUI() {
        const chatbotHTML = `
            <div id="creo-chatbot" class="creo-chatbot">
                <div class="chat-window glass-card">
                    <div class="chat-header">
                        <div class="header-info">
                            <div class="status-dot"></div>
                            <span class="bot-name">ORION AI</span>
                        </div>
                        <button class="chat-close"><ion-icon name="close-outline"></ion-icon></button>
                    </div>
                    <div id="chat-messages" class="chat-messages"></div>
                    <div id="typing-indicator" class="typing-indicator">Orion is thinking...</div>
                    <div class="chat-input-area">
                        <input type="text" id="chat-input" placeholder="Ask Orion anything..." autocomplete="off">
                        <button id="chat-send"><ion-icon name="paper-plane-outline"></ion-icon></button>
                    </div>
                </div>
                <button class="chat-trigger hero-btn-primary">
                    <ion-icon name="sparkles-outline" class="trigger-icon"></ion-icon>
                    <ion-icon name="close-outline" class="close-icon"></ion-icon>
                </button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);

        this.window = document.querySelector('.chat-window');
        this.trigger = document.querySelector('.chat-trigger');
        this.input = document.querySelector('#chat-input');
        this.sendBtn = document.querySelector('#chat-send');
        this.messagesContainer = document.querySelector('#chat-messages');
        this.closeBtn = document.querySelector('.chat-close');
        this.typingIndicator = document.querySelector('#typing-indicator');
    }

    addEventListeners() {
        this.trigger.addEventListener('click', () => this.toggle());
        this.closeBtn.addEventListener('click', () => this.toggle());
        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('active', this.isOpen);
        this.trigger.classList.toggle('active', this.isOpen);
        if (this.isOpen) this.input.focus();
    }

    greet() {
        const msg = chatbotKnowledge.greeting[Math.floor(Math.random() * chatbotKnowledge.greeting.length)];
        this.addMessage(msg, 'bot');
    }

    handleSend() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.input.value = '';
        this.getResponse(text);
    }



    addMessage(text, side) {
        const msgEl = document.createElement('div');
        msgEl.className = `message ${side}`;
        msgEl.innerHTML = `<div class="message-content">${text}</div>`;
        this.messagesContainer.appendChild(msgEl);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    showTyping(show) {
        this.typingIndicator.style.display = show ? 'block' : 'none';
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    // Enhanced matching algorithm with better scoring
    async getResponse(query) {
        this.showTyping(true);

        try {
            await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));

            let foundResponse = null;
            const normalizedQuery = query.toLowerCase();

            // Enhanced matching algorithm with better scoring
            let bestMatch = null;
            let bestScore = 0;

            for (const intent of chatbotKnowledge.intents) {
                let score = 0;

                // Score based on keyword matches
                for (const keyword of intent.keywords) {
                    if (normalizedQuery.includes(keyword)) {
                        score += 1;
                    } else if (this.calculateSimilarity(normalizedQuery, keyword) > 0.6) {
                        // Partial match based on similarity
                        score += 0.5;
                    }
                }

                // Boost score if multiple keywords match
                const matchedKeywords = intent.keywords.filter(k => normalizedQuery.includes(k)).length;
                if (matchedKeywords > 1) {
                    score *= matchedKeywords;
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = intent;
                }
            }

            if (bestMatch && bestScore > 0) {
                foundResponse = bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)];
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

    // Helper function to calculate string similarity
    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;

        if (longer.length === 0) {
            return 1.0;
        }

        const editDistance = this.levenshteinDistance(longer.toLowerCase(), shorter.toLowerCase());
        return (longer.length - editDistance) / longer.length;
    }

    levenshteinDistance(str1, str2) {
        const matrix = Array(str2.length + 1).fill().map(() => Array(str1.length + 1).fill(0));

        for (let i = 0; i <= str1.length; i++) {
            matrix[0][i] = i;
        }

        for (let j = 0; j <= str2.length; j++) {
            matrix[j][0] = j;
        }

        for (let j = 1; j <= str2.length; j++) {
            for (let i = 1; i <= str1.length; i++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(
                    matrix[j][i - 1] + 1,
                    matrix[j - 1][i] + 1,
                    matrix[j - 1][i - 1] + cost
                );
            }
        }

        return matrix[str2.length][str1.length];
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.orionAssistant = new CreoChatbot();
});