<!--
  搜索对话框组件 (SearchDialog)
  ==============================
  功能概述：
  - 基于 shadcn-vue Dialog + radix-vue 原语实现的全局搜索弹窗
  - 通过 Cmd/Ctrl + K 快捷键唤起，Esc 关闭（Dialog 原生支持）
  - 调用 src/services/search-service.ts 统一 search() API
    优先使用 Pagefind（构建期索引），失败时降级至 Fuse.js + Web Worker
  - 支持 module / difficulty / tags 三维过滤器
  - 历史记录最近 5 条搜索词，持久化至 localStorage
  - 键盘导航：上下箭头切换结果，Enter 跳转，Esc 关闭
  - 响应式：移动端全屏弹窗，桌面端居中模态

  三层架构：
  - UI 层（本组件）：仅负责交互、状态管理、结果展示
  - Service 层：search() 函数封装搜索引擎选择与降级逻辑
  - Data 层：Pagefind 索引（dist/pagefind/）+ Fuse.js 索引（public/data/search-index.json）

  使用方式：
  - 在 Layout.astro / HomeLayout.astro 中通过 client:load 水合
  - 由 Header 中的搜索按钮触发，或全局监听 Cmd/Ctrl + K 快捷键
-->

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/ui/components/dialog';
import { search as searchService, disposeSearch } from '@/services/search-service';
import type { SearchRequest, SearchResponse, SearchResult, SearchFilter } from '@/types/search';
import { Search, Loader2, Clock, ArrowUp, ArrowDown, CornerDownLeft } from '@lucide/vue';

// ============================================================================
// Props 与常量
// ============================================================================

interface Props {
  /** 是否默认打开（受控模式，默认 false） */
  open?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
});

const emit = defineEmits<{
  /** 打开状态变更事件 */
  (e: 'update:open', value: boolean): void;
}>();

/** localStorage 历史记录键名（与 BaseLayout 一致使用 fandex- 前缀） */
const HISTORY_STORAGE_KEY = 'fandex-search-history';

/** 历史记录最大条数 */
const HISTORY_MAX = 5;

/** 搜索 debounce 延迟（毫秒） */
const DEBOUNCE_MS = 200;

/** 默认结果数量上限 */
const SEARCH_LIMIT = 20;

// ============================================================================
// 响应式状态
// ============================================================================

/** Dialog 打开状态（v-model 双向绑定） */
const isOpen = ref(props.open);

/** 搜索输入框值 */
const query = ref('');

/** 搜索响应（包含结果、总数、引擎、耗时） */
const searchResponse = ref<SearchResponse | null>(null);

/** 是否正在搜索 */
const isLoading = ref(false);

/** 当前键盘选中的结果索引（-1 表示无选中） */
const activeIndex = ref(-1);

/** 历史搜索词列表（最近 5 条，最新的在前） */
const history = ref<string[]>([]);

/** 当前激活的过滤器 */
const filter = ref<SearchFilter>({});

/** 错误信息（搜索失败时显示） */
const errorMsg = ref('');

/** 输入框 DOM 引用（用于自动聚焦） */
const inputEl = ref<HTMLInputElement | null>(null);

/** 结果列表滚动容器引用 */
const resultsEl = ref<HTMLElement | null>(null);

/** debounce 定时器句柄 */
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

// ============================================================================
// 计算属性
// ============================================================================

/** 搜索结果列表 */
const results = computed<SearchResult[]>(() => {
  return searchResponse.value?.results ?? [];
});

/** 结果总数 */
const total = computed<number>(() => {
  return searchResponse.value?.total ?? 0;
});

/** 当前使用的搜索引擎标识 */
const engine = computed<string>(() => {
  return searchResponse.value?.engine ?? '';
});

/** 是否显示空状态（有查询词但无结果且未在加载） */
const showEmpty = computed<boolean>(() => {
  return (
    !isLoading.value &&
    query.value.trim().length > 0 &&
    searchResponse.value !== null &&
    results.value.length === 0
  );
});

/** 是否显示历史记录（无查询词时） */
const showHistory = computed<boolean>(() => {
  return !isLoading.value && query.value.trim().length === 0 && history.value.length > 0;
});

