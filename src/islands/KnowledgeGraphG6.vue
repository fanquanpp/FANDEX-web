<!--
  全局知识图谱组件 (KnowledgeGraphG6)
  ===================================
  功能概述：
  - 基于 AntV G6 v5 渲染大规模知识图谱（52 模块 + 2065 文档 + 4583 关系）
  - 采用 Combo 展开/收起模式：默认所有模块 Combo 收起，仅显示 52 个模块节点
  - 用户点击模块 Combo 展开查看其文档子节点
  - 支持缩放（滚轮 + 按钮）、拖拽平移、节点点击跳转
  - 响应暗色模式切换（监听 data-theme 属性变化，重建图实例）
  - 加载中显示 spinner，错误时显示友好提示

  数据流：
  - 父级 Astro 页面在服务端调用 knowledge-map-service 获取完整 KnowledgeMap
  - 通过 props 传入 map 数据与 baseUrl
  - 组件内部将 KnowledgeMap 转换为 G6 数据结构（nodes/edges/combos）
  - 通过 external-loader 动态加载 G6 v5 后渲染
  - 用户交互（缩放/拖拽/点击/Combo 展开）由 G6 内置 behavior 处理

  事件处理：
  - collapse-expand behavior：点击 Combo 触发展开/收起（G6 内置）
  - node:click：根据节点 ID 跳转到对应 URL
  - 主题切换：监听 data-theme 变化重建图实例

  使用场景：
  - 全局知识地图页 /map/（大规模图，需 Combo 模式）
-->
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { loadG6 } from '@/lib/external-loader';

// ========== 类型定义（内联以避免客户端岛屿间接导入 astro:content） ==========
/** 节点类型：模块节点或文档节点 */
type MapNodeType = 'module' | 'doc';
/** 难度等级 */
type MapDifficulty = 'beginner' | 'intermediate' | 'advanced';
/** 知识地图节点 */
interface MapNode {
  id: string;
  label: string;
  type: MapNodeType;
  module: string;
  difficulty?: MapDifficulty;
  tags?: string[];
}
/** 知识地图边 */
interface MapEdge {
  from: string;
  to: string;
  type: 'prerequisite' | 'related';
}
/** 知识地图完整结构 */
interface KnowledgeMap {
  nodes: MapNode[];
  edges: MapEdge[];
}

/**
 * G6 v5 最小接口契约
 * 由于 G6 通过 CDN 加载挂载到 window.G6（any 类型），
 * 此处定义最小接口约束实际使用的 API，提升类型安全性
 */
interface G6GraphInstance {
  render(): void;
  destroy(): void;
  fitView(): void;
  zoomTo(ratio: number): void;
  on(event: string, handler: (e: { target?: { id?: string } }) => void): void;
}

interface G6GraphConstructor {
  new (config: {
    container: HTMLElement;
    autoResize?: boolean;
    data: { nodes: unknown[]; edges: unknown[]; combos: unknown[] };
    theme?: 'light' | 'dark';
    node?: { style?: Record<string, unknown> };
    combo?: { style?: Record<string, unknown> };
    edge?: { style?: Record<string, unknown> };
    layout?: Record<string, unknown>;
    behaviors?: string[];
  }): G6GraphInstance;
}

interface G6Module {
  Graph: G6GraphConstructor;
}

/**
 * 组件属性
 * @prop map - 服务端预构建的完整知识地图数据（包含模块节点 + 文档节点 + 全部边）
 * @prop baseUrl - 站点基础路径（用于生成节点跳转 URL，包含尾部斜杠）
 * @prop scope - 地图范围标识，仅用于错误提示文案与 a11y 标签
 */
const props = defineProps<{
  /** 服务端预构建的完整知识地图数据 */
  map: KnowledgeMap;
  /** 站点基础路径（含尾部斜杠，如 /FANDEX-web/） */
  baseUrl: string;
  /** 地图范围：仅用于 a11y 与错误提示，组件始终按全局模式渲染 */
  scope: 'global' | 'module' | 'doc';
}>();

// ========== 响应式状态 ==========

/** 渲染容器引用 */
const containerRef = ref<HTMLDivElement | null>(null);

/** 加载状态：'loading' | 'rendered' | 'error' */
const status = ref<'loading' | 'rendered' | 'error'>('loading');

