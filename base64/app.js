const inputElement = document.querySelector('#input')
const outputElement = document.querySelector('#output')
const copyButton = document.querySelector('#copy')
const clearButton = document.querySelector('#clear')

inputElement.addEventListener('input', (event) => {
  const text = event.target.value
  const base64 = btoa(text)
  outputElement.value = base64
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
