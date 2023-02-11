import Page from '../../core/page';
import { createHtmlElement } from '../../helpers/other';
import wsChanceIcon from '../../../images/wsChangeIcon.inl.svg';
import wsPrivateIcon from '../../../images/wsPrivateIcon.inl.svg';
import workspaceSiteIcon from '../../../images/wsSiteIcon.inl.svg';
import workspaceBoardsIcon from '../../../images/wsBoardsIcon.inl.svg';

export class WorkspaceBoards extends Page {
  constructor(id: string) {
    super(id);
  }
  renderContent(): HTMLDivElement {
    const contentContainer = createHtmlElement('div', {
      className: 'wsBoardContent',
    });
    const wsBoardHeadDiv = createHtmlElement('div', {
      className: 'wsBoardHeadDiv',
    });
    const wsIconButton = createHtmlElement('button', {
      className: 'wsIconButton',
      textContent: 'T',
    });
    const wsInfoContainer = createHtmlElement('div', {className: 'wsInfo'});
    const wsHead = createHtmlElement('h2', {className: 'wsHead', textContent: 'Тестовое рабочее пространство'});
    const wsChangeButton = createHtmlElement('button', {className: 'wsChangeButton', innerHTML: wsChanceIcon});
    const wsAccess = createHtmlElement('span', {className: 'wsAccess'});
    const wsAccessIcon = createHtmlElement('div', {className: 'wsAccessIcon', innerHTML: wsPrivateIcon});
    const wsAccessText = createHtmlElement('span', {className: 'wsAccessText', textContent: 'Приватная'});
    const wsSite = createHtmlElement('span', {className: 'wsSite'});
    const wsSiteIcon = createHtmlElement('div', {className: 'wsSiteIcon', innerHTML: workspaceSiteIcon});
    const wsSiteLink = createHtmlElement('a', {className: 'wsSiteLink', textContent: 'trololo.com', href: 'https://trololo.com'});

    const wsDescription = createHtmlElement('div', {className: 'wsDescription'});
    const wsDescriptionText = createHtmlElement('p', {className: 'wsDescriptionText', textContent: 'test'});

    const wsBoardsSection = createHtmlElement('div', {className: 'wsBoardsSection'});
    const wsBoardsHeadContainer = createHtmlElement('div', {className: 'wsBoardsHead'});
    const wsBoardsSectionIcon = createHtmlElement('div', {className: 'wsBoardsIcon', innerHTML: workspaceBoardsIcon});
    const wsBoardsSectionText = createHtmlElement('h3', {className: 'wsBoardsText', textContent: 'Мои доски'});

    const wsBoardsListContainer = createHtmlElement('div', {className: 'wsBoardsListContainer'});
    const wsBoardsList = createHtmlElement('ul', {className: 'wsBoardsList'});
    const wsBoardsItem = createHtmlElement('li', {className: 'wsBoardsItem'});
    const wsBoardsItemCreate = createHtmlElement('div', {className: 'wsBoardsItemCreate'});
    const wsBoardsItemCreateText = createHtmlElement('p', {className: 'wsBoardsItemCreateText', textContent: 'Создать доску'});
    wsBoardsItemCreate.append(wsBoardsItemCreateText);
    wsBoardsItem.append(wsBoardsItemCreate);
    wsBoardsList.append(wsBoardsItem);
    wsBoardsListContainer.append(wsBoardsList);

    const seeClosedBoardButton = createHtmlElement('button', {className: 'closedBoardButton', type: 'button', textContent: 'Посмотреть закрытые доски'});

    wsBoardsHeadContainer.append(wsBoardsSectionIcon, wsBoardsSectionText);
    wsBoardsSection.append(wsBoardsHeadContainer);
    wsDescription.append(wsDescriptionText);
    wsAccess.append(wsAccessIcon, wsAccessText);
    wsSite.append(wsSiteIcon, wsSiteLink);
    wsHead.append(wsChangeButton);
    wsInfoContainer.append(wsHead, wsAccess, wsSite);
    wsBoardHeadDiv.append(wsIconButton, wsInfoContainer);
    contentContainer.append(wsBoardHeadDiv, wsDescription);
    contentContainer.insertAdjacentHTML("beforeend", '<hr>')
    contentContainer.append(wsBoardsSection, wsBoardsListContainer, seeClosedBoardButton)
    return contentContainer;
  }

  render(): HTMLDivElement {
    this.container.append(this.renderContent());
    return this.container;
  }
}