const CACHE = "chrono-kjv-v1";
const FILES = ["./", "index.html", "manifest.json", "icon.png"];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE).then(function(cache) {
            return cache.addAll(FILES);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(key) { return key !== CACHE; })
                    .map(function(key) { return caches.delete(key); })
            );
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cached) {
            return cached || fetch(event.request);
        })
    );
});