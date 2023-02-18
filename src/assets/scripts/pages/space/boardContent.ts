import { getInitials } from '../../helpers/functions';
import { createHtmlElement } from '../../helpers/other';
import { store } from '../../store/store';
import { IBoard, IItem } from '../../store/types';
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
import changeIconSvg from '../../../images/wsChangeIcon.inl.svg';

export class BoardContent {
  chosenBoard = store.user.workSpace[0].boards[0];
  renderContent(curBoard?: IBoard): HTMLDivElement {
    if (curBoard) {
      this.chosenBoard = curBoard;
    }
    const currentBoard = store.user.workSpace[0];
    const container = createHtmlElement('div', {
      className: 'board-content',
    });
    const boardMenu = createHtmlElement('div', { className: 'board-header-menu' });
    const boardMenuLeft = createHtmlElement('div', { className: 'board-header-menu-left' });
    const boardMenuRight = createHtmlElement('div', { className: 'board-header-menu-right' });
    const boardName = createHtmlElement('input', { className: 'header-input-text', value: this.chosenBoard.title });
    const favoriteButton = createHtmlElement('button', { className: 'header-option-button' });
    const favoriteImg = createHtmlElement('span', { className: 'header-option-icon favorite-img' });
    const autoButton = createHtmlElement('button', { className: 'header-option-button' });
    const autoImg = createHtmlElement('span', { className: 'header-option-icon light-img' });
    const autoText = createHtmlElement('span', { textContent: 'Автоматизация' });
    const filterButton = createHtmlElement('button', { className: 'header-option-button' });
    const filterImg = createHtmlElement('span', { className: 'header-option-icon filter-img' });
    const filterText = createHtmlElement('span', { textContent: 'Фильтр' });
    const shareButton = createHtmlElement('button', { className: 'header-option-button' });
    const shareImg = createHtmlElement('span', { className: 'header-option-icon share-img' });
    const shareText = createHtmlElement('span', { textContent: 'Поделиться' });
    const settingsButton = createHtmlElement('button', { className: 'header-option-button' });
    const settingsImg = createHtmlElement('span', { className: 'header-option-icon board-option-settings' });
    const workSpace = createHtmlElement('div', { className: 'board-workspace' });
    this.renderLists(workSpace);
    const createButton = createHtmlElement('button', { className: 'header-option-button list-item' });
    const createImg = createHtmlElement('span', { className: 'header-option-icon plus-img' });
    const createText = createHtmlElement('span', { textContent: 'Добавьте еще одну колонку' });
    favoriteButton.append(favoriteImg);
    autoButton.append(autoImg, autoText);
    filterButton.append(filterImg, filterText);
    createButton.append(createImg, createText);
    shareButton.append(shareImg, shareText);
    settingsButton.append(settingsImg);
    boardMenuLeft.append(boardName, favoriteButton);
    boardMenuRight.append(autoButton, filterButton, shareButton, settingsButton);
    boardMenu.append(boardMenuLeft, boardMenuRight);
    workSpace.append(createButton);
    container.append(boardMenu, workSpace);
    return container;
  }

  renderLists(container: HTMLDivElement): void {
    for (let i = 0; i < this.chosenBoard.lists.length; i++) {
      const list = this.chosenBoard.lists[i];
      const listSpace = createHtmlElement('div', { className: 'list' });
      const listName = createHtmlElement('h3', { textContent: list.title });
      listSpace.append(listName);
      this.renderTasks(listSpace, list.items);
      container.append(listSpace);
    }
  }

