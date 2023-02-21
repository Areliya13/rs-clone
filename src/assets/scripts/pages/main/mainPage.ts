import { createHtmlElement, getSvgIcon } from '../../helpers/other';
import clockIcon from '../../../images/clock-icon.svg';
import heartIcon from '../../../images/heart-icon.svg';
import { BASE_COLOR } from '../../types/constValues';
import Page from '../../core/page';
import observer from '../../store/observer';
import { EventName, IPartialUser } from '../../store/types';
import { BoardList } from '../../components/BoardList/BoardList';
import { store } from '../../store/store';

export class MainPage extends Page {
  constructor(id: string) {
    super(id);
    this.subscribe();
  }

  renderContent() {
    const midContentContainer = createHtmlElement('article', {
      className: 'midContent',
    });
    const midAttentionDiv = createHtmlElement('section', {
      className: 'sectionTitle',
    });
    const attentionSpan = createHtmlElement('span', {
      className: 'mid-attentionText',
      textContent: 'Требуют внимания',
    });
    const midImportantEvents = createHtmlElement('section', {
      className: 'sectionTitle',
    });
    const importantEventsSpan = createHtmlElement('span', {
      className: 'mid-importantEventText',
      textContent: 'Важные события',
    });

    midAttentionDiv.append(getSvgIcon(clockIcon, BASE_COLOR), attentionSpan);
    midImportantEvents.append(getSvgIcon(heartIcon, BASE_COLOR), importantEventsSpan);
    midContentContainer.append(midAttentionDiv, midImportantEvents);
    return midContentContainer;
  }

  renderRightSideBar() {
    const rightSidebarContainer = createHtmlElement('div', {
      className: 'right-sidebar',
    });
    const recentlyViewed = createHtmlElement('section', {
      className: 'sectionTitle recentlyViewed',
    });
    const recentlyViewedSpan = createHtmlElement('span', {
      className: 'right-recently-text',
      textContent: 'В избранном',
    });
    
    const rightBoardFavoriteList = createHtmlElement('div', {
      className: 'right-list-title-wrapper',
    });

    const linksSection = createHtmlElement('section', {
      className: 'sectionLink',
    });
    const linksText = createHtmlElement('span', {
      className: 'right-linksText',
      textContent: 'Ссылки',
    });
    const createBoardDiv = createHtmlElement('div', {
      className: 'right-linksButtonDiv',
    });
    const buttonCreateBoard = createHtmlElement('button', {
      className: 'right-linksButton',
      innerHTML: `
    <span class="buttonPlus">+</span>
    <span class="buttonText">Создать доску</span>
    `,
    });

    createBoardDiv.append(buttonCreateBoard);
    rightBoardFavoriteList.append(getSvgIcon(clockIcon, BASE_COLOR), recentlyViewedSpan)
    recentlyViewed
    recentlyViewed.append(rightBoardFavoriteList);

    let boards = store.user.favoriteBoards
    if (!boards) boards = []
    const list = new BoardList(boards).getList()
    recentlyViewed.append(list)

    linksSection.append(linksText, createBoardDiv);
    rightSidebarContainer.append(recentlyViewed, linksSection);

    return rightSidebarContainer;
  }

  render(): HTMLDivElement {
    this.container.append(this.renderContent(), this.renderRightSideBar());
    return this.container;
  }

  subscribe(): void {
    observer.subscribe({eventName: EventName.updateState, function: this.renderFavoriteList.bind(this)})
  }

  renderFavoriteList(store: IPartialUser) {
    console.log('запустилась функция на оповещение наблюдателя')
    const section = document.querySelector('.sectionTitle.recentlyViewed')
    const oldUl = section.querySelector('.right-list-ul')
    oldUl?.remove()
    
    if (!section) return
    const boards = store.favoriteBoards
    const list = new BoardList(boards).getList()
    section.append(list)
  }

}
