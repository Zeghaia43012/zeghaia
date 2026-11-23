const V="zeghaia-v5",CORE=["./","index.html","guide.html","app.js","data.js","style.css","favicon.svg","manifest.webmanifest"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||e.request.url.includes("/videos/")||e.request.headers.has("range"))return;
e.respondWith(fetch(e.request).then(res=>{if(res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp))}return res}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))))});
