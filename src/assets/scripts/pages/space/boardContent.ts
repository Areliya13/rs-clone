import { createHtmlElement } from '../../helpers/other';

export class BoardContent {
  renderContent(): HTMLDivElement {
    const container = createHtmlElement('div', {
      className: 'board-content',
    });
    const boardMenu = createHtmlElement('div', { className: 'board-header-menu' });
    const boardMenuLeft = createHtmlElement('div', { className: 'board-header-menu-left' });
    const boardMenuRight = createHtmlElement('div', { className: 'board-header-menu-right' });
    const boardName = createHtmlElement('input', { className: 'header-input-text', value: 'First board' });
    const favoriteButton = createHtmlElement('button', { className: 'header-option-button' });
    const favoriteImg = createHtmlElement('span', { className: 'header-option-icon favorite-img' });
    const autoButton = createHtmlElement('button', { className: 'header-option-button' });
    const autoImg = createHtmlElement('span', { className: 'header-option-icon light-img' });
    const autoText = createHtmlElement('span', { textContent: 'Автоматизация' });
    const filterButton = createHtmlElement('button', { className: 'header-option-button' });
    const filterImg = createHtmlElement('span', { className: 'header-option-icon filter-img' });
    const filterText = createHtmlElement('span', { textContent: 'Фильтр' });
    const shareButton = createHtmlElement('button', { className: 'header-option-button' });
    const shareImg = createHtmlElement('span', { className: 'header-option-icon share-img' });
    const shareText = createHtmlElement('span', { textContent: 'Поделиться' });
    const settingsButton = createHtmlElement('button', { className: 'header-option-button' });
    const settingsImg = createHtmlElement('span', { className: 'header-option-icon board-option-settings' });
    const workSpace = createHtmlElement('div', { className: 'board-workspace' });
    const createButton = createHtmlElement('button', { className: 'header-option-button list-item' });
    const createImg = createHtmlElement('span', { className: 'header-option-icon plus-img' });
    const createText = createHtmlElement('span', { textContent: 'Добавьте еще одну колонку' });
    favoriteButton.append(favoriteImg);
    autoButton.append(autoImg, autoText);
    filterButton.append(filterImg, filterText);
    createButton.append(createImg, createText);
    shareButton.append(shareImg, shareText);
    settingsButton.append(settingsImg);
    boardMenuLeft.append(boardName, favoriteButton);
    boardMenuRight.append(autoButton, filterButton, shareButton, settingsButton);
    boardMenu.append(boardMenuLeft, boardMenuRight);
    workSpace.append(createButton);
    container.append(boardMenu, workSpace);
    return container;
  }
}
