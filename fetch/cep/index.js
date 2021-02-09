async function fetchCep() {
  const response = await fetch('https://viacep.com.br/ws/37540000/json/unicode/')
  const data = await response.json()
  console.log(data)
}

fetchCep()