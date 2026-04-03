const linkData = [
    { id: 'scramble-text-1', text: 'Resume', url:'pages/Resume.html' },
    { id: 'scramble-text-2', text: 'About', url: 'pages/about.html' },
    { id: 'scramble-text-3', text: 'Projects', url: 'pages/projects.html' },
    { id: 'scramble-text-5', text: 'Skills', url: 'pages/skills.html' }
];

const decodingMessages = ["Decoding In progress", "Decoding In progress.", "Decoding In progress..", "Decoding In progress...", "Decoded"];
const chars = '!<>-_\\/[]{}—=+*^?#________';

let clickCount = 0;

console.log("Hieee I also do Cyber-Security, and web dev on the side")
function descramble(elementId, finalText, onComplete) {
    const el = document.getElementById(elementId);
    const decodeEl = document.getElementById('decoding-progress');

    if (!el) return; // guard — stop if element doesn't exist
    
    let currentFrame = -50;

    function animate() {
        let output = '';
        let complete = 0;

        for (let i = 0; i < finalText.length; i++) {
            if (currentFrame > i * 3) {
                output += finalText[i];
                complete++;
            } else {
                output += chars[Math.floor(Math.random() * chars.length)];
            }
        }

        el.innerHTML = output;

        // Only update decoding-progress if it exists on this page
        if (decodeEl) {
            const progress = complete / finalText.length;
            const msgIndex = Math.floor(progress * (decodingMessages.length - 1));
            decodeEl.innerHTML = decodingMessages[msgIndex];
        }

        if (complete < finalText.length) {
            currentFrame++;
            requestAnimationFrame(animate);
        } else {
            if (onComplete) onComplete();
        }
    }
    animate();
}

// Button Interaction
const decodeBtn = document.getElementById('decode-btn');
if (decodeBtn) {
    decodeBtn.addEventListener('click', () => {
        if (clickCount < linkData.length) {
            const data = linkData[clickCount];
            const el = document.getElementById(data.id);
            
            // Disable button during animation to prevent overlap
            decodeBtn.disabled = true;

            descramble(data.id, data.text, () => {
                el.innerHTML = `<a href="${data.url}" class="decoded-link">${data.text}</a>`;
                clickCount++;
                
                if (clickCount < linkData.length) {
                    decodeBtn.disabled = false;
                    decodeBtn.innerText = `Decode Link ${clickCount + 1}`;
                } else {
                    decodeBtn.innerText = "System Fully Decoded";
                    maindecodebtn.innerText = "System Fully Decoded";
                    maindecodebtn.disabled = true;
                    maindecodebtn.style.display = "none"
                }
            });
        }
    });
}

const maindecodebtn = document.getElementById('main-decode-all-btn');
if (maindecodebtn) {
  maindecodebtn.addEventListener('click', () => {
    maindecodebtn.disabled = true;
    maindecodebtn.innerText = 'Decoding...';
    linkData.forEach((data) => {
        descramble(data.id, data.text, () => {
            const el = document.getElementById(data.id);
            el.innerHTML = `<a href="${data.url}" class="decoded-link">${data.text}</a>`;
            clickCount++;

            // Only finalize once the very last link is done
            if (clickCount >= linkData.length) {
                finalizeSystem();
            }
        });
    });
     maindecodebtn.innerText = "System Fully Decoded";
     decodeBtn.disabled = true;
     decodeBtn.innerText = "System Fully Decoded";
      maindecodebtn.style.display = "none"
  });
}



const toggle = document.getElementById('theme-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const html = document.documentElement;

    if (html.getAttribute('data-theme') === 'light') {
      html.removeAttribute('data-theme');
      toggle.innerText = 'Light Mode';
    } else {
      html.setAttribute('data-theme', 'light');
      toggle.innerText = 'Dark Mode';
    }
  });
}

// Initial sequence
window.onload = () => {
  const welcomeEl = document.getElementById('scramble-text-welcome');
  if (welcomeEl) {
    descramble('scramble-text-welcome', 'Denzel Joshua Moffat');
  }
};

