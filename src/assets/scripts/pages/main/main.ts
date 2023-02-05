import Page from '../../core/page';
import LeftSideBar from './leftsidebar';
import { MainBoards } from './mainBoards';

class Main extends Page {
  leftSideBar: LeftSideBar;
  content: MainBoards;

  constructor(id: string) {
    super(id);
    this.leftSideBar = new LeftSideBar();
    this.content = new MainBoards();
  }

  render() {
    this.container.append(this.leftSideBar.render(), this.content.renderContent(), this.content.renderRightSideBar());
    return this.container;
  }
}

export default Main;
