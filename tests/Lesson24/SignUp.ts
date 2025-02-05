import { Locator, Page } from "@playwright/test";

export default class SignUp {
    readonly page: Page;
    readonly signupName: Locator; 
    readonly signupLastName : Locator;
    readonly signupEmail : Locator;
    readonly signupPassword : Locator
    readonly signupRepeatPassword : Locator;
    readonly signupButton : Locator;
    readonly registerButton : Locator;
  


    constructor(page: Page) {
      this.page = page;
      this.signupName = page.locator('#signupName')
      this.signupLastName = page.locator('#signupLastName')
      this.signupEmail = page.getByRole('textbox', { name: 'Name Last name Email' })
      this.signupPassword = page.getByRole('textbox', { name: 'Password', exact: true })
      this.signupRepeatPassword = page.getByRole('textbox', { name: 'Re-enter password' })
      this.signupButton = page.getByRole('button', { name: 'Sign up' })
      this.registerButton = page.getByRole("button", { name: "Register" })
    }
  
    async signUpButtonClick() {
        await this.signupButton.click();
      ;
    }

    async openPage() {
      await this.page.goto("");
    }
  }