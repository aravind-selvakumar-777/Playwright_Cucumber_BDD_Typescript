import { Locator, Page } from 'playwright';
import { BasePage } from '../BasePage';

export class UserMenu extends BasePage {
  page: Page;
  userMenu: Locator;
  menuList: Locator;
  readonly options = {
    about: 'About',
    support: 'Support',
    changePassword: 'Change Password',
    logout: 'Logout',
  } as const;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.userMenu = this.page.locator('span.oxd-userdropdown-tab');
    this.menuList = this.page.locator('ul.oxd-dropdown-menu');
  }

  async openUserMenu() {
    await this.click(this.userMenu);
    await this.wait(this.menuList);
  }
  async clickUserMenuItem(name: keyof typeof this.options) {
    await this.openUserMenu();
    const label = this.options[name];
    await this.click(this.menuList.getByRole('menuitem', { name: label }));
    await this.page.waitForLoadState('networkidle');
  }
}
