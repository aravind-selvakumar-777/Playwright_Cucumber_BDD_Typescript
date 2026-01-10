import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page, chromium, firefox, webkit } from 'playwright';
import { PageObjectManager } from '../page_objects/PageObjectManager';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  pageObjectManager!: PageObjectManager;

  async openBrowser() {
    const browsers = { chromium, firefox, webkit } as const; //as const at the end makes the object properties immutable
    const envBrowser = browsers[process.env.BROWSER as keyof typeof browsers] ?? chromium; // To covert string type from env into type of keys present in browsers object
    this.browser = await envBrowser.launch();
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
