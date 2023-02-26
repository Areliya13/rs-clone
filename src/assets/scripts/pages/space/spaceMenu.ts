import { createHtmlElement } from '../../helpers/other';
import { PageIds, spaceMenuOptions, spaceMode } from '../../types/enum';
import { store } from '../../store/store';
import { EventName, IBoard, IPartialUser, IWork } from '../../store/types';
import { findFavorite, getAddress, toggleFavorite } from '../../helpers/functions';
import observer from '../../store/observer';
import { updateOne } from '../../api/rest/updateOne';
import { Path } from '../../api/types';
import { createBoardPutData, createUserPutData } from '../../api/rest/utils/createPutData';
import { updateStore } from '../../store/updateStore';
import { deleteOne } from '../../api/rest/deleteOne';

const imagesArr: string[] = [
  'https://live.staticflickr.com/65535/52682453673_e81dae0a3b_b.jpg',
  'https://live.staticflickr.com/65535/52681301262_609c1be2f4_b.jpg',
  'https://live.staticflickr.com/65535/52681300682_a935bf6cfb_b.jpg'];
const colorsArr: string[] = ['rgb(0, 121, 191)', 'rgb(137, 96, 158)', 'rgb(81, 152, 57)'];

class SpaceMenu {
  workspace: IWork | undefined = store.user?.workSpace?.[0] ; // to-do get info from path
  boards: IBoard[] = [];
  currentBoard: IBoard | undefined
  mainContainer: HTMLDivElement | undefined

  constructor() {
    this.subscribe();
  }

  renderLeftSide(workSpace: IWork, board: IBoard): HTMLElement {
    if (!board || !workSpace) {
      return
    }
    this.workspace = workSpace;
    this.boards = workSpace.boards;
    this.currentBoard = board;

    const spaceMenuContainer = createHtmlElement('aside', {
      className: 'space-menu',
    });

    const space = createHtmlElement('div', { className: 'space-top-section' });
    this.renderSpace(space);
    const wrapper = createHtmlElement('div', { className: 'left-space-wrapper' });
    const menu = createHtmlElement('div', { className: 'left-space-menu' });
    this.renderMenu(menu);
    const boards = createHtmlElement('div', { className: 'boards-container' });
    const boardsHeader = createHtmlElement('div', { className: 'boards-header-container' });
    const boardsHeaderText = createHtmlElement('p', { className: 'space-boards-header', textContent: 'Мои доски' });
    const boardsPlus = createHtmlElement('span', { className: 'icon-img plus-img' });
    boardsHeader.append(boardsHeaderText, boardsPlus);
    boards.append(boardsHeader);
    this.renderBoards(boards, board);
    this.mainContainer = boards
    wrapper.append(menu, boards);
    spaceMenuContainer.append(space, wrapper);
    this.createSettingModal()
    return spaceMenuContainer;
  }

  renderSpace(container: HTMLDivElement): void {
    const spaceLink = createHtmlElement('a', { href: '#' });
    const spaceColor = createHtmlElement('div', { className: 'space-link' });
    const spaceText = createHtmlElement('div', { textContent: this.workspace.title.slice(0, 1) });
    const spaceInfo = createHtmlElement('div', { className: 'space-info' });
    const spaceName = createHtmlElement('p', { className: 'space-name', textContent: this.workspace.title });
    const buttonHideMenu = createHtmlElement('button', { className: 'button-hide-menu' });
    const imgHideMenu = createHtmlElement('img', { className: 'left-arrow' });

    spaceLink.append(spaceColor);
    spaceColor.append(spaceText);
    spaceInfo.append(spaceName);
    buttonHideMenu.append(imgHideMenu);
    container.append(spaceLink, spaceInfo, buttonHideMenu);
  }

