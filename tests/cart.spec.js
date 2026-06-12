import { test, expect } from '../fixtures/testSetup.js';
import loginData from '../testdata/loginData.json' assert { type: 'json' };
import LoginPage from '../pages/LoginPage.js';
import InventoryPage from '../pages/InventoryPage.js';
import CartPage from '../pages/CartPage.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

test.describe('Cart Tests', () => {

  // ── TC21: Add single product to cart ──
  test('TC21 - Add single product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Add first product to cart', async () => {
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.addFirstProductToCart();
    });

    await test.step('Navigate to cart', async () => {
      await inventoryPage.goToCart();
    });

    await test.step('Verify 1 item is in cart', async () => {
      await cartPage.verifyCartPageLoaded();
      const count = await cartPage.getCartItemCount();
      expect(count).toBe(1);
      await attachStepScreenshot(page, '05 - Single item in cart verified');
    });
  });

  // ── TC22: Add multiple products to cart ──
  test('TC22 - Add multiple products to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Add two products to cart', async () => {
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.addProductToCartByIndex(0);
      await inventoryPage.addProductToCartByIndex(1);
    });

    await test.step('Navigate to cart', async () => {
      await inventoryPage.goToCart();
    });

    await test.step('Verify 2 items are in cart', async () => {
      await cartPage.verifyCartPageLoaded();
      const count = await cartPage.getCartItemCount();
      expect(count).toBe(2);
      await attachStepScreenshot(page, '05 - Multiple items in cart verified');
    });
  });

  // ── TC23: Remove product from cart ──
  test('TC23 - Remove product from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login and add product to cart', async () => {
      await loginPage.login(data.username, data.password);
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.addFirstProductToCart();
      await inventoryPage.goToCart();
    });

    await test.step('Remove item from cart', async () => {
      await cartPage.verifyCartPageLoaded();
      await cartPage.removeFirstItem();
    });

    await test.step('Verify cart is empty after removal', async () => {
      const count = await cartPage.getCartItemCount();
      expect(count).toBe(0);
      await attachStepScreenshot(page, '03 - Cart empty after removal verified');
    });
  });

  // ── TC24: Verify cart badge count updates ──
  test('TC24 - Verify cart badge count updates', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Add product and verify badge count is 1', async () => {
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.addFirstProductToCart();
      const badge = await inventoryPage.getCartBadgeCount();
      expect(badge).toBe('1');
      await attachStepScreenshot(page, '03 - Cart badge count 1 verified');
    });

    await test.step('Add second product and verify badge count is 2', async () => {
      await inventoryPage.addProductToCartByIndex(1);
      const badge = await inventoryPage.getCartBadgeCount();
      expect(badge).toBe('2');
      await attachStepScreenshot(page, '04 - Cart badge count 2 verified');
    });
  });

  // ── TC25: Verify cart page opens ──
  test('TC25 - Verify cart page opens', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Navigate to cart page', async () => {
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.goToCart();
    });

    await test.step('Verify cart page title is Your Cart', async () => {
      await cartPage.verifyCartPageLoaded();
      await expect(cartPage.pageTitle).toHaveText('Your Cart');
      await attachStepScreenshot(page, '03 - Cart page title verified');
    });
  });

  // ── TC27: Verify product price in cart ──
  test('TC27 - Verify product price in cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login and add first product', async () => {
      await loginPage.login(data.username, data.password);
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.addFirstProductToCart();
      await inventoryPage.goToCart();
    });

    await test.step('Verify product price is visible in cart', async () => {
      await cartPage.verifyCartPageLoaded();
      await expect(cartPage.cartItemPrices.first()).toBeVisible();
      const price = await cartPage.getCartItemPrices();
      expect(price[0]).toContain('$');
      await attachStepScreenshot(page, '04 - Product price in cart verified');
    });
  });

  // ── TC28: Continue shopping from cart ──
  test('TC28 - Continue shopping from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login and navigate to cart', async () => {
      await loginPage.login(data.username, data.password);
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.goToCart();
    });

    await test.step('Click Continue Shopping', async () => {
      await cartPage.verifyCartPageLoaded();
      await cartPage.clickContinueShopping();
    });

    await test.step('Verify back on inventory page', async () => {
      await expect(inventoryPage.pageTitle).toHaveText('Products');
      await attachStepScreenshot(page, '04 - Back on inventory page verified');
    });
  });

  // ── TC29: Verify empty cart ──
  test('TC29 - Verify empty cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login and go directly to cart without adding items', async () => {
      await loginPage.login(data.username, data.password);
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.goToCart();
    });

    await test.step('Verify cart is empty', async () => {
      await cartPage.verifyCartPageLoaded();
      const count = await cartPage.getCartItemCount();
      expect(count).toBe(0);
      await attachStepScreenshot(page, '03 - Empty cart verified');
    });
  });

  // ── TC30: Verify cart item quantity ──
  test('TC30 - Verify cart item quantity is 1', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login and add one product to cart', async () => {
      await loginPage.login(data.username, data.password);
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.addFirstProductToCart();
      await inventoryPage.goToCart();
    });

    await test.step('Verify item quantity is 1', async () => {
      await cartPage.verifyCartPageLoaded();
      await expect(cartPage.cartItemQty.first()).toHaveText('1');
      await attachStepScreenshot(page, '04 - Cart item quantity verified');
    });
  });

});