/**
 * 搜索服务模块
 *
 * 功能概述：
 * 封装 Pagefind 与 Fuse.js 两套搜索引擎，对外提供统一 search() API。
 * 优先使用 Pagefind（构建期生成的全文索引，支持高亮、过滤器、相关性评分）；
 * 当 Pagefind 不可用（开发期未构建索引、加载失败、运行环境不支持动态 import）时，
 * 自动降级至 Fuse.js + Web Worker 方案，对 public/data/search-index.json
 * 进行模糊匹配，保证搜索功能始终可用。
 *
 * 三层架构定位：
 * - UI 层（SearchDialog.vue / SearchBar.astro）调用本模块的 search() 函数
 * - 本模块属于 Service 层，承载搜索引擎选择、参数适配、结果归一化逻辑
 * - Data 层为 Pagefind 索引（dist/pagefind/）与 Fuse.js 索引（public/data/search-index.json）
 *
 * 设计原则：
 * - 所有异步函数均通过 try-catch 包裹，异常时返回安全默认值
 * - TypeScript 严格模式，不使用 any / unknown
 * - Pagefind 通过动态 import 加载，避免在 SSR 阶段访问浏览器全局变量
 * - Web Worker 通过 Blob URL 创建，兼容 GitHub Pages 子路径部署
 */

import type {
  SearchRequest,
  SearchResponse,
  SearchResult,
  SearchFilter,
} from '@/types/search';

// ============================================================================
// 类型定义：Pagefind 运行时 API 类型声明
// ----------------------------------------------------------------------------
// Pagefind 官方未提供完整 TypeScript 类型定义，此处依据官方文档
// (https://pagefind.app/docs/api/) 描述的运行时接口手工声明，仅供本模块内部使用。
// ============================================================================

/** Pagefind 单条匹配的加权位置信息 */
interface PagefindLocation {
  /** 匹配文本起始位置 */
  start: number;
  /** 匹配文本结束位置 */
  end: number;
  /** 该匹配的权重（用于相关性排序） */
  weight: number;
  /** 匹配所属子结果（sub_results）的 ID，主结果为空字符串 */
  sub_result?: string;
}

/** Pagefind 子结果（同一页面内多个匹配段落，如多个标题或正文片段） */
interface PagefindSubResult {
  /** 子结果标题（如页面内某个章节） */
  title: string;
  /** 子结果匹配片段（含 <mark> 高亮标签） */
  excerpt: string;
  /** 该子结果的匹配位置 */
  weighted_locations: PagefindLocation[];
}

/** Pagefind 单条搜索结果 data() 方法返回的完整数据结构 */
interface PagefindResultData {
  /** Pagefind 内部分配的结果 ID */
  id: number;
  /** 结果页面的 URL（相对路径） */
  url: string;
  /** 主匹配片段（含 <mark> 高亮标签） */
  excerpt: string;
  /** 页面元数据（从 HTML <meta data-pagefind-meta> 与 frontmatter 提取） */
  meta: {
    title?: string;
    module?: string;
    description?: string;
    difficulty?: string;
    tags?: string;
    [key: string]: string | undefined;
  };
  /** 加权匹配位置列表 */
  weighted_locations: PagefindLocation[];
  /** 子结果列表（同页多段匹配） */
  sub_results: PagefindSubResult[];
  /** 原始正文文本（无高亮，用于自定义摘要） */
  raw_content?: string;
  /** 去重后的正文文本 */
  content?: string;
}

/** Pagefind search() 返回的单条结果对象（需异步调用 data() 获取详情） */
interface PagefindSearchResultEntry {
  /** 该结果的相关性评分（Pagefind 内部计算，越低越相关） */
  score: number;
  /** 异步获取结果详情的方法 */
  data: () => Promise<PagefindResultData>;
}

/** Pagefind search() 返回的封装对象 */
interface PagefindSearchResponse {
  /** 搜索耗时（毫秒，Pagefind 内部统计） */
  timings: {
    preload: number;
    search: number;
    results: number;
  };
  /** 总结果数 */
  results: PagefindSearchResultEntry[];
  /** 透传的过滤器配置 */
  filters?: Record<string, string[]>;
  /** 透传的排序配置 */
  sorts?: Array<[string, 'asc' | 'desc']>;
}

