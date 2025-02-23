import { expect } from "@playwright/test";
import { test } from "../Lesson27/fixtures.ts";

test.describe("Garage Page", () => {
  test.use({ storageState: './test-data/states/userOne.json' })

  test.beforeEach(async ({page}) => {
    await page.goto("/panel/garage");
  });

  test.afterEach(async ({page}) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: 'Remove car' }).click();
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('text=Car removed')).toBeVisible();
  });

  test("Add Ford pageHD", async ({pageHD}) => {
    await pageHD.getByRole('button', { name: 'Add car' }).click();
    await pageHD.getByLabel('Brand').selectOption('2: 3');
    await pageHD.getByRole('spinbutton', { name: 'Mileage' }).fill("100");
    await pageHD.getByRole('button', { name: 'Add' }).click();
    await expect(pageHD.getByText('Car added')).toBeVisible();
  });

  test("Add Ford pageSmall", async ({pageSmall}) => {
    await pageSmall.getByRole('button', { name: 'Add car' }).click();
    await pageSmall.getByLabel('Brand').selectOption('2: 3');
    await pageSmall.getByRole('spinbutton', { name: 'Mileage' }).fill("100");
    await pageSmall.getByRole('button', { name: 'Add' }).click();
    await expect(pageSmall.getByText('Car added')).toBeVisible();
  });
});
