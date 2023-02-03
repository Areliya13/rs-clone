import { createHtmlElement, getSvgIcon } from '../../helpers/other';
import boardsIcon from '../../../images/trello-icon.svg';
import templatesIcon from '../../../images/trello2-icon.svg';
import mainIcon from '../../../images/trello3-icon.svg';
import clockIcon from '../../../images/clock-icon.svg';
import heartIcon from '../../../images/heart-icon.svg';

class Main {
  content: HTMLElement;
  BASE_COLOR = '#172b4d';
  ALT_COLOR = '#0079BF';

  constructor() {
    this.content = createHtmlElement('main', {className: 'main'});
  }

  createLeftSidebar = (): HTMLElement => {
    const leftSidebarContainer = createHtmlElement('aside', {className: 'boards'});
    const unList = createHtmlElement('ul', {className: 'sidebarMain'});
    const buttonsName = ['Доски', 'Шаблоны', 'Главная страница'];
    const icons = [boardsIcon, templatesIcon, mainIcon];
    for (let i = 0; i < 3; i++) {
      const itemList = createHtmlElement('li', {className: 'listItem'});
      const itemLink = createHtmlElement('a', {className: 'itemLink', href: '#'});
      let itemIcon: SVGSVGElement;
      const itemName = buttonsName[i];
      if(buttonsName[i] === 'Главная страница') {
        itemLink.classList.add('current');
        itemIcon = getSvgIcon(icons[i], this.ALT_COLOR, 'icon icon-current');
      } else {
        itemIcon = getSvgIcon(icons[i], this.BASE_COLOR);
      }
      itemLink.append(itemIcon, itemName);
      itemList.append(itemLink);
      unList.append(itemList);
    }

    const workspacesDiv = createHtmlElement('div', {className: 'workspacesDiv', innerHTML: `
    <span class="workspaceText">Рабочие пространства</span>
    <button class="icon workspaceAddBtn">+</button>
    `});

    leftSidebarContainer.append(unList, workspacesDiv);
    return leftSidebarContainer;
  }

  createMidContent = (): HTMLElement => {
    const midContentContainer = createHtmlElement('article', {className: 'midContent'});
    const midAttentionDiv = createHtmlElement('section', {className: 'sectionTitle'});
    const attentionSpan = createHtmlElement('span', {className: 'mid-attentionText', textContent: 'Требуют внимания'});
    const midImportantEvents = createHtmlElement('section', {className: 'sectionTitle'});
    const importantEventsSpan = createHtmlElement('span', {className: 'mid-importantEventText', textContent: 'Важные события'});

    midAttentionDiv.append(getSvgIcon(clockIcon, this.BASE_COLOR), attentionSpan);
    midImportantEvents.append(getSvgIcon(heartIcon, this.BASE_COLOR), importantEventsSpan);
    midContentContainer.append(midAttentionDiv, midImportantEvents);
    return midContentContainer
  }

  createRightSidebar = (): HTMLDivElement => {
    const rightSidebarContainer = createHtmlElement('div', {className: 'right-sidebar'});
    const recentlyViewed = createHtmlElement('section', {className: 'sectionTitle recentlyViewed'});
    const recentlyViewedSpan = createHtmlElement('span', {className: 'right-recently-text', textContent: 'Недавно просмотренное'});
    const linksSection = createHtmlElement('section', {className: 'sectionLink'});
    const linksText = createHtmlElement('span', {className: 'right-linksText', textContent: 'Ссылки'});
    const createBoardDiv = createHtmlElement('div', {className: 'right-linksButtonDiv', innerHTML: `
    <button class="right-linksButton">
      <span class="buttonPlus">+</span>
      <span class="buttonText">Создать доску</span>
    </button>
    `});

    recentlyViewed.append(getSvgIcon(clockIcon, this.BASE_COLOR), recentlyViewedSpan);
    linksSection.append(linksText, createBoardDiv);
    rightSidebarContainer.append(recentlyViewed, linksSection)

    return rightSidebarContainer;
  }

  render() {
    this.content.append(this.createLeftSidebar(), this.createMidContent(), this.createRightSidebar());
    document.body.append(this.content);
  }
}

export default Main;