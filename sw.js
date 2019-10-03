self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('site').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/images/map.png',
       '/images/marker.png'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
 console.log(event.request.url);

 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});