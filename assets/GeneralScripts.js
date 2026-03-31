const linkData = [
    { id: 'scramble-text-1', text: 'Resume', url:'pages/Resume.html' },
    { id: 'scramble-text-2', text: 'About', url: '#' },
    { id: 'scramble-text-3', text: 'Projects', url: '#' },
    { id: 'scramble-text-4', text: 'Personal About', url: '#' },
    { id: 'scramble-text-5', text: 'Skills', url: '#' }
];

const decodingMessages = ["Decoding In progress", "Decoding In progress.", "Decoding In progress..", "Decoding In progress...", "Decoded"];
const chars = '!<>-_\\/[]{}—=+*^?#________';

let clickCount = 0;

console.log("Hieee I also do Cyber-Security, and web dev on the side")

function descramble(elementId, finalText, onComplete) {
    const el = document.getElementById(elementId);
    const decodeEl = document.getElementById('decoding-progress');
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

        // Update the Loading message based on local animation progress
        const progress = complete / finalText.length;
        const msgIndex = Math.floor(progress * (decodingMessages.length - 1));
        decodeEl.innerHTML = decodingMessages[msgIndex];

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
const decodeBtn = document.querySelector('button');

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
            }
        });
    }
});

// Initial sequence
window.onload = () => {
    descramble('scramble-text-welcome', 'Denzel Joshua Moffat');
};