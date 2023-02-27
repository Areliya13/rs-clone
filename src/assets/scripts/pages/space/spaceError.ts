import { createHtmlElement } from '../../helpers/other';

class SpaceError {
  renderErrorMessage(): HTMLDivElement {
    const container = createHtmlElement('div');
    const message = createHtmlElement('h1', { textContent: 'Что-то пошло не так!' });
    container.append(message);
    return container;
  }
}

export default SpaceError;
