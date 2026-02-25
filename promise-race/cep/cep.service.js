function findOrigin(endpoint) {
  if (endpoint.includes('viacep')) return 'viacep'
  if (endpoint.includes('awesomeapi')) return 'cep.awesomeapi'
  if (endpoint.includes('brasilapi')) return 'brasilapi'
  return 'unknown'
}

function normalizeResponse(data, endpoint) {
  const origin = findOrigin(endpoint)
  return {
    origin,
    endpoint,
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

export async function fetchCepData(cep) {
  const endpoints = [
    `https://viacep.com.br/ws/${cep}/json/`,
    `https://cep.awesomeapi.com.br/json/${cep}`,
    `https://brasilapi.com.br/api/cep/v1/${cep}`,
  ]

  const cepPromises = endpoints.map((endpoint) =>
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => ({ data, endpoint })),
  )

  try {
    const { data, endpoint } = await Promise.race(cepPromises)
    const response = normalizeResponse(data, endpoint)
    return response
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
