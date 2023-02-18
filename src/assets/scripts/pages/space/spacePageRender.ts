import { createHtmlElement } from '../../helpers/other';
import Page from '../../core/page';
import SpaceMenu from './spaceMenu';
import { spaceMode } from '../../types/enum';
import SpaceError from './spaceError';
import { BoardContent } from './boardContent';
import modalHeaderIcon from '../../../images/spaceModalHead.inl.svg';
import modalEye from '../../../images/modalEye.inl.svg';
import downIcon from '../../../images/down.inl.svg';
import modal4LineIcon from '../../../images/modal4Lines.inl.svg';
import modalUserIcon from '../../../images/users-icon.inl.svg';
import tagsIcon from '../../../images/tagsIcon.inl.svg';
import checkBoxIcon from '../../../images/checkBoxIcon.inl.svg';
import rightIcon from '../../../images/rightArrow.inl.svg';
import copyIcon from '../../../images/copyIcon.inl.svg';
import shareIcon from '../../../images/sharingIcon.inl.svg';
import closeButtonIcon from '../../../images/modal-close.inl.svg';
import { Options } from '../../types/types';
import { IBoard, IWork } from '../../store/types';
import { store } from '../../store/store';

export class SpacePageRender extends Page {
  mode: spaceMode;
  menu: SpaceMenu;
  workspace: IWork | undefined;
  board: IBoard | undefined;
  content: HTMLDivElement;
  options: Options;
  constructor(id: string, options: Options) {
    super(id);
    this.mode = spaceMode.error;
    this.options = options;
  }

