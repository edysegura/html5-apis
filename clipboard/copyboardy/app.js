import clipboard from 'https://cdn.jsdelivr.net/npm/clipboardy@5.1.0/+esm'

const button = document.querySelector('[type="button"]')
const input = document.querySelector('input')

input.select()

input.oninput = (event) => {
  button.disabled = !event.target.value
}

button.addEventListener('click', handleCopyClick)
document.addEventListener('copy', copyHandler)
document.addEventListener('paste', pasteHandler)

async function handleCopyClick() {
  const text = input.value
  await clipboard.write(text)
  toggleButtonLabel()
  addToLog(`Content copied: ${text}`)
}

function toggleButtonLabel() {
  button.value = 'Copied!'
  setTimeout(() => {
    button.value = 'Copy'
  }, 2000)
}

function addToLog(text) {
  const textarea = document.querySelector('textarea')
  textarea.value += `[${Date.now()}] ${text}\n`
}

function copyHandler() {
  const text = window.getSelection().toString()
  addToLog(`Content copied: ${text}`)
}

async function pasteHandler() {
  const text = await clipboard.read()
  addToLog(`Content pasted: ${text}`)
}