/** 是否有激活的过滤器 */
const hasFilter = computed<boolean>(() => {
  return (
    (filter.value.modules?.length ?? 0) > 0 ||
    (filter.value.difficulties?.length ?? 0) > 0 ||
    (filter.value.tags?.length ?? 0) > 0
  );
});

// ============================================================================
// 生命周期
// ============================================================================

/**
 * 组件挂载：
 * 1. 加载历史记录
 * 2. 注册全局 Cmd/Ctrl + K 快捷键监听
 * 3. 注册自定义事件 fandex-open-search 监听（供 Header 搜索按钮触发）
 */
onMounted(() => {
  loadHistory();
  window.addEventListener('keydown', handleGlobalKeydown);
  window.addEventListener('fandex-open-search', handleExternalOpen);
  // 通知 BaseLayout 兜底脚本与 Layout 搜索按钮：SearchDialog 已就绪
  // 通过自定义事件 + window 全局标志双通道通知，确保兜底逻辑可靠判定
  // window.__fandexSearchDialogReady 类型由 src/types/global.d.ts 统一声明
  window.dispatchEvent(new CustomEvent('fandex-search-dialog-ready'));
  window.__fandexSearchDialogReady = true;
});

/**
 * 组件卸载前：
 * 1. 移除全局快捷键监听
 * 2. 移除自定义事件监听
 * 3. 释放搜索引擎资源（Worker、Pagefind 连接）
 * 4. 清理 debounce 定时器
 */
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleGlobalKeydown);
  window.removeEventListener('fandex-open-search', handleExternalOpen);
  disposeSearch();
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
});

// ============================================================================
// 监听器
// ============================================================================

/**
 * 监听 props.open 变化，同步内部状态
 */
watch(
  () => props.open,
  (val) => {
    isOpen.value = val;
  }
);

/**
 * 监听 isOpen 变化：
 * - 打开时自动聚焦输入框，重置状态
 * - 关闭时清空查询词与结果
 */
watch(isOpen, async (val) => {
  emit('update:open', val);
  if (val) {
    query.value = '';
    searchResponse.value = null;
    activeIndex.value = -1;
    errorMsg.value = '';
    await nextTick();
    inputEl.value?.focus();
  }
});

/**
 * 监听查询词变化，触发 debounce 搜索
 */
watch(query, (val) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  // 空查询词立即清空结果
  if (val.trim().length === 0) {
    searchResponse.value = null;
    activeIndex.value = -1;
    return;
  }
  debounceTimer = setTimeout(() => {
    void doSearch();
  }, DEBOUNCE_MS);
});

// ============================================================================
// 方法实现
// ============================================================================

/**
 * 全局快捷键监听：Cmd/Ctrl + K 唤起搜索
 */
function handleGlobalKeydown(e: KeyboardEvent): void {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    isOpen.value = true;
  }
}

/**
 * 外部触发打开：监听 Header 搜索按钮派发的 fandex-open-search 自定义事件
 * 事件由 Astro 组件中的 native 按钮触发，避免 Vue 组件跨组件通信
 */
function handleExternalOpen(): void {
  isOpen.value = true;
}

/**
 * 加载历史记录：从 localStorage 读取最近 5 条搜索词
 * 异常时静默处理，返回空数组
 */
function loadHistory(): void {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return;
    // JSON.parse 返回 any，通过 Array.isArray + 类型守卫安全转换为 string[]
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      history.value = parsed
        .filter((item): item is string => typeof item === 'string')
        .slice(0, HISTORY_MAX);
    }
  } catch {
    // 历史记录损坏时静默清空
    history.value = [];
  }
}

/**
 * 保存历史记录：将搜索词插入到 history 头部（去重），保留前 5 条
 *
 * @param term - 待保存的搜索词
 */
function saveHistory(term: string): void {
  const trimmed = term.trim();
  if (!trimmed) return;
  // 去重：移除已存在的相同搜索词
  const deduped = history.value.filter((item) => item !== trimmed);
  // 插入到头部
  deduped.unshift(trimmed);
  // 保留前 HISTORY_MAX 条
  history.value = deduped.slice(0, HISTORY_MAX);
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history.value));
  } catch {
    // localStorage 写入失败静默处理
  }
}