// portfolio code//

// ── PROJECT CARD DECODE ──

const cardData = {
  1: {
    title: 'Pool Table Game',
    desc: 'A browser-based pool table game with realistic physics, ball collisions and table geometry.',
    skills: 'Physics engines, collision detection, game loops, vector mathematics'
  },
  2: {
    title: 'Music Visualizer',
    desc: 'Upload any audio file and watch real-time visual graphs representing frequency, amplitude and rhythm.',
    skills: 'Audio processing, FFT analysis, real-time data visualisation, file handling'
  },
  3: {
    title: '2D Game',
    desc: 'A Mario-inspired platformer built in the browser with custom level design and character movement.',
    skills: 'Platformer mechanics, sprite animation, tile maps, gravity simulation'
  },
  4: {
    title: 'Music ChatBot',
    desc: 'A conversational AI assistant that answers questions about music theory, artists and recommendations.',
    skills: 'Natural language processing, chatbot architecture, Python APIs'
  },
  5: {
    title: 'AI Image Filters',
    desc: 'Real-time face filters using AI vision and face mesh detection applied through the webcam.',
    skills: 'Machine learning in the browser, facial landmark detection, real-time image processing'
  }
};

function decodeCard(cardNumber, btn) {
  const data = cardData[cardNumber];
  if (!data) return;

  // Disable the button while decoding
  if (btn) btn.disabled = true;

  // Decode title first, then description, then skills in sequence
  descramble(`card-title-${cardNumber}`, data.title, () => {
    descramble(`card-desc-${cardNumber}`, data.desc, () => { 
        if (btn) btn.innerText = 'Decoded';
    });
  });
}

// Individual card buttons
const cardBtns = document.querySelectorAll('.decode-card-btn');
if (cardBtns.length > 0) {
  cardBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cardNumber = btn.dataset.card;
      decodeCard(cardNumber, btn);
    });
  });
}

// Decode All button
const decodeAllBtn = document.getElementById('decode-all-btn');
if (decodeAllBtn) {
  decodeAllBtn.addEventListener('click', () => {
    decodeAllBtn.disabled = true;
    let completed = 0;
    const total = Object.keys(cardData).length;

    cardBtns.forEach(btn => {
      const cardNumber = btn.dataset.card;
      btn.disabled = true;
      decodeCard(cardNumber, btn);
      completed++;
      if (completed === total) {
        decodeAllBtn.innerText = 'All Decoded';
      }
    });
  });
}

let currentSketch = null;
function loadDemo(projectUrl, title) {
    const stage = document.getElementById('demo-stage');
    const wrapper = document.getElementById('p5-canvas-wrapper');
    const titleEl = document.getElementById('demo-title');

    if (!stage || !wrapper) return;

    // 1. Reveal and Title
    stage.style.display = 'block';
    titleEl.innerText = title;

    // 2. Inject the Iframe
    // We use loading="lazy" for performance and allow="camera" for your AI filters
    wrapper.innerHTML = `
        <iframe 
            src="${projectUrl}" 
            title="${title}"
            style="width: 100%; height: 600px;border: none; overflow: hidden; background: #000;"
            scrolling="no">
            allow="camera; microphone; display-capture" 
            loading="lazy">
        </iframe>`;

    // 3. Smooth Scroll to the demo
    stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeDemo() {
    const stage = document.getElementById('demo-stage');
    const wrapper = document.getElementById('p5-canvas-wrapper');

    // 1. Wipe the iframe out of the DOM to stop all code execution
    if (wrapper) {
        wrapper.innerHTML = ''; 
    }

    // 2. Hide the section
    if (stage) {
        stage.style.display = 'none';
    }
}


  const bars = document.querySelectorAll('.skill-bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width + '%';
        observer.unobserve(bar);
      }
    });

  }, { threshold: 1 });

  bars.forEach(bar => observer.observe(bar));
