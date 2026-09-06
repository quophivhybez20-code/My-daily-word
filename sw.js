// improved service worker: versioned cache, offline fallback, activation cleanup
const CACHE_NAME = 'my-daily-word-v2';
const OFFLINE_PAGE = '/index.html';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/assets/icon.svg',
  '/assets/illustration.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        // optionally cache new GET requests for same-origin HTML/CSS/JS
        const contentType = resp.headers.get('content-type') || '';
        if (resp.ok && (contentType.includes('text/html') || contentType.includes('application/javascript') || contentType.includes('text/css') || contentType.includes('image')) ){
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return resp;
      }).catch(() => caches.match(OFFLINE_PAGE));
    })
  );
});
