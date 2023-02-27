import { OptionsType } from '../types/types';

export function createHtmlElement <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  options?: OptionsType,
): HTMLElementTagNameMap[T] {
  const item = document.createElement(tagName);
  return options ? Object.assign(item, options) : item;
}

export function getElementBySelector<T extends typeof Element>(
  element: DocumentFragment | HTMLElement | Document,
  type: T,
  selector: string,
): InstanceType<T> {
  const result = element.querySelector(selector);
  if (!result) {
    throw new Error(`Selector ${selector} didn't match any elements.`);
  }
  if (!(result instanceof type)) {
    throw new TypeError(`Selector ${selector} has wrong type`);
  }
  return result as InstanceType<T>;
}

export function getSvgIcon(svg: string, color: string, className: string = 'icon'): SVGSVGElement {
  const svgHTML = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const useHTML = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  svgHTML.append(useHTML);
  useHTML.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${svg}#icon`);
  svgHTML.setAttributeNS('class', 'class', `${className}`);
  svgHTML.style.fill = color;
  svgHTML.style.width = '20px';
  svgHTML.style.height = '20px';
  return svgHTML;
}