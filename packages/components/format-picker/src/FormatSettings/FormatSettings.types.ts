import { type NumberToFormatOptions } from '@synerise/ds-core';

import type {
  FormatPickerProps,
  FormatPickerTexts,
} from '../FomartPicker.types';

export type FormatSettingsProps = Omit<FormatPickerProps, 'text' | 'value'> & {
  getFormattedValue: (options: NumberToFormatOptions) => string;
  text: FormatPickerTexts;
};
