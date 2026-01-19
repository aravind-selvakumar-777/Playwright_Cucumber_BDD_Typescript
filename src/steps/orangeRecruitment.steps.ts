import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';
import { createEmployee, deleteEmployee } from '../services/pim.service';
import { deleteJobTitle } from '../services/admin.service';
import {
  createCandidate,
  createVacancyWithManager,
  deleteCandidate,
  deleteVacancy,
} from '../services/recruitment.service';
import { deleteCustomer } from '../services/time.service';

When('I click on {string} menu', async function (this: CustomWorld, menuName) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.sideMenu.clickSideMenuItem(menuName);
});
Then('I should be in the {string} page', async function (this: CustomWorld, title: string) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  expect(await recruitmentPage.getPageTitle()).toEqual(title);
});

When('the user clicks on the Add button', async function (this: CustomWorld) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.clickAddButton();
});

When(
  'the user enters candidate first name {string} and last name {string}',
  async function (this: CustomWorld, firstName: string, lastName: string) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.fillFullName(firstName, lastName);
    this.cleanupData.push(() => deleteCandidate(this, `${firstName} ${lastName}`));
  }
);

When(
  'the user enters employee first name {string} and last name {string}',
  async function (this: CustomWorld, firstName: string, lastName: string) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.fillFullName(firstName, lastName);
    this.cleanupData.push(() => deleteEmployee(this, `${firstName} ${lastName}`));
  }
);

When('the user enters email {string}', async function (this: CustomWorld, email: string) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.fillEmail(email);
});

When(
  'the user selects a job vacancy {string}',
  async function (this: CustomWorld, vacancy: string) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.selectVacancyDropdown(vacancy);
  }
);

When('the user uploads a resume file', async function (this: CustomWorld) {
  const resumePath = 'src/test-data/dummyResume.pdf';
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.uploadResume(resumePath);
});

When('the user clicks the {string} button', async function (this: CustomWorld, buttonName: string) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.clickButton(buttonName);
});

Then(
  'a success message should be displayed {string}',
  async function (this: CustomWorld, successMessage: string) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    expect(await recruitmentPage.getStatusPopMessage()).toEqual(successMessage);
  }
);

Then(
  'the new candidate {string} should appear in the candidate list',
  async function (this: CustomWorld, fullName: string) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.clickCandidatesbutton();
    expect(await recruitmentPage.isNamePresent(fullName)).toBeTruthy();
  }
);

When(
  'the user finds and selects the candidate {string}',
  async function (this: CustomWorld, fullName: string) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.findAndClickCandidate(fullName);
  }
);

When('the user clicks {string}', async function (this: CustomWorld, buttonName: string) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.clickButton(buttonName);
});

Then(
  'the candidate status should update to {string}',
  async function (this: CustomWorld, status: string) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    expect(await recruitmentPage.getStatus()).toEqual(status);
  }
);

Given('the user clicks the Edit toggle button', async function (this: CustomWorld) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.clickEditToggleButton();
});

Given(
  'the user updates the contact number to {string}',
  async function (this: CustomWorld, contactNumber: string) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.updateContactNumber(contactNumber);
  }
);

Then(
  'the updated contact number {string} should be displayed in the candidate profile',
  async function (this: CustomWorld, contactNumber: string) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    expect(await recruitmentPage.getContactNumber()).toEqual(contactNumber);
  }
);

When('the user clicks on {string}', async function (this: CustomWorld, title: string) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.clickOnVacancies(title);
});

When('selects {string} as the Job Title field', async function (this: CustomWorld, title: string) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.selectJobTitleDropdown(title);
});

When(
  'the enters {string} into the Hiring Manager field',
  async function (this: CustomWorld, fullName: string) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.searchforHiringmanagerByName(fullName);
  }
);

Then(
  '{string} should appear in the second column of the list',
  async function (this: CustomWorld, fullName: string) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    expect(await recruitmentPage.checkIfNameIsPresentInSecondColumn(fullName)).toBeTruthy();
  }
);

When('adds {string} in Name field', async function (this: CustomWorld, name: string) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.addName(name);
  this.cleanupData.push(() => deleteJobTitle(this, name));
});

When('adds {string} in customer Name field', async function (this: CustomWorld, name: string) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.addName(name);
  this.cleanupData.push(() => deleteCustomer(this, name));
});

Given('I create an employee with name {string}', async function (this: CustomWorld, name: string) {
  await createEmployee(this, name);
  this.cleanupData.push(() => deleteEmployee(this, name));
});

When(
  'adds {string} in vacancy Name field',
  async function (this: CustomWorld, vacancyName: string) {
    const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
    await recruitmentPage.addName(vacancyName);
    this.cleanupData.push(() => deleteVacancy(this, vacancyName));
  }
);

Given(
  'I create a vacancy with name {string} for {string} with manager {string}',
  async function (this: CustomWorld, vacancyName: string, jobTitle: string, managerName: string) {
    await createVacancyWithManager(this, vacancyName, jobTitle, managerName);
    this.cleanupData.push(() => deleteVacancy(this, vacancyName));
  }
);

Given(
  'I create a candidate with name {string} with email {string} assigned to vacancy {string}',
  async function (this: CustomWorld, name: string, email: string, vacancyName: string) {
    await createCandidate(this, name, email, vacancyName);
    this.cleanupData.push(() => deleteCandidate(this, name));
  }
);

Then('the title should be {string}', async function (this: CustomWorld, title: string) {
  const recruitmentPage = this.pageObjectManager.getRecruitmentPage();
  await recruitmentPage.wait(recruitmentPage.getVacancyPageTitleLocator(title));
  await expect(recruitmentPage.getVacancyPageTitleLocator(title)).toHaveText(title);
});
