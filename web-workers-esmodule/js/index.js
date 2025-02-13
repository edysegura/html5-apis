const url = new URL('worker.js', import.meta.url)
const worker = new Worker(url, { type: 'module' })

worker.addEventListener('message', ({ data }) => {
  console.log(data)
})

worker.postMessage('Please do something')
