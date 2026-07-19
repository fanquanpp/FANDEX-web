/**
 * Fuse.js 搜索 Web Worker
 *
 * 功能概述：
 * 在 Web Worker 中加载 Fuse.js（通过 CDN importmap），对主线程传入的
 * search-index.json 索引数据进行模糊搜索。主线程通过 postMessage 通信。
 *
 * 通信协议（与 src/services/search-service.ts 中 WorkerRequest/WorkerResponse 对齐）：
 *
 * 入站消息（主线程 → Worker）：
 *   { type: 'init', entries: FuseIndexEntry[], threshold: number }
 *     初始化 Worker：注入索引数据与模糊阈值
 *   { type: 'search', query: string, filter?: SearchFilter, limit?: number }
 *     执行搜索；Worker 返回 { type: 'results', results, tookMs }
 *   { type: 'dispose' }
 *     释放资源：清除 Fuse 实例
 *
 * 出站消息（Worker → 主线程）：
 *   { type: 'ready' }
 *     init 完成后发送，标记 Worker 可用
 *   { type: 'results', results: SearchResult[], tookMs: number }
 *     search 结果
 *   { type: 'error', message: string }
 *     错误信息
 *
 * 设计原则：
 * - Worker 内部不使用 ES module import（避免 importmap 在 Worker 中的兼容问题）
 * - Fuse.js 通过 importScripts 从 CDN 加载，与主线程基础环境一致
 * - 单一职责：仅负责模糊匹配与结果归一化，不处理 UI 与路由
 */

/* eslint-disable no-undef */

/** Fuse 实例缓存 */
let fuseInstance = null;

/** 当前索引条目数组（用于手工过滤器） */
let indexEntries = [];

/**
 * 初始化 Fuse.js 实例
 *
 * @param {Array} entries - 索引条目数组
 * @param {number} threshold - 模糊匹配阈值
 */
function initFuse(entries, threshold) {
  if (typeof Fuse === 'undefined') {
    // Fuse.js 未加载：发送 error
    self.postMessage({ type: 'error', message: 'Fuse.js library not loaded' });
    return;
  }
  indexEntries = Array.isArray(entries) ? entries : [];
  // Fuse.js 配置：多字段搜索 + 模糊阈值
  fuseInstance = new Fuse(indexEntries, {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'description', weight: 0.25 },
      { name: 'tags', weight: 0.15 },
      { name: 'module', weight: 0.1 },
    ],
    threshold: typeof threshold === 'number' ? threshold : 0.4,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 1,
    ignoreLocation: true,
  });
  self.postMessage({ type: 'ready' });
}

/**
 * 从索引条目中生成摘要片段（含 <mark> 高亮）
 *
 * @param {Object} entry - 索引条目
 * @param {string} query - 查询词
 * @returns {string} 摘要片段
 */
function buildExcerpt(entry, query) {
  const desc = entry.description || '';
  if (!desc) return '';
  // 在 description 中查找 query 并包裹 <mark>
  const lowerDesc = desc.toLowerCase();
  const lowerQuery = (query || '').toLowerCase();
  const idx = lowerDesc.indexOf(lowerQuery);
  if (idx >= 0) {
    const before = desc.slice(0, idx);
    const match = desc.slice(idx, idx + query.length);
    const after = desc.slice(idx + query.length);
    // 截取 query 前后各 60 字符，避免 excerpt 过长
    const start = Math.max(0, idx - 60);
    const end = Math.min(desc.length, idx + query.length + 60);
    const prefix = start > 0 ? '…' : '';
    const suffix = end < desc.length ? '…' : '';
    return (
      prefix +
      before.slice(start) +
      '<mark>' +
      match +
      '</mark>' +
      after.slice(0, end - (idx + query.length)) +
      suffix
    );
  }
  // 未匹配则返回截断的 description
  return desc.slice(0, 120) + (desc.length > 120 ? '…' : '');
}

/**
 * 应用过滤器
 *
 * @param {Array} entries - 索引条目数组
 * @param {Object} filter - 过滤器
 * @returns {Array} 过滤后的条目
 */
