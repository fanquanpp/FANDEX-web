/**
 * Astro 项目配置文件
 * 定义站点地址、构建选项、Markdown 渲染插件、集成等核心配置
 */
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import { remarkAdmonition } from './src/lib/remark-admonition';
import { rehypeLazyImages } from './src/lib/rehype-lazy-images';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  // 站点地址，用于生成 sitemap 和规范链接
  site: 'https://fanquanpp.github.io',
  // 部署基础路径（GitHub Pages 项目站点）
  base: '/FANDEX/',
  build: {
    // 样式内联策略：auto 由 Astro 自动决定
    inlineStylesheets: 'auto',
    rollupOptions: {
      output: {
        // 静态资源文件名格式：包含 hash 以实现长期缓存
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  // 预取配置：悬停时预加载页面
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  // 集成：MDX 支持、站点地图生成、Vue 组件支持
  integrations: [mdx(), sitemap(), vue()],
  markdown: {
    // Remark 插件：GFM 语法、Emoji、数学公式、自定义提示块
    remarkPlugins: [remarkGfm, remarkEmoji, remarkMath, remarkAdmonition],
    // Rehype 插件：标题锚点、标题自动链接、KaTeX 渲染、图片懒加载
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeKatex,
      rehypeLazyImages,
    ],
    // 代码高亮配置：双主题支持亮色/暗色模式
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      // 不输出内联 color 属性，通过 CSS 变量控制主题切换
      defaultColor: false,
      // 长代码自动换行
      wrap: true,
      // 语言别名映射
      langAlias: {
        gitignore: 'bash',
        sshconfig: 'plaintext',
        gitattributes: 'plaintext',
        text: 'plaintext',
      },
    },
  },
  // URL 尾部斜杠：始终添加，确保路径一致性
  trailingSlash: 'always',
  // 开发服务器端口
  server: {
    port: 3000,
  },
});
