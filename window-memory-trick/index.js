const button = document.querySelector('button')
const input = document.querySelector('input')

button.addEventListener('click', () => {
  window.saveInMemory = { data: input.value, createdAt: Date.now() }
  button.textContent = 'Saved!'
  setTimeout(() => {
    button.textContent = 'Keep on memory'
  }, 2000)
})
