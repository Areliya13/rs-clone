import { createHtmlElement, getSvgIcon } from '../../helpers/other';
import boardsIcon from '../../../images/trello-icon.svg';
import templatesIcon from '../../../images/trello2-icon.svg';
import mainIcon from '../../../images/trello3-icon.svg';
import { ALT_COLOR, BASE_COLOR } from '../../types/constValues';
import modalImage from '../../../images/modal-image.inl.svg';
import closeButton from '../../../images/modal-close.inl.svg';

class Main {
  content: HTMLElement;

  constructor() {
    this.content = createHtmlElement('main', {className: 'main'});
  }

  createLeftSidebar = (): HTMLElement => {
    const leftSidebarContainer = createHtmlElement('aside', {className: 'boards'});
    const unList = createHtmlElement('ul', {className: 'sidebarMain'});
    const buttonsName = ['Доски', 'Шаблоны', 'Главная страница'];
    const icons = [boardsIcon, templatesIcon, mainIcon];
    for (let i = 0; i < 3; i++) {
      const itemList = createHtmlElement('li', {className: 'listItem'});
      const itemLink = createHtmlElement('a', {className: 'itemLink', href: '#'});
      let itemIcon: SVGSVGElement;
      const itemName = buttonsName[i];
      if(buttonsName[i] === 'Главная страница') {
        itemLink.classList.add('current');
        itemIcon = getSvgIcon(icons[i], ALT_COLOR, 'icon icon-current');
      } else {
        itemIcon = getSvgIcon(icons[i], BASE_COLOR);
      }
      itemLink.append(itemIcon, itemName);
      itemList.append(itemLink);
      unList.append(itemList);
    }

    const workspacesDiv = createHtmlElement('div', {className: 'workspacesDiv'});
    const workspaceHead = createHtmlElement('div', {className: 'workspaceHead'});
    const workspaceSpan = createHtmlElement('span', {className: 'workspaceText', textContent: 'Рабочие пространства'});
    const workspaceButtonAdd = createHtmlElement('button', {className: 'icon workspaceAddBtn', textContent: '+'});
    workspaceHead.append(workspaceSpan, workspaceButtonAdd);
    workspacesDiv.append(workspaceHead);

    const workspaceModalContainer = createHtmlElement('div', {className: 'workspaceModalContainer'});
    const workspaceModal = createHtmlElement('div', {className: 'workspaceModal'});
    const leftSideModalDiv = createHtmlElement('div', {className: 'modal-leftSide'});
    const rightSideModalDiv = createHtmlElement('div', {className: 'modal-rightSide'});
    const form = createHtmlElement('form', {className: 'modal-form', innerHTML: `
    <span class="form-head">Создайте рабочее пространство</span>
    <span class="form-text">Повысьте производительность: участники команды смогут получать удобный доступ ко всем доскам.</span>
    `});
    const labelWorkspace = createHtmlElement('label', {className: 'modalHead workspaceLabel', for: 'workspaceInput', textContent: 'Название рабочего пространства'});
    const inputWorkspace = createHtmlElement('input', {id: 'workspaceInput', type: 'text', maxLength: '100', placeholder: 'Компания «Тако»', required: true});
    const spanWorkspaceHelp = createHtmlElement('span', {className: 'workspaceHelp', textContent: 'Укажите название вашей команды, компании или организации.'});
    const headChooseActivity = createHtmlElement('span', {className: 'modalHead activityHead', textContent: 'Тип рабочего пространства'});
    const selectChooseActivity = createHtmlElement('select', {className: 'activitySelect', required: true, innerHTML: `
    <option selected disabled>Выбрать...</option>
    <option>Продажи CRM</option>
    <option>Образование</option>
    <option>Инженерия/ИТ</option>
    <option>Операции</option>
    <option>Управление персоналом</option>
    <option>Малый бизнес</option>
    <option>Маркетинг</option>
    <option>Другое</option>
    `});
    const headDescription = createHtmlElement('span', {className: 'modalHead descriptionHead', innerHTML: `
    Описание рабочего пространства
    <span class="descriptionHead-additional">Необязательно</span>
    `});
    const textareaDescription = createHtmlElement('textarea', {
      className: 'descriptionTextarea',
      placeholder: 'Здесь наша команда хранит всю нужную информацию',
      rows: '6'});
    const spanDescriptionHelp = createHtmlElement('span', {className: 'descriptionHelp', textContent: 'Расскажите участникам немного о рабочем пространстве.'});
    const buttonContinue = createHtmlElement('button', {className: 'form-continue', type: 'submit', disabled: true, textContent: 'Продолжить'});
    form.append(labelWorkspace, inputWorkspace, spanWorkspaceHelp, headChooseActivity, selectChooseActivity, headDescription, textareaDescription, spanDescriptionHelp, buttonContinue);
    leftSideModalDiv.append(form)

    const svgModalImage = createHtmlElement('div', {innerHTML: modalImage})
    rightSideModalDiv.append(svgModalImage);

    const closeModalButton = createHtmlElement('button', {className: 'modal-close', innerHTML: closeButton})

    workspaceModal.append(leftSideModalDiv, rightSideModalDiv, closeModalButton);
    workspaceModalContainer.append(workspaceModal);

    workspaceButtonAdd.addEventListener('click', () => {
      this.content.append(workspaceModalContainer);
    })

    workspaceModalContainer.addEventListener('click', (event) => {
      if(event.target === workspaceModalContainer) {
        workspaceModalContainer.remove();
      }
    })

    closeModalButton.addEventListener('click', () => {
      workspaceModalContainer.remove();
    })

    leftSidebarContainer.append(unList, workspacesDiv);
    return leftSidebarContainer;
  }

  createWorkspaceModal() {

  }

  render() {
    this.content.append(this.createLeftSidebar());
    document.body.append(this.content);
  }
}

export default Main;