if (navigator.serviceWorker) {
    // Register service worker
    console.log("Registering Service Worker");
    navigator.serviceWorker.register("../sw.js").then((f) => {
        console.log(f)
    })

}