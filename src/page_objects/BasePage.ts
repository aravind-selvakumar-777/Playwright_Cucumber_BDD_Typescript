import { Locator, Page } from 'playwright';

export class BasePage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async click(locator: Locator) {
    try {
      await locator.waitFor({ state: 'visible' });
      await locator.click();
    } catch (error) {
      console.error(`Failed to click on target: ${locator}`, error);
      throw error;
    }
  }
  async wait(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 5000 });
  }
}
