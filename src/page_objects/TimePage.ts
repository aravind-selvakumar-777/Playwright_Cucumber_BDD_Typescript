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
  timesheetPeriod: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.alertText = this.page.locator('p.oxd-alert-content-text');
    this.noRecordTableLocator = this.page.locator('td.orangehrm-timesheet-table-body-cell').first();
    this.statusLocator = this.page.locator('.orangehrm-timesheet-footer--title p');
    this.popupBoxRootlocator = this.page.locator('.oxd-dialog-container-default--inner');
    this.inputBoxLocator = this.page.locator('input').first();
    this.saveButtonLocator = this.page.getByRole('button', { name: 'Save' });
    this.timesheetPeriod = this.page.getByRole('heading', { level: 6 }).last();
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
  async getTimesheetPeriod(): Promise<string> {
    return await this.getText(this.timesheetPeriod);
  }
  getCurrentWeekInTimesheetFormat(): string {
    const d = new Date();

    // getDay(): 0 = Sunday, 1 = Monday, ... 6 = Saturday
    const dayOfWeek = d.getDay();

    // Monday offset
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    // Sunday offset
    const diffToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

    const monday = new Date(d);
    monday.setDate(d.getDate() + diffToMonday);

    const sunday = new Date(d);
    sunday.setDate(d.getDate() + diffToSunday);

    // Helper to pad
    const pad = (num: number) => String(num).padStart(2, '0');

    // Formatting function: YYYY-DD-MM
    const format = (date: Date) =>
      `${date.getFullYear()}-${pad(date.getDate())}-${pad(date.getMonth() + 1)}`;

    return `${format(monday)} - ${format(sunday)}`;
  }
}
