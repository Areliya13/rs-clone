import Page from "../../core/page";

class ErrorPage extends Page {

  constructor(id: string) {
    super(id);
  }

  protected createHeaderTitle(text: string): HTMLHeadingElement {
    const headerTitle: HTMLHeadingElement = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  render() : HTMLDivElement {
    const content: HTMLDivElement = document.createElement('div');
    content.className = 'main';
    const title = this.createHeaderTitle('Error 404! The page was not found.');
    title.className = 'main__container main__container_center';
    content.appendChild(title);
    this.container.append(content);
    return this.container;
  }
}

export default ErrorPage;