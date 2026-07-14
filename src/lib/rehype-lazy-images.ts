import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

/**
 * rehype 图片懒加载处理器
 * 遍历 HAST 树中的 img 元素，为其添加 loading="lazy" 与 decoding="async" 属性，
 * 浏览器会在视口接近时才发起图片请求，降低首屏带宽与渲染阻塞。
 */
export function rehypeLazyImages() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'img') return;
      if (!node.properties) node.properties = {};

      if (!node.properties.loading) {
        node.properties.loading = 'lazy';
      }

      if (!node.properties.decoding) {
        node.properties.decoding = 'async';
      }
    });
  };
}
