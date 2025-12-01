import { Locator, Page } from 'playwright';
import { BasePage } from './BasePage';

export class PIMPage extends BasePage {
  page: Page;
  firstNameErrLocator: Locator;
  lastnameErrLocator: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.firstNameErrLocator = this.page.locator('.oxd-input-field-error-message').first();
    this.lastnameErrLocator = this.page.locator('.oxd-input-field-error-message').nth(1);
  }

  createRandomID(): number {
    return Math.random() * 100000;
  }

  getPersonalDetailsLocator(title: string): Locator {
    return this.page.getByRole('heading', { level: 6, name: title });
  }
  getEmployeeNameLocator(_name: string): Locator {
    return this.page.getByRole('heading', { level: 6, name: _name });
  }
  async employeeFromTitle(title: string): Promise<string> {
    await this.wait(this.getPersonalDetailsLocator(title));
    return this.getText(this.getPersonalDetailsLocator(title));
  }
  async employeeName(_name: string): Promise<string> {
    return this.getText(this.getEmployeeNameLocator(_name));
  }

  getFirstNameRequiredErrorLocator(): Locator {
    return this.firstNameErrLocator;
  }

  getLastNameRequiredErrorLocator(): Locator {
    return this.lastnameErrLocator;
  }
}
