import { test } from '../fixtures/testSetup.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

class CartPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.pageTitle         = page.locator('.title');
    this.cartItems         = page.locator('.cart_item');
    this.cartItemNames     = page.locator('.inventory_item_name');
    this.cartItemPrices    = page.locator('.inventory_item_price');
    this.cartItemQty       = page.locator('.cart_quantity');
    this.removeButtons     = page.locator('[data-test^="remove"]');
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    this.checkoutBtn       = page.locator('[data-test="checkout"]');
    this.cartBadge         = page.locator('.shopping_cart_badge');
  }

  // ── Actions ──────────────────────────────────────────────

  async verifyCartPageLoaded() {
    await test.step('Verify cart page loaded', async () => {
      await this.pageTitle.waitFor();
      await attachStepScreenshot(this.page, '01 - Cart page loaded');
    });
  }

  async removeFirstItem() {
    await test.step('Remove first item from cart', async () => {
      await this.removeButtons.first().click();
      await attachStepScreenshot(this.page, '02 - After removing first item');
    });
  }

  async clickContinueShopping() {
    await test.step('Click Continue Shopping', async () => {
      await this.continueShoppingBtn.click();
      await attachStepScreenshot(this.page, '03 - After clicking continue shopping');
    });
  }

  async clickCheckout() {
    await test.step('Click Checkout', async () => {
      await this.checkoutBtn.click();
      await attachStepScreenshot(this.page, '04 - After clicking checkout');
    });
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartItemNames() {
    return await this.cartItemNames.allTextContents();
  }

  async getCartItemPrices() {
    return await this.cartItemPrices.allTextContents();
  }
}

export default CartPage;