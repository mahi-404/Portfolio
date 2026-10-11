// Portfolio Content Data
const PORTFOLIO_DATA = {
    name: "Mahitha",
    role: "Software Developer & CSE Student",
    skills: [
        { name: "C++ (DSA & Systems)" },
        { name: "Python (AI / ML)" },
        { name: "React.js & Vite" },
        { name: "Node.js & Express" },
        { name: "FastAPI" },
        { name: "JavaScript & TypeScript" },
        { name: "MongoDB & MySQL" },
        { name: "Tailwind CSS" },
        { name: "Git & GitHub" },
        { name: "Machine Learning / NLP" }
    ],
    projects: [
        {
            title: "Evidence-Aware Fake News Verification",
            desc: "Hybrid transformer framework with DeBERTa NLI cross-encoder, FAISS & BM25 retrieval for explainable claim verification.",
            tags: ["Python", "NLP", "FastAPI", "FAISS"],
            img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600",
            link: "https://github.com/mahi-404/Fake-News-Verification"
        },
        {
            title: "File Compression Tool (Huffman Coding)",
            desc: "Modular C++17 lossless compression tool using Huffman greedy tree algorithm, min-priority queues, and bit-level binary packing.",
            tags: ["C++17", "DSA", "Algorithms", "Binary I/O"],
            img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
            link: "https://github.com/mahi-404/File_Compression-Tool"
        },
        {
            title: "Expensio – Student Expense Tracker",
            desc: "Full-stack MERN application for tracking solo expenses, managing group bill splits, settlements, and UPI payment simulation.",
            tags: ["React", "Node.js", "MongoDB", "Tailwind"],
            img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
            link: "https://github.com/mahi-404/Expensio"
        },
        {
            title: "AISpend Audit",
            desc: "Startup-grade AI cost optimization platform engineered to audit, monitor, and reduce AI infrastructure and cloud spend.",
            tags: ["TypeScript", "AI Cloud", "Optimization", "Audit"],
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
            link: "https://github.com/mahi-404/AISpend_Audit"
        },
        {
            title: "Edumentor-AI",
            desc: "Intelligent learning platform bridging students and mentors through AI-powered tutoring and real-time progress tracking.",
            tags: ["Python", "AI Tutoring", "Full-Stack", "EdTech"],
            img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=600",
            link: "https://github.com/mahi-404/Edumentor-AI"
        },
        {
            title: "Electricity Load Forecasting",
            desc: "Predictive machine learning models forecasting regional grid electrical demand using agricultural and weather indicators.",
            tags: ["Machine Learning", "Python", "Data Science", "Pandas"],
            img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600",
            link: "https://github.com/mahi-404/Electricity-load-forecasting"
        }
    ]
};

// 1. Initial Content Rendering
function initPortfolio() {
    // Render Skills
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
        skillsGrid.innerHTML = PORTFOLIO_DATA.skills.map(skill => `
            <div class="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all flex items-center justify-center text-center group">
                <span class="font-bold text-slate-300 text-sm tracking-wide group-hover:text-cyan-400 transition-colors">${skill.name}</span>
            </div>
        `).join('');
    }

    // Render Projects
    const projectsGrid = document.getElementById('projects');
    if (projectsGrid) {
        projectsGrid.innerHTML = PORTFOLIO_DATA.projects.map((proj, i) => `
            <a href="${proj.link || '#'}" target="_blank" rel="noopener noreferrer" class="bento-card overflow-hidden group flex flex-col reveal" style="transition-delay: ${i * 100}ms">
                <div class="h-48 overflow-hidden relative">
                    <img src="${proj.img}" alt="${proj.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-bold group-hover:text-cyan-400 transition-colors">${proj.title}</h3>
                            <svg class="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </div>
                        <p class="text-slate-400 text-sm line-clamp-2">${proj.desc}</p>
                    </div>
                    <div class="mt-4 flex flex-wrap gap-2">
                        ${proj.tags.map(tag => `<span class="text-[10px] uppercase font-black tracking-widest bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-md">${tag}</span>`).join('')}
                    </div>
                </div>
            </a>
        `).join('');
    }

    setupInteractions();
}

// 2. Interaction Handlers
function setupInteractions() {
    // Mouse Spotlight Effect
    document.addEventListener('mousemove', e => {
        const cards = document.querySelectorAll('.bento-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        // Parallax glows
        const glow1 = document.getElementById('glow-1');
        const glow2 = document.getElementById('glow-2');
        if (glow1) glow1.style.transform = `translate(${e.clientX * 0.02}px, ${e.clientY * 0.02}px)`;
        if (glow2) glow2.style.transform = `translate(${-e.clientX * 0.02}px, ${-e.clientY * 0.02}px)`;
    });

    // Reveal Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate bars inside the skills section
                const bars = entry.target.querySelectorAll('[data-target]');
                bars.forEach(bar => {
                    setTimeout(() => {
                        bar.style.width = bar.dataset.target + '%';
                    }, 400);
                });
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Scroll Progress
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const bar = document.getElementById("progress-bar");
        if (bar) bar.style.width = scrolled + "%";
    });
}

