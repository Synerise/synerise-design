import type {
  CSSProperties,
  InputHTMLAttributes,
  MutableRefObject,
  ReactNode,
  RefObject,
} from 'react';

export type AutosizeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  placeholderIsMinWidth?: boolean;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  extraWidth?: number | string;
  minWidth?: number | string;
  onAutosize?: (newWidth: number) => void;
  preAutosize?: (newWidth: number) => void;
  transformRef?: (element: HTMLElement) => HTMLElement;
  transformWrapperRef?: (element: HTMLElement) => HTMLElement;
  handleInputRef?: (
    element: HTMLInputElement,
    originalElement: HTMLElement,
  ) => HTMLElement;
  children: ReactNode;
};

export type AutosizeWrapperProps = AutosizeInputProps & {
  autoResize?: boolean;
};

export type AutosizeInputRefType = {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  sizerRef: RefObject<HTMLDivElement>;
  wrapperRef: RefObject<HTMLDivElement>;
  inputWrapperRef: RefObject<HTMLElement>;
  placeholderSizerRef: RefObject<HTMLDivElement>;
  copyInputStyles: () => void;
  updateInputWidth: () => void;
};
