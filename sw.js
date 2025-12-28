const SW_VERSION = "tatvabot-sw-v5"; // 🔥 CHANGE THIS EVERY DEPLOY

self.addEventListener("install", (event) => {
  console.log("SW installing:", SW_VERSION);
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("SW activating:", SW_VERSION);
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // 🔥 NETWORK FIRST — NO CACHE
  event.respondWith(fetch(event.request));
});
