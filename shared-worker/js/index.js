'use strict'

const sharedWorker = new SharedWorker('js/shared-worker.js')
sharedWorker.port.postMessage('index.html')

sharedWorker.port.onmessage = event => {
  console.log(event.data)
}