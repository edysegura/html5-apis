function normalizeResponse(data) {
  const origin = data.logradouro
    ? 'viacep'
    : data.address_type
      ? 'cep.awesomeapi'
      : data.service
        ? 'brasilapi'
        : 'unknown'

  return {
    origin,
    cep: data.cep || '',
    street: data.logradouro || data.address || data.street || '',
    complement: data.complemento || '',
    district: data.bairro || data.district || data.neighborhood || '',
    city: data.localidade || data.city || '',
    state: data.uf || data.state || '',
    ddd: data.ddd || '',
    lat: data.lat || '',
    lng: data.lng || '',
  }
}

async function fetchCepData(cep) {
  const endpoints = [
    `https://viacep.com.br/ws/${cep}/json/`,
    `https://cep.awesomeapi.com.br/json/${cep}`,
    `https://brasilapi.com.br/api/cep/v1/${cep}`,
  ]

  const cepPromises = endpoints.map((endpoint) =>
    fetch(endpoint).then((response) => response.json()),
  )

  try {
    const data = await Promise.race(cepPromises)
    return normalizeResponse(data)
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

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
