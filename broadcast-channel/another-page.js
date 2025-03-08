const channel = new BroadcastChannel('my_channel_uniq_id')
const textarea = document.querySelector('textarea')

channel.addEventListener('message', (event) => {
  textarea.value += event.data.message + '\n'
})
