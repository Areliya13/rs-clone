import Page from '../../core/page';
import { createHtmlElement } from '../../helpers/other';
import clockIcon from '../../../images/clock-icon.inl.svg';
import star from '../../../images/star.inl.svg';
import { BigBoardList } from '../../components/BigBoardList/BigBoardList';
import observer from '../../store/observer';
import { EventName, IPartialUser, IStore, IWork } from '../../store/types';
import { store } from '../../store/store';
import { getAllUserBoards } from '../../helpers/utils/getAllUserBoard';
import { WorkSpaceBigBoardList } from '../../components/WorkSpaceBigBoardList/WorkSpaceBigBoardList';

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

    let recently = getAllUserBoards(store.user)
    if (!recently) recently = []
    const recentlyBoardsList = new BigBoardList(recently, 'big-board-list-recently').getList()
    recentlyViewed.append(recentlyHead, recentlyBoardsList);

    const yourWorkspaces = createHtmlElement('section', { className: 'boardsWorkspaces' });
    const yourWorkspacesHead = createHtmlElement('h3', { className: 'boardsWorkspacesHead', textContent: 'Ваши рабочие пространства' })
    const yourWorkspacesList = createHtmlElement('div', { className: 'boardsWorkspacesList' });
    yourWorkspaces.append(yourWorkspacesHead);

    let workspaces = store.user?.workSpace
    if (!workspaces) workspaces = []
    this.renderWorkSpaceLists(workspaces, yourWorkspacesList)
    yourWorkspaces.append(yourWorkspacesList)

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
    this.renderRecentlyBoard(store)
    this.reRenderWorkSpaceLists(store)
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

  renderRecentlyBoard(data: IPartialUser) {
    const recentlyList = document.querySelector('.big-board-list-recently')
    const boardsRecently = document.querySelector('.boardsRecently')

    if (!recentlyList) return
    recentlyList.remove()

    if (!boardsRecently) return

    let recentlyListInStore = getAllUserBoards(data)
    if (!recentlyListInStore) recentlyListInStore = []
    console.log(recentlyListInStore)
    const newRecentlyList = new BigBoardList(recentlyListInStore, 'big-board-list-recently').getList()

    boardsRecently.append(newRecentlyList)
  }

  renderWorkSpaceLists(workSpaces: IWork[], container: Element) {
    workSpaces.forEach((workspace) => {
      const header = createHtmlElement('div', {
        className: `work-space-big-board-list-header`
    })
    const workspaceName = createHtmlElement('span', {
        className: 'work-space-big-board-list-name', 
        textContent: `${workspace.title}`
    })
    const workspaceIcon = createHtmlElement('div', {
        className: 'work-space-big-board-list-icon', 
        textContent: `${workspaceName.textContent[0].toUpperCase()}`
    });
    header.append(workspaceIcon, workspaceName)
      const workSpacesList = new WorkSpaceBigBoardList(workspace, 'work-space-big-board-list-da').getList()
      container.append(header, workSpacesList)
    })
  }

  reRenderWorkSpaceLists(data: IPartialUser) {
    const workSpaceList = document.querySelector('.boardsWorkspacesList')
    if (!workSpaceList) return
    workSpaceList.innerHTML = ''
    const workSpaces = data.workSpace
    this.renderWorkSpaceLists(workSpaces, workSpaceList)
  }
  
}