/** 错误信息（status === 'error' 时展示） */
const errorMsg = ref<string>('');

/** 当前主题（用于 G6 重新渲染） */
const currentTheme = ref<'light' | 'dark'>('light');

/** 主题变化 observer */
let themeObserver: MutationObserver | null = null;

/** G6 图实例（不参与响应式，避免 Vue 深度代理拖累性能） */
let graphInstance: G6GraphInstance | null = null;

// ========== 计算属性 ==========

/** 模块节点数量 */
const moduleCount = computed(() => props.map.nodes.filter((n) => n.type === 'module').length);

/** 文档节点数量 */
const docCount = computed(() => props.map.nodes.filter((n) => n.type === 'doc').length);

/** 关系数量 */
const edgeCount = computed(() => props.map.edges.length);

/** 节点 ID → 跳转 URL 的映射表 */
const nodeUrlMap = computed<Map<string, string>>(() => {
  const m = new Map<string, string>();
  for (const node of props.map.nodes) {
    m.set(node.id, buildNodeUrl(node));
  }
  return m;
});

// ========== 生命周期 ==========

onMounted(async () => {
  // 读取初始主题
  currentTheme.value =
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

  // 监听 data-theme 变化以支持暗色模式切换时重新渲染
  setupThemeObserver();

  // 渲染图谱
  await renderGraph();
});

onBeforeUnmount(() => {
  // 销毁 G6 图实例，避免内存泄漏
  destroyGraph();
  // 断开主题监听
  if (themeObserver) {
    themeObserver.disconnect();
    themeObserver = null;
  }
});

// ========== 方法 ==========

/**
 * 构建节点跳转 URL
 * - 模块节点：跳转到 /moduleId/
 * - 文档节点：跳转到 /moduleId/slug/
 * @param node - 节点对象
 * @returns 跳转 URL
 */
function buildNodeUrl(node: MapNode): string {
  if (node.type === 'module') {
    return `${props.baseUrl}${node.id}/`;
  }
  // 文档节点 ID 格式为 `moduleId/slug`
  return `${props.baseUrl}${node.id}/`;
}

/**
 * 将 KnowledgeMap 数据转换为 G6 v5 数据结构
 *
 * 转换规则：
 * - 每个模块作为一个 Combo，combo ID 形如 `combo-{moduleId}`
 * - 模块节点本身作为其 Combo 的子节点（collapsed 时仅显示 Combo 外框）
 * - 文档节点作为其所属模块 Combo 的子节点
 * - 模块间 prerequisite 边：实线带箭头
 * - 文档间 prerequisite 边：实线带箭头
 * - 文档间 related 边：虚线带箭头
 *
 * Combo 收起策略：
 * - 初始所有 Combo 设置 style.collapsed = true
 * - 用户点击 Combo 时，G6 内置 collapse-expand behavior 切换 collapsed 状态
 *
 * @returns G6 数据对象，包含 nodes、edges、combos
 */
