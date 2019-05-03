'use strict'

const worker = new Worker('js/worker.js')

worker.addEventListener('message', ({ data }) => {
  console.log(data)
})

worker.postMessage('Please do something')
