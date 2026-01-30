const button = document.querySelector('[type="button"]')
const input = document.querySelector('input')

input.select()

input.oninput = (event) => {
  button.disabled = !event.target.value
}

button.addEventListener('click', async () => {
  const text = input.value
  await navigator.clipboard.writeText(text)
  button.value = 'Copied!'
  setTimeout(() => {
    button.value = 'Copy'
  }, 2000)
  addToLog(`Content copied: ${text}`)
})

function addToLog(text) {
  const textarea = document.querySelector('textarea')
  textarea.value += `[${Date.now()}] ${text}\n`
}

document.addEventListener('copy', (event) => {
  console.log('Content copied', event)
  const text = window.getSelection().toString()
  // const text = event.clipboardData.getData('text/plain')
  addToLog(`Content copied: ${text}`)
})

document.addEventListener('paste', (event) => {
  const text = event.clipboardData.getData('text/plain')
  addToLog(`Content pasted: ${text}`)
})