/**
 * 执行搜索：调用 search-service 的 search() 函数
 * 异常时设置 errorMsg，并清空结果
 */
async function doSearch(): Promise<void> {
  const trimmed = query.value.trim();
  if (!trimmed) {
    searchResponse.value = null;
    return;
  }
  isLoading.value = true;
  errorMsg.value = '';
  try {
    const request: SearchRequest = {
      query: trimmed,
      filter: hasFilter.value ? filter.value : undefined,
      limit: SEARCH_LIMIT,
      fuzzy: true,
    };
    const response = await searchService(request);
    searchResponse.value = response;
    activeIndex.value = response.results.length > 0 ? 0 : -1;
  } catch (err) {
    errorMsg.value = err instanceof Error ? err.message : '搜索失败';
    searchResponse.value = null;
    activeIndex.value = -1;
  } finally {
    isLoading.value = false;
  }
}

/**
 * 键盘事件处理：在输入框中处理上下箭头、Enter、Esc
 */
function handleInputKeydown(e: KeyboardEvent): void {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      moveActive(1);
      break;
    case 'ArrowUp':
      e.preventDefault();
      moveActive(-1);
      break;
    case 'Enter':
      e.preventDefault();
      if (activeIndex.value >= 0 && activeIndex.value < results.value.length) {
        selectResult(results.value[activeIndex.value]);
      }
      break;
    case 'Escape':
      // radix-vue Dialog 已处理 Esc 关闭，此处无需额外逻辑
      break;
    default:
      break;
  }
}

/**
 * 移动激活索引：上下方向键导航
 *
 * @param delta - 移动步长（+1 下移，-1 上移）
 */
function moveActive(delta: number): void {
  if (results.value.length === 0) return;
  let next = activeIndex.value + delta;
  // 循环导航：超出末尾回到开头，超出开头回到末尾
  if (next < 0) next = results.value.length - 1;
  if (next >= results.value.length) next = 0;
  activeIndex.value = next;
  // 滚动激活项到可视区域
  void nextTick(() => {
    const container = resultsEl.value;
    if (!container) return;
    const items = container.querySelectorAll('[data-result-item]');
    const active = items[next];
    if (active && 'scrollIntoView' in active) {
      (active as HTMLElement).scrollIntoView({ block: 'nearest' });
    }
  });
}

/**
 * 选中搜索结果：保存历史记录并跳转到结果 URL
 *
 * @param result - 选中的搜索结果
 */
function selectResult(result: SearchResult): void {
  saveHistory(query.value.trim());
  isOpen.value = false;
  // 跳转到结果页面
  if (result.url) {
    window.location.href = result.url;
  }
}

/**
 * 点击历史记录项：填充查询词并触发搜索
 *
 * @param term - 历史搜索词
 */
function clickHistory(term: string): void {
  query.value = term;
  // watch 会自动触发 debounce 搜索
}

/**
 * 清空历史记录
 */
function clearHistory(): void {
  history.value = [];
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch {
    // localStorage 操作失败静默处理
  }
}

/**
 * 清空过滤器
 */
function clearFilter(): void {
  filter.value = {};
  // 若有查询词，触发重新搜索
  if (query.value.trim().length > 0) {
    void doSearch();
  }
}

/**
 * 切换过滤器中的某个值（toggle 语义）
 *
 * @param key - 过滤器字段名
 * @param value - 待切换的值
 */
function toggleFilter(key: 'modules' | 'difficulties' | 'tags', value: string): void {
  const current = filter.value[key] ?? [];
  const exists = current.includes(value);
  const next = exists ? current.filter((v) => v !== value) : [...current, value];
  filter.value = {
    ...filter.value,
    [key]: next,
  };
  // 若有查询词，触发重新搜索
  if (query.value.trim().length > 0) {
    void doSearch();
  }
}

/**
 * 判断过滤器中某个值是否激活
 *
 * @param key - 过滤器字段名
 * @param value - 待检查的值
 */
function isFilterActive(key: 'modules' | 'difficulties' | 'tags', value: string): boolean {
  return (filter.value[key] ?? []).includes(value);
}

