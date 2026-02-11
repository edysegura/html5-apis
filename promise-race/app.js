const cep = '01001000'
const endpoints = [
  `https://viacep.com.br/ws/${cep}/json/`,
  `https://cep.awesomeapi.com.br/json/${cep}`,
  `https://brasilapi.com.br/api/cep/v1/${cep}`,
]

const promises = endpoints.map((endpoint) =>
  fetch(endpoint).then((response) => response.json()),
)

Promise.race(promises)
  .then((data) => {
    console.log('First response:', data)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
