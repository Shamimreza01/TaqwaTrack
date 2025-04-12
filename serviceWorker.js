const CACHE_NAME = "TaqwaTrack-v1";
const urlsToCache = [
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

// ✅ Install Event: Cache App Shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((err) => console.log("Cache addAll error:", err))
  );
});

// ✅ Fetch Event: Serve from cache, then fallback
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.url.startsWith("chrome-extension://")) {
    return;
  }

  const normalizedUrl = new URL(event.request.url);
  normalizedUrl.search = ""; // ❗ Remove query params (e.g., ?123456)

  event.respondWith(
    caches.match(normalizedUrl) // 🔁 use normalized URL for matching
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== "basic") {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(normalizedUrl, responseToCache); // ✅ store without query
            });

            return response;
          })
          .catch(() => {
            return caches.match("/offline.html"); // optional offline fallback
          });
      })
  );
});
