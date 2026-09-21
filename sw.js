const CACHE_NAME = "agenda-v1";

const ARQUIVOS = [
    "index.html",
    "style.css",
    "app.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(
                ARQUIVOS

            );
        })
    );
});

self.addEventListener("active", (event) => {
    console.log("Service Worker ativado");
});

self.addEventListener("fetch", (event) => {
    console.log("Requisição:", event.request.url);
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((resposta) => {
            return resposta || fetch(event.request);
        })
    );
});