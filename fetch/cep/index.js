const form = document.querySelector('form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  showCepData('loading...')
  showCepData(await fetchCep(form.cep.value))
})

function showCepData(cepData) {
  const pre = document.querySelector('pre')
  pre.textContent = JSON.stringify(cepData, null, 2)
}

async function fetchCep(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  const data = await response.json()
  return data
}
