import { test } from '../fixtures/testSetup.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Step One locators
    this.firstNameInput  = page.locator('[data-test="firstName"]');
    this.lastNameInput   = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueBtn     = page.locator('[data-test="continue"]');
    this.cancelBtn       = page.locator('[data-test="cancel"]');
    this.errorMessage    = page.locator('[data-test="error"]');

    // Step Two locators
    this.pageTitle       = page.locator('.title');
    this.summaryTotal    = page.locator('.summary_total_label');
    this.finishBtn       = page.locator('[data-test="finish"]');

    // Confirmation locators
    this.confirmationHeader  = page.locator('.complete-header');
    this.backHomeBtn         = page.locator('[data-test="back-to-products"]');
  }

  // ── Actions ──────────────────────────────────────────────

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await test.step('Fill first name', async () => {
      await this.firstNameInput.fill(firstName);
      await attachStepScreenshot(this.page, '01 - After entering first name');
    });

    await test.step('Fill last name', async () => {
      await this.lastNameInput.fill(lastName);
      await attachStepScreenshot(this.page, '02 - After entering last name');
    });

    await test.step('Fill postal code', async () => {
      await this.postalCodeInput.fill(postalCode);
      await attachStepScreenshot(this.page, '03 - After entering postal code');
    });
  }

  async clickContinue() {
    await test.step('Click Continue button', async () => {
      await this.continueBtn.click();
      await attachStepScreenshot(this.page, '04 - After clicking continue');
    });
  }

  async clickFinish() {
    await test.step('Click Finish button', async () => {
      await this.finishBtn.click();
      await attachStepScreenshot(this.page, '05 - After clicking finish');
    });
  }

  async clickBackHome() {
    await test.step('Click Back Home button', async () => {
      await this.backHomeBtn.click();
      await attachStepScreenshot(this.page, '06 - After clicking back home');
    });
  }

  async verifyCheckoutStepOneLoaded() {
    await test.step('Verify checkout step one loaded', async () => {
      await this.firstNameInput.waitFor();
      await attachStepScreenshot(this.page, '00 - Checkout step one loaded');
    });
  }

  async verifyCheckoutStepTwoLoaded() {
    await test.step('Verify checkout step two loaded', async () => {
      await this.summaryTotal.waitFor();
      await attachStepScreenshot(this.page, '00 - Checkout step two loaded');
    });
  }

  async verifyOrderConfirmationLoaded() {
    await test.step('Verify order confirmation loaded', async () => {
      await this.confirmationHeader.waitFor();
      await attachStepScreenshot(this.page, '00 - Order confirmation loaded');
    });
  }
}

export default CheckoutPage;
