---
order: 57
title: 'C#与Unity游戏开发'
module: csharp
category: 'C#'
difficulty: intermediate
description: Unity脚本与组件系统
author: fanquanpp
updated: '2026-06-14'
related:
  - csharp/Span与Memory
  - csharp/源生成器
  - 'csharp/C#与Blazor'
  - 'csharp/C#与MAUI'
prerequisites:
  - csharp/概述与环境配置
---

## 1. MonoBehaviour

```csharp
public class PlayerController : MonoBehaviour {
  public float speed = 5f;

  void Update() {
    float h = Input.GetAxis("Horizontal");
    float v = Input.GetAxis("Vertical");
    transform.Translate(new Vector3(h, 0, v) * speed * Time.deltaTime);
  }
}
```

## 2. 协程

```csharp
IEnumerator SpawnWaves() {
  while (true) {
    yield return new WaitForSeconds(2f);
    Instantiate(enemyPrefab, spawnPoint.position, Quaternion.identity);
  }
}
```
