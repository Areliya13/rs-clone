import { createHtmlElement } from '../../helpers/other';

class SpaceError {
  renderErrorMessage(): HTMLDivElement {
    const container = createHtmlElement('div');
    const message = createHtmlElement('h1', { textContent: 'There is no such a page!' });
    container.append(message);
    return container;
  }
}

export default SpaceError;
