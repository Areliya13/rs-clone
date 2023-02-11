import { createHtmlElement, getSvgIcon } from '../../helpers/other';
import boardsIcon from '../../../images/trello-icon.svg';
import templatesIcon from '../../../images/trello2-icon.svg';
import mainIcon from '../../../images/trello3-icon.svg';
import modalImage from '../../../images/modal-image.inl.svg';
import closeButton from '../../../images/modal-close.inl.svg';
import { ALT_COLOR, BASE_COLOR, leftSidebarButtons } from '../../types/constValues';
import upSvg from '../../../images/up.inl.svg';
import downSvg from '../../../images/down.inl.svg';
import workspaceBoardIcon from '../../../images/boards.inl.svg';
import importantIcon from '../../../images/heart-icon.inl.svg';
import presentationIcon from '../../../images/presentation.inl.svg';
import membersIcon from '../../../images/members.inl.svg';
import settingsIcon from '../../../images/settings.inl.svg';

class LeftSideBar {

  constructor(public id: string) {
    this.id = id;
  }

  renderLeftSide(): HTMLElement {
    const leftSidebarContainer = createHtmlElement('aside', {
      className: 'left-containerMain',
    });
    const unList = createHtmlElement('ul', { className: 'sidebarMain' });
    const icons = [boardsIcon, templatesIcon, mainIcon];
    for (let i = 0; i < leftSidebarButtons.length; i++) {
      const itemList = createHtmlElement('li', { className: 'listItem' });
      const itemLink = createHtmlElement('a', {
        className: 'itemLink',
        href: leftSidebarButtons[i][1],
      });
      let itemIcon: SVGSVGElement;
      const itemName = leftSidebarButtons[i][0];
      if (leftSidebarButtons[i][1].slice(1) === this.id) {
        itemLink.classList.add('current');
        itemIcon = getSvgIcon(icons[i], ALT_COLOR, 'icon icon-current');
      } else {
        itemIcon = getSvgIcon(icons[i], BASE_COLOR);
      }
      itemLink.append(itemIcon, itemName);
      itemList.append(itemLink);
      unList.append(itemList);
    }

    const workspacesDiv = createHtmlElement('div', { className: 'workspacesDiv' });
    const workspaceHead = createHtmlElement('div', { className: 'workspaceHead' });
    const workspaceSpan = createHtmlElement('span', {
      className: 'workspaceText',
      textContent: 'Рабочие пространства',
    });
    const workspaceButtonAdd = createHtmlElement('button', { className: 'icon workspaceAddBtn', textContent: '+' });
    workspaceHead.append(workspaceSpan, workspaceButtonAdd);
    workspacesDiv.append(workspaceHead);

    const workspaceModalContainer = createHtmlElement('div', { className: 'workspaceModalContainer' });
    const workspaceModal = createHtmlElement('div', { className: 'workspaceModal' });
    const leftSideModalDiv = createHtmlElement('div', { className: 'modal-leftSide' });
    const rightSideModalDiv = createHtmlElement('div', { className: 'modal-rightSide' });
    const form = createHtmlElement('form', {
      className: 'modal-form',
      innerHTML: `
    <span class="form-head">Создайте рабочее пространство</span>
    <span class="form-text">Повысьте производительность: участники команды смогут получать удобный доступ ко всем доскам.</span>
    `,
    });
    const labelWorkspace = createHtmlElement('label', {
      className: 'modalHead workspaceLabel',
      for: 'workspaceInput',
      textContent: 'Название рабочего пространства',
    });
    const inputWorkspace = createHtmlElement('input', {
      id: 'workspaceInput',
      type: 'text',
      maxLength: '100',
      placeholder: 'Компания «Тако»',
      required: true,
    });
    const spanWorkspaceHelp = createHtmlElement('span', {
      className: 'workspaceHelp',
      textContent: 'Укажите название вашей команды, компании или организации.',
    });
    const headChooseActivity = createHtmlElement('span', {
      className: 'modalHead activityHead',
      textContent: 'Тип рабочего пространства',
    });
    const selectChooseActivity = createHtmlElement('select', { className: 'activitySelect', required: true });
    const selectArray = [
      'Выбрать...',
      'Продажи CRM',
      'Образование',
      'Инженерия/ИТ',
      'Операции',
      'Управление персоналом',
      'Малый бизнес',
      'Маркетинг',
      'Другое',
    ];
    for (let i = 0; i < selectArray.length; i++) {
      const selectOption = createHtmlElement('option', { textContent: selectArray[i] });
      if (i === 0) {
        selectOption.selected = true;
        selectOption.disabled = true;
      }
      selectChooseActivity.append(selectOption);
    }
    const headDescription = createHtmlElement('span', {
      className: 'modalHead descriptionHead',
      innerHTML: `
    Описание рабочего пространства
    <span class="descriptionHead-additional">Необязательно</span>
    `,
    });
    const textareaDescription = createHtmlElement('textarea', {
      className: 'descriptionTextarea',
      placeholder: 'Здесь наша команда хранит всю нужную информацию',
      rows: '6',
    });
    const spanDescriptionHelp = createHtmlElement('span', {
      className: 'descriptionHelp',
      textContent: 'Расскажите участникам немного о рабочем пространстве.',
    });
    const buttonContinue = createHtmlElement('button', {
      className: 'form-continue',
      type: 'submit',
      disabled: true,
      textContent: 'Продолжить',
    });
    form.append(
      labelWorkspace,
      inputWorkspace,
      spanWorkspaceHelp,
      headChooseActivity,
      selectChooseActivity,
      headDescription,
      textareaDescription,
      spanDescriptionHelp,
      buttonContinue
    );
    leftSideModalDiv.append(form);

    const svgModalImage = createHtmlElement('div', { innerHTML: modalImage });
    rightSideModalDiv.append(svgModalImage);

    const closeModalButton = createHtmlElement('button', { className: 'modal-close', innerHTML: closeButton });

    workspaceModal.append(leftSideModalDiv, rightSideModalDiv, closeModalButton);
    workspaceModalContainer.append(workspaceModal);

    workspaceButtonAdd.addEventListener('click', () => {
      document.body.append(workspaceModalContainer);
    });

    workspaceModalContainer.addEventListener('click', (event) => {
      if (event.target === workspaceModalContainer) {
        workspaceModalContainer.remove();
      }
    });

    closeModalButton.addEventListener('click', () => {
      workspaceModalContainer.remove();
    });

    const workspace = createHtmlElement('div', {className: 'workspace'});
    const workspaceHeader = createHtmlElement('a', {className: 'workspaceHeader', href: '#'});
    const workspaceName = createHtmlElement('span', {className: 'workspaceName', textContent: 'Тестовое рабочее пространство'})
    const workspaceIcon = createHtmlElement('div', {className: 'workspaceIcon', textContent: `${workspaceName.textContent[0].toUpperCase()}`});
    const workspaceArrow = createHtmlElement('div', {className: 'workspaceArrow', innerHTML: upSvg});
    workspaceHeader.append(workspaceIcon, workspaceName, workspaceArrow);
    workspace.append(workspaceHeader);
    workspacesDiv.append(workspace);

    const workspaceOptionsList = createHtmlElement('ul', {className: 'workspaceOptionsList'});
    const workspaceOptionsArray = [
      [workspaceBoardIcon, 'Доски', '#home'],
      [importantIcon, 'Важные события', '#'],
      [presentationIcon, 'Представления', '#'],
      [membersIcon, 'Участники', '#'],
      [settingsIcon, 'Настройки', '#'],
    ];
    workspaceOptionsArray.map(e => {
      const listItem = createHtmlElement('li', {className: 'workspaceListItem'});
      const itemLink = createHtmlElement('a', {className: 'workspaceItemLink', href: e[2]});
      if(this.id === e[2].slice(1)) {
        itemLink.classList.add('current');
      }
      const linkIcon = createHtmlElement('div', {className: 'workspaceLinkIcon', innerHTML: e[0]});
      const linkText = createHtmlElement('span', {className: 'workspaceLinkText', textContent: e[1]});
      const membersPlusSpan = createHtmlElement('span', {className: 'icon membersPlusSymbol', textContent: '+'});
      const symbolItem = createHtmlElement('span', {className: 'icon symbolItem', textContent: '>'})
      if(e[1] === 'Участники') {
        itemLink.append(linkIcon, linkText, membersPlusSpan);
      } else {
        itemLink.append(linkIcon, linkText);
      }
      if(e[1] === workspaceOptionsArray[2][1] || e[1] === workspaceOptionsArray[3][1] || e[1] === workspaceOptionsArray[4][1]) {
        itemLink.append(symbolItem);
      }
      listItem.append(itemLink);
      workspaceOptionsList.append(listItem);
    })
    workspace.append(workspaceOptionsList);

    workspaceHeader.addEventListener('click', (event) => {
      event.preventDefault();
      if(workspaceArrow.innerHTML === upSvg) {
        workspaceOptionsList.remove()
        workspaceArrow.innerHTML = downSvg;
      } else {
        workspace.append(workspaceOptionsList);
        workspaceArrow.innerHTML = upSvg;
      }
    })

    leftSidebarContainer.append(unList, workspacesDiv);
    return leftSidebarContainer;
  }
}

export default LeftSideBar;
