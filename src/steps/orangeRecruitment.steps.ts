import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';

When('I click on {string} menu', async function (this: CustomWorld, menuName) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.sideMenu.clickSideMenuItem(menuName);
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

When(
  'the user finds and selects the candidate {string}',
  async function (this: CustomWorld, fullName) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.findAndClickCandidate(fullName);
  }
);

When('the user clicks {string}', async function (this: CustomWorld, buttonName) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.clickButton(buttonName);
});

Then('the candidate status should update to {string}', async function (this: CustomWorld, status) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  expect(await recruitmentPage.getStatus()).toEqual(status);
});

Given('the user clicks the Edit toggle button', async function (this: CustomWorld) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.clickEditToggleButton();
});

Given(
  'the user updates the contact number to {string}',
  async function (this: CustomWorld, contactNumber) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.updateContactNumber(contactNumber);
  }
);

Then(
  'the updated contact number {string} should be displayed in the candidate profile',
  async function (this: CustomWorld, contactNumber) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    expect(await recruitmentPage.getContactNumber()).toEqual(contactNumber);
  }
);

When('the user clicks on {string}', async function (this: CustomWorld, title) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.clickOnVacancies(title);
});

When('selects {string} as the Job Title field', async function (this: CustomWorld, title) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.selectJobTitleDropdown(title);
});

When(
  'the enters {string} into the Hiring Manager field',
  async function (this: CustomWorld, fullName) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.searchforHiringmanagerByName(fullName);
  }
);

Then(
  'the vacancy {string} should appear in the vacancies list',
  async function (this: CustomWorld, fullName) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    expect(await recruitmentPage.checkIfNewVacancyIsPresent(fullName)).toBeTruthy();
  }
);

When('adds {string} in Name field', async function (this: CustomWorld, name) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.addName(name);
});
