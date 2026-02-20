import { fetchCepData } from './cep/cep.service.js'

try {
  const outputElement = document.getElementById('output')
  const data = await fetchCepData('01310100')
  outputElement.textContent = JSON.stringify(data, null, 2)
} catch (error) {
  console.error('Failed to fetch CEP data:', error)
  outputElement.textContent = `Failed to fetch CEP data. Error: ${error.message}`
}
