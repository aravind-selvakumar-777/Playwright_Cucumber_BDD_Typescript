import { Page } from 'playwright';
import { LoginPage } from './LoginPage';
import { RecruitmentPage } from './RecruitmentPage';
import { DirectoryPage } from './DirectoryPage';
import { PIMPage } from './PIMPage';
import { AdminPage } from './AdminPage';
import { TimePage } from './TimePage';

export class PageObjectManager {
  private page: Page;
  public loginPage: LoginPage;
  public recruitmentPage: RecruitmentPage;
  public directoryPage: DirectoryPage;
  public pimPage: PIMPage;
  public adminPage: AdminPage;
  public timePage: TimePage;
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.recruitmentPage = new RecruitmentPage(this.page);
    this.directoryPage = new DirectoryPage(this.page);
    this.pimPage = new PIMPage(this.page);
    this.adminPage = new AdminPage(this.page);
    this.timePage = new TimePage(this.page);
  }

  public getLoginPage(): LoginPage {
    return this.loginPage;
  }
  public getRecruitmentPage(): RecruitmentPage {
    return this.recruitmentPage;
  }
  public getDirectoryPage(): DirectoryPage {
    return this.directoryPage;
  }
  public getPIMPage(): PIMPage {
    return this.pimPage;
  }
  public getAdminPage(): AdminPage {
    return this.adminPage;
  }
  public getTimePage(): TimePage {
    return this.timePage;
  }
}
