const CACHE_NAME = 'version-1';
const urlsToCache = [
    '/',
    '/index.html',
    '/index.css',
    '/index.js',
    '/icon-192.png',
    '/icon-512.png',
    '/manifest.webmanifest',
    '/Assets'
];

// Install Service Worker
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Listen for fetch requests
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request).catch(() => caches.match('index.html'));
        })
    );
});

// Activate the Service Worker
self.addEventListener('activate', (e) => {
    const cacheWhitelist = [CACHE_NAME]; 

    e.waitUntil(
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
