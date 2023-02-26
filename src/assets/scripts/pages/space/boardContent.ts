import { findFavorite, getInitials, toggleFavorite } from '../../helpers/functions';
import { createHtmlElement } from '../../helpers/other';
import { store } from '../../store/store';
import { EventName, IBoard, IComment, IItem, IPartialUser } from '../../store/types';
import modalHeaderIcon from '../../../images/spaceModalHead.inl.svg';
import modalEye from '../../../images/modalEye.inl.svg';
import downIcon from '../../../images/down.inl.svg';
import modal4LineIcon from '../../../images/modal4Lines.inl.svg';
import modalUserIcon from '../../../images/users-icon.inl.svg';
import tagsIcon from '../../../images/tagsIcon.inl.svg';
import checkBoxIcon from '../../../images/checkBoxIcon.inl.svg';
import changeIconSvg from '../../../images/wsChangeIcon.inl.svg';
import rightIcon from '../../../images/rightArrow.inl.svg';
import copyIcon from '../../../images/copyIcon.inl.svg';
import shareIcon from '../../../images/sharingIcon.inl.svg';
import closeButtonIcon from '../../../images/modal-close.inl.svg';
import settingIcon from '../../../images/settings.inl.svg';
import { createOne } from '../../api/rest/createOne';
import { Path } from '../../api/types';
import { createCommentPostData } from '../../api/rest/utils/createPostData';
import { updateStore } from '../../store/updateStore';
import observer from '../../store/observer';
import { readAll } from '../../api/rest/readAll';
import { deleteOne } from '../../api/rest/deleteOne';
import { updateOne } from '../../api/rest/updateOne';
import { createCommentPutData, createItemPutData } from '../../api/rest/utils/createPutData';

export class BoardContent {
  chosenBoard = store.user.workSpace[0].boards[0];
  currentItem: IItem | undefined
  comments: IComment[] = []
  renderContent(curBoard?: IBoard): HTMLDivElement {
    this.subscribe()
    if (curBoard) {
      this.chosenBoard = curBoard;
    }
    // const currentBoard = store.user.workSpace[0];
    const container = createHtmlElement('div', {
      className: 'board-content',
    });
    const boardMenu = createHtmlElement('div', { className: 'board-header-menu' });
    const boardMenuLeft = createHtmlElement('div', { className: 'board-header-menu-left' });
    const boardMenuRight = createHtmlElement('div', { className: 'board-header-menu-right' });
    const boardName = createHtmlElement('input', { className: 'header-input-text', value: this.chosenBoard.title });
    const favoriteButton = createHtmlElement('div', { className: 'header-option-button' });
    const favoriteImg = createHtmlElement('span', {
      className: findFavorite(this.chosenBoard._id)
        ? 'header-option-icon chosen-favorite-img'
        : 'header-option-icon favorite-img',
    });
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
    2;

    favoriteButton.addEventListener('click', (e) => {
      toggleFavorite(e, this.chosenBoard);
    });
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
      this.comments = item.comments
      item.deadline;
      item.userId;
      const itemSpace = createHtmlElement('div', { className: 'item', id: item._id });
      if (item.image) {
        const itemImage = createHtmlElement('img', { src: item.image, className: 'item-image' });
        itemSpace.append(itemImage);
      }
      const buttonDiv = createHtmlElement('div', {className: 'item-icon-wrapper'});
      const linkIcon = createHtmlElement('button', {className: 'item-icon', innerHTML: settingIcon});
      buttonDiv.append(linkIcon)
      
      const settingsModalContainer = this.addModal(item)
      linkIcon.addEventListener('click', () => {
        this.currentItem = item
        document.body.append(settingsModalContainer);
      });
  

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
      itemSpace.append(markContainer, itemName, footerItem, buttonDiv);
      container.append(itemSpace);
    }

