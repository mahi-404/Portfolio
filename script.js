// Portfolio Content Data
const PORTFOLIO_DATA = {
    name: "Mahitha",
    role: "Aspiring Software Developer",
    skills: [
        { name: "Python" },
        { name: "Java" },
        { name: "C Programming" },
        { name: "DSA (Basics)" },
        { name: "DBMS (Basics)" },
        { name: "JavaScript" },
        { name: "HTML & CSS" },
        { name: "Git & GitHub" }
    ],
    projects: [
        {
            title: "Portfolio Website",
            desc: "Futuristic responsive bento-style portfolio with AI features.",
            tags: ["HTML", "Tailwind", "JS"],
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
        },
        
        {
            title: "SemEval Task 13",
            desc: "Detecting Machine-Generated Code with Multiple Progamming Languages & Scenarios.",
            tags: ["LLM", "Python", "ML"],
            img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=600"
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
            <div class="bento-card overflow-hidden group flex flex-col reveal" style="transition-delay: ${i * 100}ms">
                <div class="h-48 overflow-hidden relative">
                    <img src="${proj.img}" alt="${proj.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 class="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">${proj.title}</h3>
                        <p class="text-slate-400 text-sm line-clamp-2">${proj.desc}</p>
                    </div>
                    <div class="mt-4 flex flex-wrap gap-2">
                        ${proj.tags.map(tag => `<span class="text-[10px] uppercase font-black tracking-widest bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-md">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
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

const SYSTEM_PROMPT = `You are Mahitha's digital assistant. Mahitha is a Computer Science student and Software Developer.
Her skills include: ${PORTFOLIO_DATA.skills.map(s => s.name).join(', ')}.
Her projects include: ${PORTFOLIO_DATA.projects.map(p => p.title).join(', ')}.
Be professional, encouraging, and helpful. Keep responses concise (under 3 sentences).
If someone asks about hiring her, direct them to her contact form or email (yourmail@gmail.com).`;

const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatForm = document.getElementById('chat-form');
const chatWindow = document.getElementById('chat-window');
const toggleChat = document.getElementById('toggle-chat');
const closeChat = document.getElementById('close-chat');

// Mock responses for demo mode
const MOCK_RESPONSES = [
    "I'm currently in Demo Mode. Mahitha is skilled in Python, JavaScript, and Web Technologies!",
    "In the full version, I use Gemini to answer questions dynamically. For now: check out her projects section!",
    "Mahitha is passionate about creating clean, user-friendly applications.",
    "You can reach her at yourmail@gmail.com for opportunities."
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
