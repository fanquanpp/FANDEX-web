# 数据分析练习题
 False
 False> @Module: data-analysis
 False> @Total: 8
 False> @Difficulty: 进阶
 False
 False## 选择题
 False
 False### 1. 关于 Pandas DataFrame，以下说法错误的是？
 False
 FalseA. `df.loc` 基于标签索引
 FalseB. `df.iloc` 基于整数位置索引
 FalseC. `df['col']` 返回 DataFrame
 FalseD. `df[['col1', 'col2']]` 返回 DataFrame
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: C
 False
 False**解析**: `df['col']` 返回的是 Series（一维），而 `df[['col']]` 返回 DataFrame（二维）。这是 Pandas 初学者常见的混淆点。
 False</details>
 False
 False### 2. NumPy 中 `arr = np.array([[1,2],[3,4]])`，`arr.sum(axis=0)` 的结果是？
 False
 FalseA. `[3, 7]`
 FalseB. `[4, 6]`
 FalseC. `10`
 FalseD. `[[1, 2], [3, 4]]`
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: `axis=0` 表示沿第 0 轴（行方向）压缩，即对每列求和：第 0 列 `1+3=4`，第 1 列 `2+4=6`，结果为 `[4, 6]`。记忆技巧：`axis=0` 沿行方向压缩 = 对列求和，`axis=1` 沿列方向压缩 = 对行求和。
 False</details>
 False
 False### 3. 使用 Matplotlib 绘制子图，以下哪种方式最灵活？
 False
 FalseA. `plt.subplot(2, 2, 1)`
 FalseB. `fig, axes = plt.subplots(2, 2)`
 FalseC. `plt.figure()` + `plt.add_subplot()`
 FalseD. `plt.subplots_adjust()`
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: `plt.subplots()` 返回 Figure 和 Axes 数组，可以方便地通过 `axes[i, j]` 索引操作每个子图，是最灵活且推荐的面向对象方式。
 False</details>
 False
 False### 4. 处理缺失值时，以下哪种方式可能引入偏差？
 False
 FalseA. 删除含缺失值的行 `dropna()`
 FalseB. 用中位数填充 `fillna(df.median())`
 FalseC. 用固定值 0 填充 `fillna(0)`
 FalseD. 以上都可能引入偏差
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: D
 False
 False**解析**: 删除行可能导致样本不具代表性（若缺失非随机）；中位数填充会降低方差；0 填充可能扭曲分布。任何缺失值处理方法都可能引入偏差，需根据数据缺失机制（MCAR/MAR/MNAR）选择合适策略。
 False</details>
 False
 False### 5. 关于描述性统计，以下说法正确的是？
 False
 FalseA. 均值不受极端值影响
 FalseB. 中位数不受极端值影响
 FalseC. 标准差衡量数据的集中趋势
 FalseD. 众数只适用于数值型数据
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: 中位数是排序后中间位置的值，不受极端值影响，是稳健的集中趋势度量。均值对极端值敏感。标准差衡量离散程度而非集中趋势。众数也适用于分类数据。
 False</details>
 False
 False## 编程题
 False
 False### 1. 数据清洗流水线
 False
 False给定一个包含缺失值、重复行和异常值的 DataFrame，编写清洗函数：去除重复行、填充缺失值（数值列用中位数，分类列用众数）、移除数值列中超过 3 倍标准差的异常值。
 False
 False**输入**:
```python
 Truedf = pd.DataFrame({
 True 'age': [25, 30, None, 25, 200, 28],
 True 'city': ['Beijing', 'Shanghai', 'Beijing', None, 'Beijing', 'Beijing']
 True})
 True```

 False**输出**: 清洗后的 DataFrame
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```python
 Trueimport pandas as pd
 Trueimport numpy as np
 True
 Truedef clean_dataframe(df):
 True df = df.drop_duplicates()
 True
 True for col in df.select_dtypes(include=[np.number]).columns:
 True median = df[col].median()
 True std = df[col].std()
 True mean = df[col].mean()
 True mask = (df[col] - mean).abs() <= 3 * std
 True df = df[mask]
 True df[col] = df[col].fillna(median)
 True
 True for col in df.select_dtypes(exclude=[np.number]).columns:
 True mode = df[col].mode()[0]
 True df[col] = df[col].fillna(mode)
 True
 True df = df.reset_index(drop=True)
 True return df
 True```
</details>
 False
 False### 2. 分组聚合与透视表
 False
 False给定销售数据，按月份和产品类别分组，计算每月各类别的销售额总和和平均订单金额，并生成透视表。
 False
 False**输入**:
```python
 Truedf = pd.DataFrame({
 True 'date': pd.to_datetime(['2024-01-05','2024-01-15','2024-02-03','2024-02-20','2024-01-25']),
 True 'category': ['A','B','A','B','A'],
 True 'amount': [100, 200, 150, 300, 120]
 True})
 True```

 False**输出**: 透视表（行=月份，列=类别，值=销售额总和）
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```python
 Truedef sales_pivot(df):
 True df['month'] = df['date'].dt.to_period('M')
 True
 True summary = df.groupby(['month', 'category']).agg(
 True total_amount=('amount', 'sum'),
 True avg_amount=('amount', 'mean')
 True ).reset_index()
 True
 True pivot = df.pivot_table(
 True index='month',
 True columns='category',
 True values='amount',
 True aggfunc='sum',
 True fill_value=0
 True )
 True
 True return summary, pivot
 True```
</details>
 False
 False### 3. 可视化分析
 False
 False编写函数，对给定 DataFrame 生成综合分析图表：包含数值列的分布直方图、相关系数热力图、以及指定列的箱线图。
 False
 False**输入**: 包含多个数值列的 DataFrame
 False**输出**: 2×2 子图布局的分析图表
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```python
 Trueimport matplotlib.pyplot as plt
 Trueimport seaborn as sns
 True
 Truedef exploratory_plot(df, box_col=None):
 True numeric_df = df.select_dtypes(include='number')
 True fig, axes = plt.subplots(2, 2, figsize=(12, 10))
 True
 True numeric_df.hist(ax=axes[0, 0], bins=20, edgecolor='black')
 True axes[0, 0].set_title('Distribution Histograms')
 True
 True corr = numeric_df.corr()
 True sns.heatmap(corr, annot=True, cmap='coolwarm', ax=axes[0, 1],
 True fmt='.2f', square=True)
 True axes[0, 1].set_title('Correlation Heatmap')
 True
 True if box_col and box_col in numeric_df.columns:
 True numeric_df.boxplot(column=box_col, ax=axes[1, 0])
 True axes[1, 0].set_title(f'Boxplot: {box_col}')
 True else:
 True numeric_df.boxplot(ax=axes[1, 0])
 True axes[1, 0].set_title('Boxplot (All Columns)')
 True
 True numeric_df.plot(kind='kde', ax=axes[1, 1])
 True axes[1, 1].set_title('KDE Plot')
 True
 True plt.tight_layout()
 True plt.savefig('exploratory_analysis.png', dpi=150)
 True plt.show()
 True```
</details>
 False