/** Pagefind 全局运行时对象（动态 import 后获得） */
interface PagefindRuntime {
  /** 配置 Pagefind 选项（如过滤器、高亮、SDK 路径） */
  options: (opts: Record<string, unknown>) => Promise<void>;
  /** 执行搜索查询 */
  search: (
    query: string,
    options?: {
      filters?: Record<string, string[]>;
      sort?: Record<string, 'asc' | 'desc'>;
      limit?: number;
    },
  ) => Promise<PagefindSearchResponse>;
  /** 预加载查询（提前拉取索引分片以加速后续搜索） */
  preload: (query: string, options?: Record<string, unknown>) => Promise<void>;
}

// ============================================================================
// 类型定义：Fuse.js 索引条目（与 public/data/search-index.json 结构一致）
// ============================================================================

/** Fuse.js 索引条目（与 scripts/build-search-index.mjs 输出结构对齐） */
interface FuseIndexEntry {
  /** 文档 slug（module/name 格式） */
  slug: string;
  /** 文档标题 */
  title: string;
  /** 文档描述 */
  description: string;
  /** 标签数组 */
  tags: string[];
  /** 所属模块 ID */
  module: string;
  /** 模块内排序号 */
  order: number;
  /** 难度等级（beginner / intermediate / advanced） */
  difficulty: string;
  /** 最后更新日期（字符串） */
  updated: string;
}

// ============================================================================
// 类型定义：Web Worker 通信协议
// ============================================================================

/** 主线程 → Worker 的请求消息类型 */
type WorkerRequest =
  | { type: 'init'; entries: FuseIndexEntry[]; threshold: number }
  | { type: 'search'; query: string; filter?: SearchFilter; limit?: number }
  | { type: 'dispose' };

/** Worker → 主线程的响应消息类型 */
type WorkerResponse =
  | { type: 'ready' }
  | { type: 'error'; message: string }
  | { type: 'results'; results: SearchResult[]; tookMs: number };

// ============================================================================
// 常量定义
// ============================================================================

/**
 * Pagefind 索引在 dist 中的部署路径。
 * GitHub Pages 子路径部署（base = /FANDEX-web/）下，最终 URL 为
 * `/FANDEX-web/pagefind/pagefind.js`，但 Pagefind SDK 内部会自动处理
 * base 路径，这里只需给出相对根的路径即可。
 */
const PAGEFIND_SCRIPT_PATH = '/pagefind/pagefind.js';

/**
 * Fuse.js 默认模糊匹配阈值，与 src/config/runtime.ts 的默认值保持一致。
 * 0 = 精确匹配，1 = 匹配任意字符。
 */
const DEFAULT_FUSE_THRESHOLD = 0.4;

/** 默认结果数量上限 */
const DEFAULT_LIMIT = 20;

/** Pagefind 单例缓存，避免重复动态 import */
let pagefindPromise: Promise<PagefindRuntime | null> | null = null;

/** Fuse.js Worker 单例 */
let fuseWorkerPromise: Promise<Worker | null> | null = null;

/** Fuse.js 是否已初始化（接收 init 消息后才置 true） */
let fuseWorkerReady = false;

/** 等待 Fuse.js Worker ready 的回调队列 */
const fuseReadyCallbacks: Array<(ready: boolean) => void> = [];

// ============================================================================
// Pagefind 搜索实现
// ============================================================================

/**
 * 异步加载 Pagefind 运行时
 *
 * 加载策略：
 * 1. 通过 dynamic import 加载 `/pagefind/pagefind.js`
 * 2. 首次加载时调用 options() 配置运行时（如基路径、高亮样式）
 * 3. 缓存加载结果，后续调用直接复用
 *
 * SSR 安全：
 * - 本函数仅在浏览器环境调用（SearchDialog 组件 onMounted 内触发）
 * - 通过 typeof window 判定，SSR 阶段直接返回 null
 *
 * @returns Pagefind 运行时对象；加载失败或非浏览器环境返回 null
 */
