---
order: 83
title: C++与WebAssembly
module: cpp
category: C++
difficulty: advanced
description: C++编译为WebAssembly
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/C++与Rust对比
  - cpp/C++代码规范
  - cpp/C++反射与元编程
  - cpp/C++数学库
prerequisites:
  - cpp/概述与现代标准
---

## 1. Emscripten

```bash
emcc hello.cpp -o hello.js
emcc hello.cpp -o hello.html
```

## 2. 与 JavaScript 交互

```cpp
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int add(int a, int b) { return a + b; }
```

```javascript
const module = await Module();
const result = module._add(1, 2); // 3
```