  renderMenu(container: HTMLDivElement): void {
    const boardsLink = createHtmlElement('a', { className: 'space-option-link' });
    const boardsImg = createHtmlElement('span', { className: 'icon-img boards-img' });
    const boardsText = createHtmlElement('p', { className: 'space-option-text', textContent: spaceMenuOptions.boards });
    const usersLink = createHtmlElement('a', { className: 'space-option-link' });
    const usersImg = createHtmlElement('span', { className: 'icon-img users-img' });
    const usersText = createHtmlElement('p', { className: 'space-option-text', textContent: spaceMenuOptions.users });
    const usersButton = createHtmlElement('span', { className: 'icon-img plus-img' });
    const settingsLink = createHtmlElement('a', { className: 'space-option-link' });
    const settingsImg = createHtmlElement('span', { className: 'icon-img gear-img' });
    const settingsText = createHtmlElement('p', {
      className: 'space-option-text',
      textContent: spaceMenuOptions.settings,
    });
    const settingsButton = createHtmlElement('span', { className: 'icon-img arrow-down' });

    settingsLink.addEventListener('click', (e) => this.openSettingModalClick(e))

    boardsLink.append(boardsImg, boardsText);
    usersLink.append(usersImg, usersText, usersButton);
    settingsLink.append(settingsImg, settingsText, settingsButton);
    container.append(boardsLink, usersLink, settingsLink);
  }

  renderBoards(container: HTMLDivElement, chosenBoard: IBoard): void {
    console.log('Render Boards!!');
    if (!chosenBoard) { console.log('а борд то пустой') }
    for (let i = 0; i < this.boards.length; i++) {

      const board = this.boards[i];
      const options = new Map(
        Object.entries({
          mode: spaceMode.board,
          workspaceID: this.workspace._id,
          boardID: board._id,
        })
      );
      const link = createHtmlElement('div');
      const li = createHtmlElement('li', { className: 'space-option-link board-item' });
      if (board._id === chosenBoard._id) {
        li.classList.add('chosen-board');
      }
      const img = board.image
        ? createHtmlElement('img', { src: board.image, className: 'board-img' })
        : createHtmlElement('div', { className: 'board-img' });
      if (!board.image && board.color) {
        img.style.backgroundColor = board.color;
      }
      const text = createHtmlElement('a', {
        className: 'board-option-text',
        textContent: board.title,
        href: getAddress(PageIds.SpacePage, options),
      });
      const actions = createHtmlElement('div', { className: 'board-action hidden' });
      const settings = createHtmlElement('div', { className: 'icon-img board-option-settings' });
      const favorite = createHtmlElement('div', {
        className: findFavorite(board._id) ? 'icon-img chosen-favorite-img' : 'icon-img favorite-img',
      });

      favorite.addEventListener('click', (e) => {
        toggleFavorite(e, board);
      });

      li.addEventListener('mouseover', () => {
        actions.classList.remove('hidden');
      });
      li.addEventListener('mouseleave', () => {
        actions.classList.add('hidden');
      });

      actions.append(settings, favorite);
      li.append(img, text, actions);
      link.append(li);
      container.append(link);
    }
  }

  subscribe(): void {
    observer.subscribe({ eventName: EventName.updateState, function: this.update.bind(this) });
  }

  update(user: IPartialUser) {
    this.renderBoards(this.mainContainer , this.currentBoard)
  }

  openSettingModalClick(e: MouseEvent) {
    if (!(e.currentTarget instanceof HTMLAnchorElement)) return

    const modal = document.querySelector('.board-modal-setting-wrapper')
    if (!modal) return

    modal.classList.toggle('active')
  }