async function loadPagefind(): Promise<PagefindRuntime | null> {
  // 浏览器环境检查，SSR 阶段安全返回 null
  if (typeof window === 'undefined') return null;

  // 单例缓存：已加载或正在加载则复用
  if (pagefindPromise) return pagefindPromise;

  pagefindPromise = (async () => {
    try {
      // 动态 import：让浏览器按需加载 Pagefind SDK
      // 注意：Vite/Astro 构建会保留此动态路径，运行时由浏览器解析
      const pagefindModule = await import(/* @vite-ignore */ PAGEFIND_SCRIPT_PATH);
      const pagefindRuntime = pagefindModule.default as PagefindRuntime | undefined;
      if (!pagefindRuntime || typeof pagefindRuntime.search !== 'function') {
        return null;
      }
      // 配置 Pagefind：禁用默认 UI 自动初始化，由本模块按需调用
      try {
        await pagefindRuntime.options({
          highlightParam: 'highlight',
        });
      } catch {
        // options() 失败不阻断主流程，使用 Pagefind 默认配置
      }
      return pagefindRuntime;
    } catch {
      // Pagefind 索引未生成（如开发环境首次启动）或加载失败
      return null;
    }
  })();

  return pagefindPromise;
}

/**
 * 将 Pagefind 原始结果转换为 FANDEX 统一 SearchResult 结构
 *
 * 转换逻辑：
 * - slug：从 URL 中提取（去除 base 路径与 .html 后缀）
 * - title：优先取 meta.title，回退到 excerpt 首行
 * - module：取 meta.module（由 Pagefind 从 frontmatter 索引）
 * - excerpt：保留 Pagefind 返回的 <mark> 高亮片段
 * - score：将 Pagefind 的 score（越低越相关）转换为 0-1 越大越相关
 * - url：直接使用 Pagefind 返回的 URL
 *
 * @param entry - Pagefind 搜索结果条目
 * @param pagefindScore - Pagefind 原始评分（越小越相关）
 * @returns 统一 SearchResult 结构
 */
