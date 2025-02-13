const button = document.querySelector('button')
const input = document.querySelector('input')

input.oninput = (event) => {
  button.disabled = !event.target.value
}

button.addEventListener('click', async () => {
  const text = input.value
  await navigator.clipboard.writeText(text)
  button.textContent = 'Copied!'
  setTimeout(() => {
    button.textContent = 'Copy'
  }, 2000)
  addToLog(`Content copied: ${text}`)
})

function addToLog(text) {
  const textarea = document.querySelector('textarea')
  textarea.value += text + '\n'
}

document.addEventListener('copy', (event) => {
  console.log('Content copied', event)
  addToLog('Content copied')
})

document.addEventListener('paste', (event) => {
  const text = event.clipboardData.getData('text/plain')
  addToLog(`Content pasted: ${text}`)
})
