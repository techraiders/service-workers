// version 1

/** Use below syntax to import multiple files of service workers, rather than multile importScript statements, so that below statement guarantees all script will be downloaded in parallel but will execute in sequence */

try {
  importScripts("events.js", "events2.js");
} catch (error) {
  console.log(error);
}

self.addEventListener("fetch", event => {
  console.log(`Fetching ${event.request.url}`);
  const response = new Response(`Fetching ${event.request.url}`);
  event.respondWith(response);
});
