import Page from '../../core/page';
import { createHtmlElement } from '../../helpers/other';
import clockIcon from '../../../images/clock-icon.inl.svg';
import star from '../../../images/star.inl.svg';

export class Boards extends Page{
  constructor(id: string) {
    super(id);
  }

  renderContent(): HTMLElement {
    const contentContainer = createHtmlElement('article', {
      className: 'boardsContent',
    });

    const favoriteBoards = createHtmlElement('section', { className: 'boardsFavorite' });
    const favoriteHead = createHtmlElement('div', { className: 'boardsFavoriteHead' });
    const favoriteIcon = createHtmlElement('div', {className: 'boardsFavoriteIcon', innerHTML: star})
    const favoriteText = createHtmlElement('h3', { className: 'boardsFavoriteText' , textContent: 'Отмеченные доски'})
    favoriteHead.append(favoriteIcon, favoriteText);
    favoriteBoards.append(favoriteHead);

    const recentlyViewed = createHtmlElement('section', { className: 'boardsRecently' });
    const recentlyHead = createHtmlElement('div', { className: 'boardsRecentlyHead' });
    const recentlyIcon = createHtmlElement('div', {className: 'boardsRecentlyIcon', innerHTML: clockIcon})
    const recentlyText = createHtmlElement('h3', { className: 'boardsRecentlyText' , textContent: 'Недавно просмотренные'})
    recentlyHead.append(recentlyIcon, recentlyText);
    recentlyViewed.append(recentlyHead);

    const yourWorkspaces = createHtmlElement('section', { className: 'boardsWorkspaces' });
    const yourWorkspacesHead = createHtmlElement('h3', { className: 'boardsWorkspacesHead', textContent: 'Ваши рабочие пространства' })
    yourWorkspaces.append(yourWorkspacesHead);

    const closedWorkspacesButton = createHtmlElement('button', { className: 'closedWorkspacesButton', textContent: 'Посмотреть закрытые доски'})

    contentContainer.append(favoriteBoards, recentlyViewed, yourWorkspaces, closedWorkspacesButton);
    return contentContainer;
  }

  render(): HTMLDivElement {
    this.container.append(this.renderContent());
    return this.container;
  }
}