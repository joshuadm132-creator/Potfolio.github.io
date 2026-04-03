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


function QuoteRotateSystem(domElement, quoteArray) {
    if (!domElement || !quoteArray.length) return;//defensive code

    //Get the current index from the element's data attribute (default to 0)
    let currentIndex = Math.floor(Math.random() * quoteArray.length);
    console.log(currentIndex)
    const selected = quoteArray[currentIndex];
    const pTag = domElement.querySelector('p');
    const spanTag = domElement.querySelector('span');

    if (pTag) pTag.innerText = `"${selected.text}"`;
    if (spanTag) {
        const logTag = selected.tag || "SYSTEM_LOG";
        spanTag.innerText = `— ${selected.author} // ${logTag}`;
    }

}

const mythBox = document.getElementsByClassName('myth-quote');
const philosophyQuotes = [
    { text: "One must imagine Sisyphus happy.", author: "Albert Camus", tag: "ABSURD_LOG" },
    { text: "He who has a why to live for can bear almost any how.", author: "Nietzsche", tag: "MEANING_LOG" }, 
    { text: "The struggle itself toward the heights is enough to fill a man's heart. One must imagine Sisyphus happy.", author: "Albert Camus", tag: "SYSTEM_RESILIENCE" },
    { text: "In the midst of winter, I found there was, within me, an invincible summer.", author: "Albert Camus", tag: "INTERNAL_RESOURCES" },
     { text: "It is not titles that honor men, but men that honor titles.", author: "Niccolò Machiavelli", tag: "INTEGRITY_CHECK" },
    { text: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.", author: "Marcus Aurelius", tag: "DATA_VALIDATION" }

];

const bibleQuotes = [
    { text: "The light shines in the darkness, and the darkness has not overcome it.", author: "John 1:5", tag: "FAITH_LOG" },
    { text: "Be strong and courageous. Do not be afraid; do not be discouraged.", author: "Joshua 1:9", tag: "STRENGTH_LOG" },
     { text: "Two things I ask of you, LORD; do not refuse me before I die: Keep falsehood and lies far from me; give me neither poverty nor riches, but give me only my daily bread. Otherwise, I may have too much and disown you and say, 'Who is the LORD? ' Or I may become poor and steal, and so dishonor the name of my God.", author: "proverbs 30 vs 7-9", tag: "WISDOM_LOG" },
    { text: "tells us, “What, then, shall we say in response to these things? If God is for us, who can be against us?", author: "Romans 8:31", tag: "STRENGTH_LOG" },
     { text: "And now these three remain: faith, hope and love. But the greatest of these is love.", author: "1 Corinthians 13:13", tag: "LOVE_LOG" }
];

const mythologyQuotes = [
    { 
        text: "I do not rule a kingdom of evil, but a kingdom of truth. Here, the mask falls.", 
        author: "On Hades", 
        tag: "TRUTH_LOG" 
    },
    { 
        text: "He is the just one, who with a firm hand holds the keys and judges the dead.", 
        author: "Sophocles", 
        tag: "JUSTICE_CORE" 
    },
    { 
        text: "Men fear the dark, not for what it is, but for what they imagine it to be.", 
        author: "Aidoneus", 
        tag: "SUBVERSION_LOG" 
    },
    { 
        text: "I would give up the sun and the stars to walk beside you in the silence.", 
        author: "The Devotion of Hades", 
        tag: "LOYALTY_VAL" 
    }
];

// Start the 3-second cycles
if (mythBox[1]) {
    setInterval(() => {
        QuoteRotateSystem(mythBox[1], philosophyQuotes); 
         QuoteRotateSystem(mythBox[0], bibleQuotes);
          QuoteRotateSystem(mythBox[2], mythologyQuotes);
    }, 7000);
}

