const eventSource = new EventSource('http://localhost:3000/events')
const output = document.getElementById('output')

eventSource.addEventListener('message', (event) => {
  output.textContent = event.data
})
