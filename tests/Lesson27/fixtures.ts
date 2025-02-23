import { test as base } from '@playwright/test';

export const test = base.extend({
    pageHD: async ({ page }, use) => {
        await page.setViewportSize({ width: 1920, height: 1080 })
        await use(page);
   },

    pageSmall: async ({ page }, use) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await use(page);
    }
});
  