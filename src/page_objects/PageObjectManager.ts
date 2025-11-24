import { Page } from 'playwright';
import { LoginPage } from './LoginPage';
import { RecruitmentPage } from './RecruitmentPage';

export class PageObjectManager {
  page: Page;
  loginPage: LoginPage;
  recruitmentPage: RecruitmentPage;
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.recruitmentPage = new RecruitmentPage(this.page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }
  getRecruitmentPage(): RecruitmentPage {
    return this.recruitmentPage;
  }
}