function buildG6Data(): {
  nodes: unknown[];
  edges: unknown[];
  combos: unknown[];
} {
  const nodes: unknown[] = [];
  const edges: unknown[] = [];
  const combos: unknown[] = [];

  const moduleNodes = props.map.nodes.filter((n) => n.type === 'module');
  const docNodes = props.map.nodes.filter((n) => n.type === 'doc');

  // 1. 为每个模块创建 Combo（默认收起，仅显示模块节点本身）
  for (const mod of moduleNodes) {
    combos.push({
      id: `combo-${mod.id}`,
      type: 'combo',
      style: {
        // 默认收起 Combo，仅显示 Combo 容器本身
        collapsed: true,
        labelText: mod.label,
        // 模块 Combo 配色：浅蓝底，深蓝边框
        fill: currentTheme.value === 'dark' ? '#1e3a8a' : '#dbeafe',
        stroke: currentTheme.value === 'dark' ? '#60a5fa' : '#2563eb',
        lineWidth: 2,
      },
    });
  }

  // 2. 模块节点：放在对应 Combo 内
  for (const mod of moduleNodes) {
    nodes.push({
      id: mod.id,
      combo: `combo-${mod.id}`,
      style: {
        size: 32,
        fill: currentTheme.value === 'dark' ? '#1e3a8a' : '#dbeafe',
        stroke: currentTheme.value === 'dark' ? '#60a5fa' : '#2563eb',
        lineWidth: 2,
        labelText: mod.label,
        labelFontSize: 12,
        labelFill: currentTheme.value === 'dark' ? '#e5e7eb' : '#1f2937',
      },
    });
  }

  // 3. 文档节点：放在对应模块 Combo 内
  // 难度色板：beginner 绿、intermediate 黄、advanced 红
  const difficultyColors: Record<MapDifficulty, { fill: string; stroke: string }> = {
    beginner:
      currentTheme.value === 'dark'
        ? { fill: '#14532d', stroke: '#4ade80' }
        : { fill: '#dcfce7', stroke: '#16a34a' },
    intermediate:
      currentTheme.value === 'dark'
        ? { fill: '#713f12', stroke: '#facc15' }
        : { fill: '#fef9c3', stroke: '#ca8a04' },
    advanced:
      currentTheme.value === 'dark'
        ? { fill: '#7f1d1d', stroke: '#f87171' }
        : { fill: '#fee2e2', stroke: '#dc2626' },
  };
  const defaultDocColor =
    currentTheme.value === 'dark'
      ? { fill: '#374151', stroke: '#9ca3af' }
      : { fill: '#f3f4f6', stroke: '#9ca3af' };

  for (const doc of docNodes) {
    const colors = doc.difficulty ? difficultyColors[doc.difficulty] : defaultDocColor;
    nodes.push({
      id: doc.id,
      combo: `combo-${doc.module}`,
      style: {
        size: 20,
        fill: colors.fill,
        stroke: colors.stroke,
        lineWidth: 1,
        labelText: doc.label,
        labelFontSize: 10,
        labelFill: currentTheme.value === 'dark' ? '#e5e7eb' : '#1f2937',
      },
    });
  }

  // 4. 边：prerequisite 实线、related 虚线
  const edgeColor = currentTheme.value === 'dark' ? '#9ca3af' : '#4b5563';
  for (const edge of props.map.edges) {
    edges.push({
      source: edge.from,
      target: edge.to,
      style: {
        stroke: edgeColor,
        lineWidth: 1,
        endArrow: true,
        // related 类型用虚线区分
        lineDash: edge.type === 'related' ? [4, 4] : [],
      },
    });
  }

  return { nodes, edges, combos };
}

/**
 * 渲染知识图谱
 * 核心执行流程：
 *   1. 加载 G6 v5 库（已缓存则跳过实际加载）
 *   2. 销毁旧图实例（若存在，避免重复挂载导致内存泄漏）
 *   3. 构建 G6 数据结构（nodes/edges/combos）
 *   4. 创建 Graph 实例并渲染
 *   5. 绑定节点点击跳转事件
 * 异常时设置错误状态，展示友好提示
 */
async function renderGraph(): Promise<void> {
  if (props.map.nodes.length === 0) {
    status.value = 'rendered';
    return;
  }
  if (!containerRef.value) return;

  status.value = 'loading';
  errorMsg.value = '';

  try {
    // 通过 external-loader 加载 G6（已缓存则立即返回）
    await loadG6();
    const G6 = window.G6 as G6Module | undefined;
    if (!G6 || !G6.Graph) {
      throw new Error('G6 加载后未在 window 上找到 Graph 构造函数');
    }

    // 销毁旧实例，避免重复挂载
    destroyGraph();

    const data = buildG6Data();

    graphInstance = new G6.Graph({
      container: containerRef.value,
      autoResize: true,
      data,
      theme: currentTheme.value,
      node: {
        style: {
          radius: 4,
        },
      },
      combo: {
        style: {
          padding: 12,
        },
      },
      edge: {
        style: {
          endArrowSize: 6,
        },
      },
      // 力导向布局：适合 Combo + 大规模节点，自然展开
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 32,
        linkDistance: 80,
        nodeStrength: -60,
        collide: { strength: 0.4 },
        // Combo 内部使用 grid 布局，避免文档节点过度聚集
        combo: { type: 'grid', cols: 4 },
      },
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        'drag-element',
        // collapse-expand：点击 Combo 触发展开/收起（G6 内置）
        'collapse-expand',
      ],
    });

    graphInstance.render();

    // 节点点击跳转：监听 node:click 事件，根据节点 ID 反查 nodeUrlMap
    graphInstance.on('node:click', (e) => {
      const nodeId = e.target?.id;
      if (!nodeId) return;
      const url = nodeUrlMap.value.get(nodeId);
      if (url) {
        window.location.href = url;
      }
    });

    status.value = 'rendered';
  } catch (err) {
    status.value = 'error';
    errorMsg.value = err instanceof Error ? err.message : String(err);
  }
}

