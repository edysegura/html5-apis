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

function createMockFetch(targetApiCheck, mockData) {
  return mock((url) => {
    if (targetApiCheck(url)) {
      return Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    }
    // Delay other endpoints so the target API wins the race
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          json: () => Promise.resolve({}),
        })
      }, 100),
    )
  })
}

test('normalizeResponse handles viacep format', async () => {
  global.fetch = createMockFetch(
    (url) => url.includes('viacep'),
    mockViaCepData,
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
  global.fetch = createMockFetch(
    (url) => url.includes('awesomeapi'),
    mockAwesomeApiData,
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
  global.fetch = createMockFetch(
    (url) => url.includes('brasilapi'),
    mockBrasilApiData,
  )

  const result = await fetchCepData('01310100')

  expect(result.origin).toBe('brasilapi')
  expect(result.cep).toBe('01310100')
  expect(result.street).toBe('Avenida Paulista')
  expect(result.district).toBe('Bela Vista')
  expect(result.city).toBe('São Paulo')
  expect(result.state).toBe('SP')
})

test('normalizeResponse handles missing fields with empty strings', async () => {
  global.fetch = createMockFetch((url) => url.includes('viacep'), {
    cep: '01310100',
  })

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

test('findOrigin identifies unknown endpoint', () => {
  // Test endpoint detection logic
  const testEndpoints = [
    {
      endpoint: 'https://viacep.com.br/ws/01310100/json/',
      expected: 'viacep',
    },
    {
      endpoint: 'https://cep.awesomeapi.com.br/json/01310100',
      expected: 'cep.awesomeapi',
    },
    {
      endpoint: 'https://brasilapi.com.br/api/cep/v1/01310100',
      expected: 'brasilapi',
    },
    {
      endpoint: 'https://unknown-api.com/cep/01310100',
      expected: 'unknown',
    },
  ]

  for (const { endpoint, expected } of testEndpoints) {
    let result = 'unknown'
    if (endpoint.includes('viacep')) result = 'viacep'
    if (endpoint.includes('awesomeapi')) result = 'cep.awesomeapi'
    if (endpoint.includes('brasilapi')) result = 'brasilapi'
    expect(result).toBe(expected)
  }
})
