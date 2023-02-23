import { createHtmlElement, getSvgIcon } from '../../helpers/other';
import clockIcon from '../../../images/clock-icon.svg';
import heartIcon from '../../../images/heart-icon.svg';
import { BASE_COLOR } from '../../types/constValues';
import Page from '../../core/page';
import observer from '../../store/observer';
import { EventName, IPartialUser, IWork } from '../../store/types';
import { BoardList } from '../../components/BoardList/BoardList';
import { store } from '../../store/store';
import closeButton from '../../../images/modal-close.inl.svg';
import addBoardPreviewSvg from '../../../images/addBoardModal.inl.svg';


export class MainPage extends Page {
  constructor(id: string) {
    super(id);
    this.subscribe();
  }

  renderContent() {
    const midContentContainer = createHtmlElement('article', {
      className: 'midContent',
    });
    const midAttentionDiv = createHtmlElement('section', {
      className: 'sectionTitle',
    });
    const attentionSpan = createHtmlElement('span', {
      className: 'mid-attentionText',
      textContent: 'Требуют внимания',
    });
    const midImportantEvents = createHtmlElement('section', {
      className: 'sectionTitle',
    });
    const importantEventsSpan = createHtmlElement('span', {
      className: 'mid-importantEventText',
      textContent: 'Важные события',
    });

    midAttentionDiv.append(getSvgIcon(clockIcon, BASE_COLOR), attentionSpan);
    midImportantEvents.append(getSvgIcon(heartIcon, BASE_COLOR), importantEventsSpan);
    midContentContainer.append(midAttentionDiv, midImportantEvents);
    return midContentContainer;
  }

