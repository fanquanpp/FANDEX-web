---
order: 65
title: Python与机器学习
module: python
category: Python
difficulty: intermediate
description: 'scikit-learn与ML基础'
author: fanquanpp
updated: '2026-06-14'
related:
  - python/Python与Redis
  - python/Python与GraphQL
  - python/Python与深度学习
  - python/Python与NLP
prerequisites:
  - python/语法速查
---

## 1. scikit-learn

```python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)
accuracy = clf.score(X_test, y_test)
```
