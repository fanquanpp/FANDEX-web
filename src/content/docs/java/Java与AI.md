---
order: 77
title: Java与AI
module: java
category: Java
difficulty: intermediate
description: Java机器学习与AI集成
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java与GraphQL
  - java/Java性能调优
  - java/Java与安全
  - java/Java与WebAssembly
prerequisites:
  - java/概述与开发环境
---

## 1. DJL (Deep Java Library)

```java
Model model = Model.newInstance("resnet");
model.load(Paths.get("model"));

Predictor<Image, Classifications> predictor = model.newPredictor(translator);
Classifications result = predictor.predict(image);
```

## 2. LangChain4j

```java
ChatLanguageModel model = OpenAiChatModel.builder()
  .apiKey(System.getenv("OPENAI_API_KEY"))
  .modelName("gpt-4")
  .build();

String response = model.generate("Hello!");
```
