import { createHtmlElement } from '../../helpers/other';
import { PageIds, spaceMenuOptions, spaceMode } from '../../types/enum';
import { store } from '../../store/store';
import { IBoard, IReadUser, IWork } from '../../store/types';
import { getAddress } from '../../helpers/functions';
import { readAll } from '../../api/rest/readAll';
import { Path } from '../../api/types';
import { updateOne } from '../../api/rest/updateOne';
import { createUserPutData } from '../../api/rest/utils/createPutData';
import { updateStore } from '../../store/updateStore';

class SpaceMenu {
  workspace = store.user.workSpace[0]; // to-do get info from path
  boards: IBoard[];
  renderLeftSide(workSpace: IWork, board: IBoard): HTMLElement {
    this.workspace = workSpace;
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

    boardsLink.append(boardsImg, boardsText);
    usersLink.append(usersImg, usersText, usersButton);
    settingsLink.append(settingsImg, settingsText, settingsButton);
    container.append(boardsLink, usersLink, settingsLink);
  }

  renderBoards(container: HTMLDivElement, chosenBoard: IBoard): void {
    console.log('Render Boards!!');
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
        className: this.findFavorite(board._id) ? 'right-item-favoriteButton icon-img' : 'icon-img favorite-img',
      });

      favorite.addEventListener('click', (e) => {
        this.toggleFavorite(e, board);
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

  private findFavorite(id: string) {
    const favoriteBoards = store.user.favoriteBoards;
    const board = favoriteBoards.find((board) => board._id === id);
    if (!board) return false;
    return true;
  }

  private async toggleFavorite(e: Event, chosenBoard: IBoard) {
    e.stopPropagation();
    if (!(e.currentTarget instanceof HTMLDivElement)) return;
    const boardId = chosenBoard._id;
    const isFavorite = store.user.favoriteBoards.find((board) => board._id === boardId);
    const users: IReadUser[] = await readAll(Path.user, '');
    if (!users) return;
    const user = users.find((user) => user._id === store.user._id);
    if (!user) return;
    const favoriteArr = user.favoriteBoards;
    if (isFavorite) {
      const newFavoriteArr = favoriteArr.filter((id) => id !== boardId);
      await updateOne(Path.user, store.user._id, createUserPutData({ favoriteBoards: JSON.stringify(newFavoriteArr) }));
    } else {
      const newFavoriteArr = [...favoriteArr];
      newFavoriteArr.push(boardId);
      await updateOne(Path.user, store.user._id, createUserPutData({ favoriteBoards: JSON.stringify(newFavoriteArr) }));
    }
    await updateStore();
    console.log('Обновляю стор!');
  }
}

export default SpaceMenu;
