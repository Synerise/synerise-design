import type { IconPickerProps } from '../IconPicker.types';

export type OverlayType = Pick<IconPickerProps, 'data' | 'noResultMsg' | 'placeholder' | 'onSelect'> & {
  value: string;
  onSearchChange: (value: string) => void;
  onClearInput?: () => void;
  focus: boolean;
};