// 3. Gemini AI Logic
let aiAvailable = false;
let model = null;

async function initAI() {
    try {
        // Attempt dynamic import for robustness on file:// protocol
        // Note: This matches the import map or direct URL
        const { GoogleGenAI } = await import("https://esm.sh/@google/genai@^1.34.0");

        if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
            const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
            model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            aiAvailable = true;
        } else {
            console.log("No API Key found. Using Mock Mode.");
        }
    } catch (e) {
        console.log("AI features disabled or blocked by protocol (Demo Mode Active).", e);
    }
}

// Initialize AI immediately (async)
initAI();

const SYSTEM_PROMPT = `You are Mahitha's digital assistant. Mahitha is a Computer Science Engineering student at IIIT Dharwad and Software Developer.
Her skills include: ${PORTFOLIO_DATA.skills.map(s => s.name).join(', ')}.
Her projects include: ${PORTFOLIO_DATA.projects.map(p => p.title).join(', ')}.
Be professional, encouraging, and helpful. Keep responses concise (under 3 sentences).
If someone asks about hiring or contacting her, direct them to her contact form or email (mahitha.kolla@gmail.com).`;

const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatForm = document.getElementById('chat-form');
const chatWindow = document.getElementById('chat-window');
const toggleChat = document.getElementById('toggle-chat');
const closeChat = document.getElementById('close-chat');

// Mock responses for demo mode
const MOCK_RESPONSES = [
    "I'm currently in Demo Mode. Mahitha is skilled in C++, Python, React, Node.js, and Machine Learning!",
    "In the full version, I use Gemini to answer questions dynamically. Check out her featured projects like Fake News Verification, Huffman Compression, and Expensio!",
    "Mahitha is passionate about building scalable full-stack applications, efficient algorithms, and AI solutions.",
    "You can reach her at mahitha.kolla@gmail.com for opportunities and collaborations!"
];

if (toggleChat) {
    toggleChat.onclick = () => {
        const isHidden = chatWindow.classList.contains('hidden');
        if (isHidden) {
            chatWindow.classList.remove('hidden');
            setTimeout(() => {
                chatWindow.style.opacity = '1';
                chatWindow.style.transform = 'translateY(0)';
            }, 10);
        } else {
            hideChatWindow();
        }
    };
}

function hideChatWindow() {
    chatWindow.style.opacity = '0';
    chatWindow.style.transform = 'translateY(1rem)';
    setTimeout(() => chatWindow.classList.add('hidden'), 500);
}

if (closeChat) closeChat.onclick = hideChatWindow;

if (chatForm) {
    chatForm.onsubmit = async (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (!msg) return;

        appendMsg('user', msg);
        chatInput.value = '';

        const loader = appendMsg('model', '...');

        if (aiAvailable && model) {
            try {
                const result = await model.generateContent([SYSTEM_PROMPT, msg]);
                const response = await result.response;
                loader.textContent = response.text();
            } catch (err) {
                console.error(err);
                loader.textContent = "I'm having trouble connecting to the neural net. Try again later!";
            }
        } else {
            // Simulate network delay for realism
            setTimeout(() => {
                const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
                loader.textContent = `(Demo) ${randomResponse}`;
            }, 1000);
        }
    };
}

function appendMsg(role, text) {
    const wrapper = document.createElement('div');
    wrapper.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'} chat-msg-animation`;
    wrapper.innerHTML = `
        <div class="max-w-[85%] ${role === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-white/5 border border-white/5 rounded-bl-none'} px-4 py-3 rounded-2xl text-sm leading-relaxed">
            ${text}
        </div>
    `;
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return wrapper.querySelector('div');
}

// 4. Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formSubmit = document.getElementById('form-submit');

if (contactForm) {
    contactForm.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);

        formSubmit.textContent = "Sending...";
        formSubmit.classList.add('animate-pulse');
        formSubmit.disabled = true;

        try {
            // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
            const response = await fetch("https://formspree.io/f/xykzrjwe", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formSubmit.textContent = "Message Sent!";
                formSubmit.classList.replace('bg-cyan-600', 'bg-green-600');
                formSubmit.classList.remove('animate-pulse');
                contactForm.reset();
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    throw new Error(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    throw new Error("Oops! There was a problem submitting your form");
                }
            }
        } catch (error) {
            formSubmit.textContent = "Error! Try Again.";
            formSubmit.classList.replace('bg-cyan-600', 'bg-red-600');
            console.error(error);
        } finally {
            formSubmit.disabled = false;
            setTimeout(() => {
                formSubmit.textContent = "Send Message";
                formSubmit.classList.remove('bg-green-600', 'bg-red-600');
                formSubmit.classList.add('bg-cyan-600');
            }, 5000);
        }
    };
}

// Bootstrap
window.onload = initPortfolio;
