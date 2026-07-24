<!--
  公告弹窗组件 (AnnouncementModal)
  ===============================
  功能概述：
  - 全站重要公告的模态弹窗通知，居中显示，遮罩 + 卡片结构
  - 关闭方式：关闭按钮、ESC 键、点击遮罩
  - 关闭后通过 localStorage 持久化"已读"状态，后续访问不再弹出
  - 通过版本号机制控制公告更新：当 announcementVersion 变化时，已读状态重置，弹窗重新显示
  - 暗色 / 亮色主题自动适配（复用全局 --color-* CSS 变量）
  - 进入动画：遮罩淡入 + 卡片淡入缩放；退出动画：淡出

  数据流：
  - onMounted 时检查 localStorage(key: fandex-announcement-dismissed-v{version})
  - 未关闭过 → 显示弹窗，锁定 body 滚动
  - 用户关闭 → 写入 localStorage，隐藏弹窗，恢复滚动

  使用场景：
  - 通过 client:load 在 BaseLayout 中引入，首页与文档页均会展示
  - 仅客户端交互，SSR 阶段不渲染弹窗 DOM（v-if visible 控制）
-->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

/**
 * 公告版本号
 * 说明：每次公告内容发生实质性变更时递增该版本号
 * 版本号变化后，已读状态对应的 localStorage key 随之改变，弹窗将重新展示给所有用户
 */
const announcementVersion = '1';

/** localStorage 键名：携带版本号，版本升级后自动失效旧 key */
const STORAGE_KEY = `fandex-announcement-dismissed-v${announcementVersion}`;

/** 弹窗是否可见：初始为 false，onMounted 中根据 localStorage 状态决定是否显示 */
const visible = ref(false);

/** 是否已完成进入动画：用于控制 transition class 的挂载时机 */
const shown = ref(false);

/** 关闭按钮引用，用于关闭后焦点回归 */
const closeButtonRef = ref<HTMLButtonElement | null>(null);

/** 卡片容器引用，用于焦点管理 */
const cardRef = ref<HTMLDivElement | null>(null);

/**
 * 锁定背景滚动
 * 说明：弹窗显示时给 body 添加 overflow:hidden，防止背景滚动穿透
 */
function lockScroll() {
  document.body.style.overflow = 'hidden';
}

/**
 * 恢复背景滚动
 * 说明：弹窗关闭后恢复 body 默认 overflow 行为
 */
function unlockScroll() {
  document.body.style.overflow = '';
}

/**
 * 打开弹窗
 * 流程：visible=true → nextTick 后触发 shown=true 启动进入动画 → 锁定滚动 → 焦点移入卡片
 */
async function open() {
  visible.value = true;
  await nextTick();
  // 触发进入动画（下一帧添加 shown class，使 transition 生效）
  requestAnimationFrame(() => {
    shown.value = true;
  });
  lockScroll();
  // 焦点移至卡片内部，便于键盘用户立即操作
  await nextTick();
  cardRef.value?.focus();
}

/**
 * 关闭弹窗
 * 流程：shown=false 触发退出动画 → 动画结束后 visible=false → 解锁滚动 → 持久化已读状态
 */
function close() {
  shown.value = false;
  // 等待退出动画完成（200ms 与 CSS transition 时长一致）
  setTimeout(() => {
    visible.value = false;
    unlockScroll();
  }, 200);
  // 持久化"已读"状态，后续访问不再弹出
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // localStorage 不可用时静默降级：本次会话关闭后不再显示，但刷新后会再次出现
  }
}

/**
 * 遮罩点击关闭
 * 说明：仅当点击目标是遮罩本身（非卡片内部元素）时关闭，避免误触
 */
function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    close();
  }
}

/**
 * 键盘事件处理
 * - ESC：关闭弹窗
 * - Tab / Shift+Tab：基础焦点陷阱，将焦点限制在卡片内
 */
function onKeydown(e: KeyboardEvent) {
  if (!visible.value) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    close();
    return;
  }
  // 基础焦点陷阱：Tab 与 Shift+Tab 在卡片内循环
  if (e.key === 'Tab' && cardRef.value) {
    const focusable = cardRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }
}

