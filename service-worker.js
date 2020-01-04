console.log(`We are a service worker.`);

/** Use below syntax to import multiple files of service workers, rather than multile importScript statements, so that below statement guarantees all script will be downloaded in parallel but will execute in sequence */
importScripts("events.js", "events2.js");

console.log("After loading the events.js script");
