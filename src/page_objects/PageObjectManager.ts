import { Page } from 'playwright';
import { LoginPage } from './LoginPage';
import { RecruitmentPage } from './RecruitmentPage';
import { DirectoryPage } from './DirectoryPage';

export class PageObjectManager {
  page: Page;
  loginPage: LoginPage;
  recruitmentPage: RecruitmentPage;
  directoryPage: DirectoryPage;
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.recruitmentPage = new RecruitmentPage(this.page);
    this.directoryPage = new DirectoryPage(this.page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }
  getRecruitmentPage(): RecruitmentPage {
    return this.recruitmentPage;
  }
  getDirectoryPage(): DirectoryPage {
    return this.directoryPage;
  }
}