/**
 * 销毁当前 G6 图实例，释放资源
 * 在重新渲染前或组件卸载时调用，避免重复挂载导致内存泄漏
 */
function destroyGraph(): void {
  if (graphInstance) {
    try {
      graphInstance.destroy();
    } catch {
      // 销毁失败忽略，避免影响后续渲染流程
    }
    graphInstance = null;
  }
}

/**
 * 设置主题变化监听
 * 通过 MutationObserver 监听 <html> 的 data-theme 属性变化
 * 主题切换时重建 G6 实例以应用对应配色
 */
function setupThemeObserver(): void {
  themeObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.attributeName === 'data-theme') {
        const newTheme =
          document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        if (newTheme !== currentTheme.value) {
          currentTheme.value = newTheme;
          // 主题变化后重新渲染（重建 Graph 实例应用新配色）
          void renderGraph();
        }
      }
    }
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
}

// ========== 缩放控制 ==========

/**
 * 放大视图
 */
function zoomIn(): void {
  graphInstance?.zoomTo(1.2);
}

/**
 * 缩小视图
 */
function zoomOut(): void {
  graphInstance?.zoomTo(0.8);
}

/**
 * 重置视图：自适应到所有节点可见
 */
function zoomReset(): void {
  graphInstance?.fitView();
}

/**
 * 重新渲染按钮（错误状态下重试）
 */
function retryRender(): void {
  void renderGraph();
}

// 当 map 数据变化时（例如 view transitions 后），重新渲染
watch(
  () => props.map,
  () => {
    void renderGraph();
  },
  { deep: false }
);
</script>

<template>
  <div class="kg6-root">
    <!-- 工具栏：缩放控制 -->
    <div class="kg6-toolbar" v-if="status === 'rendered'">
      <button class="kg6-btn" @click="zoomOut" aria-label="缩小" title="缩小">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <button class="kg6-btn" @click="zoomIn" aria-label="放大" title="放大">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <button
        class="kg6-btn kg6-reset-btn"
        @click="zoomReset"
        aria-label="重置视图"
        title="重置视图"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      </button>
    </div>

    <!-- 主渲染容器 -->
    <div class="kg6-container" ref="containerRef">
      <!-- 加载中 spinner -->
      <div v-if="status === 'loading'" class="kg6-loading">
        <div class="kg6-spinner" aria-hidden="true"></div>
        <p class="kg6-loading-text">
          正在加载知识图谱（{{ moduleCount }} 模块 · {{ docCount }} 文档 · {{ edgeCount }} 关系）...
        </p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="status === 'error'" class="kg6-error">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p class="kg6-error-title">知识图谱渲染失败</p>
        <p class="kg6-error-detail">{{ errorMsg }}</p>
        <button class="kg6-retry-btn" @click="retryRender">重试</button>
      </div>
    </div>

    <!-- 图例说明 -->
    <div class="kg6-legend" v-if="status === 'rendered'">
      <div class="kg6-legend-item">
        <span class="kg6-legend-swatch kg6-legend-module"></span>
        <span>模块 Combo</span>
      </div>
      <div class="kg6-legend-item">
        <span class="kg6-legend-swatch kg6-legend-beginner"></span>
        <span>入门</span>
      </div>
      <div class="kg6-legend-item">
        <span class="kg6-legend-swatch kg6-legend-intermediate"></span>
        <span>中级</span>
      </div>
      <div class="kg6-legend-item">
        <span class="kg6-legend-swatch kg6-legend-advanced"></span>
        <span>进阶</span>
      </div>
      <div class="kg6-legend-item">
        <span class="kg6-legend-line kg6-legend-line-solid"></span>
        <span>前置依赖</span>
      </div>
      <div class="kg6-legend-item">
        <span class="kg6-legend-line kg6-legend-line-dashed"></span>
        <span>关联</span>
      </div>
      <div class="kg6-legend-tip">
        <span>提示：滚轮缩放，拖拽平移，点击模块展开文档，点击节点跳转</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 根容器：纵向排列工具栏 + 渲染区 + 图例 */
