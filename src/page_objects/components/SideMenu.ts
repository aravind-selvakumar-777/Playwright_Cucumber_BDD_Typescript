import { Locator, Page } from 'playwright';
import { BasePage } from '../BasePage';

export class SideMenu extends BasePage {
  readonly options = {
    admin: 'Admin',
    pim: 'PIM',
    leave: 'Leave',
    time: 'Time',
    recruitment: 'Recruitment',
    info: 'My info',
    performance: 'Perforance',
    dashboard: 'Dashboard',
    directory: 'Directory',
    claim: 'Claim',
    buzz: 'Buzz',
  } as const;
  private rootElement: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.rootElement = this.page.locator('li.oxd-main-menu-item-wrapper');
  }

  public async clickSideMenuItem(name: keyof typeof this.options) {
    await this.click(this.rootElement.locator(' span', { hasText: this.options[name] }));
    await this.page.reload({waitUntil:'networkidle'});
  }
}
