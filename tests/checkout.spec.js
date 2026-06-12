import { test, expect } from '../fixtures/testSetup.js';
import loginData from '../testdata/loginData.json' assert { type: 'json' };
import LoginPage from '../pages/LoginPage.js';
import InventoryPage from '../pages/InventoryPage.js';
import CartPage from '../pages/CartPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

test.describe('Checkout Tests', () => {

  // ── Helper: login, add item, go to cart, click checkout ──
  async function reachCheckoutStepOne(page) {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const data = loginData.validUsers[0];

    await loginPage.login(data.username, data.password);
    await inventoryPage.verifyPageLoaded();
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.goToCart();
    await cartPage.verifyCartPageLoaded();
    await cartPage.clickCheckout();
  }

  // ── TC31: Navigate to checkout from cart ──
  test('TC31 - Navigate to checkout from cart', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await test.step('Login, add product and reach checkout', async () => {
      await reachCheckoutStepOne(page);
    });

    await test.step('Verify checkout step one page is loaded', async () => {
      await checkoutPage.verifyCheckoutStepOneLoaded();
      await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
      await attachStepScreenshot(page, '02 - Checkout step one loaded verified');
    });
  });

  // ── TC32: Checkout with empty first name ──
  test('TC32 - Checkout with empty first name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const data = loginData.invalidCheckout.emptyFirstName;

    await test.step('Reach checkout step one', async () => {
      await reachCheckoutStepOne(page);
    });

    await test.step('Fill info with empty first name and click continue', async () => {
      await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.postalCode);
      await checkoutPage.clickContinue();
    });

    await test.step('Verify first name required error', async () => {
      await expect(checkoutPage.errorMessage).toBeVisible();
      await expect(checkoutPage.errorMessage).toContainText(data.expectedError);
      await attachStepScreenshot(page, '05 - First name required error verified');
    });
  });

  // ── TC33: Checkout with empty last name ──
  test('TC33 - Checkout with empty last name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const data = loginData.invalidCheckout.emptyLastName;

    await test.step('Reach checkout step one', async () => {
      await reachCheckoutStepOne(page);
    });

    await test.step('Fill info with empty last name and click continue', async () => {
      await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.postalCode);
      await checkoutPage.clickContinue();
    });

    await test.step('Verify last name required error', async () => {
      await expect(checkoutPage.errorMessage).toBeVisible();
      await expect(checkoutPage.errorMessage).toContainText(data.expectedError);
      await attachStepScreenshot(page, '05 - Last name required error verified');
    });
  });

  // ── TC34: Checkout with empty postal code ──
  test('TC34 - Checkout with empty postal code', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const data = loginData.invalidCheckout.emptyPostal;

    await test.step('Reach checkout step one', async () => {
      await reachCheckoutStepOne(page);
    });

    await test.step('Fill info with empty postal code and click continue', async () => {
      await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.postalCode);
      await checkoutPage.clickContinue();
    });

    await test.step('Verify postal code required error', async () => {
      await expect(checkoutPage.errorMessage).toBeVisible();
      await expect(checkoutPage.errorMessage).toContainText(data.expectedError);
      await attachStepScreenshot(page, '05 - Postal code required error verified');
    });
  });

  // ── TC35: Complete checkout with valid info ──
  test('TC35 - Complete checkout with valid info', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const data = loginData.checkoutInfo;

    await test.step('Reach checkout step one', async () => {
      await reachCheckoutStepOne(page);
    });

    await test.step('Fill valid checkout information', async () => {
      await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.postalCode);
    });

    await test.step('Click continue to step two', async () => {
      await checkoutPage.clickContinue();
    });

    await test.step('Verify checkout step two is loaded', async () => {
      await checkoutPage.verifyCheckoutStepTwoLoaded();
      await expect(page.locator('.title')).toHaveText('Checkout: Overview');
      await attachStepScreenshot(page, '05 - Checkout step two loaded verified');
    });
  });

  // ── TC36: Verify order summary on checkout step two ──
  test('TC36 - Verify order summary on checkout step two', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const data = loginData.checkoutInfo;

    await test.step('Reach checkout step one and fill info', async () => {
      await reachCheckoutStepOne(page);
      await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.postalCode);
      await checkoutPage.clickContinue();
    });

    await test.step('Verify order summary total is visible', async () => {
      await checkoutPage.verifyCheckoutStepTwoLoaded();
      await expect(checkoutPage.summaryTotal).toBeVisible();
      const total = await checkoutPage.summaryTotal.textContent();
      expect(total).toContain('Total:');
      await attachStepScreenshot(page, '04 - Order summary verified');
    });
  });

  // ── TC37: Verify finish button completes order ──
  test('TC37 - Verify finish button completes order', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const data = loginData.checkoutInfo;

    await test.step('Reach checkout step two', async () => {
      await reachCheckoutStepOne(page);
      await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.postalCode);
      await checkoutPage.clickContinue();
      await checkoutPage.verifyCheckoutStepTwoLoaded();
    });

    await test.step('Click finish to complete the order', async () => {
      await checkoutPage.clickFinish();
    });

    await test.step('Verify order confirmation page is loaded', async () => {
      await checkoutPage.verifyOrderConfirmationLoaded();
      await attachStepScreenshot(page, '04 - Order confirmation page loaded');
    });
  });

  // ── TC38: Verify order confirmation message ──
  test('TC38 - Verify order confirmation message', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const data = loginData.checkoutInfo;

    await test.step('Complete full checkout flow', async () => {
      await reachCheckoutStepOne(page);
      await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.postalCode);
      await checkoutPage.clickContinue();
      await checkoutPage.verifyCheckoutStepTwoLoaded();
      await checkoutPage.clickFinish();
    });

    await test.step('Verify confirmation message text', async () => {
      await checkoutPage.verifyOrderConfirmationLoaded();
      await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
      await attachStepScreenshot(page, '04 - Order confirmation message verified');
    });
  });

  // ── TC39: Verify continue button on checkout step one ──
  test('TC39 - Verify continue button is visible on checkout step one', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await test.step('Reach checkout step one', async () => {
      await reachCheckoutStepOne(page);
    });

    await test.step('Verify continue button is visible', async () => {
      await checkoutPage.verifyCheckoutStepOneLoaded();
      await expect(checkoutPage.continueBtn).toBeVisible();
      await attachStepScreenshot(page, '02 - Continue button visible verified');
    });
  });

  // ── TC40: Verify Back Home button after order ──
  test('TC40 - Verify Back Home button after completing order', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const inventoryPage = new InventoryPage(page);
    const data = loginData.checkoutInfo;

    await test.step('Complete full checkout flow', async () => {
      await reachCheckoutStepOne(page);
      await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.postalCode);
      await checkoutPage.clickContinue();
      await checkoutPage.verifyCheckoutStepTwoLoaded();
      await checkoutPage.clickFinish();
      await checkoutPage.verifyOrderConfirmationLoaded();
    });

    await test.step('Click Back Home button', async () => {
      await checkoutPage.clickBackHome();
    });

    await test.step('Verify back on inventory page', async () => {
      await expect(inventoryPage.pageTitle).toHaveText('Products');
      await attachStepScreenshot(page, '04 - Back on inventory page after order verified');
    });
  });

});
