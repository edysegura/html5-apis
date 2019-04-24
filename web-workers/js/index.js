'use strict'

const worker = new Worker('js/worker.js')
const country = 'Cuba'

worker.addEventListener('message', event => {
  const total = event.data.length
  console.log(`There are ${total} people in ${country}`)
})

worker.postMessage(country)
