import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { config } from '../utils/config';
import { expect } from 'playwright/test';

Given('the user is on the OrangeHRM login page', async function (this: CustomWorld) {
  await this.page.goto(config.baseUrl, { waitUntil: 'load' });
});
When('the user enters a valid username and password', async function (this: CustomWorld) {
  await this.page.getByPlaceholder('Username').fill(config.username);
  await this.page.getByPlaceholder('Password').fill(config.password);
});
When('clicks on the login button', async function (this: CustomWorld) {
  await this.page.getByRole('button', { name: 'Login' }).click();
});

Then('the user should be redirected to the dashboard page', async function (this: CustomWorld) {
  await this.page.waitForSelector('h6');
  expect(this.page.url()).toContain('dashboard');
});

When(
  'the user enters an invalid username {string} or password {string}',
  async function (this: CustomWorld, username, password) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
  }
);
Then('an error message {string} should be displayed', async function (this: CustomWorld, error) {
  const errorMessage = await this.page.locator('div p').first().textContent();
  expect(errorMessage).toEqual(error);
});

When('the user leaves the username and password fields blank', async function (this: CustomWorld) {
  await this.page.getByPlaceholder('Username').fill('');
  await this.page.getByPlaceholder('Password').fill('');
});

Then(
  'an error message {string} should be displayed under username and password',
  async function (this: CustomWorld, error) {
    const usernameErr = await this.page
      .locator('span.oxd-input-field-error-message')
      .first()
      .textContent();
    const passErr = await this.page
      .locator('span.oxd-input-field-error-message')
      .nth(1)
      .textContent();
    expect(usernameErr).toEqual(error);
    expect(passErr).toEqual(error);
  }
);
