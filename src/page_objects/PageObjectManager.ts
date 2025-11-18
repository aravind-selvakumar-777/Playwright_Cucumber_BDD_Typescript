import { Page } from 'playwright';
import { LoginPage } from './LoginPage';

export class PageObjectManager {
  page: Page;
  loginPage: LoginPage;
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }
}
