'use strict'

async function fetchFromNetwork(url) {
  const response = await fetch(url)
  addToCache(url, response.clone())
  const data = await response.json()
  return data
}

async function setCacheLifeSpan(cache, key) {
  const timer = 1000 * 10
  setTimeout(() => cache.delete(key), timer)
}

async function addToCache(key, response) {
  const cache = await caches.open('MY-CACHE-KEY')
  cache.put(key, response)
  setCacheLifeSpan(cache, key)
}

async function fetchFromCache(url) {
  const response = await caches.match(url)
  const data = response && await response.json()
  return data
}

(async function main() {
  const pre = document.querySelector('pre')
  const url = 'https://api.github.com/users/edysegura'
  const data = await fetchFromCache(url) || await fetchFromNetwork(url)
  pre.textContent = JSON.stringify(data, null, 2)
})()
