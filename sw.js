const CACHE = 'hackoai-v1';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => 
      cache.addAll(['/'])
    )
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(k => k !== CACHE && caches.delete(k)))
    )
  );
});
