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

interface DialogContentProps extends DialogContentPrimitiveProps {
  class?: string;
}

const props = defineProps<DialogContentProps>();

const classes = computed(() =>
  cn(
    'fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-border bg-elevated p-6 shadow-2xl rounded-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
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
