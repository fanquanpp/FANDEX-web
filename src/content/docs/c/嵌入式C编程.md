---
order: 74
title: 嵌入式C编程
module: c
category: C
difficulty: advanced
description: 嵌入式系统C编程要点
author: fanquanpp
updated: '2026-06-14'
related:
  - c/静态分析与调试
  - c/跨平台编程
  - c/C与汇编交互
  - c/数组详解
prerequisites:
  - c/概述
---

## 1. 寄存器操作

```c
#define REG(addr) (*(volatile uint32_t*)(addr))

#define GPIO_BASE  0x40020000
#define GPIO_MODER REG(GPIO_BASE + 0x00)
#define GPIO_ODR   REG(GPIO_BASE + 0x14)

GPIO_MODER |= (1 << 10);  // 设置模式
GPIO_ODR   |= (1 << 5);   // 输出高电平
```

## 2. 中断服务程序

```c
void __attribute__((interrupt)) TIM2_IRQHandler(void) {
  if (TIM2->SR & TIM_SR_UIF) {
    TIM2->SR &= ~TIM_SR_UIF; // 清除标志
    // 处理中断
  }
}
```

## 3. 内存约束

```c
// 避免动态内存分配
// 使用静态分配和内存池
#define POOL_SIZE 1024
static uint8_t memory_pool[POOL_SIZE];
```
