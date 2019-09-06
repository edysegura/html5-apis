const cacheName = 'v1'

const appAssets = [
  './',
  './index.html'
]

async function precache() {
  const cache = await caches.open(cacheName)
  return cache.addAll(appAssets)
}

async function doCache(request) {
  console.log('Fetching and adding the response data into cache')

  const cache = await caches.open(cacheName)
  const requestCloned = request.clone()
  const response = await fetch(requestCloned)

  cache.put(request, response.clone())

  return response
}

async function fetchFromCacheWhenAvailable(request) {
  const cache = await caches.open(cacheName)
  const match = await cache.match(request)

  if (match) {
    console.log('Returning from cache')
    return match
  }

  return doCache(request)
}

self.addEventListener('install', event => {
  event.waitUntil(precache().then(() => self.skipWaiting()))
})

self.addEventListener('fetch', event => {
  event.respondWith(fetchFromCacheWhenAvailable(event.request))
})