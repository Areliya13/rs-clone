import { createHtmlElement } from '../../helpers/other';
import { links, names } from '../../types/enum';

export class Footer {
  render(): HTMLDivElement {
    const container = createHtmlElement('div', {
      className: 'footer-container',
    });
    container.append(this.renderGithub(), this.renderYear(), this.renderRsschool());
    return container;
  }

  renderGithub(): HTMLDivElement {
    const container = createHtmlElement('div', {
      className: 'github-links',
    });
    container.append(
      this.renderGitHubItem(links.Andrey, names.Andrey),
      this.renderGitHubItem(links.Dima, names.Dima),
      this.renderGitHubItem(links.Tamara, names.Tamara)
    );
    return container;
  }

  renderGitHubItem(link: string, name: string) {
    const githubLink = createHtmlElement('a', { className: 'gh-link', href: link, target: '_blank' });
    const github = createHtmlElement('div', { className: 'icon github' });
    const githubName = createHtmlElement('span', { textContent: name });
    githubLink.append(github, githubName);
    return githubLink;
  }

  renderYear(): HTMLDivElement {
    const container = createHtmlElement('div', {
      className: 'year',
      textContent: '2023',
    });

    return container;
  }

  renderRsschool(): HTMLDivElement {
    const container = createHtmlElement('div', {
      className: 'rsschool-link',
    });
    const rsschoolLink = createHtmlElement('a', { href: links.rsschool, target: '_blank' });
    const RSSchool = createHtmlElement('div', { className: 'icon rsschool' });
    rsschoolLink.append(RSSchool);
    container.append(rsschoolLink);
    return container;
  }
}
