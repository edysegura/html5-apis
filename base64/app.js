const inputElement = document.querySelector('#input')
const outputElement = document.querySelector('#output')
const copyButton = document.querySelector('#copy')
const clearButton = document.querySelector('#clear')

inputElement.addEventListener('input', (event) => {
  const text = event.target.value
  if (!text) {
    outputElement.value = ''
    return
  }
  try {
    const base64 = btoa(text)
    outputElement.value = base64
  } catch (err) {
    console.error('Failed to encode:', err)
  }
})

outputElement.addEventListener('input', (event) => {
  const base64 = event.target.value
  if (!base64) {
    inputElement.value = ''
    return
  }
  try {
    const text = atob(base64)
    inputElement.value = text
  } catch (err) {
    console.error('Invalid Base64:', err)
  }
})

copyButton.addEventListener('click', async () => {
  if (!outputElement.value) return
  try {
    await navigator.clipboard.writeText(outputElement.value)
    copiedNotify()
  } catch (err) {
    console.error('Failed to copy:', err)
  }
})

clearButton.addEventListener('click', () => {
  inputElement.value = ''
  outputElement.value = ''
})

function copiedNotify() {
  copyButton.innerText = 'Copied!'
  setTimeout(() => {
    copyButton.innerText = 'Copy Base64'
  }, 2000)
}