function applyFilter(entries, filter) {
  if (!filter) return entries;
  let result = entries;
  if (Array.isArray(filter.modules) && filter.modules.length > 0) {
    result = result.filter((e) => filter.modules.includes(e.module));
  }
  if (Array.isArray(filter.difficulties) && filter.difficulties.length > 0) {
    result = result.filter((e) => filter.difficulties.includes(e.difficulty));
  }
  if (Array.isArray(filter.tags) && filter.tags.length > 0) {
    result = result.filter(
      (e) => Array.isArray(e.tags) && e.tags.some((t) => filter.tags.includes(t))
    );
  }
  return result;
}

/**
 * 执行搜索
 *
 * @param {string} query - 查询词
 * @param {Object} filter - 过滤器
 * @param {number} limit - 结果数量上限
 */
function executeSearch(query, filter, limit) {
  if (!fuseInstance || !query) {
    self.postMessage({ type: 'results', results: [], tookMs: 0 });
    return;
  }
  const start = performance.now();

  try {
    // Fuse.js 不直接支持过滤器，先应用过滤器再搜索
    // 若存在过滤器，重新构造一个临时 Fuse 实例（基于过滤后的子集）
    let fuseToUse = fuseInstance;
    let entriesToUse = indexEntries;
    if (
      filter &&
      ((filter.modules && filter.modules.length > 0) ||
        (filter.difficulties && filter.difficulties.length > 0) ||
        (filter.tags && filter.tags.length > 0))
    ) {
      entriesToUse = applyFilter(indexEntries, filter);
      fuseToUse = new Fuse(entriesToUse, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'description', weight: 0.25 },
          { name: 'tags', weight: 0.15 },
          { name: 'module', weight: 0.1 },
        ],
        threshold: fuseInstance.options.threshold,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 1,
        ignoreLocation: true,
      });
    }

    const fuseResults = fuseToUse.search(query, { limit: limit || 20 });
    const results = fuseResults.map((fr) => {
      const entry = fr.item;
      const score = typeof fr.score === 'number' ? 1 - fr.score : 0.5;
      // 构造 URL：基于 Astro base 路径的相对路径
      const base = self.location?.pathname?.replace(/\/workers\/.*$/, '/') || '/';
      const url = `${base}docs/${entry.slug}/`.replace(/\/+/g, '/');
      return {
        slug: entry.slug,
        title: entry.title || '',
        module: entry.module || '',
        excerpt: buildExcerpt(entry, query),
        score,
        url,
      };
    });
    const tookMs = Math.round(performance.now() - start);
    self.postMessage({ type: 'results', results, tookMs });
  } catch (err) {
    self.postMessage({
      type: 'error',
      message: err && err.message ? err.message : 'Fuse search failed',
    });
  }
}

/**
 * 释放资源
 */
function dispose() {
  fuseInstance = null;
  indexEntries = [];
}

// ============================================================================
// 消息处理：监听主线程消息
// ============================================================================

self.addEventListener('message', (event) => {
  const msg = event.data;
  if (!msg || typeof msg !== 'object') return;
  switch (msg.type) {
    case 'init':
      initFuse(msg.entries, msg.threshold);
      break;
    case 'search':
      executeSearch(msg.query, msg.filter, msg.limit);
      break;
    case 'dispose':
      dispose();
      break;
    default:
      // 未知消息类型忽略
      break;
  }
});

// ============================================================================
// 加载 Fuse.js 库：通过 importScripts 从 CDN 拉取
// ----------------------------------------------------------------------------
// 选择 jsdelivr CDN 与 BaseLayout.astro 中预连接的 CDN 一致，
// 避免额外 DNS 解析开销。CSP 已允许 cdn.jsdelivr.net。
// ============================================================================

try {
  self.importScripts('https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js');
} catch (err) {
  self.postMessage({
    type: 'error',
    message: 'Failed to load Fuse.js: ' + (err && err.message ? err.message : 'unknown'),
  });
}
