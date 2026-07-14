/**
 * Service 层统一入口
 * UI 层（pages/components/islands）禁止直接导入 services 内部模块，必须从此文件导入
 * Data 层（getCollection 等）仅允许在 services 内部调用
 */

// ── 文档服务 ──
export {
  getAllDocs,
  getDocsByModule,
  getDocBySlug,
  getDocNavigation,
  getDocStats,
  getDocsByCategory,
  getRelatedDocs,
  computeReadingTime,
  docSlug,
} from './doc-service';
export type { DocEntry, DocNavigation, DocStats } from './doc-service';

// ── 模块服务 ──
export {
  getAllModules,
  getModule,
  getModulesByCategory,
  getPrimaryCategory,
  getModulePrerequisites,
  getCategories,
} from './module-service';
export type { Module, CategoryInfo } from './module-service';

// ── 标签服务 ──
export {
  getAllTags,
  getDocsByTag,
  getTagStats,
} from './tag-service';
export type { TagWithCount, TagStats } from './tag-service';

// ── 术语表服务 ──
export {
  getGlossaryByModule,
  getAllGlossaryTerms,
  searchGlossary,
} from './glossary-service';
export type { GlossaryEntry } from './glossary-service';

// ── 进度服务 ──
export {
  getProgress,
  setProgress,
  getAllProgress,
  removeProgress,
  subscribeProgress,
  clearAllProgress,
} from './progress-service';
export type { DocStatus, ReadingProgress, ProgressMap, ProgressChangeCallback } from './progress-service';
