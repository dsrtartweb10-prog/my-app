self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("dsrt-arcade-v3").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/app.js",
        "/engine.js",
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
