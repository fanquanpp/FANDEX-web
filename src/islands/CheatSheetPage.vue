<!--
  速查表独立页面组件
  根据 URL hash 切换显示不同模块的语法速查表
  模块导航由页面侧边栏提供，标题由页面层提供
  本组件仅负责速查内容渲染
-->
<template>
  <div class="cheatsheet-page">
    <!-- 速查表内容区 -->
    <div class="cheatsheet-content" v-if="当前数据" :key="当前模块">
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
 * 根据 URL hash 切换模块，侧边栏导航和页面标题由页面层提供
 * 监听 hashchange 事件实现模块切换
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
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

// ========== 组件属性 ==========

const props = defineProps<{
  /** 所有模块的速查数据，键为模块标识 */
  所有数据: Record<string, CheatSheetData>;
  /** 模块元信息列表 */
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

/** 从 URL hash 读取当前模块 */
function readHash() {
  const hash = window.location.hash.slice(1);
  if (hash && props.模块信息.some((m) => m.key === hash)) {
    当前模块.value = hash;
  }
}

/** hash 变化回调 */
function onHashChange() {
  readHash();
}

// ========== 生命周期 ==========

onMounted(() => {
  readHash();
  window.addEventListener('hashchange', onHashChange);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', onHashChange);
});
</script>

<style scoped>
/* 页面容器 */
.cheatsheet-page {
  max-width: 100%;
  margin: 0 auto;
}

/* 速查表内容区：切换时淡入动画 */
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
</style>
