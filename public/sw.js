const CACHE_NAME = 'fandex-v3';
const BASE = '/FANDEX/';

const PRECACHE_URLS = [BASE, BASE + 'data/glossary-index.json'];

const HASHED_EXTS = new Set(['.css', '.js', '.woff2', '.woff', '.ttf']);
const STALE_REVALIDATE_EXTS = new Set(['.json', '.html', '.webp', '.svg', '.png', '.avif']);

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;
  if (!url.pathname.startsWith(BASE)) return;

  const ext = getExt(url.pathname);
  const isHTML = ext === '' || ext === '.html' || url.pathname.endsWith('/');

  if (HASHED_EXTS.has(ext)) {
    event.respondWith(cacheFirstLong(event.request));
  } else if (STALE_REVALIDATE_EXTS.has(ext) || isHTML) {
    event.respondWith(staleWhileRevalidate(event.request));
  } else {
    event.respondWith(staleWhileRevalidate(event.request));
  }
});

async function cacheFirstLong(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503 });
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request)
    .then(async (response) => {
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
        notifyUpdate();
      }
      return response;
    })
    .catch(() => cached || new Response('Offline', { status: 503, statusText: 'Offline' }));
  return cached || fetchPromise;
}

async function notifyUpdate() {
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach((client) => {
    client.postMessage({ type: 'sw-update' });
  });
}

function getExt(path) {
  const idx = path.lastIndexOf('.');
  if (idx <= 0) return '';
  const ext = path.substring(idx);
  if (ext.includes('/')) return '';
  return ext;
}
