const PORT = 3000
const HOST = 'localhost'

import http from 'node:http'

const server = http.createServer((request, response) => {
  if (request.url !== '/events') {
    response.writeHead(404, { 'Content-Type': 'text/plain' })
    response.end('Not Found')
    return
  }

  response.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  })

  response.flushHeaders()
  response.write(`data: connected at ${Date.now()}\n\n`)

  const intervalId = setInterval(() => {
    response.write(`data: tick ${Date.now()}\n\n`)
  }, 5000)

  request.on('close', () => {
    clearInterval(intervalId)
  })

  request.on('aborted', () => {
    clearInterval(intervalId)
  })
})

server.listen(PORT, HOST, () => {
  console.log(
    `Server running at http://${HOST}:${PORT}/events\n🛑 CTRL+C to stop`,
  )
})

// node server.js