    const addTaskButton = createHtmlElement('button', { className: 'add-task-button', textContent: 'Добавить задачу' });
    // this.addModal(addTaskButton);
    container.append(addTaskButton);
  }

  addModal(item: IItem) {
    //todo: Модальное окно с настройками
    this.currentItem  = item
    const settingsModalContainer = createHtmlElement('div', { className: 'settingsModalContainer'});
    settingsModalContainer.dataset.itemIdOnModal = item._id
    const settingsModal = createHtmlElement('div', { className: 'settingsModal' });
    const settingsModalHeader = createHtmlElement('div', { className: 'settingsModalHeader' });
    const headerIcon = createHtmlElement('div', { className: 'modalHeaderIcon', innerHTML: modalHeaderIcon });
    const headerText = createHtmlElement('textarea', {
      className: 'modalHeaderText',
      textContent: `${item.title}`,
    });
    headerText.dataset.itemIdInHeaderText = item._id
    headerText.addEventListener('blur', (e) => this.handlerTitleModalUpdateBlur(e))


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
      placeholder: `${item.description ? item.description : 'Добавить более подробное описание...'}`,
      value: `${item.description ? item.description : ''}`,
    });
    descriptionTextarea.dataset.itemIdInDescription = item._id
    descriptionTextarea.addEventListener('blur', (e) => this.handlerDescriptionUpdateBlur(e))

    const commentDiv = createHtmlElement('div', { className: 'modalCommentDiv' });
    const commentForm = createHtmlElement('form', { className: 'modalCommentForm' });
   
    const commentHeadDiv = createHtmlElement('div', { className: 'modalCommentHeadDiv' });
    const commentIcon = createHtmlElement('div', { className: 'modalDescriptionIcon', innerHTML: modal4LineIcon });
    const commentHead = createHtmlElement('h3', { className: 'modalDescriptionHead', textContent: 'Комментарии' });
    const commentTextarea = createHtmlElement('textarea', {
      className: 'modalCommentTextarea',
      placeholder: 'Напишите комментарий...',
    });

    commentTextarea.dataset.itemIdOnComment = item._id

    commentTextarea.addEventListener('blur', (e) => this.handlerCommentTextAreaClick(e))

    const commentsArea = createHtmlElement('div', {className: 'comment-area'})
    this.comments.forEach((comment) => {
      commentsArea.append(this.addComment(comment))
    })
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

    const deleteItemText = createHtmlElement('span', { className: 'deleteItemButtonText', textContent: 'Удалить' });
    const deleteItemButton = createHtmlElement('button', { className: 'deleteItemButton' });
    deleteItemButton.dataset.itemIdInDeleteButton = item._id
    deleteItemButton.addEventListener('click', (e) => this.handlerDeleteItemClick(e))

    deleteItemButton.append(deleteItemText)
    shareButton.append(shareButtonIcon, shareButtonText);
    copyingButton.append(copyingButtonIcon, copyingButtonText);
    movingButton.append(movingButtonIcon, movingButtonText);
    actionsButtons.append(movingButton, copyingButton, shareButton, deleteItemButton);
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
    commentDiv.append(commentHeadDiv, commentForm);
    descriptionHeadDiv.append(descriptionIcon, descriptionHead);
    description.append(descriptionHeadDiv, descriptionTextarea);
    commentHeadDiv.append(commentIcon, commentHead)
    cardDateButton.append(cardDateSpan, cardDateStatus, cardDateArrowIcon);
    cardDateControls.append(cardDateControlsCheckbox, cardDateButton);
    cardDate.append(cardDateHead, cardDateControls);
    notificationButton.append(notificationButtonIcon, notificationButtonText);
    notification.append(notificationHead, notificationButton);
    cardDetailMembersList.append(memberIcon, memberAddButton);
    cardDetailMembers.append(cardDetailMembersHead, cardDetailMembersList);
    mainModal.append(cardDetail, description, commentDiv, commentsArea);
    mainSidebarContainer.append(mainModal, sidebarModal);
    cardDetail.append(cardDetailMembers, notification, cardDate);
    columnText.append(columnLink);
    columnDiv.append(columnText);
    settingsModalHeader.append(headerIcon, headerText);
    settingsModal.append(settingsModalHeader, columnDiv, mainSidebarContainer, closeButton);
    settingsModalContainer.append(settingsModal);

    settingsModalContainer.addEventListener('click', (event) => {
      if (event.target === settingsModalContainer) {
        settingsModalContainer.remove();
      }
    });

    closeButton.addEventListener('click', () => {
      settingsModalContainer.remove();
    });
    return  settingsModalContainer
    // Конец кода - Модальное окно с настройками
  }

  addMarkModal(markButton: HTMLButtonElement): void {
    // todo: Модальное окно метки
    console.log("Модалка Render")
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
  }

  addComment(comment: IComment) {
    const commentWrapper = createHtmlElement('div', { className: 'comment-wrapper' });
    let commentIcon:HTMLDivElement;
    if (comment.userId?.image) {
      commentIcon = createHtmlElement('div', { className: 'comment-icon' });
      const commentImage = createHtmlElement('img', { className: 'comment-icon-image', src: comment.userId.image })
      commentIcon.append(commentImage)
    } else {
      commentIcon = createHtmlElement('div', { className: 'comment-icon currUserIcon' });
    }
    const commentData = createHtmlElement('div', { className: 'comment-data' });
    const commentDataTop = createHtmlElement('div', { className: 'comment-data-top' });
    const commentName = createHtmlElement('div', { className: 'comment-name', textContent: comment.userId.name});
    const commentTime = createHtmlElement('div', { className: 'comment-time', textContent: this.getTime(comment.date)});
    const commentText = createHtmlElement('div', { className: 'comment-text', textContent: comment.description });
    const commentTextArea = createHtmlElement('textarea', { className: 'comment-text-area', value: comment.description });

    const commentControlWrapper = createHtmlElement('div', { className: 'comment-control' });
    commentControlWrapper.dataset.commentId = comment._id
    commentControlWrapper.dataset.itemId = this.currentItem._id
    const commentControlDelete = createHtmlElement('span', { className: 'comment-control-delete', textContent: 'Удалить' });
    const commentControlUpdate = createHtmlElement('span', { className: 'comment-control-update', textContent: 'Обновить' });

    commentControlDelete.addEventListener('click', (e) => this.handlerCommentDeleteClick(e))
    commentControlUpdate.addEventListener('click', (e) => this.handlerCommentUpdateClick(e))
    commentTextArea.addEventListener('blur', (e) => this.handlerCommentUpdateBlur(e))

    commentControlWrapper.append(commentControlDelete, commentControlUpdate)
    commentDataTop.append(commentName, commentTime)
    commentData.append(commentDataTop, commentText, commentTextArea, commentControlWrapper)
    commentWrapper.append(commentIcon, commentData)

    return commentWrapper
  }

  getTime(time: string) {
    return time.split('.')[0].replace('T', ' ')
  }

  subscribe() {
    observer.subscribe({eventName: EventName.updateState, function: this.update.bind(this)})
  }

  update(user: IPartialUser) {
    this.updateModal(user)
  }

  updateModal(user: IPartialUser) {
    const mainContainer: HTMLDivElement = document.querySelector('.settingsModalContainer')
    if (!mainContainer) return
    const itemId = mainContainer.dataset.itemIdOnModal
    if (!itemId) return

    user.workSpace.forEach((ws) => {
      ws.boards.forEach(b => {
        b.lists.forEach(l => {
          l.items.forEach((i) => {
             if (i._id === itemId) {
              this.currentItem = i
              this.comments = i.comments
             }
          })
        })
      })
    })

    mainContainer.remove()
    const modal = this.addModal(this.currentItem)
    document.body.append(modal);
  }



  async handlerCommentTextAreaClick(e: FocusEvent) {
    if (!(e.currentTarget instanceof HTMLTextAreaElement)) return
    try {
      const textArea = e.currentTarget
      const value = textArea.value
  
      const userId = store.user._id
      const itemId = textArea.dataset.itemIdOnComment
    
      await createOne(Path.comment, createCommentPostData(itemId, userId, value))
      const newItem = await readAll(Path.comment, itemId)
      this.comments = await newItem;
      await updateStore()

    }catch(e) {
      console.log('aaaaaaaaaaaaaaaaaaa', e)
    }
    
  }

  async handlerCommentDeleteClick(e: MouseEvent) {
    if (!(e.currentTarget instanceof HTMLSpanElement)) return
    try {
      const commentId = e.currentTarget?.parentElement?.dataset?.commentId
      const itemId = e.currentTarget?.parentElement?.dataset?.itemId
      if (!commentId) return
    
      await deleteOne(Path.comment, commentId, itemId)
      const newItem = await readAll(Path.comment, itemId)
      this.comments = await newItem;
      await updateStore()

    }catch(e) {
      console.log('zzzzzzzz', e)
    }
  }

  handlerCommentUpdateClick(e: MouseEvent) {
    if (!(e.currentTarget instanceof HTMLSpanElement)) return

    const textArea: HTMLTextAreaElement = e.currentTarget?.parentElement?.parentElement?.querySelector('.comment-text-area')
    const text: HTMLDivElement = e.currentTarget?.parentElement?.parentElement?.querySelector('.comment-text')
    if (!textArea || !text) return

    text.classList.toggle('disabled')
    textArea.classList.toggle('active')
  }

  async handlerCommentUpdateBlur(e: FocusEvent) {
    if (!(e.currentTarget instanceof HTMLTextAreaElement)) return
    try {
      const control:HTMLDivElement = e.currentTarget?.parentElement?.querySelector('.comment-control')
      if (!control) return
      const commentId = control.dataset?.commentId
      const itemId = control.dataset?.itemId
      if (!commentId || !itemId) return

      const description = e.currentTarget.value
    
      await updateOne(Path.comment, commentId, createCommentPutData({description}))
      const newItem = await readAll(Path.comment, itemId)
      this.comments = await newItem;
      await updateStore()

    }catch(e) {
      console.log('yyy', e)
    }
  }

  async handlerDescriptionUpdateBlur(e: FocusEvent) {
    if (!(e.currentTarget instanceof HTMLTextAreaElement)) return
    try {
      const itemId = e.currentTarget.dataset?.itemIdInDescription
      if (!itemId) return

      const description = e.currentTarget.value
    
      await updateOne(Path.item, itemId, createItemPutData({description}))
      await updateStore()

    }catch(e) {
      console.log('yyy', e)
    }
  }

  async handlerTitleModalUpdateBlur(e: FocusEvent) {
    if (!(e.currentTarget instanceof HTMLTextAreaElement)) return
    try {
      const itemId = e.currentTarget.dataset?.itemIdInHeaderText
      if (!itemId) return

      const title = e.currentTarget.value
    
      await updateOne(Path.item, itemId, createItemPutData({title}))
      await updateStore()

    }catch(e) {
      console.log('yyy', e)
    }
  }

  async handlerDeleteItemClick(e: MouseEvent) {
    if (!(e.currentTarget instanceof HTMLButtonElement)) return
    try {
    
      const itemId = e.currentTarget.dataset.itemIdInDeleteButton
      if (!itemId) return

      let listId = ''

      store.user.workSpace.forEach(ws => {
        ws.boards.forEach(b => {
          b.lists.forEach(l => {
            l.items.forEach(i => {
              if (i._id === itemId) {
                listId = l._id
              }
            })
          })
        })
      })

      await deleteOne(Path.item, itemId, listId)
      await updateStore()

    }catch(e) {
      console.log('eee', e)
    }
    finally {
      const modal = document.querySelector('.settingsModalContainer')
      if (!modal) return
      modal.remove()
    }

  }
}