  render() {
    const mode = this.options.get('mode');
    this.content = new SpaceError().renderErrorMessage();
    this.content = new SpaceError().renderErrorMessage();
    if (!mode || mode === spaceMode.board) {
      this.mode = spaceMode.board;
      if (store.user.workSpace) {
        this.workspace = store.user.workSpace.find((val) => val._id === this.options.get('workspaceID'));
        if (this.workspace) {
          this.board = this.workspace.boards.find((val) => val._id === this.options.get('boardID'));
          this.content = new BoardContent().renderContent(this.board);
        }
      }
    }
    this.menu = new SpaceMenu();
    const container = createHtmlElement('div');
    const background = createHtmlElement('div', { className: 'background' });

    background.append(this.menu.renderLeftSide(this.workspace, this.board), this.content);
    container.append(background);

    //todo: Модальное окно с настройками
    const tempButtonForModal = createHtmlElement('button', {
      textContent: 'Временная кнопка для теста модалки (УДАЛИТЬ!)',
    });
    this.content.append(tempButtonForModal);
    const settingsModalContainer = createHtmlElement('div', { className: 'settingsModalContainer' });
    const settingsModal = createHtmlElement('div', { className: 'settingsModal' });
    const settingsModalHeader = createHtmlElement('div', { className: 'settingsModalHeader' });
    const headerIcon = createHtmlElement('div', { className: 'modalHeaderIcon', innerHTML: modalHeaderIcon });
    const headerText = createHtmlElement('textarea', {
      className: 'modalHeaderText',
      textContent: 'Тестовое название',
    });
    const columnDiv = createHtmlElement('div', { className: 'modalColumnDiv' });
    const columnLink = createHtmlElement('a', { className: 'modalColumnLink', href: '#', textContent: 'test' });
    const columnText = createHtmlElement('p', { className: 'modalColumnText', textContent: 'в колонке ' });
    const mainSidebarContainer = createHtmlElement('div', { className: 'modalMainSidebar' });
    const mainModal = createHtmlElement('div', { className: 'modalMain' });
    const cardDetail = createHtmlElement('div', { className: 'modalCardDetail' });
    const cardDetailMembers = createHtmlElement('div', { className: 'cardDetail-item modalCardDetailMembers' });
    const cardDetailMembersHead = createHtmlElement('h3', {
      className: 'modalHeadText modalMembersHead',
      textContent: 'Участники',
    });
    const cardDetailMembersList = createHtmlElement('div', { className: 'modalMembersList' });
    const memberIcon = createHtmlElement('div', { className: 'modalMemberIcon', textContent: 'TC' });
    const memberAddButton = createHtmlElement('button', { className: 'modalMemberAdd', textContent: '+' });
    const notification = createHtmlElement('div', { className: 'cardDetail-item modalNotification' });
    const notificationHead = createHtmlElement('h3', {
      className: 'modalHeadText modalNotificationHead',
      textContent: 'Уведомления',
    });
    const notificationButton = createHtmlElement('button', { className: 'modal-button modalNotificationButton' });
    const notificationButtonIcon = createHtmlElement('div', {
      className: 'modalNotificationIcon',
      innerHTML: modalEye,
    });
    const notificationButtonText = createHtmlElement('span', {
      className: 'modalNotificationText',
      textContent: 'Подписаться',
    });
    const cardDate = createHtmlElement('div', { className: 'cardDetail-item modalCardDate' });
    const cardDateHead = createHtmlElement('h3', { className: 'modalHeadText modalCardDateHead', textContent: 'Срок' });
    const cardDateControls = createHtmlElement('div', { className: 'modalCardDateControls' });
    const cardDateControlsCheckbox = createHtmlElement('input', {
      className: 'modalCardDateCheckbox',
      type: 'checkbox',
    });
    const cardDateButton = createHtmlElement('button', {
      className: 'modal-button modalCardDateButton',
      type: 'button',
    });
    const cardDateSpan = createHtmlElement('span', { className: 'modalDateSpan', textContent: 'Какая-то дата ' });
    const cardDateStatus = createHtmlElement('span', { className: 'modalDateStatus', textContent: 'просрочено' });
    const cardDateArrowIcon = createHtmlElement('div', { className: 'modalDateArrowIcon', innerHTML: downIcon });
    const description = createHtmlElement('div', { className: 'modalDescription' });
    const descriptionHeadDiv = createHtmlElement('div', { className: 'modalDescriptionHeadDiv' });
    const descriptionIcon = createHtmlElement('div', { className: 'modalDescriptionIcon', innerHTML: modal4LineIcon });
    const descriptionHead = createHtmlElement('h3', { className: 'modalDescriptionHead', textContent: 'Описание' });
    const descriptionTextarea = createHtmlElement('textarea', {
      className: 'modalDescriptionInput',
      placeholder: 'Добавить более подробное описание...',
    });
    const commentDiv = createHtmlElement('div', { className: 'modalCommentDiv' });
    const currUserIcon = createHtmlElement('div', { className: 'currUserIcon' });
    const commentForm = createHtmlElement('form', { className: 'modalCommentForm' });
    const commentTextarea = createHtmlElement('textarea', {
      className: 'modalCommentTextarea',
      placeholder: 'Напишите комментарий...',
    });
    const sidebarModal = createHtmlElement('div', { className: 'modalSidebar' });
    const sidebarRecommended = createHtmlElement('div', { className: 'modalRecommended' });
    const sidebarRecommendedHead = createHtmlElement('h3', {
      className: 'modalHeadText modalRecommendedHead',
      textContent: 'Рекомендуемые',
    });
    const sidebarRecommendedUserIcon = createHtmlElement('div', {
      className: 'modalIcon modalRecommendedButtonIcon',
      innerHTML: modalUserIcon,
    });
    const sidebarRecommendedText = createHtmlElement('span', {
      className: 'modalRecommendedButtonText',
      textContent: 'Присоединится',
    });
    const sidebarRecommendedButton = createHtmlElement('button', { className: 'modal-button modalRecommendedButton' });
    const addToCardContainer = createHtmlElement('div', { className: 'modalAddToCardContainer' });
    const addToCardHead = createHtmlElement('h3', {
      className: 'modalHeadText modalAddToCardHead',
      textContent: 'Добавить на карточку',
    });
    const addToCardButtons = createHtmlElement('div', { className: 'modalAddToCardButtons' });
    const addToCardMembersIcon = createHtmlElement('div', {
      className: 'modalIcon modalAddToCardMembersIcon',
      innerHTML: modalUserIcon,
    });
    const addToCardMembersText = createHtmlElement('span', {
      className: 'modalAddToCardMembersText',
      textContent: 'Участники',
    });
    const addToCardMembersButton = createHtmlElement('button', {
      className: 'modal-button modalAddToCardMembersButton',
    });
    const tagsButtonIcon = createHtmlElement('div', {
      className: 'modalIcon modalTagsButtonIcon',
      innerHTML: tagsIcon,
    });
    const tagsButtonText = createHtmlElement('span', { className: 'modalTagsButtonText', textContent: 'Метки' });
    const tagsButton = createHtmlElement('button', { className: 'modal-button modalTagsButton' });
    const checklistButtonIcon = createHtmlElement('div', {
      className: 'modalIcon modalChecklistButtonIcon',
      innerHTML: checkBoxIcon,
    });
    const checklistButtonText = createHtmlElement('span', {
      className: 'modalChecklistButtonText',
      textContent: 'Чек-лист',
    });
    const checklistButton = createHtmlElement('button', { className: 'modal-button modalChecklistButton' });
    const actionsContainer = createHtmlElement('div', { className: 'modalActionsContainer' });
    const actionsHead = createHtmlElement('h3', {
      className: 'modalHeadText modalActionsHead',
      textContent: 'Действия',
    });
    const actionsButtons = createHtmlElement('div', { className: 'modalActionsButtons' });
    const movingButtonIcon = createHtmlElement('div', {
      className: 'modalIcon modalMovingButtonIcon',
      innerHTML: rightIcon,
    });
    const movingButtonText = createHtmlElement('span', {
      className: 'modalMovingButtonText',
      textContent: 'Перемещение',
    });
    const movingButton = createHtmlElement('button', { className: 'modal-button modalMovingButton' });
    const copyingButtonIcon = createHtmlElement('div', {
      className: 'modalIcon modalCopyingButtonIcon',
      innerHTML: copyIcon,
    });
    const copyingButtonText = createHtmlElement('span', {
      className: 'modalCopyingButtonText',
      textContent: 'Копирование',
    });
    const copyingButton = createHtmlElement('button', { className: 'modal-button modalCopyingButton' });
    const shareButtonIcon = createHtmlElement('div', {
      className: 'modalIcon modalShareButtonIcon',
      innerHTML: shareIcon,
    });
    const shareButtonText = createHtmlElement('span', { className: 'modalShareButtonText', textContent: 'Поделиться' });
    const shareButton = createHtmlElement('button', { className: 'modal-button modalShareButton' });
    const closeButton = createHtmlElement('div', { className: 'modalCloseButton', innerHTML: closeButtonIcon });

    shareButton.append(shareButtonIcon, shareButtonText);
    copyingButton.append(copyingButtonIcon, copyingButtonText);
    movingButton.append(movingButtonIcon, movingButtonText);
    actionsButtons.append(movingButton, copyingButton, shareButton);
    actionsContainer.append(actionsHead, actionsButtons);
    checklistButton.append(checklistButtonIcon, checklistButtonText);
    tagsButton.append(tagsButtonIcon, tagsButtonText);
    addToCardMembersButton.append(addToCardMembersIcon, addToCardMembersText);
    addToCardButtons.append(addToCardMembersButton, tagsButton, checklistButton);
    addToCardContainer.append(addToCardHead, addToCardButtons);
    sidebarRecommendedButton.append(sidebarRecommendedUserIcon, sidebarRecommendedText);
    sidebarRecommended.append(sidebarRecommendedHead, sidebarRecommendedButton);
    sidebarModal.append(sidebarRecommended, addToCardContainer, actionsContainer);
    commentForm.append(commentTextarea);
    commentDiv.append(currUserIcon, commentForm);
    descriptionHeadDiv.append(descriptionIcon, descriptionHead);
    description.append(descriptionHeadDiv, descriptionTextarea);
    cardDateButton.append(cardDateSpan, cardDateStatus, cardDateArrowIcon);
    cardDateControls.append(cardDateControlsCheckbox, cardDateButton);
    cardDate.append(cardDateHead, cardDateControls);
    notificationButton.append(notificationButtonIcon, notificationButtonText);
    notification.append(notificationHead, notificationButton);
    cardDetailMembersList.append(memberIcon, memberAddButton);
    cardDetailMembers.append(cardDetailMembersHead, cardDetailMembersList);
    mainModal.append(cardDetail, description, commentDiv);
    mainSidebarContainer.append(mainModal, sidebarModal);
    cardDetail.append(cardDetailMembers, notification, cardDate);
    columnText.append(columnLink);
    columnDiv.append(columnText);
    settingsModalHeader.append(headerIcon, headerText);
    settingsModal.append(settingsModalHeader, columnDiv, mainSidebarContainer, closeButton);
    settingsModalContainer.append(settingsModal);

    tempButtonForModal.addEventListener('click', () => {
      document.body.append(settingsModalContainer);
    });

    settingsModalContainer.addEventListener('click', (event) => {
      if (event.target === settingsModalContainer) {
        settingsModalContainer.remove();
      }
    });

    closeButton.addEventListener('click', () => {
      settingsModalContainer.remove();
    });
    // Конец кода - Модальное окно с настройками

    return container;
  }
}
