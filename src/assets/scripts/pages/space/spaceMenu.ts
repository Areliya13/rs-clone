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
    const space = createHtmlElement('div', { className: 'space-info' });
    this.renderSpace(space);
    const wrapper = createHtmlElement('div', { className: 'left-space-wrapper' });
    const menu = createHtmlElement('div', { className: 'left-space-menu' });
    this.renderMenu(menu);
    const boards = createHtmlElement('div');
    this.renderBoards(boards);
    wrapper.append(menu, boards);
    spaceMenuContainer.append(space, wrapper);
    return spaceMenuContainer;
  }

  renderSpace(container: HTMLDivElement): void {
    const spaceLink = createHtmlElement('a');
    const spaceText = createHtmlElement('div', { textContent: '1' }); //to-do first letter of space name
    const spaceInfo = createHtmlElement('div');
    const spaceName = createHtmlElement('h3', { textContent: '123' });
    const spaceDesc = createHtmlElement('p', { textContent: 'some info' });
    const buttonHideMenu = createHtmlElement('button', { className: 'button' });
    const imgHideMenu = createHtmlElement('img', { className: 'left-arrow' });

    spaceLink.append(spaceText);
    spaceInfo.append(spaceName, spaceDesc);
    buttonHideMenu.append(imgHideMenu);
    container.append(spaceLink, spaceInfo, buttonHideMenu);
  }

  renderMenu(container: HTMLDivElement): void {
    const boardsLink = createHtmlElement('a');
    const boardsImg = createHtmlElement('span');
    const boardsText = createHtmlElement('p', { textContent: spaceMenuOptions.boards });
    const usersLink = createHtmlElement('a');
    const usersImg = createHtmlElement('span');
    const usersText = createHtmlElement('p', { textContent: spaceMenuOptions.users });
    const usersButton = createHtmlElement('button');
    const settingsLink = createHtmlElement('a');
    const settingsImg = createHtmlElement('span');
    const settingsText = createHtmlElement('p', { textContent: spaceMenuOptions.settings });
    const settingsButton = createHtmlElement('button');

    boardsLink.append(boardsImg, boardsText);
    usersLink.append(usersImg, usersText, usersButton);
    settingsLink.append(settingsImg, settingsText, settingsButton);
    container.append(boardsLink, usersLink, settingsLink);
  }

  renderBoards(container: HTMLDivElement): void {
    for (let i = 0; i < this.boards.length; i++) {
      const board = this.boards[i];
      const li = createHtmlElement('li');
      const img = createHtmlElement('img', { src: board.img, className: 'board-img' });
      const link = createHtmlElement('a', { textContent: board.name });
      const actions = createHtmlElement('div');
      const settings = createHtmlElement('button');
      const favorite = createHtmlElement('button');
      actions.append(settings, favorite);
      li.append(img, link, actions);
      container.append(li);
    }
  }
}

export default SpaceMenu;
