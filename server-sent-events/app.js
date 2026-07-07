const eventSource = new EventSource('http://localhost:3000/events')
const output = document.getElementById('output')
const status = document.getElementById('status')

const formatTimestamp = () => {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

const appendMessage = (data) => {
  const entry = document.createElement('div')
  entry.className = 'stream-entry'

  const time = document.createElement('span')
  time.className = 'stream-time'
  time.textContent = formatTimestamp()

  const message = document.createElement('span')
  message.className = 'stream-data'
  message.textContent = data

  entry.append(time, message)
  output.appendChild(entry)
  output.scrollTop = output.scrollHeight
}

status.textContent = 'Connecting…'
status.dataset.state = 'connecting'

const handleError = () => {
  status.textContent = 'Disconnected'
  status.dataset.state = 'error'
}

eventSource.addEventListener('open', () => {
  status.textContent = 'Connected'
  status.dataset.state = 'success'
  appendMessage('Stream connected')
})

eventSource.addEventListener('message', (event) => {
  appendMessage(event.data)
})

eventSource.addEventListener('error', handleError)
