const button = document.querySelector('#trigger')
const eventLog = document.getElementById('eventLog')

const eventAwesome = new CustomEvent('awesome', {
  bubbles: true,
  detail: { text: () => 'Hello, World from a custom event!' },
})

document.addEventListener('awesome', (event) => {
  console.log(`👁️ [app.js] `, event.detail.text())
  eventLog.value = `[${new Date().toLocaleString()}] ${event.detail.text()}\n${eventLog.value}`
})

button.addEventListener('click', () => document.dispatchEvent(eventAwesome))
