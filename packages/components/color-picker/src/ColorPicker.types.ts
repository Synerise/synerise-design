import type { InputProps } from 'antd/lib/input';

export type ColorHookType = {
  color: string;
  setColor: (color: string) => void;
};

export enum ColorPickerSize {
  'S' = 136,
  'M' = 168,
  'L' = 200,
}

export interface ColorPickerProps extends Partial<Pick<HTMLInputElement, 'placeholder'>> {
  maxWidth?: number;
  value?: string;
  onChange?: (color: string) => void;
  colors?: string[];
  onSaveColors?: (colors: string[]) => void;
  /**
   * used for inlining implementation of other ways of selecting/showing
   * color value (select with converting to other color notations)
   */
  infix?: (colorHooks?: Partial<ColorHookType>) => JSX.Element;
  maxSavedColors?: number;
  inputProps?: Omit<InputProps, 'value' | 'onChange' | 'defaultValue'>;
  tooltip?: {
    copy: string;
    copied: string;
  };
  isShownSavedColors?: boolean;
  size?: 'S' | 'M' | 'L';
  errorText?: string;
  description?: string;
}
