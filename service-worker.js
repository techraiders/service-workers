console.log(`We are a service worker.`);
self.addEventListener("install", event => {
  console.log(`Install event`);
});

self.addEventListener("activate", event => {
  console.log("Activate event");
});
