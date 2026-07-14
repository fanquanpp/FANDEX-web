import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    // 包含 src 目录下的 TypeScript 测试与 scripts 目录下的构建脚本测试
    include: ['src/**/*.test.ts', 'scripts/**/*.test.mjs'],
  },
});
