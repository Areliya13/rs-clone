import { createHtmlElement } from '../../helpers/other';
import { PageIds, spaceMenuOptions, spaceMode } from '../../types/enum';
import { store } from '../../store/store';
import { IBoard, IWork } from '../../store/types';
import { getAddress } from '../../helpers/functions';

class SpaceMenu {
  workspace = store.user.workSpace[0]; // to-do get info from path
  // options = getOptions(window.)
  boards: IBoard[];
  renderLeftSide(workSpace: IWork, board: IBoard): HTMLElement {
    // this.workspace = workSpace;
    this.boards = this.workspace.boards;
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
    wrapper.append(menu, boards);
    spaceMenuContainer.append(space, wrapper);
    return spaceMenuContainer;
  }

  renderSpace(container: HTMLDivElement): void {
    const spaceLink = createHtmlElement('a', { href: '#' });
    const spaceColor = createHtmlElement('div', { className: 'space-link' });
    const spaceText = createHtmlElement('div', { textContent: this.workspace.title.slice(0, 1) });
    const spaceInfo = createHtmlElement('div', { className: 'space-info' });
    const spaceName = createHtmlElement('p', { className: 'space-name', textContent: this.workspace.title });
    const spaceDesc = createHtmlElement('p', { textContent: 'some info' });
    const buttonHideMenu = createHtmlElement('button', { className: 'button-hide-menu' });
    const imgHideMenu = createHtmlElement('img', { className: 'left-arrow' });

    spaceLink.append(spaceColor);
    spaceColor.append(spaceText);
    spaceInfo.append(spaceName, spaceDesc);
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

    boardsLink.append(boardsImg, boardsText);
    usersLink.append(usersImg, usersText, usersButton);
    settingsLink.append(settingsImg, settingsText, settingsButton);
    container.append(boardsLink, usersLink, settingsLink);
  }

  renderBoards(container: HTMLDivElement, chosenBoard: IBoard): void {
    for (let i = 0; i < this.boards.length; i++) {
      const board = this.boards[i];
      const options = new Map(
        Object.entries({
          mode: spaceMode.board,
          workspaceID: this.workspace._id,
          boardID: board._id,
        })
      );
      const link = createHtmlElement('a', { href: getAddress(PageIds.SpacePage, options) });
      const li = createHtmlElement('li', { className: 'space-option-link board-item' });
      // if (board._id === chosenBoard._id) {
      //   li.classList.add('chosen-board');
      // }
      const img = board.image
        ? createHtmlElement('img', { src: board.image, className: 'board-img' })
        : createHtmlElement('div', { className: 'board-img' });
      if (!board.image && board.color) {
        img.style.backgroundColor = board.color;
      }
      const text = createHtmlElement('a', { className: 'board-option-text', textContent: board.title });
      const actions = createHtmlElement('div', { className: 'board-action hidden' });
      const settings = createHtmlElement('div', { className: 'icon-img board-option-settings' });
      const favorite = createHtmlElement('div', { className: 'icon-img favorite-img' });

      li.addEventListener('mouseover', () => {
        text.style.width = '140px';
        actions.classList.remove('hidden');
      });
      li.addEventListener('mouseleave', () => {
        text.style.width = '196px';
        actions.classList.add('hidden');
      });

      actions.append(settings, favorite);
      li.append(img, text, actions);
      link.append(li);
      container.append(link);
    }
  }
}

export default SpaceMenu;
