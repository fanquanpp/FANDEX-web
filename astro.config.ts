/**
 * Astro 项目配置文件
 *
 * 功能概述：
 * 定义 FANDEX 项目的核心配置，包括站点地址、构建选项、Markdown 渲染管线、
 * 代码高亮、集成插件等。该文件是 Astro 框架的入口配置，所有构建和开发
 * 行为均受此文件控制。
 *
 * 关键配置说明：
 * - 部署目标：GitHub Pages（项目站点，基础路径 /FANDEX-web/）
 * - Markdown 插件：GFM 语法、Emoji、数学公式（KaTeX）、自定义提示块、图片懒加载
 * - 代码高亮：Shiki 双主题（github-light / github-dark），通过 CSS 变量切换
 * - 集成：MDX 支持、站点地图生成、Vue 组件支持
 */

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx'; // MDX 支持：在 Markdown 中使用 JSX 组件
import sitemap from '@astrojs/sitemap'; // 站点地图：自动生成 sitemap.xml
import vue from '@astrojs/vue'; // Vue 集成：在 Astro 中使用 Vue 组件
import { remarkAdmonition } from './src/lib/remark-admonition'; // 自定义提示块解析器
import { rehypeLazyImages } from './src/lib/rehype-lazy-images'; // 图片懒加载处理器
import remarkMath from 'remark-math'; // 数学公式语法解析（LaTeX 语法）
import rehypeKatex from 'rehype-katex'; // KaTeX 数学公式渲染
import remarkGfm from 'remark-gfm'; // GitHub Flavored Markdown 支持（表格、删除线等）
import remarkEmoji from 'remark-emoji'; // Emoji 短代码转换（如 :smile: → 😄）
import rehypeSlug from 'rehype-slug'; // 为标题自动添加 id 属性
import rehypeAutolinkHeadings from 'rehype-autolink-headings'; // 为标题添加锚点链接

export default defineConfig({
  // 站点地址，用于生成 sitemap 和规范链接
  site: 'https://fanquanpp.github.io',
  // 部署基础路径（GitHub Pages 项目站点，仓库名 FANDEX-web）
  base: '/FANDEX-web/',
  build: {
    // 样式内联策略：auto 由 Astro 自动决定（小文件内联，大文件外部引用）
    inlineStylesheets: 'auto',
  },
  // Vite 构建选项：控制 Rollup 输出文件名格式
  vite: {
    build: {
      rollupOptions: {
        output: {
          // 静态资源文件名格式：包含 hash 以实现长期缓存
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
    },
  },
  // 预取配置：悬停时预加载页面，提升页面切换速度
  prefetch: {
    prefetchAll: false, // 不预取所有页面（节省带宽）
    defaultStrategy: 'hover', // 鼠标悬停时触发预取
  },
  // 集成：MDX 支持、站点地图生成、Vue 组件支持
  integrations: [mdx(), sitemap(), vue()],
  markdown: {
    // Remark 插件（Markdown → MDAST 转换阶段）
    remarkPlugins: [
      remarkGfm, // GFM 语法：表格、任务列表、删除线等
      remarkEmoji, // Emoji 短代码转换
      remarkMath, // 数学公式语法解析（$...$ 和 $$...$$）
      remarkAdmonition, // 自定义提示块（:::note、:::tip 等）
    ],
    // Rehype 插件（MDAST → HAST → HTML 转换阶段）
    rehypePlugins: [
      rehypeSlug, // 为标题添加 id
      [rehypeAutolinkHeadings, { behavior: 'wrap' }], // 标题锚点链接（包裹整个标题）
      rehypeKatex, // KaTeX 数学公式渲染为 HTML
      rehypeLazyImages, // 图片懒加载（添加 loading="lazy"）
    ],
    // 代码高亮配置：Shiki 双主题支持亮色/暗色模式切换
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      // 不输出内联 color 属性，通过 CSS 变量（--shiki-light / --shiki-dark）控制主题切换
      defaultColor: false,
      // 长代码自动换行，避免横向滚动
      wrap: true,
      // 语言别名映射：将非标准语言标识映射到 Shiki 支持的语言
      langAlias: {
        gitignore: 'bash', // .gitignore 文件使用 bash 语法
        sshconfig: 'plaintext', // SSH 配置文件使用纯文本
        gitattributes: 'plaintext', // .gitattributes 使用纯文本
        text: 'plaintext', // text 类型使用纯文本
      },
    },
  },
  // URL 尾部斜杠：始终添加，确保路径一致性（避免 /path 和 /path/ 被视为不同页面）
  trailingSlash: 'always',
  // 开发服务器端口
  server: {
    port: 3000,
  },
});
