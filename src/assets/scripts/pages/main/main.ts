import Page from '../../core/page';
import LeftSideBar from './leftsidebar';
import { MainBoards } from './mainBoards';
import { RightSideBar } from './rightSideBar';

class Main extends Page {
  leftSideBar: LeftSideBar;
  content: MainBoards;
  rightSideBar: RightSideBar;

  constructor(id: string) {
    super(id);
    this.leftSideBar = new LeftSideBar();
    this.content = new MainBoards();
    this.rightSideBar = new RightSideBar();
  }

  render() {
    this.container.append(
      this.leftSideBar.render(),
      this.content.render(),
      this.rightSideBar.render()
    );
    return this.container;
  }
}

export default Main;
