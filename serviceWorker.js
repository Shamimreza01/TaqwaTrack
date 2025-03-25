const CACHE_NAME = 'TaqwaTrack-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/index.css',
    '/index.js',
    '/icon-192.png',
    '/icon-512.png',
    '/manifest.webmanifest'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch Requests Handling
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Serve cached response if available, else fetch from network
                return response || fetch(event.request).then((networkResponse) => {
                    // Ensure JavaScript files get correct MIME type
                    if (event.request.url.endsWith('.js')) {
                        return new Response(networkResponse.body, {
                            headers: { 'Content-Type': 'application/javascript' }
                        });
                    }
                    return networkResponse;
                });
            })
            .catch(() => caches.match('/index.html')) // Serve index.html on failure
    );
});

// Activate Service Worker and Clean Old Caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (!cacheWhitelist.includes(cache)) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
