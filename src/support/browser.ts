import { Browser, chromium, firefox, webkit } from '@playwright/test';

const browsers = { chromium, firefox, webkit } as const;

let browser: Browser;

export async function launchBrowser() {
  const envBrowser = browsers[process.env.BROWSER as keyof typeof browsers] ?? chromium;
  browser = await envBrowser.launch();
}

export function getBrowser(): Browser {
  if (!browser) {
    throw new Error('Browser has not been launched');
  }
  return browser;
}

export async function closeBrowser() {
  await browser?.close();
}
