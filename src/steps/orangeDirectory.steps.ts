import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';

When(
  'the user enters {string} into the Employee Name field',
  async function (this: CustomWorld, employeeName) {
    const directoryPage = this.pageObjectManager.getDirectoryPage();
    await directoryPage.searchByEmployeeName(employeeName);
  }
);

Then(
  'the system should display results containing {string}',
  async function (this: CustomWorld, employeeName) {
    const directoryPage = this.pageObjectManager.getDirectoryPage();
    expect(await directoryPage.getDirectoryName()).toEqual(employeeName);
  }
);
