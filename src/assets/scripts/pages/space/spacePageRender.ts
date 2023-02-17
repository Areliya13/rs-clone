import { createHtmlElement } from '../../helpers/other';
import Page from '../../core/page';
import SpaceMenu from './spaceMenu';
import { spaceMode } from '../../types/enum';
import SpaceError from './spaceError';
import { BoardContent } from './boardContent';
import { Options } from '../../types/types';
import { IBoard, IWork } from '../../store/types';
import { store } from '../../store/store';

export class SpacePageRender extends Page {
  mode: spaceMode;
  menu: SpaceMenu;
  workspace: IWork | undefined;
  board: IBoard | undefined;
  content: HTMLDivElement;
  options: Options;
  constructor(id: string, options: Options) {
    super(id);
    this.mode = spaceMode.error;
    this.options = options;
  }

  render() {
    const mode = this.options.get('mode');
    this.content = new SpaceError().renderErrorMessage();
    this.content = new SpaceError().renderErrorMessage();
    if (!mode || mode === spaceMode.board) {
      this.mode = spaceMode.board;
      if (store.user.workSpace) {
        this.workspace = store.user.workSpace.find((val) => val._id === this.options.get('workspaceID'));
        if (this.workspace) {
          this.board = this.workspace.boards.find((val) => val._id === this.options.get('boardID'));
          this.content = new BoardContent().renderContent(this.board);
        }
      }
    }
    this.menu = new SpaceMenu();
    const container = createHtmlElement('div');
    const background = createHtmlElement('div', { className: 'background' });

    background.append(this.menu.renderLeftSide(this.workspace, this.board), this.content);
    container.append(background);
    return container;
  }
}
