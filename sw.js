const CACHE_NAME = "agenda-v2";

const SHELL = [
    "./",
    "index.html",
    "offline.html",
    "style.css",
    "app.js",
    "manifest.webmanifest",
    "./icons/icon-192x192.png",
    "./icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(SHELL);
        })
    );
});
 
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys() .then((nomes) => {
            return Promise.all(
                nomes
                    .filter(nome => nome !== CACHE_NAME)
                    .map(nome => caches.delete(nome))
            ) ;
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(resposta => resposta || fetch(event.request))
        .catch(() => {
            if (event.request.mode === "navigate") {
                return caches.match("offline.html");
            }   
        })

    );
});    