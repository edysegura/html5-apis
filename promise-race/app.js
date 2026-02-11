// implement the promise race to request two free cep rest api and return the first response
const cep1 = 'https://viacep.com.br/ws/01001000/json/'
const cep2 = 'https://cep.awesomeapi.com.br/json/01001000'
const cep3 = 'https://brasilapi.com.br/api/cep/v1/01001000'

Promise.race([
  fetch(cep1).then((response) => response.json()),
  fetch(cep2).then((response) => response.json()),
  fetch(cep3).then((response) => response.json()),
])
  .then((data) => {
    console.log('First response:', data)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
