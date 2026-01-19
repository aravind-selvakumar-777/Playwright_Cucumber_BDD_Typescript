import { When, Then, Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';
import { createJobTitle, deleteJobTitle } from '../services/admin.service';
import { mapEmployeeWithJobTitle } from '../services/pim.service';

When(
  'the user enters {string} into the Name field',
  async function (this: CustomWorld, employeeName) {
    const directoryPage = this.pageObjectManager.getDirectoryPage();
    await directoryPage.searchByEmployeeName(employeeName);
  }
);

Then(
  'the system should display results containing {string}',
  async function (this: CustomWorld, employeeName) {
    const directoryPage = this.pageObjectManager.getDirectoryPage();
    await expect(directoryPage.getDirectoryNameLocator()).toContainText(employeeName);
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
  'the system should display employees with the job title {string}',
  async function (this: CustomWorld, title) {
    const directoryPage = this.pageObjectManager.getDirectoryPage();
    await expect(directoryPage.getJobTitleLocator()).toHaveText(title);
  }
);

Given('I create an job title with name {string}', async function (this: CustomWorld, title) {
  await createJobTitle(this, title);
  this.cleanupData.push(() => deleteJobTitle(this, title));
});

Given(
  'I map the job title {string} with employee {string}',
  async function (this: CustomWorld, title, name) {
    await mapEmployeeWithJobTitle(this, name, title);
  }
);
