<!--
  速查表组件
  以分组形式展示代码速查条目，支持搜索过滤、分组折叠、代码复制
  可选显示学习指引（前置知识、推荐学习顺序）
-->
<template>
  <div class="cheatsheet">
    <!-- 学习指引区域：前置知识和推荐学习顺序 -->
    <details v-if="显示学习指引 && 数据.元数据" class="learning-guide" open>
      <summary>学习指引</summary>
      <div v-if="数据.元数据.前置知识?.length">
        <p class="label">前置知识</p>
        <ul>
          <li v-for="(item, i) in 数据.元数据.前置知识" :key="i" v-html="item"></li>
        </ul>
      </div>
      <div v-if="数据.元数据.推荐学习顺序?.length">
        <p class="label">推荐学习顺序</p>
        <ol>
          <li v-for="(item, i) in 数据.元数据.推荐学习顺序" :key="i">{{ item }}</li>
        </ol>
      </div>
    </details>

    <!-- 搜索栏 -->
    <div class="search-bar">
      <input v-model="搜索词" type="text" :placeholder="搜索框占位符" />
      <span v-if="搜索词" class="result-count">{{ 匹配条目总数 }} 条结果</span>
    </div>

    <!-- 分组列表 -->
    <div class="groups">
      <div v-for="group in 过滤后分组" :key="group.分组名" class="group">
        <!-- 分组标题：支持折叠切换 -->
        <div
          class="group-header"
          :style="允许分组折叠 ? 'cursor: pointer' : ''"
          @click="允许分组折叠 && toggleGroup(group.分组名)"
        >
          <span
            v-if="允许分组折叠"
            class="toggle-icon"
            :class="{ collapsed: 折叠分组集合[group.分组名] }"
            >&#9660;</span
          >
          <h3>{{ group.分组名 }}</h3>
          <span v-if="group.分组说明" class="group-desc">{{ group.分组说明 }}</span>
        </div>
        <!-- 分组条目列表 -->
        <div class="group-items" v-show="!折叠分组集合[group.分组名]">
          <div v-for="(item, idx) in group.条目" :key="idx" class="item">
            <!-- 条目描述 -->
            <p class="item-desc">{{ item.描述 }}</p>
            <!-- 代码块：优先使用高亮代码，否则回退到转义后的纯文本 -->
            <div class="code-block">
              <div v-html="item.高亮代码 || fallbackCode(item.代码)"></div>
              <button class="copy-btn" @click="copyCode(item, idx)">
                {{ 复制状态[idx] ? '已复制' : '复制' }}
              </button>
            </div>
            <!-- 预期输出 -->
            <div v-if="item.预期输出" class="expected-output">
              <span class="label">输出: </span>{{ item.预期输出 }}
            </div>
            <!-- 使用场景 -->
            <div v-if="item.使用场景" class="scene">
              <span class="label">场景: </span>{{ item.使用场景 }}
            </div>
            <!-- 常见错误列表 -->
            <div v-if="item.常见错误?.length" class="common-errors">
              <p class="label">常见错误</p>
              <ul>
                <li v-for="(err, ei) in item.常见错误" :key="ei">
                  <span v-if="err.错误示例"
                    >错误: <code>{{ err.错误示例 }}</code></span
                  >
                  <span v-if="err.解决方法"> -- 解决: {{ err.解决方法 }}</span>
                  <span v-if="!err.错误示例 && !err.解决方法">{{ err }}</span>
                </li>
              </ul>
            </div>
            <!-- 进阶提示 -->
            <div v-if="item.进阶提示" class="advance-tip">
              <span class="label">进阶: </span>{{ item.进阶提示 }}
            </div>
            <!-- 相关教程链接 -->
            <a
              v-if="item.相关教程"
              class="related-link"
              :href="item.相关教程"
              target="_blank"
              rel="noopener"
              >相关教程</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索无结果提示 -->
    <div v-if="过滤后分组.length === 0 && 搜索词" class="no-results">未找到匹配的条目</div>
  </div>
</template>

<script setup lang="ts">
/**
 * 速查表组件
 * 展示按分组组织的代码速查条目，支持搜索、折叠、复制等功能
 * 数据结构使用中文字段名，与 Markdown 速查表数据格式对应
 */
import { ref, reactive, computed } from 'vue';

// ========== 类型定义 ==========

/** 常见错误条目 */
interface CheatSheetError {
  错误示例?: string;
  解决方法?: string;
  [key: string]: unknown;
}

/** 速查条目 */
interface CheatSheetItem {
  描述: string;
  代码: string;
  高亮代码?: string;
  预期输出?: string;
  使用场景?: string;
  常见错误?: CheatSheetError[];
  进阶提示?: string;
  相关教程?: string;
  搜索关键词?: string[];
  [key: string]: unknown;
}