  renderTasks(container: HTMLDivElement, tasks: IItem[]): void {
    for (let i = 0; i < tasks.length; i++) {
      const item = tasks[i];
      item.deadline;
      item.userId;
      const itemSpace = createHtmlElement('div', { className: 'item' });
      if (item.image) {
        const itemImage = createHtmlElement('img', { src: item.image, className: 'item-image' });
        itemSpace.append(itemImage);
      }
      const markContainer = createHtmlElement('div', { className: 'mark-container' });
      for (let j = 0; j < item.marks.length; j++) {
        const mark = item.marks[j];
        const markDiv = createHtmlElement('div', { className: 'mark' });
        markDiv.style.backgroundColor = mark.color;
        markContainer.append(markDiv);
      }
      const itemName = createHtmlElement('h4', { textContent: item.title });
      const footerItem = createHtmlElement('div', { className: 'footer-item' });
      const footerLeft = createHtmlElement('div', { className: 'footer-half' });
      let count = 0;
      let completed = 0;
      for (let k = 0; k < item.checkLists.length; k++) {
        count += item.checkLists[k].items.length;
        completed += item.checkLists[k].items.filter((val) => val.done === true).length;
      }
      if (count !== 0) {
        const check = createHtmlElement('p', { className: 'footer-checklist', textContent: `${completed}/${count}` });
        footerLeft.append(check);
      }
      if (item.deadline) {
        const text = item.deadline.toString().slice(0, 10);
        const date = createHtmlElement('p', { className: 'footer-deadline', textContent: text });
        footerLeft.append(date);
      }
      const footerRight = createHtmlElement('div', { className: 'footer-half' });
      for (let k = 0; k < item.userId.length; k++) {
        const user = item.userId[k];
        const userInitials = getInitials(user.name);
        const userDiv = createHtmlElement('div', { className: 'user', textContent: userInitials });
        footerRight.append(userDiv);
      }
      footerItem.append(footerLeft, footerRight);
      itemSpace.append(markContainer, itemName, footerItem);
      container.append(itemSpace);
    }

    const addTaskButton = createHtmlElement('button', { className: 'add-task-button', textContent: 'Добавить задачу' });
    this.addModal(addTaskButton);
    container.append(addTaskButton);
  }

  addModal(button: HTMLButtonElement): void {
    //todo: Модальное окно с настройками
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
    this.addMarkModal(tagsButton);
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

    button.addEventListener('click', () => {
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
  }

  addMarkModal(markButton: HTMLButtonElement): void {
    // todo: Модальное окно метки
    const marksModalContainer = createHtmlElement('div', { className: 'marksModalContainer' });
    const marksModal = createHtmlElement('div', { className: 'marksModal' });
    const marksHeader = createHtmlElement('header', { className: 'marksHeader' });
    const marksHeadText = createHtmlElement('h2', { className: 'marksHeadText', textContent: 'Метки' });
    const marksCloseButton = createHtmlElement('div', { className: 'marksCloseButton', innerHTML: closeButtonIcon });
    const marksContentContainer = createHtmlElement('div', { className: 'marksContentContainer' });
    const marksList = createHtmlElement('ul', { className: 'marksList' });
    for (let i = 0; i < 6; i++) {
      const marksItem = createHtmlElement('li', { className: 'marksItem' });
      const marksCheckbox = createHtmlElement('input', { className: 'marksCheckbox', type: 'checkbox' });
      const marksContainer = createHtmlElement('div', { className: 'marksContainer' });
      const mark = createHtmlElement('div', { className: 'markDiv' });
      const markColorIcon = createHtmlElement('div', { className: 'markColorIcon' });
      const markName = createHtmlElement('span', { className: 'markName', textContent: `Test ${i + 1}` });
      const markEditButton = createHtmlElement('button', { className: 'markEditButton', innerHTML: changeIconSvg });

      mark.append(markColorIcon, markName);
      marksContainer.append(mark, markEditButton);
      marksItem.append(marksCheckbox, marksContainer);
      marksList.append(marksItem);
    }
    const createMarkButton = createHtmlElement('button', {
      className: 'marksCreateButton',
      textContent: 'Создать новую метку',
    });

    marksHeader.append(marksHeadText, marksCloseButton);

    marksContentContainer.append(marksList, createMarkButton);
    marksModal.append(marksHeader, marksContentContainer);
    marksModalContainer.append(marksModal);
    markButton.addEventListener('click', () => {
      document.body.append(marksModalContainer);
    });

    marksModalContainer.addEventListener('click', (event) => {
      if (event.target === marksModalContainer) {
        marksModalContainer.remove();
      }
    });

    marksCloseButton.addEventListener('click', () => {
      marksModalContainer.remove();
    });
    // Конец кода - Модальное окно метки
  }
}
