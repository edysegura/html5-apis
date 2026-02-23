function findOrigin(data) {
  if (data.logradouro) return 'viacep'
  if (data.address_type) return 'cep.awesomeapi'
  if (data.service) return 'brasilapi'
  return 'unknown'
}

function normalizeResponse(data) {
  const origin = findOrigin(data)
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
    const response = normalizeResponse(data)
    response.endpoint = endpoint
    return response
    return normalizeResponse(data)
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