async function transformPagefindResult(
  entry: PagefindSearchResultEntry,
  pagefindScore: number,
): Promise<SearchResult> {
  const data = await entry.data();
  // 从 URL 中提取 slug：去除 base 路径前缀、.html 后缀、尾随斜杠
  const slug = data.url
    .replace(/^\/[^/]+\/docs\//, '') // 去除 /FANDEX-web/docs/ 前缀（如存在）
    .replace(/^\/docs\//, '') // 去除 /docs/ 前缀
    .replace(/\/index\.html$/, '')
    .replace(/\.html$/, '')
    .replace(/\/$/, '');
  // Pagefind score 越小越相关，转换为 0-1 越大越相关
  // 使用 1 / (1 + score) 公式，score=0 → 1.0，score=10 → 0.09
  const normalizedScore = 1 / (1 + pagefindScore);
  return {
    slug,
    title: data.meta.title ?? data.excerpt.replace(/<[^>]+>/g, '').slice(0, 60),
    module: data.meta.module ?? '',
    excerpt: data.excerpt,
    score: normalizedScore,
    url: data.url,
  };
}

/**
 * 通过 Pagefind 执行搜索
 *
 * @param request - 统一搜索请求
 * @returns 统一搜索响应；失败返回 null（由上层降级到 Fuse.js）
 */
async function searchWithPagefind(request: SearchRequest): Promise<SearchResponse | null> {
  try {
    const pagefind = await loadPagefind();
    if (!pagefind) return null;

    const start = performance.now();

    // 构造 Pagefind 过滤器：将 SearchFilter.modules 等数组映射为 Pagefind filters 格式
    const filters: Record<string, string[]> = {};
    if (request.filter?.modules && request.filter.modules.length > 0) {
      filters.module = request.filter.modules;
    }
    if (request.filter?.difficulties && request.filter.difficulties.length > 0) {
      filters.difficulty = request.filter.difficulties;
    }
    if (request.filter?.tags && request.filter.tags.length > 0) {
      filters.tags = request.filter.tags;
    }

    const limit = request.limit ?? DEFAULT_LIMIT;
    const hasFilters = Object.keys(filters).length > 0;

    // 执行搜索：filters 仅在存在时传入，避免空对象影响 Pagefind 行为
    const response = await pagefind.search(request.query, {
      ...(hasFilters ? { filters } : {}),
      limit,
    });

    // 转换结果：Pagefind 的 data() 是异步的，需 await
    const results: SearchResult[] = [];
    for (const entry of response.results) {
      try {
        const transformed = await transformPagefindResult(entry, entry.score);
        results.push(transformed);
      } catch {
        // 单条结果转换失败跳过，不影响整体搜索
      }
    }

    const tookMs = Math.round(performance.now() - start);

    return {
      query: request.query,
      total: response.results.length,
      results,
      tookMs,
      engine: 'pagefind',
    };
  } catch {
    // 任何异常返回 null，触发上层降级
    return null;
  }
}

// ============================================================================
// Fuse.js + Web Worker 兜底实现
// ============================================================================

/**
 * 创建 Fuse.js Web Worker 单例
 *
 * 实现要点：
 * 1. 通过 new Worker(URL) 加载 /workers/search-worker.js
 * 2. 加载完成后向 Worker 发送 init 消息，传入索引数据与阈值
 * 3. 监听 Worker ready 消息，标记就绪状态并清空等待队列
 *
 * @returns Worker 实例；非浏览器环境或创建失败返回 null
 */
async function createFuseWorker(): Promise<Worker | null> {
  if (typeof window === 'undefined' || typeof Worker === 'undefined') return null;

  // 已存在则直接复用
  if (fuseWorkerPromise) return fuseWorkerPromise;

  fuseWorkerPromise = (async () => {
    try {
      // 获取 base 路径：Astro 部署在 GitHub Pages 子路径时需拼接 base
      const base = import.meta.env.BASE_URL || '/';

      // 加载 Fuse.js 索引 JSON
      const indexResponse = await fetch(`${base}data/search-index.json`);
      if (!indexResponse.ok) return null;
      const entries = (await indexResponse.json()) as FuseIndexEntry[];
      if (!Array.isArray(entries) || entries.length === 0) return null;

      // 创建 Worker：使用相对 base 路径，兼容 GitHub Pages 子路径部署
      const workerUrl = `${base}workers/search-worker.js`.replace(/\/+/g, '/');
      const worker = new Worker(workerUrl, { type: 'module' });

      // 监听 Worker 消息
      worker.addEventListener('message', (event: MessageEvent<WorkerResponse>) => {
        const msg = event.data;
        if (msg.type === 'ready') {
          fuseWorkerReady = true;
          // 通知所有等待中的回调
          while (fuseReadyCallbacks.length > 0) {
            const cb = fuseReadyCallbacks.shift();
            cb?.(true);
          }
        }
      });

      // 发送 init 消息：传入索引数据与模糊阈值
      const initMsg: WorkerRequest = {
        type: 'init',
        entries,
        threshold: DEFAULT_FUSE_THRESHOLD,
      };
      worker.postMessage(initMsg);

      return worker;
    } catch {
      return null;
    }
  })();

  return fuseWorkerPromise;
}

/**
 * 等待 Fuse.js Worker 就绪
 *
 * @param timeoutMs - 超时时间（毫秒），默认 3000ms
 * @returns true=就绪，false=超时或不可用
 */
function waitForFuseReady(timeoutMs = 3000): Promise<boolean> {
  if (fuseWorkerReady) return Promise.resolve(true);
  return new Promise<boolean>((resolve) => {
    const timer = setTimeout(() => {
      resolve(false);
    }, timeoutMs);
    fuseReadyCallbacks.push((ready) => {
      clearTimeout(timer);
      resolve(ready);
    });
  });
}

/**
 * 通过 Fuse.js Web Worker 执行搜索
 *
 * @param request - 统一搜索请求
 * @returns 统一搜索响应；失败返回离线降级响应
 */
async function searchWithFuse(request: SearchRequest): Promise<SearchResponse> {
  const start = performance.now();
  try {
    const worker = await createFuseWorker();
    if (!worker) {
      // Worker 创建失败：返回空响应，标记为 offline-fallback
      return {
        query: request.query,
        total: 0,
        results: [],
        tookMs: Math.round(performance.now() - start),
        engine: 'offline-fallback',
      };
    }

    // 等待 Worker 就绪
    const ready = await waitForFuseReady();
    if (!ready) {
      return {
        query: request.query,
        total: 0,
        results: [],
        tookMs: Math.round(performance.now() - start),
        engine: 'offline-fallback',
      };
    }

    // 发送搜索请求并等待结果
    const results = await new Promise<SearchResult[]>((resolve, reject) => {
      const handler = (event: MessageEvent<WorkerResponse>) => {
        const msg = event.data;
        if (msg.type === 'results') {
          worker.removeEventListener('message', handler);
          resolve(msg.results);
        } else if (msg.type === 'error') {
          worker.removeEventListener('message', handler);
          reject(new Error(msg.message));
        }
      };
      worker.addEventListener('message', handler);

      const searchMsg: WorkerRequest = {
        type: 'search',
        query: request.query,
        // 条件展开：filter 为 undefined 时不赋值，符合 exactOptionalPropertyTypes 严格模式
        ...(request.filter ? { filter: request.filter } : {}),
        limit: request.limit ?? DEFAULT_LIMIT,
      };
      worker.postMessage(searchMsg);

      // 超时保护
      setTimeout(() => {
        worker.removeEventListener('message', handler);
        reject(new Error('Fuse worker search timeout'));
      }, 5000);
    });

    const tookMs = Math.round(performance.now() - start);

    return {
      query: request.query,
      total: results.length,
      results,
      tookMs,
      engine: 'fuse',
    };
  } catch {
    // 异常时返回 offline-fallback
    return {
      query: request.query,
      total: 0,
      results: [],
      tookMs: Math.round(performance.now() - start),
      engine: 'offline-fallback',
    };
  }
}

// ============================================================================
// 统一对外 API
// ============================================================================

/**
 * 执行统一搜索
 *
 * 调用优先级：
 * 1. Pagefind：构建期生成的全文索引，支持高亮、过滤器、相关性排序
 * 2. Fuse.js + Web Worker：离线兜底，使用 public/data/search-index.json
 * 3. offline-fallback：返回空结果，标记引擎不可用
 *
 * @param request - 搜索请求（query + filter + limit + fuzzy）
 * @returns 搜索响应，包含结果列表、总数、耗时与使用的引擎标识
 *
 * @example
 * const response = await search({
 *   query: '指针',
 *   filter: { modules: ['cpp'], difficulties: ['advanced'] },
 *   limit: 10,
 * });
 */
export async function search(request: SearchRequest): Promise<SearchResponse> {
  // 入参校验：空 query 直接返回空响应
  if (!request.query || request.query.trim().length === 0) {
    return {
      query: request.query,
      total: 0,
      results: [],
      tookMs: 0,
      engine: 'pagefind',
    };
  }

  // 优先尝试 Pagefind
  const pagefindResponse = await searchWithPagefind(request);
  if (pagefindResponse) {
    return pagefindResponse;
  }

  // Pagefind 不可用时降级到 Fuse.js
  return searchWithFuse(request);
}

/**
 * 预加载 Pagefind 索引（可选调用，加速首次搜索）
 *
 * 在用户输入前提前拉取索引分片，减少首次搜索的延迟。
 * 仅在 Pagefind 可用时生效；Fuse.js 模式无预加载。
 *
 * @param query - 预加载的查询词（通常是用户已输入的部分字符）
 */
export async function preloadSearch(query: string): Promise<void> {
  try {
    const pagefind = await loadPagefind();
    if (pagefind && typeof pagefind.preload === 'function') {
      await pagefind.preload(query);
    }
  } catch {
    // 预加载失败静默处理
  }
}

/**
 * 释放搜索引擎占用的资源
 *
 * 用于组件卸载时清理 Worker、断开 Pagefind 连接，避免内存泄漏。
 * 调用后单例缓存会被清空，下次 search() 会重新初始化。
 */
export function disposeSearch(): void {
  try {
    if (fuseWorkerPromise) {
      fuseWorkerPromise.then((worker) => {
        if (worker) {
          const msg: WorkerRequest = { type: 'dispose' };
          worker.postMessage(msg);
          worker.terminate();
        }
      });
      fuseWorkerPromise = null;
      fuseWorkerReady = false;
      fuseReadyCallbacks.length = 0;
    }
    // 重置 Pagefind 单例：下次调用会重新 import
    pagefindPromise = null;
  } catch {
    // 清理失败静默处理
  }
}

// ============================================================================
// 兼容性导出：类型重导出，便于 UI 层引用
// ============================================================================

export type {
  SearchRequest,
  SearchResponse,
  SearchResult,
  SearchFilter,
} from '@/types/search';