  createSettingModal() {
    const modalWrapper = createHtmlElement('div', {className: 'board-modal-setting-wrapper'})
    const modal = createHtmlElement('div', {className: 'board-modal-setting'})

    const inputWrapper = createHtmlElement('div', {className: 'board-modal-setting-input-wrapper'})
    const input = createHtmlElement('input', {className: 'board-modal-setting-input', value: this.currentBoard.title})
    const buttonUpdate = createHtmlElement('button', {className: 'board-modal-setting-button--update', textContent: 'Изменить название'})
    const buttonDelete = createHtmlElement('button', {className: 'board-modal-setting-button--delete', textContent: 'Удалить доску'})

    buttonUpdate.addEventListener('click', async (e) => {
      const boardId = this.currentBoard._id
      const title = input.value 
      console.log(this.currentBoard._id )
      if (!boardId) return
      await updateOne(Path.board, boardId, createBoardPutData({title}) )
      await updateStore()
    })

    buttonDelete.addEventListener('click', async (e) => {
      const boardId = this.currentBoard._id
      console.log(this.currentBoard._id )
      if (!boardId) return
      const workSpace = this.workspace._id
      const newFavoriteBoard = store.user.favoriteBoards.filter(board => board._id !== boardId)
      const user = store.user._id

      await deleteOne(Path.board, boardId, workSpace)
      await updateOne(Path.user, user, createUserPutData({favoriteBoards: JSON.stringify(newFavoriteBoard)}))
      location.hash = '#'
      await updateStore()
      modalWrapper.classList.toggle('active')
    })

    inputWrapper.append(input, buttonUpdate)

    const imageWrapper = createHtmlElement('div', {className: 'board-modal-setting-image-wrapper'})
    const imageList = createHtmlElement('ul', {className: 'board-modal-setting-image'})
    const imageUpdate = createHtmlElement('button', {className: 'board-modal-setting-image-button', textContent: 'Изменить фоновое изображение'})

    imageUpdate.addEventListener('click', async (e) => {
      const chooseElement: HTMLImageElement = imageWrapper.querySelector('.board-modal-setting-image-img.choose')
      if (!chooseElement) return

      const image = chooseElement.src

      const id = this.currentBoard._id
      if (!id) return

      await updateOne(Path.board, id, createBoardPutData({image}))
      await updateStore()
    })

    imagesArr.forEach((img) => {
      const item = createHtmlElement('li', { className: 'board-modal-setting-image-item' })
      const image = createHtmlElement('img', { className: 'board-modal-setting-image-img', src: img })

      image.addEventListener('click', (e) => {
          if (!(e.currentTarget instanceof HTMLImageElement)) return
          const allImage = document.querySelectorAll('.board-modal-setting-image-img')
          allImage.forEach(img => {
            img.classList.remove('choose')
          })
          e.currentTarget.classList.add('choose')
      })

      item.append(image)
      imageList.append(item)
    })

    imageWrapper.append(imageList, imageUpdate)

    const colorWrapper = createHtmlElement('div', {className: 'board-modal-setting-color-wrapper'})
    const colorList = createHtmlElement('ul', {className: 'board-modal-setting-color'})
    const colorUpdate = createHtmlElement('button', {className: 'board-modal-setting-color-button', textContent: 'Изменить фоновый цвет'})

    colorUpdate.addEventListener('click', async (e) => {
      const chooseElement: HTMLLIElement = colorWrapper.querySelector('.board-modal-setting-color-item.choose')
      if (!chooseElement) return

      const color = chooseElement.style.backgroundColor

      console.log('id',  color)
      const id = this.currentBoard._id
      if (!id) return
      await updateOne(Path.board, id, createBoardPutData({color}))
      await updateStore()
    })

    colorsArr.forEach((color) => {
      const item = createHtmlElement('li', { className: 'board-modal-setting-color-item', style: `background-color: ${color}` })

      item.addEventListener('click', (e) => {
        if (!(e.currentTarget instanceof HTMLLIElement)) return
        const allItems = document.querySelectorAll('.board-modal-setting-color-item')
        allItems.forEach(item => {
          item.classList.remove('choose')
        })
        e.currentTarget.classList.add('choose')
      })

      colorList.append(item)
    })

    colorWrapper.append(colorList, colorUpdate)

    modal.append(inputWrapper,imageWrapper, colorWrapper, buttonDelete )
    modalWrapper.append(modal)

    modalWrapper.addEventListener('click', (e) => {
      if (e.target !== e.currentTarget) return
      if (!(e.currentTarget instanceof HTMLDivElement)) return

      modalWrapper.classList.toggle('active')
    })

    document.body.append(modalWrapper)
  }
}

export default SpaceMenu;
