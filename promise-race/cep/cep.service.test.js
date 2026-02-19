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

test('normalizeResponse handles viacep format', async () => {
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
