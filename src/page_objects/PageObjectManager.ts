import { Page } from 'playwright';
import { LoginPage } from './LoginPage';
import { UserMenu } from './components/UserMenu';

export class PageObjectManager {
  page: Page;
  loginPage: LoginPage;
  userMenu: UserMenu;
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.userMenu = new UserMenu(this.page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }
  getUserMenu(): UserMenu {
    return this.userMenu;
  }
}
