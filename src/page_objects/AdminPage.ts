import { Locator, Page } from 'playwright';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
  page: Page;
  openMenu: Locator;
  candidateTableRow: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.openMenu = this.page.locator('.oxd-dropdown-menu');
    this.candidateTableRow = this.page.locator('.oxd-table-body').getByRole('row');
  }

  getMainMenuLocatorFromPage(MainMenuName: string): Locator {
    return this.page.locator('.oxd-topbar-body-nav-tab-item', { hasText: MainMenuName });
  }
  getSubMenuLocator(subMenuName: string): Locator {
    return this.page.getByRole('menuitem', { name: subMenuName });
  }
  async navigateToAddJobTitles(mainMenuName: string, subMenuName: string) {
    await this.click(this.getMainMenuLocatorFromPage(mainMenuName));
    this.wait(this.openMenu);
    await this.click(this.getSubMenuLocator(subMenuName));
    await this.page.waitForLoadState('networkidle');
  }
  async checkIfNewTitleIsPresent(title: string): Promise<boolean> {
    await this.wait(this.candidateTableRow.last());
    await this.page.waitForLoadState('networkidle');
    const count = await this.candidateTableRow.count();
    let isNamePresent = false;
    for (let i = 0; i < count; i++) {
      const name = await this.getText(this.candidateTableRow.nth(i).getByRole('cell').nth(1));
      if (name.split('  ').join(' ') === title) {
        isNamePresent = true;
        break;
      }
    }
    return isNamePresent;
  }
}