/**
 * 净化 excerpt HTML：使用 DOMParser 解析并仅保留 <mark> 标签
 *
 * Pagefind 返回的 excerpt 已经过其内部净化，仅含 <mark> 标签；
 * 此处再做一层防护，移除可能的 <script> / <iframe> 等危险标签。
 *
 * @param html - 原始 excerpt HTML
 * @returns 净化后的 HTML 字符串
 */
function sanitizeExcerpt(html: string): string {
  if (!html) return '';
  try {
    // 简易白名单：仅允许 <mark> 标签，其他标签全部转义
    return html.replace(/<(?!\/?mark\b)[^>]*>/gi, '');
  } catch {
    return '';
  }
}

// ============================================================================
// 常用过滤选项（基于 FANDEX 文档元数据）
// ============================================================================

/** 难度过滤选项 */
const DIFFICULTY_OPTIONS: ReadonlyArray<{ label: string; value: string }> = [
  { label: '入门', value: 'beginner' },
  { label: '进阶', value: 'intermediate' },
  { label: '高级', value: 'advanced' },
];

/** 模块过滤选项（仅展示常用模块，避免列表过长） */
const MODULE_OPTIONS: ReadonlyArray<{ label: string; value: string }> = [
  { label: 'C', value: 'c' },
  { label: 'C++', value: 'cpp' },
  { label: 'Java', value: 'java' },
  { label: 'Go', value: 'go' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'CSS', value: 'css' },
  { label: 'HTML5', value: 'html5' },
  { label: 'Git', value: 'git' },
  { label: '算法', value: 'algorithm' },
];
</script>

