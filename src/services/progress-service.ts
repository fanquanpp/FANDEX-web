/**
 * 进度服务模块
 * 统一管理文档阅读进度的读取、写入、删除和订阅
 * 合并原 @/lib/progress 与 @/lib/store 的进度管理职责
 *
 * SSR 安全说明：
 * - Astro 构建阶段（SSR）localStorage 和 document 均不可用
 * - 所有函数在 SSR 阶段安全返回空数据或空操作，不抛异常
 * - 客户端阶段使用 localStorage 持久化，并通过自定义事件广播变更
 *
 * 事件机制：
 * - fan dex-progress-change：进度变更时派发（与现有 ProgressToggle 组件兼容）
 * - progress-sync：跨标签页同步事件
 * - storage：原生跨标签页存储事件
 */
import {
  getAllProgress as getAllProgressRaw,
  getProgress as getProgressRaw,
  setProgress as setProgressRaw,
  type DocStatus,
  type ReadingProgress,
  type ProgressMap,
} from '@/lib/progress';

/** 进度变更回调函数类型 */
type ProgressChangeCallback = (progress: ProgressMap) => void;

/** localStorage 存储键名（与 @/lib/progress 保持一致） */
const STORAGE_KEY = 'fandex-progress';

/** 进度变更自定义事件名称（与现有组件保持一致） */
const PROGRESS_CHANGE_EVENT = 'fandex-progress-change';
/** 跨标签页同步事件名称 */
const PROGRESS_SYNC_EVENT = 'progress-sync';

/**
 * 获取所有文档的阅读进度
 * SSR 阶段安全返回空对象；异常时回退为空对象
 * @returns 进度映射表（docId → ReadingProgress）
 */
export function getAllProgress(): ProgressMap {
  try {
    return getAllProgressRaw();
  } catch {
    return {};
  }
}

/**
 * 获取单个文档的阅读进度
 * @param docId - 文档唯一标识（格式为 "moduleId/slug"）
 * @returns 阅读进度对象；无记录或异常时返回 null
 */
export function getProgress(docId: string): ReadingProgress | null {
  try {
    return getProgressRaw(docId);
  } catch {
    return null;
  }
}

/**
 * 设置文档的阅读进度
 * 写入 localStorage 后派发变更事件，通知订阅者更新
 * @param docId - 文档唯一标识
 * @param status - 阅读状态（unread | reading | done）
 * @param scrollPos - 滚动位置（可选，默认 0）
 */
export function setProgress(docId: string, status: DocStatus, scrollPos = 0): void {
  try {
    setProgressRaw(docId, status, scrollPos);
    notifyProgressChange();
  } catch {
    // SSR 或存储异常时静默忽略，不影响渲染
  }
}

/**
 * 删除指定文档的阅读进度
 * @param docId - 文档唯一标识
 */
export function removeProgress(docId: string): void {
  try {
    const all = getAllProgressRaw();
    delete all[docId];
    saveProgressMap(all);
    notifyProgressChange();
  } catch {
    // 异常时静默忽略
  }
}

/**
 * 清空所有文档的阅读进度
 */
export function clearAllProgress(): void {
  try {
    saveProgressMap({});
    notifyProgressChange();
  } catch {
    // 异常时静默忽略
  }
}

/**
 * 订阅进度变更事件
 * 用于 Vue 岛屿组件响应式更新：当进度变化时回调被触发
 * 监听三类事件：fandex-progress-change（本组件变更）、progress-sync（跨标签页）、storage（原生跨标签页）
 * @param callback - 进度变更回调函数，接收最新的进度映射表
 * @returns 取消订阅函数（调用后移除所有监听）
 */
export function subscribeProgress(callback: ProgressChangeCallback): () => void {
  // SSR 阶段无 document，返回空操作取消函数
  if (typeof document === 'undefined') {
    return () => {};
  }
  const handler = () => callback(getAllProgress());
  document.addEventListener(PROGRESS_CHANGE_EVENT, handler);
  document.addEventListener(PROGRESS_SYNC_EVENT, handler);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handler);
  }
  return () => {
    document.removeEventListener(PROGRESS_CHANGE_EVENT, handler);
    document.removeEventListener(PROGRESS_SYNC_EVENT, handler);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handler);
    }
  };
}

/**
 * 内部：保存进度映射表到 localStorage
 * 直接写入 localStorage，作为 removeProgress 和 clearAllProgress 的底层实现
 * @param data - 进度映射表
 */
function saveProgressMap(data: ProgressMap): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * 内部：派发进度变更事件，通知订阅者
 * 仅在客户端环境执行
 */
function notifyProgressChange(): void {
  if (typeof document === 'undefined') return;
  document.dispatchEvent(new CustomEvent(PROGRESS_CHANGE_EVENT));
}

export type { DocStatus, ReadingProgress, ProgressMap, ProgressChangeCallback };
