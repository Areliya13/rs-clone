import Page from '../../core/page';
import { createHtmlElement } from '../../helpers/other';
import clockIcon from '../../../images/clock-icon.inl.svg';
import star from '../../../images/star.inl.svg';
import { BigBoardList } from '../../components/BigBoardList/BigBoardList';
import observer from '../../store/observer';
import { EventName, IPartialUser, IStore } from '../../store/types';
import { store } from '../../store/store';

export class Boards extends Page{
  constructor(id: string) {
    super(id);
    this.subscribe()
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

    let favorite = store.user?.favoriteBoards
    if (!favorite) favorite = []
    const favoriteBoardsList = new BigBoardList(favorite, 'big-board-list-favorite').getList()
    favoriteBoards.append(favoriteHead, favoriteBoardsList);

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

  subscribe() {
    observer.subscribe({eventName: EventName.updateState, function: this.update.bind(this)})
  }

  update(store: IPartialUser) {
    this.renderFavoriteBoard(store)
  }

  renderFavoriteBoard(data: IPartialUser) {
    const favoriteList = document.querySelector('.big-board-list-favorite')
    const boardsFavorite = document.querySelector('.boardsFavorite')

    if (!favoriteList) return
    favoriteList.remove()

    if (!boardsFavorite) return

    let favoriteListInStore = data.favoriteBoards
    if (!favoriteListInStore) favoriteListInStore = []
    console.log(favoriteListInStore)
    const newFavoriteList = new BigBoardList(favoriteListInStore, 'big-board-list-favorite').getList()

    boardsFavorite.append(newFavoriteList)
  }

  
}