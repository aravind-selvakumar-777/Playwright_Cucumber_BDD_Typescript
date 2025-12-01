import { Page } from 'playwright';
import { LoginPage } from './LoginPage';
import { RecruitmentPage } from './RecruitmentPage';
import { DirectoryPage } from './DirectoryPage';
import { PIMPage } from './PIMPage';
import { AdminPage } from './AdminPage';

export class PageObjectManager {
  page: Page;
  loginPage: LoginPage;
  recruitmentPage: RecruitmentPage;
  directoryPage: DirectoryPage;
  pimPage: PIMPage;
  adminPage: AdminPage;
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.recruitmentPage = new RecruitmentPage(this.page);
    this.directoryPage = new DirectoryPage(this.page);
    this.pimPage = new PIMPage(this.page);
    this.adminPage = new AdminPage(this.page);
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
  getPIMPage(): PIMPage {
    return this.pimPage;
  }
  getAdminPage(): AdminPage {
    return this.adminPage;
  }
}
