const inputElement = document.querySelector('#input')
const outputElement = document.querySelector('#output')
const copyButton = document.querySelector('#copy')
const clearButton = document.querySelector('#clear')

// Convert input to base64 on input change
inputElement.addEventListener('input', (event) => {
  const text = event.target.value
  const base64 = btoa(text)
  outputElement.value = base64
})

// Copy base64 output to clipboard
copyButton.addEventListener('click', async () => {
  if (!outputElement.value) return

  try {
    await navigator.clipboard.writeText(outputElement.value)
    copyButton.innerText = 'Copied!'
    setTimeout(() => {
      copyButton.innerText = 'Copy Base64'
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
})

// Clear both input and output
clearButton.addEventListener('click', () => {
  inputElement.value = ''
  outputElement.value = ''
})
