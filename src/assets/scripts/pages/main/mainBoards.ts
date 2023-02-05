import { createHtmlElement, getSvgIcon } from '../../helpers/other';
import clockIcon from '../../../images/clock-icon.svg';
import heartIcon from '../../../images/heart-icon.svg';
import { BASE_COLOR } from '../../types/constValues';

export class MainBoards {
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
      textContent: 'Недавно просмотренное',
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

    recentlyViewed.append(getSvgIcon(clockIcon, BASE_COLOR), recentlyViewedSpan);
    linksSection.append(linksText, createBoardDiv);
    rightSidebarContainer.append(recentlyViewed, linksSection);

    return rightSidebarContainer;
  }
}
