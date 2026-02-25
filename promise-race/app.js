import hljs from 'https://cdn.jsdelivr.net/npm/highlight.js@11.11.1/+esm'
import { fetchCepData } from './cep/cep.service.js'

const outputElement = document.getElementById('output')
try {
  const data = await fetchCepData('01310100')
  outputElement.textContent = JSON.stringify(data, null, 2)
  hljs.highlightElement(outputElement)
} catch (error) {
  console.error('Failed to fetch CEP data:', error)
  outputElement.textContent = `Failed to fetch CEP data. Error: ${error.message}`
}
