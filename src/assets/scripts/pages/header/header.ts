import { createHtmlElement } from '../../helpers/other';
import { menuItems } from '../../types/constValues';
import { BoardList } from '../../components/BoardList/BoardList';
import { store } from '../../store/store';
import observer from '../../store/observer';
import { EventName, IBoard, IPartialUser, IStore } from '../../store/types';

export class Header {
  header: HTMLDivElement | undefined
  constructor() {
  }
  render(): HTMLDivElement {
    const container = createHtmlElement('div', {
      className: 'header-container',
    });
    this.header = container;
    container.append(this.leftMenu(), this.rightMenu());
    this.subscribe();
    return container;
  }

  leftMenu(): HTMLDivElement {
    const container = createHtmlElement('div', {
      className: 'left-container',
    });
    const menuButton = createHtmlElement('button', { className: 'menu-bar' });
    const innerImg = createHtmlElement('span', { className: 'menu-image' });
    const logoLink = createHtmlElement('a', { href: '#' });
    const logo = createHtmlElement('div', { className: 'logo' });
    const navigation = this.createNav();
    const createButton = createHtmlElement('button', { className: 'create-button', textContent: 'Создать' });
    menuButton.append(innerImg);
    logoLink.append(logo);
    container.append(menuButton, logoLink, navigation, createButton);
    return container;
  }

  createNav(): HTMLElement {
    const nav = createHtmlElement('nav', { className: 'nav-list' });
    for (let i = 0; i < menuItems.length; i++) {
      const element = menuItems[i];
      const link = createHtmlElement('a', { href: element[1], className: 'nav-link' });
      const item = createHtmlElement('li', { textContent: element[0], className: 'nav-item' });
      const span = createHtmlElement('span', { className: 'nav-img' });

      link.append(item, span);
      nav.append(link);

      // todo: Модалка избранные доски в хедере.
      if(element[0] === menuItems[2][0]) {
        const modalFavorites = createHtmlElement('div', {className: 'modalFavoritesDropdown'});
        let boards: IBoard[] = store.user.favoriteBoards
        if (!boards || boards.length === 0) {
          modalFavorites.append(createHtmlElement('div', {textContent: 'Нет избранных досок'}));
        } else {
          modalFavorites.replaceChildren();
          const list = new BoardList(boards).getList();
          modalFavorites.append(list);
        }
        link.append(modalFavorites)

        link.addEventListener('click', (event) => {
          event.preventDefault();
          link.classList.toggle('favorite-active');
          modalFavorites.classList.toggle('modal-active');
        })
      }
    }
    return nav;
  }

  rightMenu(): HTMLDivElement {
    const container = createHtmlElement('div', {
      className: 'right-container',
    });

    const search = createHtmlElement('div', { className: 'search-container' });
    const searchIcon = createHtmlElement('span', { className: 'search-icon' });
    const input = createHtmlElement('input', { className: 'search-input', placeholder: 'Поиск', type: 'text' });
    const bellIcon = createHtmlElement('button', { className: 'header-icon' });
    const bellIconImg = createHtmlElement('span', { className: 'bellIcon' });
    const infoIcon = createHtmlElement('button', { className: 'header-icon' });
    const infoIconImg = createHtmlElement('span', { className: 'infoIcon' });
    const userIcon = createHtmlElement('button', { className: 'header-icon' });
    const userIconText = createHtmlElement('span', { className: 'userIcon', textContent: 'AA' }); //to-do add user initials
    bellIcon.append(bellIconImg);
    infoIcon.append(infoIconImg);
    userIcon.append(userIconText);
    search.append(searchIcon, input);
    container.append(search, bellIcon, infoIcon, userIcon);
    return container;
  }

  subscribe(): void {
    observer.subscribe({eventName: EventName.updateState, function: this.update.bind(this)})
  }

  update(): void {  
    if (this.header) {
      this.header.innerHTML = ''
      this.header.append(this.leftMenu(), this.rightMenu());
    }
  }
}
