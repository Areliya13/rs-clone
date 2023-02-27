import { createHtmlElement } from '../../helpers/other';
import closeButton from '../../../images/modal-close.inl.svg';
import addBoardPreviewSvg from '../../../images/addBoardModal.inl.svg';
import currentBackgroundMark from '../../../images/currentBackgroundMark.inl.svg';
import { EventName, IPartialUser, IUser, IWork } from '../../store/types';
import { store } from '../../store/store';
import observer from '../../store/observer';
import { createOne } from '../../api/rest/createOne';
import { Path } from '../../api/types';
import { createBoardPostData } from '../../api/rest/utils/createPostData';
import { updateStore } from '../../store/updateStore';

const imagesArr: string[] = [
  'https://live.staticflickr.com/65535/52682453673_e81dae0a3b_b.jpg',
  'https://live.staticflickr.com/65535/52681301262_609c1be2f4_b.jpg',
  'https://live.staticflickr.com/65535/52681300682_a935bf6cfb_b.jpg'];
const colorsArr: string[] = ['rgb(0, 121, 191)', 'rgb(137, 96, 158)', 'rgb(81, 152, 57)'];

export class ModalCreateBoard {
  constructor() {
    this.subscribe();
  }
  getModal() {
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
    createBoardPreviewDiv.style.backgroundImage = `url(${imagesArr[0]})`;
    const currentBackground = createHtmlElement('div', {className: 'currentBackground', innerHTML: currentBackgroundMark});
    
    for (let i = 0; i < 3; i++) {
      const backgroundPickerImagesItem = createHtmlElement('li', {className: 'backgroundPickerImagesItem'});
      const backgroundPickerColorItem = createHtmlElement('li', {className: 'backgroundPickerColorItem'});
      const buttonImage = createHtmlElement('button', {className: 'createBoardBackgroundBtn backgroundPickerImageBtn', style: `background-image: url(${imagesArr[i]})`});
      if(i === 0) {
        currentBackground.dataset.bId = `${i}`
        currentBackground.dataset.cId = ''
        buttonImage.append(currentBackground);
      }
      const buttonColor = createHtmlElement('button', {className: 'createBoardBackgroundBtn backgroundPickerColorBtn', style: `background-color: ${colorsArr[i]}`});

      buttonImage.addEventListener('click', () => {
        currentBackground.remove();
        createBoardPreviewDiv.style.backgroundColor = '';
        createBoardPreviewDiv.style.backgroundImage = buttonImage.style.backgroundImage;
        currentBackground.dataset.bId = `${i}`
        currentBackground.dataset.cId = ''
        buttonImage.append(currentBackground);
      })

      buttonColor.addEventListener('click', () => {
        currentBackground.remove();
        createBoardPreviewDiv.style.backgroundImage = '';
        createBoardPreviewDiv.style.backgroundColor = buttonColor.style.backgroundColor;
        currentBackground.dataset.cId = `${i}`
        currentBackground.dataset.bId = ''
        buttonColor.append(currentBackground);
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
    createBoardHeaderInput.addEventListener('input', (e) => this.handlerInputChange(e))

    const checkBoardHeaderInput = createHtmlElement('div', {className: 'checkBoardHeaderInput'});
    const checkBoardHeaderInputImg = createHtmlElement('span', {className: 'checkBoardHeaderInputImg', textContent: '👋'});
    const checkBoardHeaderInputText = createHtmlElement('p', {className: 'checkBoardHeaderInputText', textContent: 'Укажите название доски.'});

    const choseWorkspace = createHtmlElement('div', {className: 'createBoardChoseWorkspace'});
    const choseWorkspaceLabel = createHtmlElement('label', {className: 'createBoardChoseWorkspaceLabel', textContent: 'Рабочее пространство'});
    let workspaces: IWork[] = store.user.workSpace;
    if(!workspaces) {
      workspaces = []
    }
    const choseWorkspaceSelect = this.getNewWorkspaceData(workspaces)
    const createBoardBtnSubmit = createHtmlElement('button', {className: 'createBoardBtnSubmit', textContent: 'Создать', type: 'button', disabled: true});

    createBoardBtnSubmit.addEventListener('click', (e) => this.handlerAddBoardButtonClick(e))

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

    createBoardHeadClose.addEventListener('click', () => {
      createBoardModal.remove();
    })

    return createBoardModal
  }

  subscribe(): void {
    observer.subscribe({eventName: EventName.updateState, function: this.update.bind(this)})
  }

  update(user: IPartialUser) {
    // this.getNewWorkspaceData(user.workSpace)
  }

  getNewWorkspaceData(store: IWork[]) {
    const choseWorkspaceSelect = createHtmlElement('select', {className: 'createBoardChoseWorkspaceSelect'});

    if (store.length === 0) {
      const choseWorkspaceOption = createHtmlElement('option', { textContent: 'Создайте рабочее пространство' });
      choseWorkspaceOption.selected = true;
      choseWorkspaceSelect.disabled = true;
      choseWorkspaceSelect.append(choseWorkspaceOption);
    } else {
      store.forEach((e, index) => {
        const choseWorkspaceOption = createHtmlElement('option', { textContent: e.title, value: e._id });
        choseWorkspaceOption.dataset.workSpaceId = e._id
        if(index === 0) {
          choseWorkspaceOption.selected = true;
        }
        choseWorkspaceSelect.append(choseWorkspaceOption);
      });
    }

    return choseWorkspaceSelect
  }

  handlerInputChange(e: Event) {
    if (!(e.currentTarget instanceof HTMLInputElement)) return
    const button: HTMLButtonElement = document.querySelector('.createBoardBtnSubmit')
    const input = e.currentTarget
    if (input.value.length !== 0) {
      button.disabled = false
    }

  }

  async handlerAddBoardButtonClick(e: MouseEvent) {
    if (!(e.currentTarget instanceof HTMLButtonElement)) return
    const select: HTMLSelectElement = document.querySelector('.createBoardChoseWorkspaceSelect')
    const input: HTMLInputElement = document.querySelector('#createBoardHeader')
    if (!select || !input) return

    const workSpaceId = select.value
    const title = input.value
    console.log(workSpaceId, title)

    const currentBg:HTMLDivElement = document.querySelector('.currentBackground')
    const cId = currentBg.dataset.cId
    const bId = currentBg.dataset.bId

    if (!cId && !bId) return 

    if (cId) {
      const color = colorsArr[Number(cId)]
      await createOne(Path.board, createBoardPostData({workSpaceId, title, color}))
    } 

    if (bId) {
      const image = imagesArr[Number(bId)]
      await createOne(Path.board, createBoardPostData({workSpaceId, title, image}))
    }

    await updateStore()
    const modal = document.querySelector('.createBoardModal')
    if (modal) {
      modal.remove()
    }
  }
}