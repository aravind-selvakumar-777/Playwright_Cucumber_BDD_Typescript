import { Locator, Page } from 'playwright';
import { BasePage } from './BasePage';
import { expect } from 'playwright/test';

export class DirectoryPage extends BasePage {
  page: Page;
  employeeNameTextBox: Locator;
  searchDropdownBox: Locator;
  directoryName: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.employeeNameTextBox = this.page.getByPlaceholder('Type for hints...');
    this.searchDropdownBox = this.page.getByRole('listbox');
    this.directoryName = this.page.locator('.orangehrm-directory-card p').first();
  }
  async searchByEmployeeName(Name: string) {
    const firstName = Name.split(' ')[0];
    await this.employeeNameTextBox.pressSequentially(firstName);
    await this.wait(this.searchDropdownBox);
    await expect(this.searchDropdownBox).not.toHaveText('Searching....'); // Added THIS AS A CUSTOM WAIT

    for (let i = 0; i < (await this.searchDropdownBox.count()); i++) {
      const fullName = await this.searchDropdownBox.nth(i).textContent();
      if (fullName?.split('  ').join(' ') === Name) {
        this.click(this.searchDropdownBox.nth(i));
        break;
      }
    }
  }
  async getDirectoryName(): Promise<string> {
    return (await this.getText(this.directoryName))?.split('  ').join(' ');
  }
}
