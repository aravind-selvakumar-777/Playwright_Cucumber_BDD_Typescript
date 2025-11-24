import { Locator, Page } from 'playwright';
import { SideMenu } from './components/SideMenu';
import { BasePage } from './BasePage';

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

  dropdownOptionLocator(value: string): Locator {
    return this.page.getByRole('option', { name: value });
  }

  async selectVacancyDropdown(value: string) {
    await this.click(this.vacancyDropdownBox);
    await this.click(this.dropdownOptionLocator(value));
  }

  async uploadResume(path: string) {
    await this.uploadResumeLocator.setInputFiles(path);
  }

  async getStatusPopMessage(): Promise<string> {
    return await this.getText(this.statusMessage);
  }

  async clickCandidatesbutton() {
    this.click(this.candidatesTab);
  }
  async isNamePresent(name: string): Promise<boolean> {
    const element = this.page.getByText(name).first();
    return (await element.isEnabled()) && (await element.isVisible());
  }
}
