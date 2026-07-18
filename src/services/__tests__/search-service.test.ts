/**
 * search-service 单元测试
 *
 * 测试策略：
 * search-service 同时支持 Pagefind（动态 import 浏览器环境）与 Fuse.js Web Worker。
 * 本测试聚焦于：
 * 1. search() 入口函数的入参校验（空 query 返回空响应）
 * 2. SSR 环境降级行为（无 window/BroadcastChannel/Worker 时安全返回）
 * 3. disposeSearch() 资源清理
 * 4. preloadSearch() 预加载的 SSR 安全行为
 *
 * 注意：Pagefind 与 Fuse.js 的实际搜索行为依赖浏览器 API，由 E2E 测试覆盖。
 *
 * 覆盖场景：
 * - search：空 query、空白字符 query
 * - preloadSearch：SSR 环境（无 window）应静默返回
 * - disposeSearch：多次调用安全
 * - search：非浏览器环境下应降级到 offline-fallback
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

/** 收集 console.warn 调用，便于验证异常静默处理 */
const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

beforeEach(() => {
  warnSpy.mockClear();
});

describe('search-service', () => {
  describe('search 入口函数', () => {
    it('空 query 应返回空响应且 engine 标识为 pagefind', async () => {
      const { search } = await import('@/services/search-service');
      const response = await search({ query: '' });
      expect(response.total).toBe(0);
      expect(response.results).toEqual([]);
      expect(response.engine).toBe('pagefind');
      expect(response.query).toBe('');
      expect(response.tookMs).toBe(0);
    });

    it('纯空白字符 query 应返回空响应', async () => {
      const { search } = await import('@/services/search-service');
      const response = await search({ query: '   ' });
      expect(response.total).toBe(0);
      expect(response.results).toEqual([]);
    });

    it('非浏览器环境（无 window/Pagefind/Worker）应降级到 offline-fallback 或 fuse', async () => {
      const { search } = await import('@/services/search-service');
      // 测试在 jsdom 环境运行，window 已存在但 Pagefind/Worker 不可用
      // 应返回非空响应（可能是 offline-fallback 或 fuse）
      const response = await search({ query: 'javascript' });
      expect(response).toBeDefined();
      expect(typeof response.total).toBe('number');
      expect(Array.isArray(response.results)).toBe(true);
      // 引擎应为三种合法值之一
      expect(['pagefind', 'fuse', 'offline-fallback']).toContain(response.engine);
    });
  });

  describe('preloadSearch', () => {
    it('SSR 环境（无 window）应静默返回，不抛异常', async () => {
      // 暂时移除 window 模拟 SSR
      const originalWindow = globalThis.window;
      // @ts-expect-error 临时移除 window 模拟 SSR
      delete globalThis.window;
      try {
        const { preloadSearch } = await import('@/services/search-service');
        await expect(preloadSearch('test')).resolves.toBeUndefined();
      } finally {
        globalThis.window = originalWindow;
      }
    });

    it('浏览器环境下应安全返回（Pagefind 不可用时不抛错）', async () => {
      const { preloadSearch } = await import('@/services/search-service');
      await expect(preloadSearch('javascript')).resolves.toBeUndefined();
    });
  });

  describe('disposeSearch', () => {
    it('多次调用应安全，不抛异常', async () => {
      const { disposeSearch } = await import('@/services/search-service');
      expect(() => {
        disposeSearch();
        disposeSearch();
        disposeSearch();
      }).not.toThrow();
    });

    it('调用后再次 search 应仍能正常返回（重新初始化）', async () => {
      const { search, disposeSearch } = await import('@/services/search-service');
      disposeSearch();
      const response = await search({ query: 'cpp' });
      expect(response).toBeDefined();
      expect(typeof response.total).toBe('number');
    });
  });

  describe('search 结果结构', () => {
    it('响应应包含 query/total/results/tookMs/engine 字段', async () => {
      const { search } = await import('@/services/search-service');
      const response = await search({ query: 'react' });
      expect(response).toHaveProperty('query', 'react');
      expect(response).toHaveProperty('total');
      expect(response).toHaveProperty('results');
      expect(response).toHaveProperty('tookMs');
      expect(response).toHaveProperty('engine');
    });

    it('响应 tookMs 应为非负数值', async () => {
      const { search } = await import('@/services/search-service');
      const response = await search({ query: 'algorithm' });
      expect(typeof response.tookMs).toBe('number');
      expect(response.tookMs).toBeGreaterThanOrEqual(0);
    });
  });
});
