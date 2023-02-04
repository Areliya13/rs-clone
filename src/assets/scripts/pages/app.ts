import Page from '../core/page';
import { getHash, getMainAddress, getMainOptions, getOptions, mainOptions, setMainOptions } from '../helpers/functions';
import { createHtmlElement } from '../helpers/other';
import { PageIds } from '../types/enum';
import { Options } from '../types/types';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import Main from './main/main';
import ErrorPage from './page404/page404';

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
      page = new Main(idPage);
    }

    if (page) {
      const pageHTML: HTMLElement = page.render();
      pageHTML.className = this.defaultPageID;
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
