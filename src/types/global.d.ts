/**
 * 全局类型声明文件
 *
 * 功能概述：
 * 统一声明挂载在 window 上的 FANDEX 自定义全局变量，
 * 避免各组件在使用时重复通过 `window as Window & { ... }` 形式做类型断言。
 *
 * 使用方式：
 * 在组件中直接访问 `window.__fandexSearchDialogReady` 等字段即可，
 * 无需导入此文件（TypeScript 会自动加载所有 *.d.ts 文件）。
 *
 * 设计原则：
 * - 仅声明 FANDEX 自定义挂载的全局变量，不修改标准库 Window 接口
 * - 所有自定义全局变量以 `__fandex` 前缀命名，避免与第三方库冲突
 * - 仅声明必要的最小字段集，新增字段时在此处补充
 */

declare global {
  interface Window {
    /**
     * SearchDialog 组件已就绪标志
     * SearchDialog.vue 在 onMounted 中置为 true，
     * Layout.astro 的搜索按钮点击事件据此决定是否拦截默认跳转行为
     */
    __fandexSearchDialogReady?: boolean;

    /**
     * 导出 Web Vitals 数据的全局 API
     * WebVitalsTracker.vue 在 onMounted 中挂载，
     * 供 PerformanceMonitor.astro 的导出按钮调用
     * @returns JSON 格式的 Web Vitals 数据字符串
     */
    __fandexExportVitals?: () => string;
  }
}

// 空的 export 确保此文件作为模块处理（而非纯全局脚本）
export {};
