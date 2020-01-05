// version 1

/** Use below syntax to import multiple files of service workers, rather than multile importScript statements, so that below statement guarantees all script will be downloaded in parallel but will execute in sequence */

try {
  importScripts("events.js", "events2.js");
} catch (error) {
  console.log(error);
}

self.addEventListener("fetch", event => {
  console.log(`Fetching ${event.request.url}`);
  const parsedUrl = new URL(event.request.url);

  /**
   * Always clone the request or response before reading it, else if you read without       cloning, browser will not be able to proceed with that request or response.
   */
  if (event.request.method === "POST") {
    const clonedRequest = event.request.clone();
    return;
  }

  if (parsedUrl.pathname === "/") {
    return;
  }

  if (parsedUrl.pathname.match(/^\/api\/*/)) {
    const object = {
      temp: 56
    };
    const jsonResponse = new Response(JSON.stringify(object), {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json"
      }
    });
    event.respondWith(jsonResponse);
    return;
  }
  const body = `
    <!DOCTYPE html>
      <html>
        <head>
          <title> Service Worker HTML generation </title>
        </head>
        <body>
          <h1>Fetching ${event.request.url}</h1>
          <ul>
            <li> Cache: ${event.request.cache} </li>
            <li> Credential: ${event.request.credential} </li>
            <li>
              Destination: ${event.request.destination}
            </li>
            <li>
              Method: ${event.request.method}
            </li>
            <li>
              Referrer: ${event.request.referrer}
            </li>
          </ul>
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
  /*
  event.respondWith(
    new Promise((resolve, reject) => {
      fetch("/").then(response => {
        const clonedResponse = response.clone();
        resolve(response);
      });
    })
  ); */
});