<template>
  <!-- Dialog 根：通过 v-model:open 双向绑定控制开关 -->
  <Dialog v-model:open="isOpen">
    <DialogContent size="lg" class="search-dialog-content p-0 gap-0 w-[calc(100vw-2rem)] sm:w-full">
      <!-- 标题（sr-only：视觉隐藏，仅供屏幕阅读器使用） -->
      <DialogTitle class="sr-only">全局搜索</DialogTitle>
      <DialogDescription class="sr-only">
        通过关键词搜索 FANDEX 文档，支持模块、难度、标签过滤
      </DialogDescription>

      <!-- 搜索输入区：固定在顶部 -->
      <div class="search-input-section border-b border-border">
        <div class="flex items-center gap-3 px-4 py-3">
          <!-- 搜索图标或加载 spinner -->
          <Loader2 v-if="isLoading" class="size-5 text-primary-500 animate-spin shrink-0" />
          <Search v-else class="size-5 text-text-tertiary shrink-0" />
          <!-- 搜索输入框 -->
          <input
            ref="inputEl"
            v-model="query"
            type="text"
            placeholder="搜索文档、模块、标签…"
            class="search-input flex-1 bg-transparent border-0 outline-none text-base text-text-primary placeholder:text-text-tertiary"
            autocomplete="off"
            spellcheck="false"
            @keydown="handleInputKeydown"
          />
          <!-- 快捷键提示（仅桌面端显示） -->
          <kbd
            class="hidden sm:inline-flex shrink-0 items-center gap-1 px-2 py-0.5 rounded border border-border text-xs text-text-tertiary bg-surface"
          >
            Esc
          </kbd>
        </div>
      </div>

      <!-- 过滤器区：仅在有查询词或结果时显示 -->
      <div
        v-if="query.trim().length > 0 || hasFilter"
        class="filter-section border-b border-border px-4 py-2 flex flex-wrap items-center gap-2 text-xs"
      >
        <span class="text-text-tertiary shrink-0">过滤：</span>
        <!-- 模块过滤器（下拉选择样式简化为按钮组） -->
        <button
          v-for="opt in MODULE_OPTIONS"
          :key="`m-${opt.value}`"
          type="button"
          class="filter-chip"
          :class="{ 'filter-chip-active': isFilterActive('modules', opt.value) }"
          @click="toggleFilter('modules', opt.value)"
        >
          {{ opt.label }}
        </button>
        <span class="mx-1 text-border-strong">|</span>
        <!-- 难度过滤器 -->
        <button
          v-for="opt in DIFFICULTY_OPTIONS"
          :key="`d-${opt.value}`"
          type="button"
          class="filter-chip"
          :class="{ 'filter-chip-active': isFilterActive('difficulties', opt.value) }"
          @click="toggleFilter('difficulties', opt.value)"
        >
          {{ opt.label }}
        </button>
        <!-- 清空过滤器按钮 -->
        <button
          v-if="hasFilter"
          type="button"
          class="filter-clear ml-auto text-text-tertiary hover:text-text-primary"
          @click="clearFilter"
        >
          清空过滤
        </button>
      </div>

      <!-- 结果区：滚动容器 -->
      <div ref="resultsEl" class="search-results-section max-h-[60vh] overflow-y-auto">
        <!-- 加载状态 -->
        <div v-if="isLoading" class="search-state px-4 py-8 text-center text-text-secondary">
          <Loader2 class="size-6 mx-auto mb-2 text-primary-500 animate-spin" />
          <p class="text-sm">正在搜索…</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="errorMsg" class="search-state px-4 py-8 text-center text-error">
          <p class="text-sm">{{ errorMsg }}</p>
        </div>

        <!-- 历史记录：无查询词时显示 -->
        <div v-else-if="showHistory" class="history-section px-2 py-2">
          <div class="flex items-center justify-between px-2 py-1">
            <span class="text-xs text-text-tertiary flex items-center gap-1">
              <Clock class="size-3" />
              最近搜索
            </span>
            <button
              type="button"
              class="text-xs text-text-tertiary hover:text-text-primary"
              @click="clearHistory"
            >
              清空
            </button>
          </div>
          <ul class="history-list">
            <li v-for="(term, i) in history" :key="`h-${i}`">
              <button
                type="button"
                class="history-item w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-hover rounded-md text-sm text-text-primary"
                @click="clickHistory(term)"
              >
                <Clock class="size-3.5 text-text-tertiary shrink-0" />
                <span class="flex-1 truncate">{{ term }}</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- 空状态：有查询词但无结果 -->
        <div v-else-if="showEmpty" class="search-state px-4 py-10 text-center">
          <Search class="size-8 mx-auto mb-3 text-text-tertiary" />
          <p class="text-sm text-text-secondary mb-1">未找到与 "{{ query }}" 相关的文档</p>
          <p class="text-xs text-text-tertiary">建议尝试更短的关键词，或清除过滤器</p>
        </div>

        <!-- 结果列表 -->
        <ul v-else-if="results.length > 0" class="result-list py-2">
          <li v-for="(result, i) in results" :key="`r-${i}-${result.slug}`" :data-result-item="i">
            <button
              type="button"
              class="result-item w-full text-left px-4 py-2.5 flex flex-col gap-1 transition-colors"
              :class="{ 'result-item-active': i === activeIndex }"
              @click="selectResult(result)"
              @mouseenter="activeIndex = i"
            >
              <!-- 结果头部：标题 + 模块标签 -->
              <div class="flex items-center gap-2">
                <span class="result-title text-sm font-medium text-text-primary truncate flex-1">
                  {{ result.title }}
                </span>
                <span
                  v-if="result.module"
                  class="result-module shrink-0 px-1.5 py-0.5 rounded text-xs bg-surface text-text-secondary border border-border"
                >
                  {{ result.module }}
                </span>
              </div>
              <!-- 摘要（含 <mark> 高亮） -->
              <p
                v-if="result.excerpt"
                class="result-excerpt text-xs text-text-secondary line-clamp-2"
                v-html="sanitizeExcerpt(result.excerpt)"
              ></p>
            </button>
          </li>
        </ul>

        <!-- 初始状态：无查询词且无历史记录 -->
        <div v-else class="search-state px-4 py-10 text-center text-text-tertiary">
          <Search class="size-8 mx-auto mb-3 opacity-50" />
          <p class="text-sm">输入关键词开始搜索 FANDEX 文档</p>
        </div>
      </div>

      <!-- 底部状态栏：结果统计、引擎标识、键盘提示 -->
      <div
        v-if="!isLoading && searchResponse"
        class="search-footer border-t border-border px-4 py-2 flex items-center justify-between text-xs text-text-tertiary"
      >
        <span>
          共 {{ total }} 条结果
          <span v-if="searchResponse.tookMs > 0" class="ml-2">
            耗时 {{ searchResponse.tookMs }}ms
          </span>
        </span>
        <div class="flex items-center gap-3">
          <!-- 引擎标识：pagefind / fuse / offline-fallback -->
          <span
            class="px-1.5 py-0.5 rounded bg-surface border border-border"
            :title="`搜索引擎: ${engine}`"
          >
            {{ engine }}
          </span>
          <!-- 键盘导航提示 -->
          <span class="hidden sm:flex items-center gap-2">
            <kbd class="kbd-mini">
              <ArrowUp class="size-2.5" />
            </kbd>
            <kbd class="kbd-mini">
              <ArrowDown class="size-2.5" />
            </kbd>
            <span>切换</span>
            <kbd class="kbd-mini">
              <CornerDownLeft class="size-2.5" />
            </kbd>
            <span>跳转</span>
          </span>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
