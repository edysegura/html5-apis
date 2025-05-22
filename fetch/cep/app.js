const form = document.querySelector('form')
const submitButton = document.querySelector('[type="submit"]')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  submitButton.setAttribute('aria-busy', true)
  showCepData(await fetchCep(form.cep.value))
  submitButton.setAttribute('aria-busy', false)
})

function showCepData(cepData) {
  const pre = document.querySelector('pre')
  pre.textContent = JSON.stringify(cepData, null, 2)
}

// TODO: implement the other endpoints with promise.race
async function fetchCep(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  const data = await response.json()
  return data
}
