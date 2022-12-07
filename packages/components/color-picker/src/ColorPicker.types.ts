import type { SelectProps } from '@synerise/ds-select';

export type ColorHookType = {
  color: string;
  setColor: (color: string) => void;
};

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
  selectProps?: Omit<SelectProps, 'value' | 'onChange' | 'defaultValue'>;
}
