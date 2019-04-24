'use strict'

const worker = new Worker('js/worker.js')

worker.addEventListener('message', event => {
  console.log(event.data)
})

worker.postMessage('Brasil')