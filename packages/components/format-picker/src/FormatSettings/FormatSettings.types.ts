import type { FormatPickerProps, FormatPickerTexts } from '../FomartPicker.types';

export type FormatSettingsProps = Omit<FormatPickerProps, 'text'> & {
  text: FormatPickerTexts;
};
