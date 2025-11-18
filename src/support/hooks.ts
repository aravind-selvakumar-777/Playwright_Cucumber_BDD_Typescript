import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { PageObjectManager } from '../page_objects/PageObjectManager';
setDefaultTimeout(60 * 1000); // 60 seconds, Added since 5s is too low

Before(async function (this: CustomWorld) {
  await this.openBrowser();
  this.pageObjectManager = new PageObjectManager(this.page);
});

After(async function (this: CustomWorld) {
  await this.closeBrowser();
});
