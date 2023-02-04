import { createHtmlElement } from '../../helpers/other';
import { menuItems } from '../../types/constValues';

export class Header {
  render(): HTMLDivElement {
    const container = createHtmlElement('div', {
      className: 'header-container',
    });
    container.append(this.leftMenu(), this.rightMenu());
    return container;
  }

  leftMenu(): HTMLDivElement {
    const container = createHtmlElement('div', {
      className: 'left-container',
    });
    const menuButton = createHtmlElement('button', { className: 'menu-bar' });
    const innerImg = createHtmlElement('span', { className: 'menu-image' });
    const logo = createHtmlElement('div', { className: 'logo' });
    const navigation = this.createNav();
    const createButton = createHtmlElement('button', { className: 'create-button', textContent: 'Создать' });
    menuButton.append(innerImg);
    container.append(menuButton, logo, navigation, createButton);
    return container;
  }

  createNav(): HTMLElement {
    const nav = createHtmlElement('nav', { className: 'nav-list' });
    for (let i = 0; i < menuItems.length; i++) {
      const element = menuItems[i];
      const item = createHtmlElement('li', { className: 'nav-item' });
      const link = createHtmlElement('a', { textContent: element[0], href: element[1], className: 'nav-link' });
      const span = createHtmlElement('span', { className: 'nav-img' });
      item.append(link, span);
      nav.append(item);
    }
    return nav;
  }

  rightMenu(): HTMLDivElement {
    const container = createHtmlElement('div', {
      className: 'right-container',
    });

    const form = createHtmlElement('form');
    const input = createHtmlElement('input');
    const bellIcon = createHtmlElement('div', { className: 'header-icon bellIcon' });
    const infoIcon = createHtmlElement('div', { className: 'header-icon infoIcon' });
    const userIcon = createHtmlElement('div', { className: 'header-icon userIcon', textContent: 'AA' }); //to-do add user initials
    form.append(input);
    container.append(form);
    return container;
  }
}
