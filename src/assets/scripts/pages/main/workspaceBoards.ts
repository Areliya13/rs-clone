import Page from '../../core/page';
import { createHtmlElement } from '../../helpers/other';
import wsChanceIcon from '../../../images/wsChangeIcon.inl.svg';
import wsPrivateIcon from '../../../images/wsPrivateIcon.inl.svg';
import workspaceSiteIcon from '../../../images/wsSiteIcon.inl.svg';
import workspaceBoardsIcon from '../../../images/wsBoardsIcon.inl.svg';
import { store } from '../../store/store';
import { IBoard} from '../../store/types';
import { WorkSpaceBigBoardList } from '../../components/WorkSpaceBigBoardList/WorkSpaceBigBoardList';
import { BigBoardList } from '../../components/BigBoardList/BigBoardList';
import { updateOne } from '../../api/rest/updateOne';
import { Path } from '../../api/types';
import { createWorkSpacePutData } from '../../api/rest/utils/createPutData';
import { updateStore } from '../../store/updateStore';
import { deleteOne } from '../../api/rest/deleteOne';

export class WorkspaceBoards extends Page {
  workSpaceId: string
  constructor(id: string) {
    super(id);
    this.workSpaceId = location.hash.split('=')[1].trim()
    // this.subscribe()
  }
  renderContent(): HTMLDivElement {
    const workSpaceId = location.hash.split('=')[1].trim()

    console.log('wsId', workSpaceId)
  
    let currentWorkSpace = store.user?.workSpace?.find((workspace) => workspace._id === workSpaceId)
    if (!currentWorkSpace) {
      currentWorkSpace = {_id: '1', boards: [], title: 'Тестовое рабочее пространство'}
    } 
    const contentContainer = createHtmlElement('div', {
      className: 'wsBoardContent',
      id: currentWorkSpace._id
    });
    const wsBoardHeadDiv = createHtmlElement('div', {
      className: 'wsBoardHeadDiv',
    });
    
    const wsHeadWrapper = createHtmlElement('div', {className: 'wsHead-wrapper'});
    const wsHead = createHtmlElement('h2', {className: 'wsHead', textContent: currentWorkSpace.title});
    const wsIconButton = createHtmlElement('button', {
      className: 'wsIconButton',
      textContent: wsHead.textContent[0],
    });
    
    const wsInput = createHtmlElement('input', {
      className: 'wsInput disabled',
      value: currentWorkSpace.title
    })

    wsInput.addEventListener('blur', (e) => this.handlerInputTitleBlur(e))

    const wsInfoContainer = createHtmlElement('div', {className: 'wsInfo'});
    const wsChangeButton = createHtmlElement('button', {className: 'wsChangeButton', innerHTML: wsChanceIcon});
    wsChangeButton.addEventListener('click', (e) => this.handlerButtonTitleClick(e))
    const wsAccess = createHtmlElement('span', {className: 'wsAccess'});
    const wsAccessIcon = createHtmlElement('div', {className: 'wsAccessIcon', innerHTML: wsPrivateIcon});
    const wsAccessText = createHtmlElement('span', {className: 'wsAccessText', textContent: 'Приватная'});
    const wsSite = createHtmlElement('span', {className: 'wsSite'});
    const wsSiteIcon = createHtmlElement('div', {className: 'wsSiteIcon', innerHTML: workspaceSiteIcon});
    const wsSiteLink = createHtmlElement('a', {className: 'wsSiteLink', textContent: 'trololo.com', href: 'https://trololo.com'});

    const wsDescription = createHtmlElement('div', {className: 'wsDescription'});
    const wsDescriptionText = createHtmlElement('button', {className: 'wsDescriptionText', textContent: 'Удалить рабочее пространство'});
    wsDescriptionText.addEventListener('click', (e) => this.handlerDeleteWSClick(e))


    const wsFavoriteBoardsSection = createHtmlElement('div', {className: 'wsBoardsSection'});
    const wsFavoriteBoardsHeadContainer = createHtmlElement('div', {className: 'wsBoardsHead'});
    const wsFavoriteBoardsSectionIcon = createHtmlElement('div', {className: 'wsBoardsIcon', innerHTML: workspaceBoardsIcon});
    const wsFavoriteBoardsSectionText = createHtmlElement('h3', {className: 'wsBoardsText', textContent: 'Отмеченные доски'});
    wsFavoriteBoardsHeadContainer.append(wsFavoriteBoardsSectionIcon, wsFavoriteBoardsSectionText);
    wsFavoriteBoardsSection.append(wsFavoriteBoardsHeadContainer)

    const favoriteBoardInWorkSpace = this.isHaveFavoriteBoards(currentWorkSpace.boards)
    const favoriteBoardList = new BigBoardList(favoriteBoardInWorkSpace, 'wsBoardsList-favorite').getList()

    const wsBoardsSection = createHtmlElement('div', {className: 'wsBoardsSection'});
    const wsBoardsHeadContainer = createHtmlElement('div', {className: 'wsBoardsHead'});
    const wsBoardsSectionIcon = createHtmlElement('div', {className: 'wsBoardsIcon', innerHTML: workspaceBoardsIcon});
    const wsBoardsSectionText = createHtmlElement('h3', {className: 'wsBoardsText', textContent: 'Мои доски'});

    const wsBoardsListContainer = createHtmlElement('div', {className: 'wsBoardsListContainer'});
    const wsBoardsList = new WorkSpaceBigBoardList(currentWorkSpace, 'wsBoardsList-all').getList()
    wsBoardsListContainer.append(wsBoardsList)
    const seeClosedBoardButton = createHtmlElement('button', {className: 'closedBoardButton', type: 'button', textContent: 'Посмотреть закрытые доски'});

    wsBoardsHeadContainer.append(wsBoardsSectionIcon, wsBoardsSectionText);
    wsBoardsSection.append(wsBoardsHeadContainer);
    wsDescription.append(wsDescriptionText);
    wsAccess.append(wsAccessIcon, wsAccessText);
    wsSite.append(wsSiteIcon, wsSiteLink);
    wsHeadWrapper.append(wsHead, wsInput, wsChangeButton)

    wsInfoContainer.append(wsHeadWrapper, wsAccess, wsSite);
    wsBoardHeadDiv.append(wsIconButton, wsInfoContainer);
    contentContainer.append(wsBoardHeadDiv, wsDescription);
    contentContainer.insertAdjacentHTML("beforeend", '<hr>')
    if (this.isHaveFavoriteBoards(currentWorkSpace.boards).length !== 0) {
      contentContainer.append(wsFavoriteBoardsSection, favoriteBoardList)
    }
    contentContainer.append(wsBoardsSection, wsBoardsListContainer, seeClosedBoardButton)
    return contentContainer;
  }

