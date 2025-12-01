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

When(
  'the user selects {string} from the Job Title dropdown',
  async function (this: CustomWorld, title) {
    const directoryPage = this.pageObjectManager.getDirectoryPage();
    await directoryPage.selectJobTtileDropdown(title);
  }
);

Then(
  'the system should display all employees with the job title {string}',
  async function (this: CustomWorld, title) {
    const directoryPage = this.pageObjectManager.getDirectoryPage();
    expect(await directoryPage.assertHavingSameTitle(title)).toBeTruthy();
  }
);
