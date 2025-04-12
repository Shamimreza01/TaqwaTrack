const CACHE_NAME = "TaqwaTrack-v1";
  const urlsToCache = [
    "/",
    "/index.html",
    "/index.9e4c6fd2.css",
    "/index.9e4c6fd2.css.map",
    "/index.3d214d75.js",
    "/index.3d214d75.js.map",
    "/icon192x192.fa1a0c43.png",
    "/icon512x512.a06ebf51png",
    "/favicon.7155ca86.ico",
    "/afterSalahDua.77dfffae.png",
    "/AlQuran1.22efb9a9.png",
    "/AlQuran2.7a425578.png",
    "/AlQuran3.3e546881.jpg",
    "apple-touch-icon.69428293.png",
    "motivationalDua.7f7cd7e8.jpg",
    "rabbanaDua.6f324ddc.png",
    "/manifest.webmanifest",
    "/Assets/*",
    "/icon.fb2efb3d.jpg",
  ];
  
  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(urlsToCache))
        .catch(err => console.log('Cache addAll error:', err))
    );
  });
  
  self.addEventListener("fetch", (event) => {
    // Skip non-GET requests and chrome-extension requests
    if (event.request.method !== 'GET' || 
        event.request.url.startsWith('chrome-extension://')) {
      return;
    }
  
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          // Return cached response if found
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Otherwise fetch from network
          return fetch(event.request)
            .then((response) => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // Clone the response
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
                
              return response;
            })
            .catch(() => {
              return caches.match('/offline.html'); 
            });
        })
    );
  });
 