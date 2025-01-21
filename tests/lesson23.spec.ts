import { test, expect } from "@playwright/test";

test.describe("Registration form", () => {
  const generateRandomString = (length: number): string => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const generateSecurePassword = (): string => {
    const lowerCase: string = "abcdefghijklmnopqrstuvwxyz";
    const upperCase: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits: string = "0123456789";
    const allCharacters: string = lowerCase + upperCase + digits;

    const minLength: number = 8;
    const maxLength: number = 15;
    const passwordLength: number =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    let password: string = "";

    password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
    password += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
    password += digits.charAt(Math.floor(Math.random() * digits.length));

    for (let i: number = password.length; i < passwordLength; i++) {
      password += allCharacters.charAt(
        Math.floor(Math.random() * allCharacters.length)
      );
    }

    return password;
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("");
    await page.getByRole("button", { name: "Sign up" }).click();
  });

  test.describe("Registration with valid data", () => {
    test("Successful registration", async ({ page }) => {
      const randomStringForEmail = generateRandomString(10);
      const randomPassword = generateSecurePassword();

      await page.fill("#signupName", "Oleksandr");
      await page.fill("#signupLastName", "Osadchuk");
      await page.fill(
        "#signupEmail",
        `karakurtiara+${randomStringForEmail}@gmail.com`
      );
      await page.fill("#signupPassword", randomPassword);
      await page.fill("#signupRepeatPassword", randomPassword);
      await page.getByRole("button", { name: "Register" }).click();

      await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");
    });
  });

  test.describe("Registration with invalid data", () => {
    test.afterEach(async ({ page }) => {
      await expect(
        page.getByRole("button", { name: "Register" })
      ).toBeDisabled();
    });

    test("Registration with an empty Name", async ({ page }) => {
      await page.locator("#signupName").click();
      await page.locator("#signupName").blur();

      await expect(page.locator("p:has-text('Name required')")).toBeVisible();
      await expect(page.locator("p:has-text('Name required')")).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with invalid Name ", async ({ page }) => {
      await page.locator("input#signupName").fill("%$$#@@##$");
      await page.locator("input#signupName").blur();

      await expect(page.locator('p:has-text("Name is invalid")')).toBeVisible();
      await expect(page.locator('p:has-text("Name is invalid")')).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );
      await expect(page.locator("input#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with one letter in the Name", async ({ page }) => {
      await page.locator("input#signupName").fill("O");
      await page.locator("input#signupName").blur();

      await expect(
        page.locator(
          'p:has-text("Name has to be from 2 to 20 characters long")'
        )
      ).toBeVisible();
      await expect(
        page.locator(
          'p:has-text("Name has to be from 2 to 20 characters long")'
        )
      ).toHaveCSS("color", "rgb(220, 53, 69)");
      await expect(page.locator("input#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with 22 letters in the Name", async ({ page }) => {
      const longName = generateRandomString(22);

      await page.locator("input#signupName").fill(longName);
      await page.locator("input#signupName").blur();

      await expect(
        page.locator(
          'p:has-text("Name has to be from 2 to 20 characters long")'
        )
      ).toBeVisible();
      await expect(
        page.locator(
          'p:has-text("Name has to be from 2 to 20 characters long")'
        )
      ).toHaveCSS("color", "rgb(220, 53, 69)");
      await expect(page.locator("input#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with an empty LastName", async ({ page }) => {
      await page.locator("input#signupLastName").click();
      await page.locator("input#signupLastName").blur();

      await expect(
        page.locator('p:has-text("Last name required")')
      ).toBeVisible();
      await expect(page.locator('p:has-text("Last name required")')).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );
      await expect(page.locator("input#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with invalid LastName", async ({ page }) => {
      await page.locator("input#signupLastName").fill("%$$#@@##$");
      await page.locator("input#signupLastName").blur();

      await expect(
        page.locator('p:has-text("Last name is invalid")')
      ).toBeVisible();
      await expect(
        page.locator('p:has-text("Last name is invalid")')
      ).toHaveCSS("color", "rgb(220, 53, 69)");
      await expect(page.locator("input#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with one letter in the LastName", async ({ page }) => {
      await page.locator("input#signupLastName").fill("O");
      await page.locator("input#signupLastName").blur();

      await expect(
        page.locator(
          'p:has-text("Last name has to be from 2 to 20 characters long")'
        )
      ).toBeVisible();
      await expect(
        page.locator(
          'p:has-text("Last name has to be from 2 to 20 characters long")'
        )
      ).toHaveCSS("color", "rgb(220, 53, 69)");
      await expect(page.locator("input#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with 22 letters in the LastName", async ({ page }) => {
      const longLastName = generateRandomString(22);

      await page.locator("input#signupLastName").fill(longLastName);
      await page.locator("input#signupLastName").blur();

      await expect(
        page.locator(
          'p:has-text("Last name has to be from 2 to 20 characters long")'
        )
      ).toBeVisible();
      await expect(
        page.locator(
          'p:has-text("Last name has to be from 2 to 20 characters long")'
        )
      ).toHaveCSS("color", "rgb(220, 53, 69)");
      await expect(page.locator("input#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with an empty Email", async ({ page }) => {
      await page.locator("input#signupEmail").click();
      await page.locator("input#signupEmail").blur();

      await expect(page.locator('p:has-text("Email required")')).toBeVisible();
      await expect(page.locator('p:has-text("Email required")')).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );
      await expect(page.locator("input#signupEmail")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with invalid Email", async ({ page }) => {
      await page.locator("input#signupEmail").fill("assadwwqasdsdas@.com");
      await page.locator("input#signupEmail").blur();

      await expect(
        page.locator('p:has-text("Email is incorrect")')
      ).toBeVisible();
      await expect(page.locator('p:has-text("Email is incorrect")')).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );
      await expect(page.locator("input#signupEmail")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with an empty Password", async ({ page }) => {
      await page.locator("input#signupPassword").click();
      await page.locator("input#signupPassword").blur();
      await page.locator("input#signupRepeatPassword").click();
      await page.locator("input#signupRepeatPassword").blur();

      await expect(
        page.locator("text=Password required").first()
      ).toBeVisible();
      await expect(page.locator("text=Password required").nth(0)).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );

      await expect(
        page.locator("text=Re-enter password required")
      ).toBeVisible();
      await expect(page.locator("text=Re-enter password required")).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );

      await expect(page.locator("input#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(page.locator("input#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration where Password has 1 symbol", async ({ page }) => {
      await page.locator("input#signupPassword").click();
      await page.locator("input#signupPassword").fill("P");
      await page.locator("input#signupRepeatPassword").click();
      await page.locator("input#signupRepeatPassword").fill("P");
      await page.locator("input#signupRepeatPassword").blur();

      await expect(
        page
          .locator(
            'p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")'
          )
          .first()
      ).toBeVisible();
      await expect(
        page
          .locator(
            'p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")'
          )
          .nth(0)
      ).toHaveCSS("color", "rgb(220, 53, 69)");

      await expect(
        page
          .locator(
            'p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")'
          )
          .nth(1)
      ).toBeVisible();
      await expect(
        page
          .locator(
            'p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")'
          )
          .last()
      ).toHaveCSS("color", "rgb(220, 53, 69)");

      await expect(page.locator("input#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(page.locator("input#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration where Password has 16 symbols", async ({ page }) => {
      const randomPassword = generateRandomString(16);

      await page.locator("input#signupPassword").click();
      await page.locator("input#signupPassword").fill(randomPassword);
      await page.locator("input#signupRepeatPassword").click();
      await page.locator("input#signupRepeatPassword").fill(randomPassword);
      await page.locator("input#signupRepeatPassword").blur();

      await expect(
        page
          .locator(
            'p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")'
          )
          .first()
      ).toBeVisible();
      await expect(
        page
          .locator(
            'p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")'
          )
          .nth(0)
      ).toHaveCSS("color", "rgb(220, 53, 69)");

      await expect(page.locator("input#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(page.locator("input#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with Password having only small letters", async ({
      page,
    }) => {
      await page.locator("input#signupPassword").click();
      await page.locator("input#signupPassword").fill("asasasasas");
      await page.locator("input#signupRepeatPassword").click();
      await page.locator("input#signupRepeatPassword").fill("asasasasas");
      await page.locator("input#signupRepeatPassword").blur();

      await expect(
        page
          .locator(
            'p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")'
          )
          .first()
      ).toBeVisible();
      await expect(
        page
          .locator(
            'p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")'
          )
          .nth(0)
      ).toHaveCSS("color", "rgb(220, 53, 69)");

      await expect(page.locator("input#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(page.locator("input#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration where the passwords in the fields do not match", async ({
      page,
    }) => {
      await page.locator("input#signupPassword").click();
      await page.locator("input#signupPassword").fill("A1sasasasas");
      await page.locator("input#signupRepeatPassword").click();
      await page.locator("input#signupRepeatPassword").fill("A1asasasasas1");
      await page.locator("input#signupRepeatPassword").blur();

      await expect(
        page.locator('p:has-text("Passwords do not match")')
      ).toBeVisible();
      await expect(
        page.locator('p:has-text("Passwords do not match")')
      ).toHaveCSS("color", "rgb(220, 53, 69)");

      await expect(page.locator("input#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration where the passwords are empty in the second field", async ({
      page,
    }) => {
      await page.locator("input#signupPassword").click();
      await page.locator("input#signupPassword").fill("A1sasasasas");
      await page.locator("input#signupRepeatPassword").click();
      await page.locator("input#signupRepeatPassword").blur();

      await expect(
        page.locator('p:has-text("Re-enter password required")')
      ).toBeVisible();
      await expect(
        page.locator('p:has-text("Re-enter password required")')
      ).toHaveCSS("color", "rgb(220, 53, 69)");

      await expect(page.locator("input#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });
  });
});
