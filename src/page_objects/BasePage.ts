import { Locator, Page } from 'playwright';

export class BasePage {
  page: Page;
  pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = this.page.getByRole('heading', { level: 6 }).first();
  }
  async fillText(locator: Locator, value: string) {
    try {
      await locator.waitFor({ state: 'visible' });
      await locator.fill(''); // TO ENSURE THE FIELD IS ALWAYS EMPTY
      await locator.fill(value);
    } catch (error) {
      console.error(`Failed to fill text into target: ${locator}`, error);
      throw error;
    }
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

  async clickButton(name: string) {
    try {
      const locator = this.page.getByRole('button', { name: name });
      await this.click(locator);
      await this.page.waitForEvent('requestfinished');
    } catch (error) {
      console.error(`Failed to click on button: ${name}`, error);
      throw error;
    }
  }

  async wait(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
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

  async getPageTitle() {
    return this.getText(this.pageTitle);
  }

  dropdownOptionLocator(value: string): Locator {
    return this.page.getByRole('option', { name: value });
  }
}
