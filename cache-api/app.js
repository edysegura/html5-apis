import hljs from 'https://cdn.jsdelivr.net/npm/highlight.js@11.11.1/+esm'

const button = document.querySelector('button')
button.addEventListener('click', async () => {
  const url = 'https://api.github.com/users/edysegura'
  const data = (await fetchFromCache(url)) || (await fetchFromNetwork(url))
  showResponse(data)
})

async function fetchFromNetwork(url) {
  const response = await fetch(url)
  addToCache(url, response.clone())
  return await response.json()
}

async function setCacheLifeSpan(cache, key) {
  const timer = 1000 * 30 // 30 seconds
  setTimeout(() => cache.delete(key), timer)
}

async function addToCache(key, response) {
  const cache = await caches.open('MY-CACHE-KEY')
  cache.put(key, response)
  setCacheLifeSpan(cache, key)
}

async function fetchFromCache(url) {
  const response = await caches.match(url)
  const data = response && (await response.json())
  return data
}

function showResponse(json) {
  const pre = document.querySelector('pre')
  const code = document.createElement('code')
  code.classList.add('language-json')
  pre.innerHTML = ''
  pre.appendChild(code)
  code.textContent = JSON.stringify(json, null, 2)
  hljs.highlightElement(code)
}
