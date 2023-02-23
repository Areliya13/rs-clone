import Page from '../core/page';
import { getHash, getMainAddress, getMainOptions, getOptions, mainOptions, setMainOptions } from '../helpers/functions';
import { createHtmlElement } from '../helpers/other';
import { PageIds } from '../types/enum';
import { Options } from '../types/types';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import ErrorPage from './page404/page404';
import { Boards } from './main/boards';
import LeftSideBar from './main/leftsidebar';
import { MainPage } from './main/mainPage';
import { Templates } from './main/templates';
import { WorkspaceBoards } from './main/workspaceBoards';
import { SpacePageRender } from './space/spacePageRender';
import { readAll } from '../api/rest/readAll';
import { Path } from '../api/types';
import { EventName, IUser } from '../store/types';
import { store } from '../store/store';
import { updateStore } from '../store/updateStore';
import observer from '../store/observer';

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

  static renderPageContent(idPage: string, options?: Options): void {
    const currentPage = document.querySelector('.content');
    if (currentPage) {
      currentPage.remove();
    }

    let page: Page = new ErrorPage(idPage);
    if (idPage === PageIds.MainPage) {
      if ((!options || options.size === 0) && mainOptions.size !== 0) {
        window.location.hash = getMainAddress();
      } else if (options) {
        mainOptions.clear();
        options.forEach((value, key) => {
          mainOptions.set(key, value);
        });
      }
      page = new MainPage(idPage);
    } else if (idPage === PageIds.TemplatesPage) {
      page = new Templates(idPage);
    } else if (idPage === PageIds.BoardsPage) {
      page = new Boards(idPage);
    } else if (idPage === PageIds.WorkspaceBoardsPage) {
      page = new WorkspaceBoards(idPage);
    } else if (idPage === PageIds.SpacePage) {
      page = new SpacePageRender(idPage, options);
    }

    if (page) {
      const pageHTML: HTMLElement = page.render();
      pageHTML.className = this.defaultPageID;
      const leftSideNeedPages: string[] = [
        PageIds.MainPage,
        PageIds.BoardsPage,
        PageIds.TemplatesPage,
        PageIds.WorkspaceBoardsPage,
      ];
      if (leftSideNeedPages.includes(idPage)) {
        const leftSidebar = new LeftSideBar(idPage).renderLeftSide();
        pageHTML.prepend(leftSidebar);
      }
      if (idPage === PageIds.SpacePage) {
        pageHTML.classList.add('full-page');
      }
      this.main.append(pageHTML);
    }
  }

  private changedHash(): void {
    function getPageHash(): void {
      const hash = window.location.hash;
      const address = getHash(hash);
      const options = getOptions(decodeURIComponent(hash.slice(hash.indexOf('?') + 1)));
      if (!hash) {
        App.renderPageContent(PageIds.MainPage);
      } else if (hash.indexOf('/') >= 0) {
        App.renderPageContent(PageIds.ErrorPage);
      } else {
        App.renderPageContent(address, options);
      }
    }
    window.addEventListener('hashchange', getPageHash);
    window.addEventListener('load', getPageHash);

    function subscribe(): void {
      observer.subscribe({ eventName: EventName.updateState, function: getPageHash });
    }

    subscribe();
  }

  run(): void {
    this.getUser();
    App.header.append(App.headerContent.render());
    App.footer.append(App.footerContent.render());
    document.body.append(App.header, App.main, App.footer);
    window.addEventListener('beforeunload', setMainOptions);
    window.addEventListener('load', getMainOptions);
    this.changedHash();
  }

  async getUser(): Promise<void> {
    try {
      const users: IUser[] = await readAll(Path.user, '');
      const user = await readAll(Path.workSpace, users[0]._id);
      store.user = user;
      console.log('app', user);
      store.updateStore(user);
    } catch (e) {
      console.log(e);
    }
  }
}

export default App;
