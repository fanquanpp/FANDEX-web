<script setup lang="ts">
/**
 * DialogContent 对话框内容
 *
 * 功能概述：
 * radix-vue DialogContent 的样式化包装，包含遮罩层、内容面板、关闭按钮。
 * 自动渲染 Portal、Overlay、Close 按钮。
 *
 * 设计原则：
 * - 遮罩：黑色半透明 + backdrop-blur 营造聚焦效果
 * - 面板：elevated 背景 + 边框 + 阴影 2xl + 圆角 2xl
 * - 居中定位：fixed + grid place-items-center
 * - 进入动画：fade + zoom，退出反向
 * - 内置右上角关闭按钮（X 图标）
 * - 宽度通过 size prop 显式控制（sm/md/lg/xl），避免依赖 tailwind-merge 覆盖
 */

import { computed } from 'vue';
import { cn } from '@/lib/utils';
import {
  DialogContent as DialogContentPrimitive,
  DialogOverlay,
  DialogPortal,
  DialogClose,
  type DialogContentProps as DialogContentPrimitiveProps,
} from 'radix-vue';
import { X } from '@lucide/vue';

/** 对话框尺寸类型：sm 窄 / md 中 / lg 宽 / xl 超宽 */
type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

/** size prop 到 max-width 工具类的映射 */
const sizeClasses: Record<DialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

interface DialogContentProps extends DialogContentPrimitiveProps {
  /** 自定义附加类（tailwind-merge 处理冲突） */
  class?: string;
  /** 对话框宽度尺寸，默认 md（max-w-md / 28rem） */
  size?: DialogSize;
}

const props = withDefaults(defineProps<DialogContentProps>(), {
  size: 'md',
});

const classes = computed(() =>
  cn(
    'fixed left-1/2 top-1/2 z-modal grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 border border-border bg-elevated p-6 shadow-2xl rounded-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    sizeClasses[props.size],
    props.class
  )
);
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-modal bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
    />
    <DialogContentPrimitive v-bind="props" :class="classes">
      <slot />
      <DialogClose
        class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring"
      >
        <X class="size-4" />
        <span class="sr-only">关闭</span>
      </DialogClose>
    </DialogContentPrimitive>
  </DialogPortal>
</template>
