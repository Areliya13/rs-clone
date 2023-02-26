import { createHtmlElement } from '../../helpers/other';
import { menuItems } from '../../types/constValues';
import { BoardList } from '../../components/BoardList/BoardList';
import { store } from '../../store/store';
import observer from '../../store/observer';
import { EventName, IBoard, IPartialUser, IStore, IWork } from '../../store/types';
import { getAllUserBoards } from '../../helpers/utils/getAllUserBoard';
import { ModalCreateBoard } from '../../components/ModalCreateBoard/ModalCreateBoard';

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

    createButton.addEventListener('click', (e) => this.handlerAddBoardClick(e))

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
        const favoriteBoards = store.user.favoriteBoards
        const modalFavorites = this.renderModalBoards(favoriteBoards)
        link.append(modalFavorites)

        link.addEventListener('click', (event) => this.handlerNavigationClick(event, link, modalFavorites))
      }
      if (element[0] === menuItems[1][0]) {
        const allBoards = getAllUserBoards(store.user)
        const modalAll = this.renderModalBoards(allBoards)
        link.append(modalAll)

        link.addEventListener('click', (event) => this.handlerNavigationClick(event, link, modalAll))
      }
      if (element[0] === menuItems[0][0]) {
        const allWorkSpaces = store.user.workSpace
        const modalWorkSpaces = this.renderModalWorkSpace(allWorkSpaces)
        link.append(modalWorkSpaces)
        link.addEventListener('click', (event) => this.handlerNavigationClick(event, link, modalWorkSpaces))
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

  renderModalBoards(boards: IBoard[]) {
    const modalFavorites = createHtmlElement('div', {className: 'modalFavoritesDropdown'});
    if (!boards || boards.length === 0) {
      modalFavorites.append(createHtmlElement('div', {textContent: 'Нет досок'}));
    } else {
      modalFavorites.replaceChildren();
      const list = new BoardList(boards).getList();
      modalFavorites.append(list);
    }
    return modalFavorites
  }

  handlerNavigationClick(event: Event, link: HTMLAnchorElement, modalFavorites: HTMLDivElement) {
    event.preventDefault();
    event.stopPropagation();
    if (!(event.currentTarget instanceof Element)) return
    const modalArea = event.currentTarget.querySelector('.modalFavoritesDropdown')
    if (event.target === modalArea) return
    const allLinks = document.querySelectorAll('.nav-link')
    let item = 0
    allLinks.forEach((lk, i) => {
      if (lk !== event.currentTarget) {
        lk.classList.remove('favorite-active')
      } else {
        item = i
      }
    })
    const allModals = document.querySelectorAll('.modalFavoritesDropdown')
    allModals.forEach((modal, i) => {
      if (i !== item) {
        modal.classList.remove('modal-active')
      }
    })
    
    link.classList.toggle('favorite-active');
    modalFavorites.classList.toggle('modal-active');
  }

  renderModalWorkSpace(workspaces: IWork[]) {
    const modalFavorites = createHtmlElement('div', {className: 'modalFavoritesDropdown workspacesDiv'});
    if (!workspaces || workspaces.length === 0) {
      modalFavorites.append(createHtmlElement('div', {textContent: 'Нет рабочих пространств'}));
    } else {
      modalFavorites.replaceChildren();
      const list = this.createWorkSpaceList(workspaces)

      modalFavorites.append(...list);
    }
    return modalFavorites
  }

  createWorkSpaceList(workspaces: IWork[]) {
    const newArr: HTMLDivElement[] = []
    workspaces.forEach(ws => {
        const workspace = createHtmlElement('div', {className: 'workspace'});
        const workspaceHeader = createHtmlElement('a', {className: 'workspaceHeader', href: `#home?ws=${ws._id}`});
        const workspaceName = createHtmlElement('span', {className: 'workspaceName', textContent: `${ws.title}`})
        const workspaceIcon = createHtmlElement('div', {className: 'workspaceIcon', textContent: `${workspaceName.textContent[0].toUpperCase()}`});
        workspaceHeader.append(workspaceIcon, workspaceName);
        workspace.append(workspaceHeader); 
        workspace.addEventListener('click', (e) => {
          location.hash = `#home?ws=${ws._id}`
        })
        newArr.push(workspace)
      })
      return newArr
  }

  handlerAddBoardClick(e: MouseEvent) {
    if (!(e.currentTarget instanceof HTMLButtonElement)) return
    const modal = document.querySelector('.createBoardModal')
    if (modal) {
      modal.remove();
    }
    
    const newModal = new ModalCreateBoard().getModal()
    
    document.body.querySelector('main').append(newModal)
  } 
}
