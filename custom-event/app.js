const button = document.querySelector('#trigger')
const eventLog = document.getElementById('eventLog')

// Create a new event, allow bubbling, and provide any data you want to pass to the "detail" property
const eventAwesome = new CustomEvent('awesome', {
  bubbles: true,
  detail: { text: () => 'Hello, World from a custom event!' },
})

// The form element listens for the custom "awesome" event and then consoles the output of the passed text() method
document.addEventListener('awesome', (e) => {
  console.log(`👁️ [app.js] `, e.detail.text())
  eventLog.value += e.detail.text() + '\n'
})

// As the user types, the textarea inside the form dispatches/triggers the event to fire, and uses itself as the starting point
button.addEventListener('click', (e) => document.dispatchEvent(eventAwesome))
