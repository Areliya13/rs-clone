import Page from '../../core/page';
import { createHtmlElement } from '../../helpers/other';
import template1 from '../../../images/template1.jpg';
import template2 from '../../../images/template2.jpg';
import template3 from '../../../images/template3.jpg';

export class Templates extends Page{
  constructor(id: string) {
    super(id)
  }

  renderTemplates(): HTMLElement {
    const templatesContent = createHtmlElement('article', {
      className: 'templatesContent'
    });

    const templatesHead = createHtmlElement('h2', {className: 'templatesHead', textContent: 'Избранные шаблоны'});
    const templatesContainer = createHtmlElement('div', {className: 'templatesContainer'});
    const templatesArray = [
      [template1, 'New Hire Onboarding', '#'],
      [template2, 'Daily Task Management Template | Trello', '#'],
      [template3, 'Weekly Meeting Template', '#'],
    ];
    templatesArray.map(e => {
      const templateDiv = createHtmlElement('div', {className: 'templateDiv'});
      const templateLink = createHtmlElement('a', {className: 'templateLink', href: e[2], title: e[1]});
      templateDiv.append(templateLink);

      const templateImage = createHtmlElement('div', {className: 'templateDescriptionImage'});
      templateImage.style.cssText = `
      background-image: url("${e[0]}");
      background-size: cover;
      background-position: center center
      `
      const templateDescriptionDiv = createHtmlElement('div', {className: 'templateDescriptionDiv'});
      const templateDescriptionHead = createHtmlElement('h3', {className: 'templateDescriptionHead', textContent: e[1]});
      templateDescriptionDiv.append(templateDescriptionHead);
      templateLink.append(templateImage, templateDescriptionDiv);

      templateDiv.append(templateLink);
      templatesContainer.append(templateDiv);
    })

    templatesContent.append(templatesHead, templatesContainer);
    return templatesContent;
  }

  render(): HTMLDivElement {
    this.container.append(this.renderTemplates());
    return this.container;
  }
}