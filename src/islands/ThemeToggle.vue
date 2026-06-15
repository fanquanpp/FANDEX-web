<!--
  主题切换组件
  在亮色和暗色模式之间切换，状态持久化到 localStorage
  挂载前不渲染按钮，避免服务端渲染与客户端状态不一致
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

/** 当前主题状态 */
const theme = ref<'light' | 'dark'>('light');
/** 是否已完成客户端挂载，用于避免 SSR/CSR 不一致 */
let mounted = ref(false);

onMounted(() => {
  mounted.value = true;
  // 读取用户保存的主题偏好，无保存值时跟随系统
  const saved = localStorage.getItem('fandex-theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    theme.value = 'dark';
  } else {
    theme.value = 'light';
  }
});

/** 切换主题并持久化到 localStorage */
function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme.value);
  localStorage.setItem('fandex-theme', theme.value);
}
</script>

<template>
  <!-- 仅在客户端挂载后渲染，避免水合不匹配 -->
  <button
    v-if="mounted"
    class="theme-toggle"
    @click="toggle"
    :title="theme === 'dark' ? '亮色模式' : '暗色模式'"
    :aria-label="theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'"
  >
    <!-- 暗色模式下显示太阳图标（切换到亮色） -->
    <svg
      v-if="theme === 'dark'"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
    <!-- 亮色模式下显示月亮图标（切换到暗色） -->
    <svg
      v-else
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>

<style scoped>
/* 主题切换按钮 */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  cursor: pointer;
}
.theme-toggle:hover {
  background: var(--color-bg-hover);
  color: var(--color-primary);
}
</style>
