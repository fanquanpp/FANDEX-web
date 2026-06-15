<!--
  速查表独立页面组件
  提供模块选择标签页，切换显示不同模块的语法速查表
  支持全局搜索、URL hash 持久化选中模块
-->
<template>
  <div class="cheatsheet-page">
    <!-- 模块选择标签栏 -->
    <div class="module-tabs">
      <button
        v-for="mod in 模块列表"
        :key="mod.key"
        class="module-tab"
        :class="{ active: 当前模块 === mod.key }"
        @click="切换模块(mod.key)"
      >
        <span class="tab-icon" :style="{ background: mod.color }">{{ mod.icon }}</span>
        <span class="tab-label">{{ mod.label }}</span>
      </button>
    </div>

    <!-- 速查表内容区 -->
    <div class="cheatsheet-content" v-if="当前数据">
      <CheatSheet
        :数据="当前数据"
        :模块名="当前模块名"
        :搜索框占位符="当前搜索占位符"
        :允许分组折叠="true"
        :显示学习指引="true"
      />
    </div>

    <!-- 无数据提示 -->
    <div v-else class="no-data">暂无速查数据</div>
  </div>
</template>

<script setup lang="ts">
/**
 * 速查表独立页面组件
 * 整合所有模块的速查数据，通过标签页切换
 * 选中模块通过 URL hash 持久化，刷新后可恢复
 */
import { ref, computed, onMounted, watch } from 'vue';
import CheatSheet from './CheatSheet.vue';

/** 速查表完整数据类型 */
interface CheatSheetData {
  元数据?: Record<string, unknown>;
  分组?: Array<{
    分组名: string;
    分组说明?: string;
    条目: Array<Record<string, unknown>>;
  }>;
  [key: string]: unknown;
}

/** 模块信息 */
interface ModuleInfo {
  key: string;
  label: string;
  icon: string;
  color: string;
  placeholder: string;
  data: CheatSheetData;
}

// ========== 组件属性 ==========

const props = defineProps<{
  /** 所有模块的速查数据，键为模块标识 */
  所有数据: Record<string, CheatSheetData>;
  /** 模块元信息列表（标签名、图标、颜色、搜索占位符） */
  模块信息: Array<{
    key: string;
    label: string;
    icon: string;
    color: string;
    placeholder: string;
  }>;
}>();

// ========== 响应式状态 ==========

/** 当前选中的模块标识 */
const 当前模块 = ref(props.模块信息[0]?.key || '');

// ========== 计算属性 ==========

/** 组合后的模块列表（含数据引用） */
const 模块列表 = computed(() =>
  props.模块信息.map((mod) => ({
    ...mod,
    data: props.所有数据[mod.key] || null,
  }))
);

/** 当前模块的速查数据 */
const 当前数据 = computed(() => props.所有数据[当前模块.value]);

/** 当前模块的显示名称 */
const 当前模块名 = computed(() => {
  const mod = props.模块信息.find((m) => m.key === 当前模块.value);
  return mod?.label || '';
});

/** 当前模块的搜索框占位符 */
const 当前搜索占位符 = computed(() => {
  const mod = props.模块信息.find((m) => m.key === 当前模块.value);
  return mod?.placeholder || '搜索命令...';
});

// ========== 方法 ==========

/** 切换到指定模块，同步更新 URL hash */
function 切换模块(key: string) {
  当前模块.value = key;
  if (typeof window !== 'undefined') {
    history.replaceState(null, '', `#${key}`);
  }
}

// ========== 生命周期 ==========

onMounted(() => {
  // 从 URL hash 恢复选中模块
  const hash = window.location.hash.slice(1);
  if (hash && props.模块信息.some((m) => m.key === hash)) {
    当前模块.value = hash;
  }
});
</script>

<style scoped>
/* 页面容器 */
.cheatsheet-page {
  max-width: 100%;
  margin: 0 auto;
}

/* 模块标签栏：横向滚动，支持触摸滑动 */
.module-tabs {
  display: flex;
  gap: 2px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
}

.module-tabs::-webkit-scrollbar {
  display: none;
}

/* 单个模块标签按钮 */
.module-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border-light);
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  font-family: var(--font-display);
  font-size: 0.82em;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);
}

.module-tab:hover {
  background: var(--color-bg-hover);
  color: var(--color-text);
}

/* 选中状态的标签 */
.module-tab.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);
}

/* 标签内的图标徽章 */
.tab-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  font-size: 0.65em;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.module-tab.active .tab-icon {
  background: rgba(255, 255, 255, 0.25) !important;
}

/* 标签文字 */
.tab-label {
  letter-spacing: 0.02em;
}

/* 速查表内容区 */
.cheatsheet-content {
  animation: fadeIn 0.15s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 无数据提示 */
.no-data {
  padding: var(--spacing-2xl) var(--spacing-md);
  text-align: center;
  color: var(--color-text-tertiary);
  font-size: 0.95em;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .module-tab {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.78em;
  }

  .tab-icon {
    width: 18px;
    height: 18px;
    font-size: 0.6em;
  }
}
</style>
