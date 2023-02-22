import { PageIds, spaceMode } from './enum';

export type OptionsType = {
  id?: string;
  className?: string;
  textContent?: string;
  innerText?: string;
  innerHTML?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  href?: string;
  src?: string;
  alt?: string;
  min?: string;
  max?: string;
  target?: string;
  maxLength?: string;
  for?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: string;
  title?: string;
  'style.backgroundColor'?: string;
  name?: string;
  style?: string;
  height?: number;
  width?: number;
};

export type Options = Map<string, string | spaceMode>;

export type stringObject = { [key: string]: string };
export type board = { name: string; img: string };
