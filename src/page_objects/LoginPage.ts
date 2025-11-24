import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';
import { UserMenu } from './components/UserMenu';

export class LoginPage extends BasePage {
  page: Page;
  usernameTextBox: Locator;
  passwordTextBox: Locator;
  LoginButton: Locator;
  loginErrorMessage: Locator;
  missingUsernameErrorMessage: Locator;
  missingPasswordErrorMessage: Locator;
  dashboardHeading: Locator;
  userMenu: UserMenu;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.userMenu = new UserMenu(this.page);
    this.usernameTextBox = this.page.getByPlaceholder('Username');
    this.passwordTextBox = this.page.getByPlaceholder('Password');
    this.LoginButton = this.page.getByRole('button', { name: 'Login' });
    this.loginErrorMessage = this.page.locator('div p', { hasText: 'Invalid credentials' }).first();
    this.missingUsernameErrorMessage = this.page
      .locator('span.oxd-input-field-error-message')
      .first();
    this.missingPasswordErrorMessage = this.page
      .locator('span.oxd-input-field-error-message')
      .nth(1);
    this.dashboardHeading = this.page.getByRole('heading', { name: 'Dashboard', level: 6 });
  }
  async goToOrange(url: string) {
    //XXXXX -- NEED TO PUSH THIS TO BASEPAGE -- XXXXX
    await this.page.goto(url, { waitUntil: 'load' });
  }
  async fillUsernameAndPassword(username: string, password: string) {
    await this.usernameTextBox.fill(username);
    await this.passwordTextBox.fill(password);
  }
  async clickLoginButton() {
    await this.click(this.LoginButton);
  }
  async waitForDashboard() {
    await this.wait(this.dashboardHeading);
  }
  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  async getInvalidLoginErrorText(): Promise<string> {
    return this.getText(this.loginErrorMessage);
  }
  async getMissingUsernameErrorText(): Promise<string> {
    return this.getText(this.missingUsernameErrorMessage);
  }
  async getMissingPasswordErrorText(): Promise<string> {
    return this.getText(this.missingPasswordErrorMessage);
  }
}
