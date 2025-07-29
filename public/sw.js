// Import Workbox SW
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js');

const CACHE_NAME = 'narkins-builders-v3';
const STATIC_CACHE = 'narkins-static-v3';
const RUNTIME_CACHE = 'narkins-runtime-v3';

// Core pages and assets to precache
const urlsToCache = [
  '/',
  '/hill-crest-residency',
  '/narkins-boutique-residency',
  '/about',
  '/blog',
  '/completed-projects',
  '/manifest.json',
  '/offline.html',
  '/images/narkins-builders-logo.webp',
  '/favicon.ico',
  '/icons/icon-192x192.svg',
  '/icons/icon-512x512.svg'
];

// Initialize Workbox
if (workbox) {
  console.log('🚀 Workbox is loaded');
  
  // Skip waiting and claim clients
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  // Precache core assets
  workbox.precaching.precacheAndRoute(
    urlsToCache.map(url => ({ url, revision: '3' }))
  );

  // Cache strategies for different content types
  
  // 1. HTML Pages - Stale While Revalidate (fast loading, fresh content)
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'pages-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 2. Blog Posts and TinaCMS Content - Stale While Revalidate
  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith('/blog/') || url.pathname.includes('/api/'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'content-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 2a. TinaCMS Admin Interface - Network First (always fresh for editing)
  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith('/admin') || url.pathname.includes('/admin-tina'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'tina-admin-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 minutes
        }),
      ],
    })
  );

  // 2b. TinaCMS GraphQL and Database queries
  workbox.routing.registerRoute(
    ({ url }) => 
      url.pathname.includes('/api/graphql') || 
      url.pathname.includes('/api/tina') ||
      url.pathname.includes('/_vercel/speed-insights'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'tina-api-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 60, // 30 minutes
        }),
      ],
    })
  );

  // 2c. Blog content files (MDX) - Cache First with revalidation
  workbox.routing.registerRoute(
    ({ url }) => 
      url.pathname.includes('/content/blogs/') ||
      url.pathname.includes('/content/faqs/'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'blog-content-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 14 * 24 * 60 * 60, // 14 days
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 3a. Blog Images - Stale While Revalidate (better updates)
  workbox.routing.registerRoute(
    ({ request, url }) => 
      request.destination === 'image' && url.pathname.includes('/images/blog-images/'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'blog-images-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 3b. Other Images - Cache First (long-term caching)
  workbox.routing.registerRoute(
    ({ request, url }) => 
      request.destination === 'image' && !url.pathname.includes('/images/blog-images/'),
    new workbox.strategies.CacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 4. Videos - Cache First with larger storage
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'video',
    new workbox.strategies.CacheFirst({
      cacheName: 'videos-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 10,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        }),
      ],
    })
  );

  // 5. Static Assets (CSS, JS, Fonts) - Cache First
  workbox.routing.registerRoute(
    ({ request }) => 
      request.destination === 'style' || 
      request.destination === 'script' || 
      request.destination === 'font',
    new workbox.strategies.CacheFirst({
      cacheName: 'static-assets',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        }),
      ],
    })
  );

  // 6. External APIs - Network First (fresh data priority)
  workbox.routing.registerRoute(
    ({ url }) => 
      url.origin === 'https://admin.narkinsbuilders.com' ||
      url.origin === 'https://sheets.googleapis.com',
    new workbox.strategies.NetworkFirst({
      cacheName: 'api-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // 1 hour
        }),
      ],
    })
  );

} else {
  console.log('❌ Workbox failed to load');
  
  // Fallback to basic service worker functionality
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Opened fallback cache');
          return cache.addAll(urlsToCache);
        })
    );
  });

  // Basic fetch handler
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).catch(() => {
            if (event.request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
        })
    );
  });
}

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'lead-form-sync') {
    event.waitUntil(syncLeadForms());
  } else if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  }
});

// Sync offline lead form submissions
async function syncLeadForms() {
  try {
    const db = await openDB();
    const tx = db.transaction(['leadForms'], 'readonly');
    const store = tx.objectStore('leadForms');
    const forms = await store.getAll();
    
    for (const form of forms) {
      try {
        const response = await fetch('/api/sheets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          // Remove from IndexedDB after successful sync
          const deleteTx = db.transaction(['leadForms'], 'readwrite');
          await deleteTx.objectStore('leadForms').delete(form.id);
          console.log('✅ Lead form synced successfully:', form.id);
        }
      } catch (error) {
        console.log('❌ Failed to sync lead form:', form.id, error);
      }
    }
  } catch (error) {
    console.log('❌ Background sync failed:', error);
  }
}

// Sync offline contact form submissions
async function syncContactForms() {
  try {
    const db = await openDB();
    const tx = db.transaction(['contactForms'], 'readonly');
    const store = tx.objectStore('contactForms');
    const forms = await store.getAll();
    
    for (const form of forms) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          const deleteTx = db.transaction(['contactForms'], 'readwrite');
          await deleteTx.objectStore('contactForms').delete(form.id);
          console.log('✅ Contact form synced successfully:', form.id);
        }
      } catch (error) {
        console.log('❌ Failed to sync contact form:', form.id, error);
      }
    }
  } catch (error) {
    console.log('❌ Contact sync failed:', error);
  }
}

// IndexedDB helper for offline form storage
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('NarkinsOfflineDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('leadForms')) {
        db.createObjectStore('leadForms', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('contactForms')) {
        db.createObjectStore('contactForms', { keyPath: 'id' });
      }
    };
  });
}

// Clean up old caches on activation
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName.includes('narkins') && 
                !cacheName.includes('v2') && 
                cacheName !== CACHE_NAME) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Claim all clients
      self.clients.claim()
    ])
  );
});

// Enhanced push notifications with project updates
self.addEventListener('push', event => {
  let notificationData = {
    title: 'Narkin\'s Builders',
    body: 'New update available!',
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/icon-72x72.svg'
  };

  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = {
        title: data.title || notificationData.title,
        body: data.body || notificationData.body,
        icon: data.icon || notificationData.icon,
        badge: data.badge || notificationData.badge,
        data: data.url ? { url: data.url } : {}
      };
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      url: notificationData.data.url || '/',
    },
    actions: [
      {
        action: 'explore',
        title: 'View Projects',
        icon: '/icons/icon-192x192.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-192x192.svg'
      }
    ],
    requireInteraction: false,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// Handle notification clicks with smart routing
self.addEventListener('notificationclick', event => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';
  
  if (event.action === 'explore' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
          // Check if there's already a window open
          for (const client of clientList) {
            if (client.url === targetUrl && 'focus' in client) {
              return client.focus();
            }
          }
          // Open new window if no existing one found
          if (clients.openWindow) {
            return clients.openWindow(targetUrl);
          }
        })
    );
  }
});