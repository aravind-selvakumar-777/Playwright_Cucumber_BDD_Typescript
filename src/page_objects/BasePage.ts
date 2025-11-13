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
  async getText(locator: Locator, elementName = 'element'): Promise<string> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      const text = await locator.textContent();

      if (text === null) {
        throw new Error(`No text found in ${elementName}`);
      }
      return text.trim();
    } catch (error) {
      throw new Error(`Failed to get text from ${elementName}: ${(error as Error).message}`);
    }
  }
}
