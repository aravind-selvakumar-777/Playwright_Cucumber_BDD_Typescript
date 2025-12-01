import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';

Then(
  'the {string} page for the employee should be displayed along with name {string}',
  async function (this: CustomWorld, title, fullName) {
    const pimPage = this.pageObjectManager.getPIMPage();
    expect(await pimPage.employeeFromTitle(title)).toBe(title);
    expect(await pimPage.employeeName(fullName)).toBe(fullName);
  }
);

Then(
  'the system should show validation messages for required fields',
  async function (this: CustomWorld) {
    const pimPage = this.pageObjectManager.getPIMPage(),
      assertText = 'Required';
    await expect(pimPage.getFirstNameRequiredErrorLocator()).toBeVisible();
    await expect(pimPage.getFirstNameRequiredErrorLocator()).toBeEnabled();
    await expect(pimPage.getFirstNameRequiredErrorLocator()).toHaveText(assertText);
    await expect(pimPage.getLastNameRequiredErrorLocator()).toBeVisible();
    await expect(pimPage.getLastNameRequiredErrorLocator()).toBeEnabled();
    await expect(pimPage.getLastNameRequiredErrorLocator()).toHaveText(assertText);
  }
);

When('enters a random employee id', async function (this: CustomWorld) {
  const pimPage = this.pageObjectManager.getPIMPage();
  pimPage.createRandomID();
});
