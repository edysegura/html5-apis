const inputElement = document.querySelector('#input')
const outputElement = document.querySelector('#output')
const copyButton = document.querySelector('#copy')
const clearButton = document.querySelector('#clear')

handleConversion(inputElement, outputElement, btoa)
handleConversion(outputElement, inputElement, atob)

function handleConversion(sourceElement, targetElement, convertFn) {
  sourceElement.addEventListener('input', (event) => {
    const value = event.target.value
    if (!value) {
      targetElement.value = ''
      return
    }
    try {
      targetElement.value = convertFn(value)
    } catch (err) {
      console.error('Conversion failed:', err)
    }
  })
}

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
