import { test } from '../fixtures/testSetup.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput  = page.locator('#user-name');
    this.passwordInput  = page.locator('#password');
    this.loginButton    = page.locator('#login-button');
    this.errorMessage   = page.locator('[data-test="error"]');
    this.pageTitle      = page.locator('.login_logo');
    this.loginContainer = page.locator('.login-box');
  }

  // ── Actions ──────────────────────────────────────────────

  async enterUsername(username) {
    await test.step('Enter username', async () => {
      await this.usernameInput.fill(username);
      await attachStepScreenshot(this.page, '01 - After entering username');
    });
  }

  async enterPassword(password) {
    await test.step('Enter password', async () => {
      await this.passwordInput.fill(password);
      await attachStepScreenshot(this.page, '02 - After entering password');
    });
  }

  async clickLoginButton() {
    await test.step('Click login button', async () => {
      await this.loginButton.click();
      await attachStepScreenshot(this.page, '03 - After clicking login');
    });
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async clickLogout() {
    await test.step('Open menu and click logout', async () => {
      await this.page.locator('#react-burger-menu-btn').click();
      await attachStepScreenshot(this.page, '04 - Menu opened');
      await this.page.locator('#logout_sidebar_link').click();
      await attachStepScreenshot(this.page, '05 - After logout');
    });
  }
}

export default LoginPage;