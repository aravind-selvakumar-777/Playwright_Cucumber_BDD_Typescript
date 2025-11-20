import { config } from './config';
import { chromium } from 'playwright';

export async function sessionCreation() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(config.baseUrl);
  await page.getByPlaceholder('Username').fill(config.username);
  await page.getByPlaceholder('Password').fill(config.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/dashboard/**');
  await page.context().storageState({ path: 'auth.json' });
  await browser.close();
}
