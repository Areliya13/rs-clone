import { createHtmlElement } from '../../helpers/other';

export class BoardContent {
  renderContent(): HTMLDivElement {
    const container = createHtmlElement('div', {
      className: 'board-content',
    });
    const boardMenu = createHtmlElement('div');
    const boardName = createHtmlElement('input');
    const favoriteButton = createHtmlElement('button');
    const autoButton = createHtmlElement('button');
    const filterButton = createHtmlElement('button');
    const userIcon = createHtmlElement('div');
    const shareButton = createHtmlElement('button');
    const settingsButton = createHtmlElement('button');
    const workSpace = createHtmlElement('div');
    const listWrapper = createHtmlElement('div');
    const listHeader = createHtmlElement('div');
    const listCards = createHtmlElement('div');
    const createCardButton = createHtmlElement('button');
    const createList = createHtmlElement('div');
    const createListContainer = createHtmlElement('div', { textContent: 'Добавьте еще одну колонку' });
    boardMenu.append(boardName, favoriteButton, autoButton, filterButton, userIcon, shareButton, settingsButton);
    listWrapper.append(listHeader, listCards, createCardButton);
    createList.append(createListContainer);
    workSpace.append(listWrapper, createList);
    container.append(boardMenu, workSpace);
    return container;
  }
}
