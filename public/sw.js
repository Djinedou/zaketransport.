// Service Worker for Zake Transport PWA
const CACHE_NAME = "zake-transport-v2"
const urlsToCache = ["/", "/booking", "/tracking", "/report", "/zake-logo.png", "/zake-bus.png"]

// Install event - cache resources
self.addEventListener("install", (event) => {
  self.skipWaiting()
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
          return response
        })
        .catch(() => caches.match(event.request)),
    )
  } else {
    event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)))
  }
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName)
            }
          }),
        )
      }),
      self.clients.claim(),
    ]),
  )
})