  render(): HTMLDivElement {
    this.container.append(this.renderContent());
    return this.container;
  }

  // subscribe() {
  //   observer.subscribe({eventName: EventName.updateState, function: this.update.bind(this)})
  // }

  // update(user: IPartialUser) {
  //   // this.reRenderContent()
  // }

  reRenderContent() {
    const body = document.querySelector('.wsBoardContent');
    if (!body) return
    body.remove()

    this.render()
  }

  isHaveFavoriteBoards(boards: IBoard[]) {
    const favoriteBoards = store.user.favoriteBoards
    const result:IBoard[] = []
    boards.forEach((board) => {
      favoriteBoards.forEach(favoriteBoard => {
        if (favoriteBoard._id === board._id) {
          result.push(board)
        }
      }) 
    })
    return result
  }

  handlerButtonTitleClick(e: Event) {
    const wsHead = document.querySelector('.wsHead')
    if (!wsHead) return
    wsHead.classList.toggle('disabled')

    const wsInput = document.querySelector('.wsInput')
    if (!wsInput) return
    wsInput.classList.toggle('disabled')
  }

  async handlerInputTitleBlur(e: Event) {
    if (!(e.currentTarget instanceof HTMLInputElement)) return
    const input = e.currentTarget
    
    const newTitle = input.value
    const body: HTMLDivElement = document.querySelector('.wsBoardContent')
    if (!body) return
    const workSpaceId = body.id
    if (!workSpaceId) return
    await updateOne(Path.workSpace, workSpaceId, createWorkSpacePutData(newTitle))
    await updateStore()
  }

  async handlerDeleteWSClick(e: MouseEvent) {
    if (!(e.currentTarget instanceof HTMLButtonElement)) return

    const id = this.workSpaceId
    await deleteOne(Path.workSpace, id, store.user._id)
    await updateStore()

    location.hash = '#'
  }
 
}