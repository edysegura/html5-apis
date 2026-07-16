const output = document.getElementById('output')
const status = document.getElementById('status')

status.textContent = 'Connecting…'
status.dataset.state = 'connecting'

const formatTimestamp = () => {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export const updateStatus = () => {
  status.textContent = 'Connected'
  status.dataset.state = 'connected'
}

export const handleError = () => {
  status.textContent = 'Disconnected'
  status.dataset.state = 'error'
}

export const appendMessage = (data) => {
  const entry = document.createElement('div')
  entry.className = 'stream-entry'

  const time = document.createElement('span')
  time.className = 'stream-time'
  time.textContent = formatTimestamp()

  const message = document.createElement('span')
  message.className = 'stream-data'
  message.textContent = data

  entry.append(time, message)
  output.insertBefore(entry, output.firstChild)
  output.scrollTop = 0
}
