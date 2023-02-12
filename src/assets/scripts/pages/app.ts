import Page from '../core/page';
import { getHash, getMainOptions, setMainOptions } from '../helpers/functions';
import { createHtmlElement } from '../helpers/other';
import { localStorageItems, PageIds } from '../types/enum';
import { Options } from '../types/types';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import ErrorPage from './page404/page404';
import { Boards } from './main/boards';
import LeftSideBar from './main/leftsidebar';
import { MainPage } from './main/mainPage';
import { Templates } from './main/templates';
import { SpacePageRender } from './space/spacePageRender';

class App {
  private static defaultPageID = 'content';
  private static headerContent = new Header();
  private static footerContent = new Footer();
  private static header: HTMLElement = createHtmlElement('header', {
    className: 'header',
  });
  private static main: HTMLElement = createHtmlElement('main', {
    className: 'main',
  });
  private static footer: HTMLElement = createHtmlElement('footer', {
    className: 'footer',
  });

  static renderPageContent(idPage: string): void {
    const currentPage = document.querySelector(this.defaultPageID);
    if (currentPage) {
      currentPage.remove();
    }

    let page: Page = new ErrorPage(idPage);
    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.TemplatesPage) {
      page = new Templates(idPage);
    } else if (idPage === PageIds.BoardsPage) {
      page = new Boards(idPage);
    } else if (idPage === PageIds.SpacePage) {
      page = new SpacePageRender(idPage);
    }

    if (page) {
      const pageHTML: HTMLElement = page.render();
      pageHTML.className = this.defaultPageID;
      if (idPage === PageIds.MainPage || idPage === PageIds.BoardsPage || idPage === PageIds.TemplatesPage) {
        const leftSidebar = new LeftSideBar(idPage).renderLeftSide();
        pageHTML.prepend(leftSidebar);
      } else if (idPage === PageIds.SpacePage) {
        pageHTML.classList.add('full-page');
      }
      this.main.append(pageHTML);
    }
  }

  private changedHash(): void {
    function getPageHash(): void {
      const hash = window.location.hash;
      const address = getHash(hash);
      localStorage.setItem(localStorageItems.address, address);
      if (!hash) {
        App.renderPageContent(PageIds.MainPage);
      } else if (hash.indexOf('/') >= 0) {
        App.renderPageContent(PageIds.ErrorPage);
      } else {
        App.renderPageContent(address);
      }
    }
    window.addEventListener('hashchange', getPageHash);
    window.addEventListener('load', getPageHash);
  }

  run(): void {
    App.header.append(App.headerContent.render());
    App.footer.append(App.footerContent.render());
    document.body.append(App.header, App.main, App.footer);
    window.addEventListener('beforeunload', setMainOptions);
    window.addEventListener('load', getMainOptions);
    this.changedHash();
  }
}

export default App;
