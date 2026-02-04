const button = document.querySelector('[type="button"]')
const input = document.querySelector('input')

input.select()

button.addEventListener('click', handleCopyClick)
input.addEventListener('input', inputHandler)

document.addEventListener('copy', copyHandler)
document.addEventListener('paste', pasteHandler)

async function handleCopyClick() {
  const text = input.value
  await navigator.clipboard.writeText(text)
  toggleButtonLabel()
  addToLog(`Content copied: ${text}`)
}

function inputHandler(event) {
  button.disabled = !event.target.value
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

async function pasteHandler(event) {
  const text = event.clipboardData.getData('text/plain')
  addToLog(`Content pasted: ${text}`)
}