onMounted(() => {
  // 检查 localStorage：未关闭过当前版本则展示弹窗
  let dismissed = false;
  try {
    dismissed = localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    // localStorage 不可用时默认未关闭，确保用户至少看到一次公告
  }
  if (!dismissed) {
    open();
  }
  // 注册全局键盘监听
  document.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  // 组件卸载时清理监听器与滚动锁，防止泄漏
  document.removeEventListener('keydown', onKeydown);
  unlockScroll();
});
</script>

<template>
  <!--
    弹窗根容器：Teleport 到 body，避免被父级 z-index / overflow 裁切
    v-if 控制 DOM 存在：关闭后完全移除，避免残留在无障碍树中
  -->
  <Teleport to="body">
    <div
      v-if="visible"
      class="announcement-root"
      :class="{ 'announcement-root--shown': shown }"
      @click="onBackdropClick"
      role="presentation"
    >
      <!-- 公告卡片：role=dialog 声明模态对话框，aria-modal 提示辅助技术遮罩背景 -->
      <div
        ref="cardRef"
        class="announcement-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="announcement-title"
        tabindex="-1"
      >
        <!-- 顶部标识条：品牌色渐变，强化公告属性 -->
        <div class="announcement-banner" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M3 11l19-9-9 19-2-8-8-2z" />
          </svg>
        </div>

        <!-- 关闭按钮：右上角固定，支持键盘与鼠标操作 -->
        <button
          ref="closeButtonRef"
          class="announcement-close"
          type="button"
          @click="close"
          aria-label="关闭公告"
          title="关闭"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <!-- 公告标题 -->
        <h2 id="announcement-title" class="announcement-title">内容更新公告</h2>

        <!-- 公告元信息：发布日期与版本标识 -->
        <div class="announcement-meta">
          <span class="announcement-date">2026 年 7 月</span>
          <span class="announcement-tag">公告</span>
        </div>

        <!-- 公告正文 -->
        <div class="announcement-body">
          <p>尊敬的用户：</p>
          <p>
            感谢您一直以来对 FANDEX 项目的关注与支持。FANDEX-Web
            仓库内容（含文档）现已暂停更新与维护，后续本仓库仅保留对美术风格、UI/UX
            设计的持续探索与尝试性更新。
          </p>
          <p>
            FANDEX
            体系项目目前正在进行整体整合与重构，后续将以全新仓库形式重新发布，所有更新与维护工作将仅针对新仓库开展。
          </p>
          <p class="announcement-sign">—— FANDEX 项目组</p>
        </div>

        <!-- 底部操作区：主按钮关闭并确认已读 -->
        <div class="announcement-footer">
          <button class="announcement-action" type="button" @click="close">我已知晓</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* 根遮罩：固定定位撑满视口，毛玻璃 + 半透明背景，z-index 顶层 */
.announcement-root {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md, 16px);
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  /* 进入前：透明 */
  opacity: 0;
  transition: opacity 200ms ease;
}

/* 进入后：不透明 */
.announcement-root--shown {
  opacity: 1;
}

