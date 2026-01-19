import { setWorldConstructor, World } from '@cucumber/cucumber';
import { APIRequestContext, Browser, BrowserContext, Page, request } from 'playwright';
import { PageObjectManager } from '../page_objects/PageObjectManager';
import { getBrowser } from './browser';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  pageObjectManager!: PageObjectManager;
  apiContext!: APIRequestContext;
  cleanupData: Array<() => Promise<void>> = [];

  async createScenario() {
    this.context = await getBrowser().newContext();
    this.page = await this.context.newPage();
  }

  async cleanupScenario() {
    await this.context?.close();
  }

  async initApiContext() {
    if (!this.apiContext) {
      this.apiContext = await request.newContext({
        baseURL: `${process.env.BASE_URL}/web/index.php/api/v2/`,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
}

setWorldConstructor(CustomWorld);
