import { Given, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';

Given(
  'the user clicks on {string} and selects {string}',
  async function (this: CustomWorld, mainMenu, subMenu) {
    const adminPage = this.pageObjectManager.getAdminPage();
    await adminPage.navigateToAddJobTitles(mainMenu, subMenu);
  }
);

Then(
  '{string} should appear in the first column of the list',
  async function (this: CustomWorld, title) {
    const adminPage = this.pageObjectManager.getAdminPage();
    expect(await adminPage.checkIfNameIsPresentInFirstColumn(title)).toBeTruthy();
  }
);
