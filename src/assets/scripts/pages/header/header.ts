import { createHtmlElement } from '../../helpers/other';
import { menuItems } from '../../types/constValues';
import { BoardList } from '../../components/BoardList/BoardList';
import { store } from '../../store/store';
import observer from '../../store/observer';
import { EventName, IBoard, IPartialUser, IStore, IWork } from '../../store/types';
import { getAllUserBoards } from '../../helpers/utils/getAllUserBoard';
import trelloIcon from '../../../images/boards.inl.svg';
import membersIcon from '../../../images/members.inl.svg';
import modalImage from '../../../images/modal-image.inl.svg';
import closeButton from '../../../images/modal-close.inl.svg';
import { ModalCreateBoard } from '../../components/ModalCreateBoard/ModalCreateBoard';
import { createOne } from '../../api/rest/createOne';
import { updateStore } from '../../store/updateStore';
import { Path } from '../../api/types';
import { createWorkSpacePostData } from '../../api/rest/utils/createPostData';

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
    const createButtonContainer = createHtmlElement('div', {className: 'create-button-container'});
    const createButton = createHtmlElement('button', { className: 'create-button', textContent: 'Создать' });

    // createButton.addEventListener('click', (e) => this.handlerAddBoardClick(e))

    createButtonContainer.append(createButton)
    menuButton.append(innerImg);
    logoLink.append(logo);
    container.append(menuButton, logoLink, navigation, createButtonContainer);

    const createModalContainer = createHtmlElement('div', {className: 'createModalContainer'});
    const createButtonsContainer = createHtmlElement('div', {className: 'createButtonsContainer'})
    const createBoardButton = createHtmlElement('button', {className: 'modalCreateButton createBoardButton'});
    const createBoardButtonHead = createHtmlElement('div', {className: 'modalCreateBoardHead createBoardButtonHead'});
    const createBoardButtonHeadSvg = createHtmlElement('div', {className: 'modalCreateBoardHeadSvg createBoardButtonHeadSvg', innerHTML: trelloIcon});
    const createBoardButtonHeadName = createHtmlElement('span', {className: 'modalCreateBoardName createBoardButtonHeadText', textContent: 'Создайте доску'});
    const createBoardButtonDescription = createHtmlElement('p', {className: 'modalCreateBoardDescription createBoardButtonDescription', textContent: 'Доска представляет собой совокупность карточек, упорядоченных в списках. Используйте её для управления проектом, отслеживания или организации чего угодно.'});
    const createWorkspaceButton = createHtmlElement('button', {className: 'modalCreateButton createWorkspaceButton'});
    const createWorkspaceButtonHead = createHtmlElement('div', {className: 'modalCreateBoardHead createWorkspaceButtonHead'});
    const createWorkspaceButtonHeadSvg = createHtmlElement('div', {className: 'modalCreateBoardHeadSvg createWorkspaceButtonHeadSvg', innerHTML: membersIcon});
    const createWorkspaceButtonHeadName = createHtmlElement('span', {className: 'modalCreateBoardName createWorkspaceButtonHeadText', textContent: 'Создайте рабочее пространство'});
    const createWorkspaceButtonDescription = createHtmlElement('p', {className: 'modalCreateBoardDescription createWorkspaceButtonDescription', textContent: 'Рабочее пространство представляет собой группу досок и людей. Оно поможет организовать работу в компании, внештатную работу, семейные дела или отдых с друзьями.'});
    createWorkspaceButton.addEventListener('click', (e) => this.handlerAddWorkSpaceClick(e))
    createBoardButton.addEventListener('click', (e) => this.handlerAddBoardClick(e))
    this.createWorkSpaceModal(createWorkspaceButton)

    createWorkspaceButtonHead.append(createWorkspaceButtonHeadSvg, createWorkspaceButtonHeadName);
    createWorkspaceButton.append(createWorkspaceButtonHead, createWorkspaceButtonDescription);
    createBoardButtonHead.append(createBoardButtonHeadSvg, createBoardButtonHeadName);
    createBoardButton.append(createBoardButtonHead, createBoardButtonDescription);
    createButtonsContainer.append(createBoardButton, createWorkspaceButton);
    createModalContainer.append(createButtonsContainer);
    createButtonContainer.append(createModalContainer);

    createButton.addEventListener('click', () => {
      createButton.classList.toggle('create-button-active')
      createModalContainer.classList.toggle('modal-active');
    })


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

    const modalC = document.querySelector('.createModalContainer.modal-active')
    modalC.classList.toggle('modal-active')
    
    const newModal = new ModalCreateBoard().getModal()
    
    document.body.querySelector('main').append(newModal)
  } 

  createWorkSpaceModal(button: HTMLElement) {
    const workspaceModalContainer = createHtmlElement('div', { className: 'workspaceModalContainer' });
    const workspaceModal = createHtmlElement('div', { className: 'workspaceModal' });
    const leftSideModalDiv = createHtmlElement('div', { className: 'modal-leftSide' });
    const rightSideModalDiv = createHtmlElement('div', { className: 'modal-rightSide' });
    const form = createHtmlElement('form', {
      className: 'modal-form',
      innerHTML: `
    <span class="form-head">Создайте рабочее пространство</span>
    <span class="form-text">Повысьте производительность: участники команды смогут получать удобный доступ ко всем доскам.</span>
    `,
    });
    form.addEventListener('submit', (e) => this.handlerFormSubmit(e))
    const labelWorkspace = createHtmlElement('label', {
      className: 'modalHead workspaceLabel',
      for: 'workspaceInput',
      textContent: 'Название рабочего пространства',
    });
    const inputWorkspace = createHtmlElement('input', {
      id: 'workspaceInput',
      type: 'text',
      maxLength: '100',
      placeholder: 'Компания «Тако»',
      required: true,
      name: 'workSpaceName',
    });
    inputWorkspace.addEventListener('input', (e: InputEvent) => this.handlerWorkSpaceInput(e))

    const spanWorkspaceHelp = createHtmlElement('span', {
      className: 'workspaceHelp',
      textContent: 'Укажите название вашей команды, компании или организации.',
    });
    const headChooseActivity = createHtmlElement('span', {
      className: 'modalHead activityHead',
      textContent: 'Тип рабочего пространства',
    });
    const selectChooseActivity = createHtmlElement('select', { className: 'activitySelect', required: true });
    const selectArray = [
      'Выбрать...',
      'Продажи CRM',
      'Образование',
      'Инженерия/ИТ',
      'Операции',
      'Управление персоналом',
      'Малый бизнес',
      'Маркетинг',
      'Другое',
    ];
    for (let i = 0; i < selectArray.length; i++) {
      const selectOption = createHtmlElement('option', { textContent: selectArray[i] });
      if (i === 0) {
        selectOption.selected = true;
        selectOption.disabled = true;
      }
      selectChooseActivity.append(selectOption);
    }
    const headDescription = createHtmlElement('span', {
      className: 'modalHead descriptionHead',
      innerHTML: `
    Описание рабочего пространства
    <span class="descriptionHead-additional">Необязательно</span>
    `,
    });
    const textareaDescription = createHtmlElement('textarea', {
      className: 'descriptionTextarea',
      placeholder: 'Здесь наша команда хранит всю нужную информацию',
      rows: '6',
    });
    const spanDescriptionHelp = createHtmlElement('span', {
      className: 'descriptionHelp',
      textContent: 'Расскажите участникам немного о рабочем пространстве.',
    });
    const buttonContinue = createHtmlElement('button', {
      className: 'form-continue',
      type: 'submit',
      disabled: true,
      textContent: 'Продолжить',
    });

    form.append(
      labelWorkspace,
      inputWorkspace,
      spanWorkspaceHelp,
      headChooseActivity,
      selectChooseActivity,
      headDescription,
      textareaDescription,
      spanDescriptionHelp,
      buttonContinue
    );
    leftSideModalDiv.append(form);

    const svgModalImage = createHtmlElement('div', { innerHTML: modalImage });
    rightSideModalDiv.append(svgModalImage);

    const closeModalButton = createHtmlElement('button', { className: 'modal-close', innerHTML: closeButton });

    workspaceModal.append(leftSideModalDiv, rightSideModalDiv, closeModalButton);
    workspaceModalContainer.append(workspaceModal);

    button.addEventListener('click', () => {
      document.body.append(workspaceModalContainer);
    });

    workspaceModalContainer.addEventListener('click', (event) => {
      if (event.target === workspaceModalContainer) {
        workspaceModalContainer.remove();
      }
    });

    closeModalButton.addEventListener('click', () => {
      workspaceModalContainer.remove();
    });
  }

  handlerAddWorkSpaceClick(e: MouseEvent) {
    if (!(e.currentTarget instanceof HTMLButtonElement)) return

    const modalC = document.querySelector('.createModalContainer.modal-active')
    modalC.classList.toggle('modal-active')

    
  }

  private async handlerFormSubmit(e: SubmitEvent) {
    e.preventDefault()
    if (!(e.target instanceof HTMLFormElement) ) return
    const form = new FormData(e.target)
    const workSpaceName = form.get('workSpaceName')

    if (!workSpaceName.toString().trim()) return
    
    await createOne(Path.workSpace, createWorkSpacePostData(workSpaceName.toString(), store.user._id))
    await updateStore()
    
    const inputWorkspace: HTMLInputElement = e.target.querySelector('#workspaceInput')
    const textAreaWorkspace: HTMLInputElement = e.target.querySelector('.descriptionTextarea')
    const button: HTMLInputElement = e.target.querySelector('.form-continue')
    const workspaceModalContainer = document.querySelector('.workspaceModalContainer')
    inputWorkspace.value = ''
    textAreaWorkspace.value = ''
    button.disabled = true
    workspaceModalContainer.remove()
  }

  private handlerWorkSpaceInput(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) return
    const target = e.target
    const value = target.value
    const submitButton:HTMLButtonElement = document.querySelector('button.form-continue')
    if (value.trim().length) {
      if (submitButton) {
        submitButton.disabled = false
      }
    } else {
      if (submitButton) {
        submitButton.disabled = true
      }
    }
  }

}
