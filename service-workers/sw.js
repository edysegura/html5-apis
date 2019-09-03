const cacheName = 'v1'

async function precache() {
  const cache = await caches.open(cacheName)
  return cache.addAll([
    './',
    '/index.html'
  ])
}

async function doCache(request) {
  console.log('Fetching and adding to cache')
  const cache = await caches.open(cacheName)
  const requestCloned = request.clone()
  const response = await fetch(requestCloned)

  cache.put(request, response.clone())

  return response
}

async function fetchFromCacheWhenAvailable(request) {
  const cache = await caches.open(cacheName)
  const match = await cache.match(request)

  if(match) {
    console.log('Returning from cache')
    return match
  }

  return doCache(request)
}

self.addEventListener('install', event => {
  event.waitUntil(precache().then(() => self.skipWaiting()))
})