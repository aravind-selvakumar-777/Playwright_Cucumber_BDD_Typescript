import { Locator, Page } from 'playwright';
import { BasePage } from './BasePage';

export class PIMPage extends BasePage {
  private firstNameErrLocator: Locator;
  private lastnameErrLocator: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.firstNameErrLocator = this.page.locator('.oxd-input-field-error-message').first();
    this.lastnameErrLocator = this.page.locator('.oxd-input-field-error-message').nth(1);
  }

  public createRandomID(): number {
    return Math.random() * 100000;
  }

  private getPersonalDetailsLocator(title: string): Locator {
    return this.page.getByRole('heading', { level: 6, name: title });
  }
  private getEmployeeNameLocator(_name: string): Locator {
    return this.page.getByRole('heading', { level: 6, name: _name });
  }
  public async employeeFromTitle(title: string): Promise<string> {
    await this.wait(this.getPersonalDetailsLocator(title));
    return this.getText(this.getPersonalDetailsLocator(title));
  }
  public async employeeName(_name: string): Promise<string> {
    return this.getText(this.getEmployeeNameLocator(_name));
  }

  public getFirstNameRequiredErrorLocator(): Locator {
    return this.firstNameErrLocator;
  }

  public getLastNameRequiredErrorLocator(): Locator {
    return this.lastnameErrLocator;
  }
}
