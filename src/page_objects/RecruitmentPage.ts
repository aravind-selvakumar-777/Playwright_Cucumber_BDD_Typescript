import { Locator, Page } from 'playwright';
import { SideMenu } from './components/SideMenu';
import { BasePage } from './BasePage';
import { expect } from 'playwright/test';

export class RecruitmentPage extends BasePage {
  page: Page;
  sideMenu: SideMenu;
  addButton: Locator;
  firstNameTextBox: Locator;
  middleNameTextBox: Locator;
  lastNameTextBox: Locator;
  emailTextBox: Locator;
  vacancyDropdownBox: Locator;
  uploadResumeLocator: Locator;
  statusMessage: Locator;
  firstNameTableEntry: Locator;
  candidatesTab: Locator;
  candidateTableRow: Locator;
  editToggleButton: Locator;
  contactNumberTextBox: Locator;
  recruitmentStatus: Locator;
  vacancyNameTextField: Locator;
  jobTitleDropdownBox: Locator;
  employeeNameTextBox: any;
  searchDropdownBox: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.sideMenu = new SideMenu(this.page);
    this.addButton = this.page.getByRole('button', { name: 'Add' });
    this.firstNameTextBox = this.page.getByPlaceholder('First Name');
    this.middleNameTextBox = this.page.getByPlaceholder('Middle Name');
    this.lastNameTextBox = this.page.getByPlaceholder('Last Name');
    this.emailTextBox = this.page.getByPlaceholder('Type here').first();
    this.vacancyDropdownBox = this.page.locator('.oxd-select-text-input');
    this.uploadResumeLocator = this.page.locator('.oxd-file-input');
    this.statusMessage = this.page.locator('p.oxd-toast-content-text').nth(1);
    this.firstNameTableEntry = this.page
      .locator('.oxd-table-body')
      .getByRole('row')
      .nth(0)
      .getByRole('cell')
      .nth(2)
      .locator('div');
    this.candidatesTab = this.page.getByRole('link', { name: 'Candidates' });
    this.candidateTableRow = this.page.locator('.oxd-table-body').getByRole('row');
    this.editToggleButton = this.page.getByLabel('Edit');
    this.contactNumberTextBox = this.page.getByPlaceholder('Type here').nth(1);
    this.recruitmentStatus = this.page.locator('.orangehrm-recruitment-status p');
    this.vacancyNameTextField = this.page.locator('input').nth(1);
    this.jobTitleDropdownBox = this.page.locator('.oxd-select-text').first();
    this.employeeNameTextBox = this.page.getByPlaceholder('Type for hints...');
    this.searchDropdownBox = this.page.getByRole('listbox');
  }

  async clickAddButton() {
    await this.click(this.addButton);
  }

  async fillFullName(first: string, last: string, middle?: string) {
    await this.fillText(this.firstNameTextBox, first);
    await this.fillText(this.lastNameTextBox, last);
    await this.fillText(this.middleNameTextBox, middle ? middle : '');
  }

  async fillEmail(email: string) {
    await this.fillText(this.emailTextBox, email);
  }

  async selectVacancyDropdown(value: string) {
    await this.click(this.vacancyDropdownBox);
    await this.click(this.dropdownOptionLocator(value));
  }

  async uploadResume(path: string) {
    await this.uploadResumeLocator.setInputFiles(path);
  }

  async getStatusPopMessage(): Promise<string> {
    await this.wait(this.statusMessage);
    const status = await this.getText(this.statusMessage);
    await this.statusMessage.waitFor({ state: 'hidden' });
    return status;
  }

  async clickCandidatesbutton() {
    this.click(this.candidatesTab);
  }
  async isNamePresent(name: string): Promise<boolean> {
    const element = this.page.getByText(name).first();
    return (await element.isEnabled()) && (await element.isVisible());
  }

  async findAndClickCandidate(candidateName: string) {
    const count = await this.candidateTableRow.count();
    for (let i = 0; i < count; i++) {
      const name = await this.getText(this.candidateTableRow.nth(i).getByRole('cell').nth(2));
      if (name.split('  ').join(' ') === candidateName) {
        //REMOVING THE EXTRA SPACE BROUGHT FOR MIDDLENAME
        await this.click(this.candidateTableRow.nth(i).getByRole('cell').locator('i.bi-eye-fill')); //LOCATOR FOR THE EYE-BUTTON
        break;
      }
    }
    await this.page.waitForLoadState('networkidle');
  }

  async clickEditToggleButton() {
    await this.click(this.editToggleButton);
  }

  async updateContactNumber(value: string) {
    await this.fillText(this.contactNumberTextBox, value);
  }

  async getContactNumber(): Promise<string> {
    return await this.contactNumberTextBox.inputValue(); //Use input value to retrieve value from input textboxes.
  }

  async getStatus(): Promise<string> {
    await this.wait(this.recruitmentStatus);
    const fullText = await this.getText(this.recruitmentStatus);
    return fullText.split(' ')[1]; // Added to fetch only the status. It is like Status: status.
  }

  async clickOnVacancies(text: string) {
    await this.click(this.page.getByText(text));
    await this.page.waitForLoadState('networkidle');
  }

  async addName(name: string) {
    await this.fillText(this.vacancyNameTextField, name);
  }

  async selectJobTitleDropdown(value: string) {
    await this.click(this.jobTitleDropdownBox);
    await this.click(this.dropdownOptionLocator(value));
  }

  async searchforHiringmanagerByName(Name: string) {
    ///MIGHT HAVE TO MOVE TO BASE PAGE
    const firstName = Name.split(' ')[0];
    await this.employeeNameTextBox.pressSequentially(firstName);
    await this.wait(this.searchDropdownBox);
    await expect(this.searchDropdownBox).not.toHaveText('Searching....'); // Added THIS AS A CUSTOM WAIT
    for (let i = 0; i < (await this.searchDropdownBox.count()); i++) {
      const fullName = await this.getText(this.searchDropdownBox.nth(i));
      if (fullName?.split('  ').join(' ') === Name) {
        this.click(this.searchDropdownBox.nth(i));
        break;
      }
    }
  }
  async checkIfNewVacancyIsPresent(candidateName: string): Promise<boolean> {
    const count = await this.candidateTableRow.count();
    let isNamePresent = false;
    for (let i = 0; i < count; i++) {
      const name = await this.getText(this.candidateTableRow.nth(i).getByRole('cell').nth(2));
      if (name.split('  ').join(' ') === candidateName) {
        isNamePresent = true;
        break;
      }
    }
    return isNamePresent;
  }
}
