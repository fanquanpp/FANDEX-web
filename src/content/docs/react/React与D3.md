---
order: 74
title: React与D3
module: react
category: React
difficulty: advanced
description: React中D3数据可视化
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React与PWA
  - react/React与Canvas
  - react/React与Storybook
  - 'react/React与CI-CD'
prerequisites:
  - react/概述与环境配置
---

## 1. 集成方式

```jsx
function BarChart({ data }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, 500]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([300, 0]);

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => 300 - y(d.value));
  }, [data]);

  return <svg ref={svgRef} width={500} height={300} />;
}
```
