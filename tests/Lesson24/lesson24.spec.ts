import { test, expect } from "@playwright/test";

import SignUp from "./SignUp";

test.describe("Registration form", () => {
  let signUp: SignUp;

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
    signUp = new SignUp(page);
    
    await signUp.openPage();
    await signUp.signUpButtonClick();
  });

  test.describe("Registration with valid data", () => {
    test("Successful registration", async ({ page }) => {
      const randomStringForEmail = generateRandomString(10);
      const randomPassword = generateSecurePassword();

      await signUp.signupName.fill("Oleksandr");
      await signUp.signupLastName.fill("Osadchuk");
      await signUp.signupEmail.fill(
                `karakurtiara+${randomStringForEmail}@gmail.com`
      );
      await signUp.signupPassword.fill(randomPassword);
      await signUp.signupRepeatPassword.fill(randomPassword);
      await signUp.registerButton.click();

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
      await signUp.signupName.click();
      await signUp.signupName.blur();

      await expect(page.locator("p:has-text('Name required')")).toBeVisible();
      await expect(page.locator("p:has-text('Name required')")).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );
      await expect(signUp.signupName).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with invalid Name ", async ({ page }) => {
      await signUp.signupName.fill("%$$#@@##$")
      await signUp.signupName.blur();

      await expect(page.locator('p:has-text("Name is invalid")')).toBeVisible();
      await expect(page.locator('p:has-text("Name is invalid")')).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );
      await expect(signUp.signupName).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with one letter in the Name", async ({ page }) => {
      await signUp.signupName.fill("0")
      await signUp.signupName.blur();
      
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
      await expect(signUp.signupName).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with 22 letters in the Name", async ({ page }) => {
      const longName = generateRandomString(22);

      await signUp.signupName.fill(longName);
      await signUp.signupName.blur();
      
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
      await expect(signUp.signupName).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with an empty LastName", async ({ page }) => {
      await signUp.signupLastName.click();
      await signUp.signupLastName.blur();
     
      await expect(
        page.locator('p:has-text("Last name required")')
      ).toBeVisible();
      await expect(page.locator('p:has-text("Last name required")')).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );
      await expect(signUp.signupLastName).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with invalid LastName", async ({ page }) => {
      await signUp.signupLastName.fill("%$$#@@##$");
      await signUp.signupLastName.blur();
      
      await expect(
        page.locator('p:has-text("Last name is invalid")')
      ).toBeVisible();
      await expect(
        page.locator('p:has-text("Last name is invalid")')
      ).toHaveCSS("color", "rgb(220, 53, 69)");
      await expect(signUp.signupLastName).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with one letter in the LastName", async ({ page }) => {
      await signUp.signupLastName.fill("O");
      await signUp.signupLastName.blur();
     
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
      await expect(signUp.signupLastName).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with 22 letters in the LastName", async ({ page }) => {
      const longLastName = generateRandomString(22);

      await signUp.signupLastName.fill(longLastName);
      await signUp.signupLastName.blur();

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
      await expect(signUp.signupLastName).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with an empty Email", async ({ page }) => {
      await signUp.signupEmail.click();
      await signUp.signupEmail.blur();
      
      await expect(page.locator('p:has-text("Email required")')).toBeVisible();
      await expect(page.locator('p:has-text("Email required")')).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );
      await expect(signUp.signupEmail).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with invalid Email", async ({ page }) => {
      await signUp.signupEmail.fill("assadwwqasdsdas@.com");
      await signUp.signupEmail.blur();
      
      await expect(
        page.locator('p:has-text("Email is incorrect")')
      ).toBeVisible();
      await expect(page.locator('p:has-text("Email is incorrect")')).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );
      await expect(signUp.signupEmail).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with an empty Password", async ({ page }) => {
      await signUp.signupPassword.click();
      await signUp.signupPassword.blur();
      await signUp.signupRepeatPassword.click();
      await signUp.signupRepeatPassword.blur();

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

      await expect(signUp.signupPassword).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(signUp.signupRepeatPassword).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration where Password has 1 symbol", async ({ page }) => {
      await signUp.signupPassword.fill("P");
      await signUp.signupRepeatPassword.fill("P");
      await signUp.signupRepeatPassword.blur();

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

      await expect(signUp.signupPassword).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(signUp.signupRepeatPassword).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration where Password has 16 symbols", async ({ page }) => {
      const randomPassword = generateRandomString(16);

      await signUp.signupPassword.fill(randomPassword);
      await signUp.signupRepeatPassword.fill(randomPassword);
      await signUp.signupRepeatPassword.blur();

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

      await expect(signUp.signupPassword).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(signUp.signupRepeatPassword).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration with Password having only small letters", async ({
      page,
    }) => {
      await signUp.signupPassword.fill("asasasasas");      
      await signUp.signupRepeatPassword.fill("asasasasas");
      await signUp.signupRepeatPassword.blur();

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

      await expect(signUp.signupPassword).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(signUp.signupRepeatPassword).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration where the passwords in the fields do not match", async ({
      page,
    }) => {
      await signUp.signupPassword.fill("A1sasasasas");      
      await signUp.signupRepeatPassword.fill("A1asasasasas1");
      await signUp.signupRepeatPassword.blur();
    
      await expect(
        page.locator('p:has-text("Passwords do not match")')
      ).toBeVisible();
      await expect(
        page.locator('p:has-text("Passwords do not match")')
      ).toHaveCSS("color", "rgb(220, 53, 69)");

      await expect(signUp.signupRepeatPassword).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Registration where the passwords are empty in the second field", async ({
      page,
    }) => {
      await signUp.signupPassword.fill("A1sasasasas");
      await signUp.signupRepeatPassword.click();
      await signUp.signupRepeatPassword.blur();

      await expect(
        page.locator('p:has-text("Re-enter password required")')
      ).toBeVisible();
      await expect(
        page.locator('p:has-text("Re-enter password required")')
      ).toHaveCSS("color", "rgb(220, 53, 69)");

      await expect(signUp.signupRepeatPassword).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });
  });
});
