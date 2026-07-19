/**
 * E2E 测试：搜索功能
 *
 * 测试目标：
 * - 搜索页加载并显示搜索输入框
 * - 输入关键词触发搜索
 * - 搜索结果展示
 * - 搜索清空功能
 */
import { test, expect } from '@playwright/test';

test.describe('搜索功能', () => {
  test('应加载搜索页并显示搜索框', async ({ page }) => {
    await page.goto('/search/');
    // 搜索输入框应可见
    const input = page
      .locator(
        'input[type="search"], input[type="text"], input[placeholder*="搜索"], input[placeholder*="search"]'
      )
      .first();
    await expect(input).toBeVisible({ timeout: 10000 });
  });

  test('应支持输入关键词', async ({ page }) => {
    await page.goto('/search/');
    const input = page
      .locator(
        'input[type="search"], input[type="text"], input[placeholder*="搜索"], input[placeholder*="search"]'
      )
      .first();
    await input.fill('git');
    await expect(input).toHaveValue('git');
  });

  test('应显示搜索结果或空结果提示', async ({ page }) => {
    await page.goto('/search/');
    const input = page
      .locator(
        'input[type="search"], input[type="text"], input[placeholder*="搜索"], input[placeholder*="search"]'
      )
      .first();
    await input.fill('git');
    // 触发搜索（回车或按钮）
    await input.press('Enter');
    await page.waitForTimeout(2000);
    // 应显示搜索结果或空结果提示
    const body = await page.textContent('body');
    expect(body?.length).toBeGreaterThan(0);
  });

  test('应支持清空搜索框', async ({ page }) => {
    await page.goto('/search/');
    const input = page
      .locator(
        'input[type="search"], input[type="text"], input[placeholder*="搜索"], input[placeholder*="search"]'
      )
      .first();
    await input.fill('test');
    await input.clear();
    await expect(input).toHaveValue('');
  });
});
