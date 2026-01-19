import { Before, After, Status, setDefaultTimeout, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { PageObjectManager } from '../page_objects/PageObjectManager';
import { launchBrowser, closeBrowser } from './browser';
setDefaultTimeout(60 * 1000); // 60 seconds, Added since 5s is too low

BeforeAll(async () => {
  await launchBrowser();
});

AfterAll(async () => {
  await closeBrowser();
});

Before(async function (this: CustomWorld) {
  await this.createScenario();
  await this.initApiContext();
  this.pageObjectManager = new PageObjectManager(this.page); //Initializing pages before each scenario
});

After(async function (this: CustomWorld, scenario) {
  try {
    if (scenario.result?.status === Status.FAILED) {
      const ss = await this.page.screenshot(); // Did not specify local path, since SS will be added to cucumber report.
      this.attach(ss, 'image/png'); // This step is needed to embed failed SS within our cucumber-report itself.
    }
  } catch (error) {
    console.error('ERROR taking SS in after hook!\n', error);
  }
  await this.apiContext.dispose();
  await this.cleanupScenario();
});

After({ tags: '@cleanup' }, async function (this: CustomWorld) {
  for (const recycle of this.cleanupData) {
    try {
      await recycle();
    } catch (err) {
      console.error(err);
    }
  }
});
