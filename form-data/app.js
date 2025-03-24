const form = document.querySelector('form')
const pre = document.querySelector('pre')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  showFormValues(form)
})

function showFormValues(form) {
  const data = new FormData(form)
  const keys = new Set(data.keys())
  const formValues = []
  for (const key of keys) {
    formValues.push({ field: key, values: data.getAll(key) })
  }
  pre.textContent = JSON.stringify(formValues, null, 2)
}
