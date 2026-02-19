import { test, expect, mock } from 'bun:test'
import { fetchCepData } from './cep.service.js'

// Mock data from different APIs
const mockViaCepData = {
  cep: '01310100',
  logradouro: 'Avenida Paulista',
  complemento: 'lado par',
  bairro: 'Bela Vista',
  localidade: 'São Paulo',
  uf: 'SP',
  ddd: '11',
}

const mockAwesomeApiData = {
  cep: '01310100',
  address: 'Avenida Paulista',
  address_type: 'road',
  district: 'Bela Vista',
  city: 'São Paulo',
  state: 'SP',
  lat: '-23.5615',
  lng: '-46.6559',
}

const mockBrasilApiData = {
  cep: '01310100',
  state: 'SP',
  city: 'São Paulo',
  neighborhood: 'Bela Vista',
  street: 'Avenida Paulista',
  service: 'brasilapi',
}

test('findOrigin identifies viacep correctly', async () => {
  const module = await import('./cep.service.js')
  // We need to export findOrigin or test through the public API
  // For now, we'll test the normalization which depends on findOrigin
})

test('normalizeResponse handles viacep format', async () => {
  const module = await import('./cep.service.js')
  // Test through integration
  global.fetch = mock(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockViaCepData),
    }),
  )

  const result = await fetchCepData('01310100')

  expect(result.origin).toBe('viacep')
  expect(result.cep).toBe('01310100')
  expect(result.street).toBe('Avenida Paulista')
  expect(result.district).toBe('Bela Vista')
  expect(result.city).toBe('São Paulo')
  expect(result.state).toBe('SP')
  expect(result.ddd).toBe('11')
})

test('normalizeResponse handles awesomeapi format', async () => {
  global.fetch = mock(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockAwesomeApiData),
    }),
  )

  const result = await fetchCepData('01310100')

  expect(result.origin).toBe('cep.awesomeapi')
  expect(result.cep).toBe('01310100')
  expect(result.street).toBe('Avenida Paulista')
  expect(result.district).toBe('Bela Vista')
  expect(result.city).toBe('São Paulo')
  expect(result.state).toBe('SP')
  expect(result.lat).toBe('-23.5615')
  expect(result.lng).toBe('-46.6559')
})

test('normalizeResponse handles brasilapi format', async () => {
  global.fetch = mock(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockBrasilApiData),
    }),
  )

  const result = await fetchCepData('01310100')

  expect(result.origin).toBe('brasilapi')
  expect(result.cep).toBe('01310100')
  expect(result.street).toBe('Avenida Paulista')
  expect(result.district).toBe('Bela Vista')
  expect(result.city).toBe('São Paulo')
  expect(result.state).toBe('SP')
})

test('fetchCepData uses Promise.race and returns first resolved response', async () => {
  let fetchCallCount = 0
  const callOrder = []

  global.fetch = mock((url) => {
    fetchCallCount++
    callOrder.push(url)

    // Simulate different response times
    if (url.includes('viacep')) {
      return Promise.resolve({
        json: () => Promise.resolve(mockViaCepData),
      })
    } else if (url.includes('awesomeapi')) {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              json: () => Promise.resolve(mockAwesomeApiData),
            }),
          100,
        ),
      )
    } else if (url.includes('brasilapi')) {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              json: () => Promise.resolve(mockBrasilApiData),
            }),
          200,
        ),
      )
    }
  })

  const result = await fetchCepData('01310100')

  // Should have been called 3 times (all endpoints are called)
  expect(fetchCallCount).toBe(3)
  // The result should be from viacep (fastest)
  expect(result.origin).toBe('viacep')
})

test('fetchCepData normalizes all required fields', async () => {
  global.fetch = mock(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          cep: '01310100',
          logradouro: 'Avenida Paulista',
          complemento: 'lado par',
          bairro: 'Bela Vista',
          localidade: 'São Paulo',
          uf: 'SP',
          ddd: '11',
          lat: '-23.5615',
          lng: '-46.6559',
        }),
    }),
  )

  const result = await fetchCepData('01310100')

  // Check all properties exist
  expect(result).toHaveProperty('origin')
  expect(result).toHaveProperty('cep')
  expect(result).toHaveProperty('street')
  expect(result).toHaveProperty('complement')
  expect(result).toHaveProperty('district')
  expect(result).toHaveProperty('city')
  expect(result).toHaveProperty('state')
  expect(result).toHaveProperty('ddd')
  expect(result).toHaveProperty('lat')
  expect(result).toHaveProperty('lng')
})

test('normalizeResponse handles missing fields with empty strings', async () => {
  global.fetch = mock(() =>
    Promise.resolve({
      json: () => Promise.resolve({ cep: '01310100' }),
    }),
  )

  const result = await fetchCepData('01310100')

  expect(result.street).toBe('')
  expect(result.district).toBe('')
  expect(result.city).toBe('')
  expect(result.state).toBe('')
  expect(result.complement).toBe('')
  expect(result.ddd).toBe('')
  expect(result.lat).toBe('')
  expect(result.lng).toBe('')
})

test('findOrigin identifies unknown API', async () => {
  global.fetch = mock(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          cep: '01310100',
          unknownField: 'some value',
        }),
    }),
  )

  const result = await fetchCepData('01310100')

  expect(result.origin).toBe('unknown')
})
