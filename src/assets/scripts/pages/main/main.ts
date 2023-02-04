import { createHtmlElement, getSvgIcon } from '../../helpers/other';
import boardsIcon from '../../../images/trello-icon.svg';
import templatesIcon from '../../../images/trello2-icon.svg';
import mainIcon from '../../../images/trello3-icon.svg';
import { ALT_COLOR, BASE_COLOR } from '../../types/constValues';

class Main {
  content: HTMLElement;

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
        itemIcon = getSvgIcon(icons[i], ALT_COLOR, 'icon icon-current');
      } else {
        itemIcon = getSvgIcon(icons[i], BASE_COLOR);
      }
      itemLink.append(itemIcon, itemName);
      itemList.append(itemLink);
      unList.append(itemList);
    }

    const workspacesDiv = createHtmlElement('div', {className: 'workspacesDiv'});
    const workspaceSpan = createHtmlElement('span', {className: 'workspaceText', textContent: 'Рабочие пространства'});
    const workspaceButton = createHtmlElement('button', {className: 'icon workspaceAddBtn', textContent: '+'});
    workspacesDiv.append(workspaceSpan, workspaceButton);

    leftSidebarContainer.append(unList, workspacesDiv);
    return leftSidebarContainer;
  }

  render() {
    this.content.append(this.createLeftSidebar());
    document.body.append(this.content);
  }
}

export default Main;