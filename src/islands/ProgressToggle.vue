<!--
  进度追踪组件
  切换文档的阅读状态（未读/在读/已读），支持进度导出和导入
  状态持久化到 localStorage，变更时通过自定义事件通知其他组件
-->
<template>
  <div class="progress-toggle" :class="statusClass">
    <!-- 主按钮：显示当前状态或保存中/已保存/失败等中间状态 -->
    <button
      class="progress-btn"
      :title="statusLabel"
      :aria-label="statusLabel"
      :aria-busy="busyState === 'saving'"
      @click="handleToggle"
    >
      <!-- 保存中状态：旋转图标 -->
      <span v-if="busyState === 'saving'" class="progress-busy">
        <svg width="14" height="14" viewBox="0 0 24 24" class="progress-spin-icon">
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-dasharray="31.4"
            stroke-dashoffset="10"
          />
        </svg>
        <span class="progress-label">保存中</span>
      </span>
      <!-- 已保存状态：勾选图标 -->
      <span v-else-if="busyState === 'saved'" class="progress-busy progress-saved">
        <svg width="14" height="14" viewBox="0 0 24 24" style="color: #10b981">
          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
        <span class="progress-label">已保存</span>
      </span>
      <!-- 保存失败状态 -->
      <span v-else-if="busyState === 'error'" class="progress-busy progress-error">
        <svg width="14" height="14" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </svg>
        <span class="progress-label">失败</span>
      </span>
      <!-- 默认状态：圆点 + 状态文字 -->
      <span v-else class="progress-default">
        <span class="progress-dot"></span>
        <span class="progress-label">{{ statusLabel }}</span>
      </span>
    </button>
    <!-- 导出进度按钮 -->
    <button class="progress-export" title="导出进度" aria-label="导出进度" @click="handleExport">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </button>
    <!-- 导入进度按钮 -->
    <button class="progress-import" title="导入进度" aria-label="导入进度" @click="triggerImport">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    </button>
    <!-- 隐藏的文件输入，用于导入进度 -->
    <input
      ref="fileInput"
      type="file"
      accept=".json"
      style="display: none"
      @change="handleImport"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  getProgress,
  toggleStatus,
  exportProgress,
  importProgress,
  type DocStatus,
} from '@/lib/progress';

const props = defineProps<{
  slug: string;
}>();

/** 当前文档的阅读状态 */
const status = ref<DocStatus>('unread');
/** 操作中间状态：idle/saving/saved/error */
const busyState = ref<'idle' | 'saving' | 'saved' | 'error'>('idle');
/** 隐藏的文件输入引用 */
const fileInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  // 挂载时从 localStorage 读取当前文档的进度
  const p = getProgress(props.slug);
  if (p) status.value = p.status;
});

/** 状态对应的 CSS 类名 */
const statusClass = computed(() => `status-${status.value}`);
/** 状态对应的中文标签 */
const statusLabel = computed(() => {
  const map: Record<DocStatus, string> = { unread: '未读', reading: '在读', done: '已读' };
  return map[status.value];
});

/** 切换阅读状态：未读 -> 在读 -> 已读 -> 未读 */
function handleToggle() {
  if (busyState.value === 'saving') return;

  busyState.value = 'saving';

  try {
    status.value = toggleStatus(props.slug);
    // 通知其他组件（如侧边栏）更新进度标记
    document.dispatchEvent(
      new CustomEvent('fandex-progress-change', {
        detail: { slug: props.slug, status: status.value },
      })
    );

    busyState.value = 'saved';
    setTimeout(() => {
      busyState.value = 'idle';
    }, 800);
  } catch {
    busyState.value = 'error';
    setTimeout(() => {
      busyState.value = 'idle';
    }, 1200);
  }
}

/** 导出进度为 JSON 文件下载 */
function handleExport() {
  const data = exportProgress();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'fandex-progress.json';
  a.click();
  URL.revokeObjectURL(url);
}

/** 触发文件选择对话框 */
function triggerImport() {
  fileInput.value?.click();
}

/** 处理导入进度文件 */
function handleImport(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const ok = importProgress(reader.result as string);
    if (ok) {
      // 导入成功后刷新当前文档的状态
      const p = getProgress(props.slug);
      if (p) status.value = p.status;
      document.dispatchEvent(new CustomEvent('fandex-progress-change'));
    }
  };
  reader.readAsText(file);
  // 重置 input 值，允许重复选择同一文件
  input.value = '';
}
</script>

<style scoped>
/* 进度追踪容器 */
.progress-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* 主按钮：显示状态和切换 */
.progress-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  height: 32px;
  border: 1px solid var(--color-border);
  border-radius: 0;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.78em;
  font-family: var(--font-display);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
  box-sizing: border-box;
}

.progress-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* 默认状态和中间状态的容器 */
.progress-default,
.progress-busy {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* 已保存状态的淡入淡出动画 */
.progress-saved {
  animation: progress-fade-in-out 0.8s forwards;
}

/* 错误状态文字颜色 */
.progress-error {
  color: #ef4444;
}

/* 状态圆点：颜色随阅读状态变化 */
.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border);
  flex-shrink: 0;
  transition: background var(--transition-fast);
}

/* 未读状态：灰色圆点 */
.status-unread .progress-dot {
  background: var(--color-border);
}

/* 在读状态：黄色圆点 */
.status-reading .progress-dot {
  background: #f59e0b;
}

/* 已读状态：绿色圆点和文字 */
.status-done .progress-dot {
  background: #10b981;
}

.status-done .progress-btn {
  color: #10b981;
  border-color: #10b981;
}

/* 导出/导入按钮 */
.progress-export,
.progress-import {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border);
  border-radius: 0;
  background: transparent;
  color: var(--color-text-tertiary);
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: 0;
  box-sizing: border-box;
}

.progress-export:hover,
.progress-import:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

/* 保存中旋转动画 */
@keyframes progress-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.progress-spin-icon {
  animation: progress-spin 1s linear infinite;
}

/* 已保存淡入淡出动画 */
@keyframes progress-fade-in-out {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
