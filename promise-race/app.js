import { fetchCepData } from './cep/cep.service.js'

fetchCepData('01310100')
  .then((data) => {
    console.log('Normalized response:', data)
    document.getElementById('output').textContent = JSON.stringify(
      data,
      null,
      2,
    )
  })
  .catch((error) => {
    console.error('Failed to fetch CEP data:', error)
  })
