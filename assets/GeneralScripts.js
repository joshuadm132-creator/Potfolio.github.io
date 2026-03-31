
const phrases = ['Denzel J Moffat.'];
const decoding = ["Decoding In progress", "Decoding In progress.", "Decoding In progress..", "Decoding In progress...", "Decoded"];

const el = document.getElementById('scramble-text-welcome');
const decodeEl = document.getElementById('decoding-progress');
const chars = '!<>-_\\/[]{}—=+*^?#________';

let frame = -50; // Starting slightly back for a delay

function scramble() {
  const targetText = phrases[0];
  let output = '';
  let complete = 0;

  // 1. Calculate Scramble Logic
  for (let i = 0; i < targetText.length; i++) {
    if (frame > i * 3) {
      output += targetText[i];
      complete++;
    } else {
      output += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  el.innerText = output;

  // 2. Loading Simulation Logic
  // We determine how far we are (from 0 to 1) based on 'complete' vs 'total length'
  const progress = complete / targetText.length;
  
  // Map that 0-1 value to the index of the 'decoding' array
  // We use Math.min to ensure we don't exceed the array length
  const decodeIndex = Math.floor(progress * (decoding.length - 1));
  decodeEl.innerText = decoding[decodeIndex];

  // 3. Continue or Finish
  if (complete < targetText.length) {
    frame++;
    requestAnimationFrame(scramble);
  } else {
    // Force the final "Decoded" message at the end
    decodeEl.innerText = decoding[decoding.length - 1];
    decodeEl.classList.add('finished'); 
  }
}

window.onload = scramble;
