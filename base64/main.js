const inputEl = document.querySelector('#input');
const outputEl = document.querySelector('#output');
const copyBtn = document.querySelector('#copy');
const clearBtn = document.querySelector('#clear');

// Convert input to base64 on input change
inputEl.addEventListener('input', (e) => {
  const text = e.target.value;
  const base64 = btoa(text);
  outputEl.value = base64;
});

// Copy base64 output to clipboard
copyBtn.addEventListener('click', async () => {
  if (!outputEl.value) return;
  
  try {
    await navigator.clipboard.writeText(outputEl.value);
    copyBtn.innerText = 'Copied!';
    setTimeout(() => {
      copyBtn.innerText = 'Copy Base64';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
});

// Clear both input and output
clearBtn.addEventListener('click', () => {
  inputEl.value = '';
  outputEl.value = '';
});