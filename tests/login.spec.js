import { test, expect } from '../fixtures/testSetup.js';
import loginData from '../testdata/loginData.json' assert { type: 'json' };
import LoginPage from '../pages/LoginPage.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

test.describe('Login Tests', () => {

  // ── TC01: Data-driven positive login (forEach loop over all valid users) ──
  loginData.validUsers.forEach((data) => {
    test(`TC01 - Successful login with user: ${data.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await test.step('Enter credentials and login', async () => {
        await loginPage.login(data.username, data.password);
      });

      await test.step('Verify inventory page title is displayed', async () => {
        await expect(page).toHaveTitle(data.expectedMsg);
        await attachStepScreenshot(page, '06 - Inventory page verified');
      });
    });
  });

  // ── TC02: Login with invalid username ──
  test('TC02 - Login with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const data = loginData.invalidUser;

    await test.step('Enter invalid username and valid password', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(data.expectedError);
      await attachStepScreenshot(page, '04 - Error message verified');
    });
  });

  // ── TC03: Login with invalid password ──
  test('TC03 - Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const data = loginData.invalidPassword;

    await test.step('Enter valid username and invalid password', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(data.expectedError);
      await attachStepScreenshot(page, '04 - Error message verified');
    });
  });

  // ── TC04: Login with empty username ──
  test('TC04 - Login with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const data = loginData.emptyUsername;

    await test.step('Leave username empty and enter password', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify username required error', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(data.expectedError);
      await attachStepScreenshot(page, '04 - Username required error verified');
    });
  });

  // ── TC05: Login with empty password ──
  test('TC05 - Login with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const data = loginData.emptyPassword;

    await test.step('Enter username and leave password empty', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify password required error', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(data.expectedError);
      await attachStepScreenshot(page, '04 - Password required error verified');
    });
  });

  // ── TC06: Login with both fields empty ──
  test('TC06 - Login with both fields empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const data = loginData.emptyBoth;

    await test.step('Leave both fields empty and click login', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify username required error', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(data.expectedError);
      await attachStepScreenshot(page, '04 - Both empty error verified');
    });
  });

  // ── TC07: Login with locked out user ──
  test('TC07 - Login with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const data = loginData.lockedUser;

    await test.step('Enter locked out user credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify locked out error message', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(data.expectedError);
      await attachStepScreenshot(page, '04 - Locked out error verified');
    });
  });

  // ── TC08: Verify login page title ──
  test('TC08 - Verify login page title', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Verify login logo is visible', async () => {
      await expect(loginPage.pageTitle).toBeVisible();
      await attachStepScreenshot(page, '01 - Login page title verified');
    });

    await test.step('Verify page title text', async () => {
      await expect(loginPage.pageTitle).toContainText('Swag Labs');
      await attachStepScreenshot(page, '02 - Title text verified');
    });
  });

  // ── TC09: Verify login button is visible ──
  test('TC09 - Verify login button is visible', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Verify login button is visible on page', async () => {
      await expect(loginPage.loginButton).toBeVisible();
      await attachStepScreenshot(page, '01 - Login button visible verified');
    });

    await test.step('Verify username and password fields are visible', async () => {
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await attachStepScreenshot(page, '02 - Input fields visible verified');
    });
  });

  // ── TC10: Successful logout ──
  test('TC10 - Successful logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const data = loginData.validUsers[0];

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify inventory page is loaded', async () => {
      await expect(page).toHaveTitle(data.expectedMsg);
      await attachStepScreenshot(page, '04 - Logged in successfully');
    });

    await test.step('Perform logout', async () => {
      await loginPage.clickLogout();
    });

    await test.step('Verify login page is displayed after logout', async () => {
      await expect(loginPage.loginButton).toBeVisible();
      await attachStepScreenshot(page, '06 - Logout verified');
    });
  });

});