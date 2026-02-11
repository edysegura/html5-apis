function normalizeResponse(data) {
  if (data.logradouro) {
    // viacep.com.br
    return {
      origin: 'viacep',
      cep: data.cep,
      street: data.logradouro,
      complement: data.complemento,
      district: data.bairro,
      city: data.localidade,
      state: data.uf,
      ddd: data.ddd,
    }
  } else if (data.address_type) {
    // cep.awesomeapi.com.br
    return {
      origin: 'cep.awesomeapi',
      cep: data.cep,
      street: data.address,
      district: data.district,
      city: data.city,
      state: data.state,
      ddd: data.ddd,
      lat: data.lat,
      lng: data.lng,
    }
  } else if (data.service) {
    // brasilapi.com.br
    return {
      origin: 'brasilapi',
      cep: data.cep,
      street: data.street,
      district: data.neighborhood,
      city: data.city,
      state: data.state,
    }
  }

  return data
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