  renderRightSideBar() {
    const rightSidebarContainer = createHtmlElement('div', {
      className: 'right-sidebar',
    });
    const recentlyViewed = createHtmlElement('section', {
      className: 'sectionTitle recentlyViewed',
    });
    const recentlyViewedSpan = createHtmlElement('span', {
      className: 'right-recently-text',
      textContent: 'В избранном',
    });
    
    const rightBoardList = createHtmlElement('div', {
      className: 'right-list-title-wrapper',
    });

    const linksSection = createHtmlElement('section', {
      className: 'sectionLink',
    });
    const linksText = createHtmlElement('span', {
      className: 'right-linksText',
      textContent: 'Ссылки',
    });
    const createBoardDiv = createHtmlElement('div', {
      className: 'right-linksButtonDiv',
    });
    const buttonCreateBoard = createHtmlElement('button', {
      className: 'right-linksButton',
      innerHTML: `
    <span class="buttonPlus">+</span>
    <span class="buttonText">Создать доску</span>
    `,
    });

    createBoardDiv.append(buttonCreateBoard);
    rightBoardList.append(getSvgIcon(clockIcon, BASE_COLOR), recentlyViewedSpan)
    recentlyViewed.append(rightBoardList);

    let boards = store.user.favoriteBoards
    if (!boards) boards = []
    const list = new BoardList(boards).getList()
    recentlyViewed.append(list)

    linksSection.append(linksText, createBoardDiv);
    rightSidebarContainer.append(recentlyViewed, linksSection);

    // Модалка создание доски
    const createBoardModal = createHtmlElement('section', {className: 'createBoardModal'});
    const createBoardHeader = createHtmlElement('header', {className: 'createBoardHeader'});
    const createBoardHeadText = createHtmlElement('h2', {className: 'createBoardHeadText', textContent: 'Создать доску'});
    const createBoardHeadClose = createHtmlElement('button', { className: 'createBoardCloseBtn', innerHTML: closeButton });
    const createBoardContent = createHtmlElement('div', {className: 'createBoardContent'});
    const createBoardPreviewContainer = createHtmlElement('div', {className: 'createBoardPreviewContainer'});
    const createBoardPreviewDiv = createHtmlElement('div', {className: 'createBoardPreviewDiv'});
    const createBoardPreviewSvg = createHtmlElement('div', {className: 'createBoardPreviewSvg', innerHTML: addBoardPreviewSvg});

    const createBoardBackgroundContainer = createHtmlElement('div', {className: 'createBoardBackgroundContainer'});
    const createBoardBackgroundHead = createHtmlElement('span', {className: 'createBoardBackgroundHead', textContent: 'Фон'});
    const backgroundPicker = createHtmlElement('div', {className: 'backgroundPicker'});
    const backgroundPickerImages = createHtmlElement('ul', {className: 'createBoardList backgroundPickerImagesList'});
    const backgroundPickerColor = createHtmlElement('ul', {className: 'createBoardList backgroundPickerColorList'});
    const imagesArr: string[] = [
      'https://live.staticflickr.com/65535/52682453673_e81dae0a3b_b.jpg',
      'https://live.staticflickr.com/65535/52681301262_609c1be2f4_b.jpg',
      'https://live.staticflickr.com/65535/52681300682_a935bf6cfb_b.jpg'];
    const colorsArr: string[] = ['rgb(0, 121, 191)', 'rgb(137, 96, 158)', 'rgb(81, 152, 57)'];
    for (let i = 0; i < 3; i++) {
      const backgroundPickerImagesItem = createHtmlElement('li', {className: 'backgroundPickerImagesItem'});
      const backgroundPickerColorItem = createHtmlElement('li', {className: 'backgroundPickerColorItem'});
      const buttonImage = createHtmlElement('button', {className: 'createBoardBackgroundBtn backgroundPickerImageBtn', style: `background-image: url(${imagesArr[i]})`});
      const buttonColor = createHtmlElement('button', {className: 'createBoardBackgroundBtn backgroundPickerColorBtn', style: `background-color: ${colorsArr[i]}`});

      buttonImage.addEventListener('click', () => {
        createBoardPreviewDiv.style.backgroundColor = '';
        createBoardPreviewDiv.style.backgroundImage = buttonImage.style.backgroundImage;
      })

      buttonColor.addEventListener('click', () => {
        createBoardPreviewDiv.style.backgroundImage = '';
        createBoardPreviewDiv.style.backgroundColor = buttonColor.style.backgroundColor;
      })

      backgroundPickerImagesItem.append(buttonImage);
      backgroundPickerColorItem.append(buttonColor);
      backgroundPickerImages.append(backgroundPickerImagesItem);
      backgroundPickerColor.append(backgroundPickerColorItem);
    }

    const createBoardForm = createHtmlElement('form', {className: 'createBoardForm'});
    const createBoardHeaderDiv = createHtmlElement('div', {className: 'createBoardHeaderDiv'});
    const createBoardHeaderLabel = createHtmlElement('label', {className: 'createBoardHeaderLabel', textContent: 'Заголовок доски'});
    createBoardHeaderLabel.setAttribute('for', 'createBoardHeader');
    const createBoardHeaderInput = createHtmlElement('input', {className: 'createBoardHeaderInput', id: 'createBoardHeader', type: 'text', required: true});

    const checkBoardHeaderInput = createHtmlElement('div', {className: 'checkBoardHeaderInput'});
    const checkBoardHeaderInputImg = createHtmlElement('span', {className: 'checkBoardHeaderInputImg', textContent: '👋'});
    const checkBoardHeaderInputText = createHtmlElement('p', {className: 'checkBoardHeaderInputText', textContent: 'Укажите название доски.'});

    const choseWorkspace = createHtmlElement('div', {className: 'createBoardChoseWorkspace'});
    const choseWorkspaceLabel = createHtmlElement('label', {className: 'createBoardChoseWorkspaceLabel', textContent: 'Рабочее пространство'});
    const choseWorkspaceSelect = createHtmlElement('select', {className: 'createBoardChoseWorkspaceSelect'});
    let workspaces: IWork[] = store.user.workSpace;
    if (!workspaces || workspaces.length === 0) {
      const choseWorkspaceOption = createHtmlElement('option', { textContent: 'Создайте рабочее пространство' });
      choseWorkspaceOption.selected = true;
      choseWorkspaceSelect.disabled = true;
      choseWorkspaceSelect.append(choseWorkspaceOption);
    } else {
      workspaces.forEach((e, index) => {
        const choseWorkspaceOption = createHtmlElement('option', { textContent: e.title });
        if(index === 0) {
          choseWorkspaceOption.selected = true;
        }
        choseWorkspaceSelect.append(choseWorkspaceOption);
      });
    }
    const createBoardBtnSubmit = createHtmlElement('button', {className: 'createBoardBtnSubmit', textContent: 'Создать', type: 'button', disabled: true});
    if(!createBoardHeaderInput.value.length && choseWorkspaceSelect.value !== 'Создайте рабочее пространство') {
      createBoardBtnSubmit.disabled = false;
    }

    choseWorkspace.append(choseWorkspaceLabel, choseWorkspaceSelect)
    checkBoardHeaderInput.append(checkBoardHeaderInputImg, checkBoardHeaderInputText);
    createBoardHeaderDiv.append(createBoardHeaderLabel, createBoardHeaderInput);
    createBoardForm.append(createBoardHeaderDiv, checkBoardHeaderInput, choseWorkspace, createBoardBtnSubmit);

    backgroundPicker.append(backgroundPickerImages, backgroundPickerColor);
    createBoardBackgroundContainer.append(createBoardBackgroundHead, backgroundPicker);

    createBoardPreviewDiv.append(createBoardPreviewSvg);
    createBoardPreviewContainer.append(createBoardPreviewDiv);

    createBoardContent.append(createBoardPreviewContainer, createBoardBackgroundContainer, createBoardForm);
    createBoardHeader.append(createBoardHeadText, createBoardHeadClose);
    createBoardModal.append(createBoardHeader, createBoardContent);

    createBoardHeaderInput.addEventListener('input', () => {
      if(!createBoardHeaderInput.value.length) {
        checkBoardHeaderInput.style.display = 'block';
      } else {
        checkBoardHeaderInput.style.display = 'none';
      }
    })

    buttonCreateBoard.addEventListener('click', () => {
      if(createBoardDiv.contains(createBoardModal)) {
        createBoardModal.remove();
      } else {
        createBoardDiv.append(createBoardModal);
      }
    })

    return rightSidebarContainer;
  }

  render(): HTMLDivElement {
    this.container.append(this.renderContent(), this.renderRightSideBar());
    return this.container;
  }

  subscribe(): void {
    observer.subscribe({eventName: EventName.updateState, function: this.renderFavoriteList.bind(this)})
  }

  renderFavoriteList(store: IPartialUser) {
    console.log('запустилась функция на оповещение наблюдателя')
    const section = document.querySelector('.sectionTitle.recentlyViewed')
    const oldUl = section.querySelector('.right-list-ul')
    oldUl?.remove()
    
    if (!section) return
    const boards = store.favoriteBoards
    const list = new BoardList(boards).getList()
    section.append(list)
  }

}
