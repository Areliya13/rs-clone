import { getInitials } from '../../helpers/functions';
import { createHtmlElement } from '../../helpers/other';
import { store } from '../../store/store';
import { IItem } from '../../store/types';

export class BoardContent {
  chosenBoard = store.user.workSpace[0].boards[0];
  renderContent(): HTMLDivElement {
    const currentBoard = store.user.workSpace[0];
    console.log(currentBoard);
    const container = createHtmlElement('div', {
      className: 'board-content',
    });
    const boardMenu = createHtmlElement('div', { className: 'board-header-menu' });
    const boardMenuLeft = createHtmlElement('div', { className: 'board-header-menu-left' });
    const boardMenuRight = createHtmlElement('div', { className: 'board-header-menu-right' });
    const boardName = createHtmlElement('input', { className: 'header-input-text', value: this.chosenBoard.title });
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
    this.renderLists(workSpace);
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

  renderLists(container: HTMLDivElement): void {
    for (let i = 0; i < this.chosenBoard.lists.length; i++) {
      const list = this.chosenBoard.lists[i];
      const listSpace = createHtmlElement('div', { className: 'list' });
      const listName = createHtmlElement('h3', { textContent: list.title });
      listSpace.append(listName);
      this.renderTasks(listSpace, list.items);
      container.append(listSpace);
    }
  }

  renderTasks(container: HTMLDivElement, tasks: IItem[]): void {
    for (let i = 0; i < tasks.length; i++) {
      const item = tasks[i];
      item.deadline;
      item.userId;
      const itemSpace = createHtmlElement('div', { className: 'item' });
      if (item.image) {
        const itemImage = createHtmlElement('img', { src: item.image, className: 'item-image' });
        itemSpace.append(itemImage);
      }
      const markContainer = createHtmlElement('div', { className: 'mark-container' });
      for (let j = 0; j < item.marks.length; j++) {
        const mark = item.marks[j];
        const markDiv = createHtmlElement('div', { className: 'mark' });
        markDiv.style.backgroundColor = mark.color;
        markContainer.append(markDiv);
      }
      const itemName = createHtmlElement('h4', { textContent: item.title });
      const footerItem = createHtmlElement('div', { className: 'footer-item' });
      const footerLeft = createHtmlElement('div', { className: 'footer-half' });
      let count = 0;
      let completed = 0;
      for (let k = 0; k < item.checkLists.length; k++) {
        count += item.checkLists[k].items.length;
        completed += item.checkLists[k].items.filter((val) => val.done === true).length;
      }
      if (count !== 0) {
        const check = createHtmlElement('p', { className: 'footer-checklist', textContent: `${completed}/${count}` });
        footerLeft.append(check);
      }
      if (item.deadline) {
        const text = item.deadline.toString();
        const date = createHtmlElement('p', { className: 'footer-deadline', textContent: text });
        footerLeft.append(date);
      }
      const footerRight = createHtmlElement('div', { className: 'footer-half' });
      for (let k = 0; k < item.userId.length; k++) {
        const user = item.userId[k];
        const userInitials = getInitials(user.name);
        const userDiv = createHtmlElement('div', { className: 'user', textContent: userInitials });
        footerRight.append(userDiv);
      }
      footerItem.append(footerLeft, footerRight);
      itemSpace.append(markContainer, itemName, footerItem);
      container.append(itemSpace);
    }
  }
}
