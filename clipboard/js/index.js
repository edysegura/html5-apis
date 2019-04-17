'use strict'

function addToLog(text) {
  const textarea = document.querySelector('textarea')
  textarea.value += text + '\n'
}

document.addEventListener('copy', event => {
  console.log('Content copied', event)
  addToLog('Content copied')
})

document.addEventListener('paste', event => {
  const text = event.clipboardData.getData('text/plain')
  addToLog(text)
})