/* ============================================================================
   SearchDialog 局部样式
   ----------------------------------------------------------------------------
   样式策略：
   - 优先使用 Tailwind 工具类（与 Design Tokens 对齐）
   - 以下 scoped 样式仅处理 Tailwind 无法覆盖的细节（如 line-clamp、kbd 样式）
   ============================================================================ */

/* 搜索输入区：去除 input 默认外观 */
.search-input:focus {
  outline: none;
}

/* 过滤器 chip */
.filter-chip {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-bg-base);
  color: var(--color-text-secondary);
  font-size: 11px;
  line-height: 1.4;
  transition:
    background var(--duration-fast),
    color var(--duration-fast),
    border-color var(--duration-fast);
}
.filter-chip:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}
.filter-chip-active {
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
  border-color: var(--color-primary-500);
}
.filter-chip-active:hover {
  background: var(--color-primary-600);
  color: var(--color-text-inverse);
}

/* 结果项 */
.result-item {
  border-left: 2px solid transparent;
}
.result-item-active {
  background: var(--color-bg-hover);
  border-left-color: var(--color-primary-500);
}
.result-item-active .result-title {
  color: var(--color-primary-600);
}

/* 摘要 line-clamp：兼容多行截断 */
.result-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* 高亮 <mark> 标签样式 */
}
.result-excerpt :deep(mark) {
  background: var(--color-accent-200);
  color: var(--color-text-primary);
  padding: 0 2px;
  border-radius: 2px;
}
[data-theme='dark'] .result-excerpt :deep(mark) {
  background: var(--color-accent-900);
  color: var(--color-accent-200);
}

/* 迷你 kbd 键盘提示 */
.kbd-mini {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 3px;
  border: 1px solid var(--color-border);
  border-radius: 3px;
  background: var(--color-bg-surface);
  color: var(--color-text-secondary);
  font-size: 10px;
  line-height: 1;
}

/* ============================================================================
   响应式：移动端全屏弹窗
   ----------------------------------------------------------------------------
   修复 [H3]：原 `.search-dialog-content :deep(.DialogContent)` 为后代选择器,
   期望匹配 .search-dialog-content 内部的 .DialogContent 元素。但实际上
   .search-dialog-content 类通过 props.class 传入 DialogContent,被 cn() 合并
   到 DialogContentPrimitive 根元素上,与 .search-dialog-content 是同一元素
   (且 radix-vue 不会渲染 .DialogContent 类)。后代选择器永远不匹配。
   修复:改用 `:deep(.search-dialog-content)` 直接选中根元素本身,穿透 scoped
   样式的 data-v 属性约束(DialogPortal Teleport 后属性可能不在同一元素上)。
   ============================================================================ */
@media (max-width: 640px) {
  :deep(.search-dialog-content) {
    width: 100vw !important;
    max-width: 100vw !important;
    height: 100vh !important;
    max-height: 100vh !important;
    border-radius: 0 !important;
    margin: 0 !important;
    transform: none !important;
    left: 0 !important;
    top: 0 !important;
  }
  /* 移动端结果区填满剩余空间 */
  .search-results-section {
    max-height: calc(100vh - 120px) !important;
  }
}
</style>
