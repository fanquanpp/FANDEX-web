/** @type {string} 缓存版本号，更新时修改以清除旧缓存 */
const CACHE_NAME = 'fandex-v5';
/** @type {string} 站点基础路径 */
const BASE = '/FANDEX/';

/** @type {string[]} 预缓存资源列表 */
const PRECACHE_URLS = [BASE, BASE + 'data/glossary-index.json'];

/** @type {Set<string>} 含 hash 的资源扩展名，可长期缓存 */
const HASHED_EXTS = new Set(['.css', '.js', '.woff2', '.woff', '.ttf']);
/** @type {Set<string>} 需要网络优先的 JSON 数据文件扩展名 */
const JSON_DATA_PATTERN = /\/data\/[^/]+\.json$/;

/**
 * Service Worker 安装事件：预缓存关键资源
 * @param {ExtendableEvent} event
 */
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

/**
 * Service Worker 激活事件：清除旧版本缓存
 * @param {ExtendableEvent} event
 */
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

/**
 * Fetch 事件：根据资源类型选择缓存策略
 * - 含 hash 的资源（CSS/JS/字体）：Cache First
 * - JSON 数据文件（search-index/glossary-index）：Network First
 * - HTML 页面：Network First（确保用户始终看到最新版本）
 * - 图片/其他：Stale While Revalidate
 * @param {FetchEvent} event
 */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;
  if (!url.pathname.startsWith(BASE)) return;

  const ext = getExt(url.pathname);
  const isHTML = ext === '' || ext === '.html' || url.pathname.endsWith('/');

  if (HASHED_EXTS.has(ext)) {
    event.respondWith(cacheFirstLong(event.request));
  } else if (JSON_DATA_PATTERN.test(url.pathname)) {
    event.respondWith(networkFirst(event.request));
  } else if (isHTML) {
    event.respondWith(networkFirstWithCacheFallback(event.request));
  } else if (STALE_REVALIDATE_EXTS.has(ext) || ext === '.json') {
    event.respondWith(staleWhileRevalidate(event.request));
  } else {
    event.respondWith(staleWhileRevalidate(event.request));
  }
});

/** @type {Set<string>} Stale While Revalidate 适用的扩展名 */
const STALE_REVALIDATE_EXTS = new Set(['.webp', '.svg', '.png', '.avif']);

/**
 * Cache First 策略：优先从缓存读取，缓存未命中时回退网络
 * 适用于含 hash 的静态资源（文件名变化即视为新资源）
 * @param {Request} request
 * @returns {Promise<Response>}
 */
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

/**
 * Network First 策略：优先从网络获取，网络失败时回退缓存
 * 适用于需要保持新鲜的数据文件（如搜索索引、术语索引）
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

/**
 * Network First + 缓存回退策略（HTML 专用）
 * 优先从网络获取最新 HTML，确保用户始终看到最新版本
 * 网络失败时回退缓存（离线可用）
 * 网络成功时更新缓存并通知客户端
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function networkFirstWithCacheFallback(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
      notifyUpdate();
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

/**
 * Stale While Revalidate 策略：先返回缓存，后台更新
 * 适用于 HTML 页面和图片资源
 * @param {Request} request
 * @returns {Promise<Response>}
 */
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

/**
 * 通知所有客户端缓存已更新
 * @returns {Promise<void>}
 */
async function notifyUpdate() {
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach((client) => {
    client.postMessage({ type: 'sw-update' });
  });
}

/**
 * 从路径中提取文件扩展名
 * @param {string} path
 * @returns {string}
 */
function getExt(path) {
  const idx = path.lastIndexOf('.');
  if (idx <= 0) return '';
  const ext = path.substring(idx);
  if (ext.includes('/')) return '';
  return ext;
}
