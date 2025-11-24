import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';

When('I click on Recruitment menu', async function (this: CustomWorld) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.sideMenu.clickSideMenuItem('recruitment');
});
Then('I should be in the {string} page', async function (this: CustomWorld, title) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  expect(await recruitmentPage.getPageTitle()).toEqual(title);
});

When('the user clicks on the Add button', async function (this: CustomWorld) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.clickAddButton();
});

When(
  'the user enters candidate first name {string} and last name {string}',
  async function (this: CustomWorld, firstName, lastName) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.fillFullName(firstName, lastName);
  }
);
When('the user enters email {string}', async function (this: CustomWorld, email) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.fillEmail(email);
});

When('the user selects a job vacancy {string}', async function (this: CustomWorld, vacancy) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.selectVacancyDropdown(vacancy);
});

When('the user uploads a resume file', async function (this: CustomWorld) {
  const resumePath = 'src/test-data/dummyResume.docx';
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.uploadResume(resumePath);
});

When('the user clicks the {string} button', async function (this: CustomWorld, buttonName) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.clickButton(buttonName);
});

Then(
  'a success message should be displayed {string}',
  async function (this: CustomWorld, successMessage) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    expect(await recruitmentPage.getStatusPopMessage()).toEqual(successMessage);
  }
);

Then(
  'the new candidate {string} should appear in the candidate list',
  async function (this: CustomWorld, fullName) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.clickCandidatesbutton();
    expect(await recruitmentPage.isNamePresent(fullName)).toBeTruthy();
  }
);
