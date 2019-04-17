'use strict'

document.addEventListener('copy', event => {
  console.log('Content copied')
})

document.addEventListener('cut', event => {
  console.log(event.target.value)
})

document.addEventListener('paste', event => {
  console.log(event.clipboardData.getData('text/plain'))
})
