---
order: 68
title: Python与计算机视觉
module: python
category: Python
difficulty: intermediate
description: OpenCV与图像处理
author: fanquanpp
updated: '2026-06-14'
related:
  - python/Python与深度学习
  - python/Python与NLP
  - python/Python与Web爬虫
  - python/Python与自动化
prerequisites:
  - python/语法速查
---

## 1. OpenCV

```python
import cv2

img = cv2.imread('photo.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, 100, 200)
cv2.imwrite('edges.jpg', edges)
```
