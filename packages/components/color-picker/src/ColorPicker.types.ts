import type { InputProps } from '@synerise/ds-input';

export type ColorHookType = {
  color: string;
  setColor: (color: string) => void;
};
export enum ColorPickerSize {
  'S' = 135,
  'M' = 167,
  'L' = 199,
}

export interface ColorPickerProps extends Partial<Pick<HTMLInputElement, 'placeholder'>> {
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
  tooltipText?: string;
  isShownSavedColors?: boolean;
  size?: 'S' | 'M' | 'L';
  errorText?: string;
  description?: string;
}
