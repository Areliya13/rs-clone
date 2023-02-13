import { localStorageItems, PageIds } from '../types/enum';
import { Options } from '../types/types';

export let mainOptions: Options = new Map();

export function getLocalStorage(element: Storage, selector: string): string {
  const result = element.getItem(selector);
  if (!result) {
    return '{}';
  }
  return result;
}

export function getMainOptions(): void {
  const objFromLocalStorage = JSON.parse(getLocalStorage(localStorage, localStorageItems.mainOptions));
  mainOptions = new Map<string, string>(Object.entries(objFromLocalStorage));
}

export function getSpaceOptions(): Options {
  const objFromLocalStorage = JSON.parse(getLocalStorage(localStorage, localStorageItems.spaceOptions));
  const options = new Map<string, string>(Object.entries(objFromLocalStorage));
  return options;
}

export function setMainOptions(): void {
  const options = JSON.stringify(Object.fromEntries(mainOptions));
  localStorage.setItem(localStorageItems.mainOptions, options);
}

export function getMainAddress(): string {
  setMainOptions();
  if (mainOptions.size === 0) {
    return `#${PageIds.MainPage}`;
  }
  const arr: string[] = [];
  mainOptions.forEach((option, index) => {
    arr.push(`${index}=${option}`);
  });
  return `#${PageIds.MainPage}?${arr.join('&')}`;
}

export function getOptions(opt: string): Options {
  const result = new Map<string, string>();
  const arr = opt.split('&');
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i].split('=');
    if (element.length === 2) {
      result.set(element[0], element[1]);
    }
  }
  return result; //as Map<string, string>;
}

export function getHash(hash: string): string {
  if (!hash) return PageIds.MainPage;
  const posOptions: number = hash.indexOf('?');
  if (posOptions < 0) {
    return hash.slice(1);
  }
  return hash.slice(1, posOptions);
}
