import { createHtmlElement, getSvgIcon } from '../../helpers/other';
import clockIcon from '../../../images/clock-icon.svg';
import heartIcon from '../../../images/heart-icon.svg';
import star from '../../../images/star.inl.svg';
import { BASE_COLOR } from '../../types/constValues';
import Page from '../../core/page';
import observer from '../../store/observer';
import { EventName, IBoard, IPartialUser } from '../../store/types';
import { BoardList } from '../../components/BoardList/BoardList';
import { store } from '../../store/store';
import { getAllUserBoards } from '../../helpers/utils/getAllUserBoard';

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

    const recentlyBoardViewed = createHtmlElement('section', {
      className: 'sectionTitle recentlyViewed recently',
    });
    
    const rightBoardRecentlyList = createHtmlElement('div', {
      className: 'right-list-title-wrapper',
    });

    const icon = createHtmlElement('div', {
      className: 'right-list-star',
      innerHTML: star,
    })

    const recentlySpan = createHtmlElement('span', {
      className: 'right-recently-text',
      textContent: 'Недавно просмотренное',
    });
    rightBoardRecentlyList.append(icon, recentlySpan)
    recentlyBoardViewed.append(rightBoardRecentlyList)

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
    recentlyViewed.append(rightBoardFavoriteList);

    let favoriteBoards = store.user.favoriteBoards
    if (!favoriteBoards) favoriteBoards = []
    const list = new BoardList(favoriteBoards).getList()
    recentlyViewed.append(list)

    let boards:IBoard[] = getAllUserBoards(store.user)
    if (!boards) boards = []
    const recentlyList = new BoardList(boards).getList()
    recentlyBoardViewed.append(recentlyList)


    linksSection.append(linksText, createBoardDiv);
    rightSidebarContainer.append(recentlyViewed, recentlyBoardViewed,  linksSection);

    return rightSidebarContainer;
  }

  render(): HTMLDivElement {
    this.container.append(this.renderContent(), this.renderRightSideBar());
    return this.container;
  }

  subscribe(): void {
    observer.subscribe({eventName: EventName.updateState, function: this.renderList.bind(this)})
  }

  renderList(store: IPartialUser) {
    this.renderFavoriteList(store);
    this.renderRecentlyList(store);
  }

  renderFavoriteList(store: IPartialUser) {
    const section = document.querySelector('.sectionTitle.recentlyViewed')
    if (!section) return
    const oldUl = section.querySelector('.right-list-ul')
    oldUl?.remove()
    
    const boards = store.favoriteBoards
    const list = new BoardList(boards).getList()
    section.append(list)
  }

  renderRecentlyList(store: IPartialUser) {
    const section = document.querySelector('.sectionTitle.recentlyViewed.recently')
    if (!section) return
    const oldUl = section.querySelector('.right-list-ul')
    oldUl?.remove()

    const boards = getAllUserBoards(store);
    const list = new BoardList(boards).getList()
    section.append(list)
  }

}
