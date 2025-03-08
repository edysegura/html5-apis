const channel = new BroadcastChannel('my_channel_uniq_id')
const button = document.querySelector('button')

button.addEventListener('click', () => {
  channel.postMessage({ message: 'Hello from Page 1' })
  button.textContent = 'Sent!'
  setTimeout(() => {
    button.textContent = 'Send messages to another tab/window'
  }, 2000)
})
