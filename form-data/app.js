const form = document.querySelector('form')
const pre = document.querySelector('pre')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  showFormValues(form)
})

function showFormValues(form) {
  const data = new FormData(form)
  const fieldsName = Array.from(new Set(data.keys()))
  const formValues = fieldsName.map((fieldName) => ({
    fieldName,
    value: data.getAll(fieldName),
  }))
  pre.textContent = JSON.stringify(formValues, null, 2)
}
