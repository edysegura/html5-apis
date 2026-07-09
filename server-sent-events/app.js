import { appendMessage, handleError, updateStatus } from './helpers/index.js'

const eventSource = new EventSource('http://localhost:3000/events')

eventSource.addEventListener('open', () => {
  updateStatus()
  appendMessage('Stream connected')
})

eventSource.addEventListener('message', (event) => {
  appendMessage(event.data)
})

eventSource.addEventListener('error', handleError)