/** 速查分组 */
interface CheatSheetGroup {
  分组名: string;
  分组说明?: string;
  条目: CheatSheetItem[];
}

/** 速查表元数据 */
interface CheatSheetMeta {
  前置知识?: string[];
  推荐学习顺序?: string[];
  [key: string]: unknown;
}

/** 速查表完整数据 */
interface CheatSheetData {
  元数据?: CheatSheetMeta;
  分组?: CheatSheetGroup[];
  [key: string]: unknown;
}

// ========== 组件属性 ==========

const props = withDefaults(
  defineProps<{
    数据: CheatSheetData;
    模块名?: string;
    搜索框占位符?: string;
    允许分组折叠?: boolean;
    默认折叠分组?: string[];
    显示学习指引?: boolean;
  }>(),
  {
    模块名: '',
    搜索框占位符: '搜索命令...',
    允许分组折叠: false,
    默认折叠分组: () => [],
    显示学习指引: true,
  }
);

// ========== 响应式状态 ==========

/** 搜索关键词 */
const 搜索词 = ref('');
/** 折叠分组的集合，键为分组名，值为是否折叠 */
const 折叠分组集合 = reactive<Record<string, boolean>>(
  Object.fromEntries((props.默认折叠分组 || []).map((name) => [name, true]))
);
/** 复制状态，键为条目索引，值为是否已复制 */
const 复制状态 = reactive<Record<number, boolean>>({});

// ========== 方法 ==========

/** 切换分组的折叠/展开状态 */
function toggleGroup(groupName: string) {
  if (折叠分组集合[groupName]) {
    delete 折叠分组集合[groupName];
  } else {
    折叠分组集合[groupName] = true;
  }
}

/** 判断条目是否匹配搜索词 */
function matchesSearch(item: CheatSheetItem): boolean {
  if (!搜索词.value) return true;
  const q = 搜索词.value.toLowerCase();
  // 收集所有可搜索的字段
  const fields: string[] = [
    item.描述,
    item.代码,
    item.使用场景,
    item.进阶提示,
    item.预期输出,
    ...(item.搜索关键词 || []),
  ];
  if (item.常见错误?.length) {
    for (const err of item.常见错误) {
      if (err.错误示例) fields.push(err.错误示例);
      if (err.解决方法) fields.push(err.解决方法);
    }
  }
  return fields.some((f) => f && f.toLowerCase().includes(q));
}

/** 复制代码到剪贴板 */
function copyCode(item: CheatSheetItem, idx: number) {
  navigator.clipboard.writeText(item.代码).then(() => {
    复制状态[idx] = true;
    setTimeout(() => {
      复制状态[idx] = false;
    }, 1500);
  });
}

/** HTML 转义，防止 XSS */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** 当没有高亮代码时，使用转义后的纯文本作为回退 */
function fallbackCode(code: string): string {
  return `<pre><code>${escapeHtml(code)}</code></pre>`;
}

// ========== 计算属性 ==========

/** 根据搜索词过滤后的分组列表 */
const 过滤后分组 = computed<CheatSheetGroup[]>(() => {
  const groups = props.数据.分组 || [];
  return groups
    .map((group) => ({
      ...group,
      条目: group.条目.filter(matchesSearch),
    }))
    .filter((group) => group.条目.length > 0);
});

/** 匹配搜索的条目总数 */
const 匹配条目总数 = computed(() => {
  return 过滤后分组.value.reduce((sum, group) => sum + group.条目.length, 0);
});
</script>

<style scoped>
/* 重置速查表内 pre/code 的默认样式 */
.cheatsheet :deep(pre) {
  margin: 0;
}

.cheatsheet :deep(code) {
  font-family: var(--font-code);
  font-size: 0.85em;
}

/* 分组标题 */
.cheatsheet .group-header h3 {
  margin: 0;
  font-size: 1em;
  font-weight: 700;
}

/* 分组说明文字 */
.cheatsheet .group-desc {
  font-size: 0.82em;
  color: var(--color-text-tertiary);
  margin-left: var(--spacing-sm);
  font-weight: 400;
}

/* 学习指引样式 */
.cheatsheet .learning-guide summary {
  cursor: pointer;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  font-family: var(--font-display);
}

.cheatsheet .learning-guide ul,
.cheatsheet .learning-guide ol {
  padding-left: var(--spacing-lg);
  margin: var(--spacing-xs) 0;
}

.cheatsheet .learning-guide li {
  margin-bottom: 2px;
}

/* 常见错误列表 */
.cheatsheet .common-errors ul {
  padding-left: var(--spacing-lg);
  margin: var(--spacing-xs) 0 0;
}

.cheatsheet .common-errors code {
  font-family: var(--font-code);
  font-size: 0.9em;
  background: var(--color-bg-code);
  padding: 1px 4px;
}
</style>
