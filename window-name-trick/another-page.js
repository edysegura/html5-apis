if (window.name) {
  const pre = document.querySelector('pre')
  pre.textContent = window.name
}

const channel = new BroadcastChannel('my_channel')
channel.addEventListener('message', (event) => {
  console.log('Received:', event.data)
})
