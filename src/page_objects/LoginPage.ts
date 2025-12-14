import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';
import { UserMenu } from './components/UserMenu';

export class LoginPage extends BasePage {
  private usernameTextBox: Locator;
  private passwordTextBox: Locator;
  private LoginButton: Locator;
  private loginErrorMessage: Locator;
  private missingUsernameErrorMessage: Locator;
  private missingPasswordErrorMessage: Locator;
  private dashboardHeading: Locator;
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
  public async goToOrange(url: string) {
    //XXXXX -- NEED TO PUSH THIS TO BASEPAGE -- XXXXX
    await this.page.goto(url, { waitUntil: 'load' });
  }
  public async fillUsernameAndPassword(username: string, password: string) {
    await this.usernameTextBox.fill(username);
    await this.passwordTextBox.fill(password);
  }
  public async clickLoginButton() {
    await this.click(this.LoginButton);
  }
  public async waitForDashboard() {
    await this.wait(this.dashboardHeading);
  }
  public async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  public async getInvalidLoginErrorText(): Promise<string> {
    return this.getText(this.loginErrorMessage);
  }
  public async getMissingUsernameErrorText(): Promise<string> {
    return this.getText(this.missingUsernameErrorMessage);
  }
  public async getMissingPasswordErrorText(): Promise<string> {
    return this.getText(this.missingPasswordErrorMessage);
  }
}