.kg6-root {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
}

/* 工具栏：水平排列缩放按钮 */
.kg6-toolbar {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 8px);
  padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg);
}

/* 工具栏按钮：方形小按钮 */
.kg6-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition:
    color var(--transition-fast, 0.15s),
    border-color var(--transition-fast, 0.15s);
}

.kg6-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.kg6-reset-btn {
  margin-left: var(--spacing-xs, 4px);
}

/* 渲染容器：响应式高度 + 布局隔离，避免固定高度导致移动端 CLS 与可视区浪费
   - clamp() 根据视口高度自适应：小屏 420px / 中屏跟随 70vh / 上限 720px
   - contain 隔离子树布局/绘制/样式，防止 G6 canvas 缩放引起父级 reflow 造成 CLS */
.kg6-container {
  position: relative;
  width: 100%;
  height: clamp(420px, 70vh, 720px);
  overflow: hidden;
  background: var(--color-bg);
  /* G6 自带 canvas，需要 cursor 提示交互 */
  cursor: grab;
  contain: layout style paint;
}

.kg6-container:active {
  cursor: grabbing;
}

/* 加载状态 */
.kg6-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md, 16px);
  color: var(--color-text-secondary);
  pointer-events: none;
}

.kg6-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: kg6-spin 0.8s linear infinite;
}

@keyframes kg6-spin {
  to {
    transform: rotate(360deg);
  }
}

.kg6-loading-text {
  font-size: 0.88em;
  margin: 0;
}

/* 错误状态 */
.kg6-error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm, 8px);
  color: var(--color-text-secondary);
  padding: var(--spacing-lg, 24px);
  text-align: center;
}

.kg6-error-title {
  font-size: 1em;
  font-weight: 600;
  color: var(--color-text);
  margin: var(--spacing-sm, 8px) 0 0;
}

.kg6-error-detail {
  font-size: 0.82em;
  color: var(--color-text-tertiary);
  margin: 0;
  max-width: 480px;
  word-break: break-word;
}

.kg6-retry-btn {
  margin-top: var(--spacing-md, 16px);
  padding: 6px 16px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--color-text);
  font-size: 0.88em;
  cursor: pointer;
  transition:
    color var(--transition-fast, 0.15s),
    border-color var(--transition-fast, 0.15s);
}

.kg6-retry-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

/* 图例区 */
.kg6-legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-md, 16px);
  padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg);
  font-size: 0.8em;
  color: var(--color-text-secondary);
}

.kg6-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.kg6-legend-swatch {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 1px solid var(--color-border);
}

.kg6-legend-module {
  background: #dbeafe;
  border-color: #2563eb;
}

.kg6-legend-beginner {
  background: #dcfce7;
  border-color: #16a34a;
}

.kg6-legend-intermediate {
  background: #fef9c3;
  border-color: #ca8a04;
}

.kg6-legend-advanced {
  background: #fee2e2;
  border-color: #dc2626;
}

.kg6-legend-line {
  display: inline-block;
  width: 20px;
  height: 0;
  border-top: 2px solid var(--color-text-secondary);
}

.kg6-legend-line-dashed {
  border-top-style: dashed;
}

.kg6-legend-tip {
  margin-left: auto;
  font-style: italic;
  color: var(--color-text-tertiary);
}

/* 暗色模式下的图例颜色（保持可读性） */
:global(html[data-theme='dark']) .kg6-legend-module {
  background: #1e3a8a;
  border-color: #60a5fa;
}

:global(html[data-theme='dark']) .kg6-legend-beginner {
  background: #14532d;
  border-color: #4ade80;
}

:global(html[data-theme='dark']) .kg6-legend-intermediate {
  background: #713f12;
  border-color: #facc15;
}

:global(html[data-theme='dark']) .kg6-legend-advanced {
  background: #7f1d1d;
  border-color: #f87171;
}

/* 移动端适配：缩小容器高度，简化图例 */
@media (max-width: 768px) {
  .kg6-container {
    height: 480px;
  }

  .kg6-legend {
    gap: var(--spacing-sm, 8px);
    font-size: 0.75em;
  }

  .kg6-legend-tip {
    display: none;
  }
}
</style>
