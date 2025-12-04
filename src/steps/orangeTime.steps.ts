import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';

Then(
  'the system should display the timesheet for {string}',
  async function (this: CustomWorld, name) {
    const timePage = this.pageObjectManager.getTimePage();
    expect(await timePage.getTimesheetName(name)).toContain(name);
  }
);
Then('{string} alert message should be displayed', async function (this: CustomWorld, alertMsg) {
  const timePage = this.pageObjectManager.getTimePage();
  expect(await timePage.getAlertMessage()).toEqual(alertMsg);
});
Then(
  'an empty timesheet with message {string} should be present',
  async function (this: CustomWorld, message) {
    const timePage = this.pageObjectManager.getTimePage();
    expect(await timePage.getNoRecordMessage()).toEqual(message);
  }
);

Then('status should show as {string}', async function (this: CustomWorld, status) {
  const timePage = this.pageObjectManager.getTimePage();
  await expect(timePage.getStatusLocator()).toContainText(status);
});

When('adds {string} in Name field of the popup box',async function(this: CustomWorld,text){
  const timePage = this.pageObjectManager.getTimePage();
  await timePage.fillInputBoxAndSave(text)
})
