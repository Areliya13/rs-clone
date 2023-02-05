import { PageIds } from '../types/enum';
import { Options } from '../types/types';

export let mainOptions: Options = new Map();
export const locStMainOptions = 'trelloOptions';

export function getLocalStorage(element: Storage, selector: string): string {
  const result = element.getItem(selector);
  if (!result) {
    return '{}';
  }
  return result;
}

export function getMainOptions(): void {
  mainOptions = new Map(
    Object.entries(JSON.parse(getLocalStorage(localStorage, locStMainOptions)) as { [s: string]: string })
  );
}

export function setMainOptions(): void {
  const opt = JSON.stringify(Object.fromEntries(mainOptions));
  localStorage.setItem(locStMainOptions, opt);
}

export function getMainAddress(): string {
  setMainOptions();
  if (mainOptions.size === 0) {
    return `#${PageIds.MainPage}`;
  }
  const arr: string[] = [];
  mainOptions.forEach((val, key) => {
    arr.push(`${key}=${val}`);
  });
  return `#${PageIds.MainPage}?${arr.join('&')}`;
}

export function getOptions(opt: string): Options {
  const result = new Map();
  const arr = opt.split('&');
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i].split('=');
    if (element.length === 2) {
      result.set(element[0], element[1]);
    }
  }
  return result as Map<string, string>;
}

export function getHash(hash: string): string {
  if (!hash) return PageIds.MainPage;
  const posOptions: number = hash.indexOf('?');
  if (posOptions < 0) {
    return hash.slice(1);
  }
  return hash.slice(1, posOptions);
}
