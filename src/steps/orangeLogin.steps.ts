import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { config } from '../utils/config';
import { expect } from 'playwright/test';

Given('the user is on the OrangeHRM login page', async function (this: CustomWorld) {
  const loginPage = this.pageObjectManager.getLoginPage();
  await loginPage.goToOrange(config.baseUrl);
});
When('the user enters a valid username and password', async function (this: CustomWorld) {
  const loginPage = this.pageObjectManager.getLoginPage();
  await loginPage.fillUsernameAndPassword(config.username, config.password);
});
When('clicks on the login button', async function (this: CustomWorld) {
  const loginPage = this.pageObjectManager.getLoginPage();
  await loginPage.clickLoginButton();
});

Then('the user should be redirected to the dashboard page', async function (this: CustomWorld) {
  const loginPage = this.pageObjectManager.getLoginPage();
  await loginPage.waitForDashboard();
  const url = await loginPage.getCurrentURL();
  expect(url).toContain('dashboard');
});

When(
  'the user enters an invalid username {string} or password {string}',
  async function (this: CustomWorld, username, password) {
    const loginPage = this.pageObjectManager.getLoginPage();
    await loginPage.fillUsernameAndPassword(username, password);
  }
);
Then('an error message {string} should be displayed', async function (this: CustomWorld, error) {
  const loginPage = this.pageObjectManager.getLoginPage();
  const errorMessage = await loginPage.getInvalidLoginErrorText();
  expect(errorMessage).toEqual(error);
});

When('the user leaves the username and password fields blank', async function (this: CustomWorld) {
  const loginPage = this.pageObjectManager.getLoginPage();
  await loginPage.fillUsernameAndPassword('', '');
});

Then(
  'an error message {string} should be displayed under username and password',
  async function (this: CustomWorld, error) {
    const loginPage = this.pageObjectManager.getLoginPage();
    const usernameErr = await loginPage.getMissingUsernameErrorText();
    const passErr = await loginPage.getMissingPasswordErrorText();
    expect(usernameErr).toEqual(error);
    expect(passErr).toEqual(error);
  }
);
