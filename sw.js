const cacheName="app-v"

let paths = [
    "/",
    "/index.html",
    "/css/bootstrap.css",
    "/js/bootstrap.js",
    "/js/jquery.js",
    "/js/popper.js",
    "/js/app.js",
    "/images/1.jpeg",
    "/images/2.jpeg",
    "/images/3.jpeg"
]
self.addEventListener("install", (e) => {
    // console.log("[Service Worker Install", e);
    e.waitUntil(
        caches.open(cacheName)
        .then((cache) => cache.addAll(paths) )
    
    )

});
self.addEventListener("activate", (el) => {
    // console.log("activated",el)
    el.waitUntil(
        caches.keys()
            .then(
                (keyList) => Promise.all(keyList.map((key) =>
                    key !== cacheName ? caches.delete(key) : null)
                )
            )
    )
})
self.addEventListener("fetch", (fl) => {
    // console.log(fl)
    fl.waitUntil(
      fl.respondWith(
        caches.match(fl.request).then(
          (res) =>
            res ||
            fetch(fl.request).then((data) => {
              return caches.open(cacheName).then((caech) => {
                caech.put(fl.request, data.clone());
                return data;
              });
            })
        )
      )
    );
    
})