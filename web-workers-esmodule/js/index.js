const worker = new Worker('js/worker.js', { type: 'module' })

worker.addEventListener('message', ({ data }) => {
  console.log(data)
})

worker.postMessage('Please do something')
