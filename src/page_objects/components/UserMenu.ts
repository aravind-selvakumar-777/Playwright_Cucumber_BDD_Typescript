import { Locator, Page } from 'playwright';
import { BasePage } from '../BasePage';

export class UserMenu extends BasePage {
  private userMenu: Locator;
  private menuList: Locator;
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

  public async openUserMenu() {
    await this.click(this.userMenu);
    await this.wait(this.menuList);
  }
  public async clickUserMenuItem(name: keyof typeof this.options) {
    await this.openUserMenu();
    const label = this.options[name];
    await this.click(this.menuList.getByRole('menuitem', { name: label }));
    await this.page.waitForLoadState('networkidle');
  }
}
