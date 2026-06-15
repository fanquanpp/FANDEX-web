---
order: 78
title: C++图形编程
module: cpp
category: C++
difficulty: advanced
description: OpenGL与图形基础
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/C++序列化
  - cpp/C++网络编程
  - cpp/C++游戏开发
  - cpp/C++嵌入式开发
prerequisites:
  - cpp/概述与现代标准
---

## 1. OpenGL 初始化

```cpp
#include <GL/gl.h>

void render() {
  glClear(GL_COLOR_BUFFER_BIT);
  glBegin(GL_TRIANGLES);
  glColor3f(1, 0, 0); glVertex2f(-0.5f, -0.5f);
  glColor3f(0, 1, 0); glVertex2f(0.5f, -0.5f);
  glColor3f(0, 0, 1); glVertex2f(0.0f, 0.5f);
  glEnd();
}
```
