import { createHtmlElement } from '../../helpers/other';
import Page from '../../core/page';
import SpaceMenu from './spaceMenu';
import { getSpaceOptions } from '../../helpers/functions';
import { spaceMode } from '../../types/enum';
import SpaceError from './spaceError';
import { BoardContent } from './boardContent';

export class SpacePageRender extends Page {
  mode: spaceMode;
  menu: SpaceMenu;
  content: HTMLDivElement;
  constructor(id: string) {
    super(id);
    this.mode = spaceMode.error;
  }

  render() {
    const options = getSpaceOptions();
    const mode = options.get('mode');
    this.content = new SpaceError().renderErrorMessage();
    if (!mode || mode === spaceMode.board) {
      this.mode = spaceMode.board;
      this.content = new BoardContent().renderContent();
    } else {
      this.mode = spaceMode.error;
    }
    this.menu = new SpaceMenu();
    const container = createHtmlElement('div');
    const background = createHtmlElement('div', { className: 'background' });

    background.append(this.menu.renderLeftSide(), this.content);
    container.append(background);
    return container;
  }
}
