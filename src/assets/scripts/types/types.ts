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
};

export type Options = Map<string, string>;

export type stringObject = { [key: string]: string };
export type board = { name: string; img: string };
