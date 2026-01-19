import { Locator, Page } from 'playwright';
import { BasePage } from './BasePage';
import { expect } from 'playwright/test';

export class DirectoryPage extends BasePage {
  private employeeNameTextBox: Locator;
  private searchDropdownBox: Locator;
  private directoryName: Locator;
  private jobTitleDropDownBox: Locator;
  private employeeTitle: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.employeeNameTextBox = this.page.getByPlaceholder('Type for hints...').first();
    this.searchDropdownBox = this.page.getByRole('listbox');
    this.directoryName = this.page.locator('.orangehrm-directory-card p').first();
    this.jobTitleDropDownBox = this.page.locator('.oxd-select-text').first();
    this.employeeTitle = this.page.locator('p.orangehrm-directory-card-subtitle').first();
  }
  public async searchByEmployeeName(Name: string) {
    const firstName = Name.split(' ')[0];
    await this.employeeNameTextBox.pressSequentially(firstName, { delay: 50 });
    await expect(this.searchDropdownBox.first()).toBeVisible({
      timeout: 10_000,
    });
    await expect(this.searchDropdownBox).not.toHaveText('Searching....'); // Added THIS AS A CUSTOM WAIT

    const option = this.searchDropdownBox.filter({ hasText: Name }).first();

    await option.waitFor({ state: 'visible' });
    await option.scrollIntoViewIfNeeded();
    await this.click(option);
  }
  public getDirectoryNameLocator(): Locator {
    return this.directoryName;
  }

  public async selectJobTtileDropdown(value: string) {
    await this.click(this.jobTitleDropDownBox);
    await this.click(this.dropdownOptionLocator(value));
  }
  public getJobTitleLocator(): Locator {
    return this.employeeTitle;
  }
}
