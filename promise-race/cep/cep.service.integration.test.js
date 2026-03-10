import { test, expect } from 'bun:test'
import { fetchCepData } from './cep.service.js'

test('integration test for fetchCepData', async () => {
  const result = await fetchCepData('01310100')

  expect(result.origin).toMatch(/(viacep|cep.awesomeapi|brasilapi)/)
  expect(result.cep).toBe('01310100')
  expect(result.street).toBe('Avenida Paulista')
  expect(result.district).toBe('Bela Vista')
  expect(result.city).toBe('São Paulo')
  expect(result.state).toBe('SP')
  expect(result.ddd).toBe('11')
})
