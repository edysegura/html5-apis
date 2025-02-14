const button = document.querySelector('button')
button.addEventListener('click', () => {
  doSomethingInAnotherThread()
})

function doSomethingInAnotherThread() {
  const url = new URL('worker.js', import.meta.url)
  const worker = new Worker(url, { type: 'module' })
  worker.addEventListener('message', ({ data }) => {
    showOutput(data)
    worker.terminate() // it is important to terminate the worker when it is no longer needed
  })
  worker.postMessage('Please do something')
}

function showOutput(message) {
  const outputElement = document.querySelector('pre')
  outputElement.textContent = message
}
