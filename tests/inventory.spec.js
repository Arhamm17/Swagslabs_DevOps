import { test, expect } from '../fixtures/testSetup.js';
import loginData from '../testdata/loginData.json' assert { type: 'json' };
import LoginPage from '../pages/LoginPage.js';
import InventoryPage from '../pages/InventoryPage.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

test.describe('Inventory Tests', () => {

  // ── TC11: Verify inventory page loads after login ──
  test('TC11 - Verify inventory page loads after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify inventory page is loaded', async () => {
      await inventoryPage.verifyPageLoaded();
      await expect(inventoryPage.pageTitle).toHaveText('Products');
      await attachStepScreenshot(page, '02 - Inventory page title verified');
    });
  });

  // ── TC12: Verify product count on inventory page ──
  test('TC12 - Verify product count on inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify 6 products are displayed', async () => {
      await inventoryPage.verifyPageLoaded();
      const count = await inventoryPage.getProductCount();
      expect(count).toBe(6);
      await attachStepScreenshot(page, '02 - Product count verified');
    });
  });

  // ── TC13: Verify product names are visible ──
  test('TC13 - Verify product names are visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify product names are visible', async () => {
      await inventoryPage.verifyPageLoaded();
      await expect(inventoryPage.productNames.first()).toBeVisible();
      const names = await inventoryPage.getProductNames();
      expect(names.length).toBeGreaterThan(0);
      await attachStepScreenshot(page, '02 - Product names verified');
    });
  });

  // ── TC14: Verify product prices are visible ──
  test('TC14 - Verify product prices are visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify product prices are visible', async () => {
      await inventoryPage.verifyPageLoaded();
      await expect(inventoryPage.productPrices.first()).toBeVisible();
      const prices = await inventoryPage.getProductPrices();
      expect(prices.length).toBeGreaterThan(0);
      await attachStepScreenshot(page, '02 - Product prices verified');
    });
  });

  // ── TC15: Sort products by Name A-Z ──
  test('TC15 - Sort products by Name A to Z', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Sort by Name A to Z', async () => {
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.sortBy('az');
    });

    await test.step('Verify products are sorted A to Z', async () => {
      const names = await inventoryPage.getProductNames();
      const sorted = [...names].sort();
      expect(names).toEqual(sorted);
      await attachStepScreenshot(page, '03 - A to Z sort verified');
    });
  });

  // ── TC16: Sort products by Name Z-A ──
  test('TC16 - Sort products by Name Z to A', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Sort by Name Z to A', async () => {
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.sortBy('za');
    });

    await test.step('Verify products are sorted Z to A', async () => {
      const names = await inventoryPage.getProductNames();
      const sorted = [...names].sort().reverse();
      expect(names).toEqual(sorted);
      await attachStepScreenshot(page, '03 - Z to A sort verified');
    });
  });

  // ── TC17: Sort products by Price Low to High ──
  test('TC17 - Sort products by Price Low to High', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Sort by price low to high', async () => {
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.sortBy('lohi');
    });

    await test.step('Verify prices sorted low to high', async () => {
      const priceTexts = await inventoryPage.getProductPrices();
      const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sorted);
      await attachStepScreenshot(page, '03 - Low to High sort verified');
    });
  });

  // ── TC18: Sort products by Price High to Low ──
  test('TC18 - Sort products by Price High to Low', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Sort by price high to low', async () => {
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.sortBy('hilo');
    });

    await test.step('Verify prices sorted high to low', async () => {
      const priceTexts = await inventoryPage.getProductPrices();
      const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sorted);
      await attachStepScreenshot(page, '03 - High to Low sort verified');
    });
  });

  // ── TC19: Verify product image is visible ──
  test('TC19 - Verify product image is visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify product images are visible', async () => {
      await inventoryPage.verifyPageLoaded();
      await expect(inventoryPage.productImages.first()).toBeVisible();
      await attachStepScreenshot(page, '02 - Product images verified');
    });
  });

  // ── TC20: Verify Add to Cart button on inventory page ──
  test('TC20 - Verify Add to Cart button on inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify Add to Cart buttons are visible', async () => {
      await inventoryPage.verifyPageLoaded();
      await expect(inventoryPage.addToCartBtns.first()).toBeVisible();
      const count = await inventoryPage.addToCartBtns.count();
      expect(count).toBe(6);
      await attachStepScreenshot(page, '02 - Add to Cart buttons verified');
    });
  });

});