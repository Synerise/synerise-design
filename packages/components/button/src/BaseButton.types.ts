import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

export type ButtonSize = 'small' | 'middle' | 'large';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export type BaseButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'onClick'
> & {
  /** Click handler — typed with HTMLElement to support both button and anchor rendering */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** Any string — becomes `ant-btn-{type}` CSS class */
  type?: string;
  /** Button size — affects height and padding */
  size?: ButtonSize;
  /** Shows a spinning overlay. Pass `{ delay: ms }` to debounce short loading states */
  loading?: boolean | { delay?: number };
  /** Stretches the button to full width of its container */
  block?: boolean;
  /** HTML type attribute for the underlying button element
   * @default button
   */
  htmlType?: ButtonHTMLType;
  /** When provided, renders as an `<a>` element instead of `<button>` */
  href?: string;
  /** Link target — only used when `href` is set */
  target?: string;
  /** Download filename — only used when `href` is set */
  download?: string | boolean;
  /** Button content — text label, icons, or any ReactNode */
  children?: ReactNode;
};
