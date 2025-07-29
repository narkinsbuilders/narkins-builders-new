// Development Service Worker - No Caching
const CACHE_NAME = 'narkins-dev-v1';

// Minimal caching for development
const urlsToCache = [
  '/offline.html'
];

self.addEventListener('install', (event) => {
  console.log('Development SW: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Development SW: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Development SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Claim all clients immediately
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // In development, always fetch from network for fresh content
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // Only serve offline page for HTML requests if network fails
        if (event.request.destination === 'document') {
          return caches.match('/offline.html');
        }
      })
  );
});