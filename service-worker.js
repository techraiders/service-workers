// version 1

/** Use below syntax to import multiple files of service workers, rather than multile importScript statements, so that below statement guarantees all script will be downloaded in parallel but will execute in sequence */

try {
  importScripts("events.js", "events2.js");
} catch (error) {
  console.log(error);
}

self.addEventListener("fetch", event => {
  console.log(`Fetching ${event.request.url}`);
  const body = `
    <!DOCTYPE html>
      <html>
        <head>
          <title> Service Worker HTML generation </title>
        </head>
        <body>
          <h1>Fetching ${event.request.url}</h1>
        </body>
      </html>`;
  const response = new Response(body, {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "text/html"
    }
  });
  event.respondWith(response);
});
