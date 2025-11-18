import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import { PageObjectManager } from '../page_objects/PageObjectManager';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  pageObjectManager!: PageObjectManager;

  async openBrowser() {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
