const form = document.getElementById('memoryForm')
const button = form.querySelector('button')
const input = form.querySelector('input')

function handleFormSubmit(event) {
  event.preventDefault()
  window.name = JSON.stringify(
    { data: input.value, createdAt: Date.now() },
    null,
    2,
  )
  button.textContent = 'Saved!'
  setTimeout(() => {
    button.textContent = 'Keep on memory'
  }, 2000)
}

form.addEventListener('submit', handleFormSubmit)

const channel = new BroadcastChannel('my_channel')
channel.postMessage({ data: 'Hello from Page 1' })
