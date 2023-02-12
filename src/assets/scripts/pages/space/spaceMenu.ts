import { createHtmlElement } from '../../helpers/other';
import { spaceMenuOptions } from '../../types/enum';
import { board } from '../../types/types';
import { imageLinks } from '../../types/background';

class SpaceMenu {
  boards: board[];
  renderLeftSide(): HTMLElement {
    this.boards = [{ name: 'First board', img: imageLinks[0] }];
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
    this.renderBoards(boards);
    wrapper.append(menu, boards);
    spaceMenuContainer.append(space, wrapper);
    return spaceMenuContainer;
  }

  renderSpace(container: HTMLDivElement): void {
    const spaceLink = createHtmlElement('a', { href: '#' });
    const spaceColor = createHtmlElement('div', { className: 'space-link' });
    const spaceText = createHtmlElement('div', { textContent: '1' }); //to-do first letter of space name
    const spaceInfo = createHtmlElement('div', { className: 'space-info' });
    const spaceName = createHtmlElement('p', { className: 'space-name', textContent: '123' });
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

  renderBoards(container: HTMLDivElement): void {
    for (let i = 0; i < this.boards.length; i++) {
      const board = this.boards[i];
      const li = createHtmlElement('li', { className: 'space-option-link board-item' });
      const img = createHtmlElement('img', { src: board.img, className: 'board-img' });
      const link = createHtmlElement('a', { className: 'board-option-text', textContent: board.name });
      const actions = createHtmlElement('div', { className: 'board-action hidden' });
      const settings = createHtmlElement('div', { className: 'icon-img board-option-settings' });
      const favorite = createHtmlElement('div', { className: 'icon-img board-option-favorite' });

      li.addEventListener('mouseover', () => {
        link.style.width = '140px';
        actions.classList.remove('hidden');
      });
      li.addEventListener('mouseleave', () => {
        link.style.width = '196px';
        actions.classList.add('hidden');
        // actions.style.width = '0px';
      });

      actions.append(settings, favorite);
      li.append(img, link, actions);
      container.append(li);
    }
  }
}

export default SpaceMenu;