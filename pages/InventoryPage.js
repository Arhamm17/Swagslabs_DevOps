import { test } from '../fixtures/testSetup.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

class InventoryPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.pageTitle       = page.locator('.title');
    this.productList     = page.locator('.inventory_item');
    this.productNames    = page.locator('.inventory_item_name');
    this.productPrices   = page.locator('.inventory_item_price');
    this.productImages   = page.locator('.inventory_item_img img');
    this.addToCartBtns   = page.locator('[data-test^="add-to-cart"]');
    this.sortDropdown    = page.locator('[data-test="product-sort-container"]');
    this.cartBadge       = page.locator('.shopping_cart_badge');
    this.cartIcon        = page.locator('.shopping_cart_link');
  }

  // ── Actions ──────────────────────────────────────────────

  async verifyPageLoaded() {
    await test.step('Verify inventory page loaded', async () => {
      await this.pageTitle.waitFor();
      await attachStepScreenshot(this.page, '01 - Inventory page loaded');
    });
  }

  async sortBy(option) {
    await test.step(`Sort products by: ${option}`, async () => {
      await this.sortDropdown.selectOption(option);
      await attachStepScreenshot(this.page, `02 - After sorting by ${option}`);
    });
  }

  async addFirstProductToCart() {
    await test.step('Add first product to cart', async () => {
      await this.addToCartBtns.first().click();
      await attachStepScreenshot(this.page, '03 - After adding first product to cart');
    });
  }

  async addProductToCartByIndex(index) {
    await test.step(`Add product at index ${index} to cart`, async () => {
      await this.addToCartBtns.nth(index).click();
      await attachStepScreenshot(this.page, `04 - After adding product ${index} to cart`);
    });
  }

  async goToCart() {
    await test.step('Navigate to cart', async () => {
      await this.cartIcon.click();
      await attachStepScreenshot(this.page, '05 - After clicking cart icon');
    });
  }

  async getProductCount() {
    return await this.productList.count();
  }

  async getProductNames() {
    return await this.productNames.allTextContents();
  }

  async getProductPrices() {
    return await this.productPrices.allTextContents();
  }

  async getCartBadgeCount() {
    return await this.cartBadge.textContent();
  }
}

export default InventoryPage;
