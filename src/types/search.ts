/**
 * 搜索结果类型定义
 *
 * 描述 FANDEX 文档检索的请求、响应与过滤条件。
 * 支持 Pagefind、Fuse.js 与离线降级三种搜索引擎。
 */

/** 搜索结果条目 */
export interface SearchResult {
  /** 文档 slug */
  slug: string;
  /** 文档标题 */
  title: string;
  /** 所属模块 ID */
  module: string;
  /** 匹配片段（含高亮标记） */
  excerpt: string;
  /** 相关度评分（0-1） */
  score: number;
  /** 匹配位置列表 */
  positions?: MatchPosition[];
  /** 文档 URL */
  url: string;
}

/** 匹配位置 */
export interface MatchPosition {
  /** 起始字符偏移 */
  start: number;
  /** 结束字符偏移 */
  end: number;
  /** 匹配字段（title/content/heading/code） */
  field: 'title' | 'content' | 'heading' | 'code';
}

/** 搜索过滤器 */
export interface SearchFilter {
  /** 模块 ID 列表（空表示全部） */
  modules?: string[];
  /** 难度列表 */
  difficulties?: string[];
  /** 标签列表 */
  tags?: string[];
  /** 搜索范围 */
  scope?: 'title' | 'content' | 'all';
}

/** 搜索请求 */
export interface SearchRequest {
  /** 搜索查询词 */
  query: string;
  /** 过滤器 */
  filter?: SearchFilter;
  /** 结果数量上限 */
  limit?: number;
  /** 是否模糊匹配 */
  fuzzy?: boolean;
}

/** 搜索响应 */
export interface SearchResponse {
  /** 原始查询词 */
  query: string;
  /** 匹配结果总数 */
  total: number;
  /** 搜索结果列表 */
  results: SearchResult[];
  /** 耗时（毫秒） */
  tookMs: number;
  /** 搜索引擎（pagefind/fuse/offline-fallback） */
  engine: 'pagefind' | 'fuse' | 'offline-fallback';
}