/* 公告卡片：居中模态，最大宽度限制保证可读性 */
.announcement-card {
  position: relative;
  width: 100%;
  max-width: 480px;
  max-height: calc(100vh - 48px);
  max-height: calc(100dvh - 48px);
  overflow-y: auto;
  background: var(--color-bg, #fafafa);
  border: 1px solid var(--color-border, #2e2e2e);
  border-radius: var(--spacing-sm, 8px);
  box-shadow: var(--shadow-lg, 0 10px 15px rgba(0, 0, 0, 0.1));
  color: var(--color-text, #0d0d0d);
  font-family: var(--font-body, sans-serif);
  /* 进入前：轻微缩小 + 透明 */
  opacity: 0;
  transform: translateY(8px) scale(0.98);
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}

/* 进入后：正常显示 */
.announcement-root--shown .announcement-card {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 顶部品牌色标识条：强调公告属性 */
.announcement-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background: linear-gradient(
    90deg,
    var(--color-primary, #3366cc) 0%,
    var(--color-tertiary, #e05a2b) 100%
  );
  color: var(--color-text-inverse, #ffffff);
}

/* 关闭按钮：绝对定位右上角，圆形透明按钮 */
.announcement-close {
  position: absolute;
  top: var(--spacing-sm, 8px);
  right: var(--spacing-sm, 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: var(--spacing-xs, 4px);
  background: transparent;
  color: var(--color-text-secondary, #4d4d4d);
  cursor: pointer;
  transition:
    background var(--transition-fast, 0.12s ease),
    color var(--transition-fast, 0.12s ease);
}

.announcement-close:hover {
  background: var(--color-bg-hover, #dcdcdc);
  color: var(--color-text, #0d0d0d);
}

.announcement-close:focus-visible {
  outline: 2px solid var(--color-primary, #3366cc);
  outline-offset: 2px;
}

/* 公告标题：醒目但不喧宾夺主 */
.announcement-title {
  margin: var(--spacing-lg, 24px) var(--spacing-lg, 24px) var(--spacing-xs, 4px);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text, #0d0d0d);
}

/* 元信息行：日期 + 标签 */
.announcement-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 8px);
  margin: 0 var(--spacing-lg, 24px) var(--spacing-md, 16px);
  font-size: 0.8rem;
  color: var(--color-text-tertiary, #808080);
}

.announcement-tag {
  display: inline-flex;
  align-items: center;
  padding: 1px 8px;
  border: 1px solid var(--color-border-light, #c4c4c4);
  border-radius: 9999px;
  font-size: 0.72rem;
  color: var(--color-text-secondary, #4d4d4d);
}

/* 公告正文：段落间距与行高优化阅读体验 */
.announcement-body {
  margin: 0 var(--spacing-lg, 24px);
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--color-text-secondary, #4d4d4d);
}

.announcement-body p {
  margin: 0 0 var(--spacing-sm, 8px);
}

.announcement-body p:last-of-type {
  margin-bottom: 0;
}

/* 落款：右对齐，弱化处理 */
.announcement-sign {
  margin-top: var(--spacing-md, 16px) !important;
  text-align: right;
  font-size: 0.85rem;
  color: var(--color-text-tertiary, #808080);
}

/* 底部操作区：主按钮居右 */
.announcement-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm, 8px);
  padding: var(--spacing-lg, 24px);
  border-top: 1px solid var(--color-border-light, #c4c4c4);
  margin-top: var(--spacing-lg, 24px);
}

/* 主操作按钮：品牌色填充 */
.announcement-action {
  padding: 8px 20px;
  border: 1px solid var(--color-primary, #3366cc);
  border-radius: var(--spacing-xs, 4px);
  background: var(--color-primary, #3366cc);
  color: var(--color-text-inverse, #ffffff);
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background var(--transition-fast, 0.12s ease),
    border-color var(--transition-fast, 0.12s ease);
}

.announcement-action:hover {
  background: var(--color-primary-hover, #264da8);
  border-color: var(--color-primary-hover, #264da8);
}

.announcement-action:focus-visible {
  outline: 2px solid var(--color-primary, #3366cc);
  outline-offset: 2px;
}

/* 移动端适配：缩小内边距与字号 */
@media (max-width: 480px) {
  .announcement-title {
    margin: var(--spacing-md, 16px) var(--spacing-md, 16px) var(--spacing-xs, 4px);
    font-size: 1.15rem;
  }

  .announcement-meta,
  .announcement-body {
    margin-left: var(--spacing-md, 16px);
    margin-right: var(--spacing-md, 16px);
  }

  .announcement-footer {
    padding: var(--spacing-md, 16px);
  }
}

/* 尊重用户减少动效偏好：关闭过渡动画 */
@media (prefers-reduced-motion: reduce) {
  .announcement-root,
  .announcement-card,
  .announcement-root--shown .announcement-card {
    transition: none;
  }

  .announcement-card {
    transform: none;
  }
}
</style>
