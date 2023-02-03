abstract class Page {
  protected container: HTMLDivElement;

  protected constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  render(): HTMLDivElement {
    return this.container;
  }
}

export default Page;