'use strict'

const button = document.querySelector('button')
button.addEventListener('click', () => {
  doSomethingInAnotherThread()
})

function doSomethingInAnotherThread() {
  const worker = new Worker('js/worker.js')
  worker.addEventListener('message', ({ data }) => {
    showOutput(data)
    worker.terminate() // it is important to terminate the worker when it is no longer needed
  })
  worker.postMessage('Please do something')
}

function showOutput(message) {
  const p = document.querySelector('p')
  p.textContent = message
}
