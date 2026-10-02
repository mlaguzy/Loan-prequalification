const CACHE='gdc-sacco-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-192.png','./icons/maskable-512.png','./icons/apple-touch-icon.png','./icons/favicon-64.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{
    if(r&&r.ok&&new URL(e.request.url).origin===location.origin){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}
    return r;
  }).catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))));
});
