import { createHtmlElement } from '../../helpers/other';
import Page from '../../core/page';
import SpaceMenu from './spaceMenu';
import { spaceMode } from '../../types/enum';
import SpaceError from './spaceError';
import { BoardContent } from './boardContent';
import { Options } from '../../types/types';
import { EventName, IBoard, IWork } from '../../store/types';
import { store } from '../../store/store';
import observer from '../../store/observer';

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
    // this.subscribe()
  }

  render() {
    const mode = this.options.get('mode');
    this.content = new SpaceError().renderErrorMessage();
    if (!mode || mode === spaceMode.board) {
      this.mode = spaceMode.board;
      if (store.user.workSpace) {
        this.workspace = store.user.workSpace.find((val) => val._id === this.options.get('workspaceID'));
        if (this.workspace) {
          this.board = this.workspace.boards.find((val) => val._id === this.options.get('boardID'));
          this.content = new BoardContent().renderContent(this.board);
        } else {
          this.content = new SpaceError().renderErrorMessage();
        }
      } else {
        this.content = new SpaceError().renderErrorMessage();
      }

    } else {
      this.content = new SpaceError().renderErrorMessage();
    }

    this.menu = new SpaceMenu();
    const container = createHtmlElement('div');
    const background = createHtmlElement('div', { className: 'background' });
    if (this.board) {
      if (this.board.image) {
        background.style.backgroundImage = `url(${this.board.image})`;
      } else {
        background.style.backgroundColor = this.board.color;
      }
    } else {
      background.style.backgroundColor = '#AAAAAA';
    }

    background.append(this.menu.renderLeftSide(this.workspace, this.board), this.content);
    container.append(background);

    return container;
  }

  subscribe(): void {
    observer.subscribe({ eventName: EventName.updateState, function: this.render.bind(this) });
  }

}
