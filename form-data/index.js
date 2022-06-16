const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const keys = new Set(data.keys())
  for (const key of keys) {
    console.log(data.getAll(key))
  }
})
