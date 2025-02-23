import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("");
  });

  test.afterAll(async ({page}) => {});

  test("Login with valid data", async ({ page }) => {
   
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill("karakurtiara+123@gmail.com");
    await page.getByRole('textbox', { name: 'Password' }).fill("Ax9.Dv5BKt3csep");
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('You have been successfully')).toBeVisible();
    await page.context().storageState({ path: './test-data/states/userOne.json' });
    });
});
