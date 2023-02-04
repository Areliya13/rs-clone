import { createHtmlElement, getSvgIcon } from '../../helpers/other';
import clockIcon from '../../../images/clock-icon.svg';
import heartIcon from '../../../images/heart-icon.svg';
import { BASE_COLOR } from '../../types/constValues';

export class MainBoards {
  render() {
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
    midImportantEvents.append(
      getSvgIcon(heartIcon, BASE_COLOR),
      importantEventsSpan
    );
    midContentContainer.append(midAttentionDiv, midImportantEvents);
    return midContentContainer;
  }
}
