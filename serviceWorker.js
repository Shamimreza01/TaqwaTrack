const CACHE_NAME = "TaqwaTrack-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/index.9e4c6fd2.css",
  "/index.9e4c6fd2.css.map",
  "/index.3d214d75.js",
  "/index.3d214d75.js.map",
  "/icon192x192.fa1a0c43.png",
  "/icon512x512.a06ebf51.png", // ❗ fixed typo: .png was missing a dot
  "/favicon.7155ca86.ico",
  "/afterSalahDua.77dfffae.png",
  "/AlQuran1.22efb9a9.png",
  "/AlQuran2.7a425578.png",
  "/AlQuran3.3e546881.jpg",
  "/apple-touch-icon.69428293.png", // ❗ added leading slash
  "/motivationalDua.7f7cd7e8.jpg",   // ❗ added leading slash
  "/rabbanaDua.6f324ddc.png",        // ❗ added leading slash
  "/manifest.webmanifest",
  "/icon.fb2efb3d.jpg",
  // Note: wildcards like "/Assets/*" are NOT valid here; you must manually list those files
];

self.addEventListener("install", (event) => {
  console.log("[SW] Install event");
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// ✅ Activate: Clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activate event");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  return self.clients.claim();
});

// ✅ Fetch: Serve from cache first, fallback to network, cache new requests
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const reqUrl = new URL(event.request.url);

  // Don't cache extensions, devtools, etc.
  if (reqUrl.origin !== location.origin || reqUrl.protocol.startsWith("chrome")) return;

  const cleanUrl = reqUrl.pathname;

  event.respondWith(
    caches.match(cleanUrl).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((response) => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(cleanUrl, resClone);
          });

          return response;
        })
        .catch(() => caches.match("/offline.html"));
    })
  );
});