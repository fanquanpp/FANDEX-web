---
order: 63
title: React国际化
module: react
category: React
difficulty: intermediate
description: 'React i18n实现方案'
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React测试
  - react/React路由进阶
  - react/React动画
  - react/React服务端渲染
prerequisites:
  - react/概述与环境配置
---

## 1. react-i18next

```javascript
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

i18n.init({
  resources: {
    en: { translation: { title: 'My App', greeting: 'Hello {{name}}' } },
    zh: { translation: { title: '我的应用', greeting: '你好 {{name}}' } },
  },
  lng: 'zh',
});

function App() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('greeting', { name: 'Alice' })}</p>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
    </div>
  );
}
```
