const button = document.querySelector('button')
const input = document.querySelector('input')

button.addEventListener('click', () => {
  window.name = JSON.stringify(
    { data: input.value, createdAt: Date.now() },
    null,
    2,
  )
  button.textContent = 'Saved!'
  setTimeout(() => {
    button.textContent = 'Keep on memory'
  }, 2000)
})
