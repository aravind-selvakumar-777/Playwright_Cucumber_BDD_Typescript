import { Locator, Page } from 'playwright';
import { BasePage } from './BasePage';

export class TimePage extends BasePage {
  page: Page;
  alertText: Locator;
  noRecordTableLocator: Locator;
  statusLocator: Locator;
  popupBoxRootlocator: Locator;
  inputBoxLocator: Locator;
  saveButtonLocator: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.alertText = this.page.locator('p.oxd-alert-content-text');
    this.noRecordTableLocator = this.page.locator('td.orangehrm-timesheet-table-body-cell').first();
    this.statusLocator = this.page.locator('.orangehrm-timesheet-footer--title p');
    this.popupBoxRootlocator = this.page.locator('.oxd-dialog-container-default--inner');
    this.inputBoxLocator = this.page.locator('input').first();
    this.saveButtonLocator = this.page.getByRole('button', { name: 'Save' });
  }

  getTimesheetNameLocator(userName: string) {
    return this.page.getByRole('heading', { level: 6, name: `Timesheet for ${userName}` });
  }
  async getTimesheetName(name: string): Promise<string> {
    await this.page.waitForLoadState('networkidle');
    return await this.getText(this.getTimesheetNameLocator(name));
  }
  async getAlertMessage(): Promise<string> {
    await this.wait(this.alertText);
    return await this.getText(this.alertText);
  }
  async getNoRecordMessage(): Promise<string> {
    await this.wait(this.noRecordTableLocator);
    return await this.getText(this.noRecordTableLocator);
  }

  getStatusLocator(): Locator {
    return this.statusLocator;
  }

  async fillInputBoxAndSave(text: string) {
    await this.wait(this.popupBoxRootlocator);
    const inputBox = this.popupBoxRootlocator.locator('input').first();
    const saveButton = this.popupBoxRootlocator.getByRole('button', { name: 'Save' });
    await this.fillText(inputBox, text);
    await this.click(saveButton);
  }
}
