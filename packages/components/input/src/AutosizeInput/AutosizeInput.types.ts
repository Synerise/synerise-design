import type { CSSProperties, InputHTMLAttributes } from 'react';

/**
 * Native auto-width input props. The component renders its own `<input>` and a
 * hidden sizer; the forwarded ref points at the `<input>` element.
 */
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
};
