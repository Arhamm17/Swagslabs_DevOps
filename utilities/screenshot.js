import { test } from '@playwright/test';

/**
 * Attaches a step-level screenshot to Allure / HTML report.
 * Call this inside any test.step() block.
 */
export async function attachStepScreenshot(page, name) {
  await test.info().attach(name, {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
}

/**
 * Attaches a final screenshot after each test.
 * Always attaches "Final Screenshot".
 * If test failed, also attaches a "Failure Screenshot".
 * Call this only from test.afterEach.
 */
export async function attachScreenshotAfterEach(page, testInfo) {
  await testInfo.attach('Final Screenshot', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  if (testInfo.status !== testInfo.expectedStatus) {
    await testInfo.attach('Failure Screenshot', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  }
}
