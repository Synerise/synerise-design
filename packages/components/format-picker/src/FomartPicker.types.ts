import type { ReactNode } from 'react';

import type { ButtonType } from '@synerise/ds-button';

export type CurrencyType = string;

export type FormattingDataFormat = 'numeric' | 'percent' | 'cash';

export type FormattingValue = {
  dataFormat: FormattingDataFormat;
  currency: CurrencyType;
  useSeparator: boolean;
  compactNumbers: boolean;
  fixedLength: number;
};

export type FormattingType = {
  format: FormattingDataFormat;
  icon: JSX.Element;
  tooltip: ReactNode;
};

export type CurrencyConfig = {
  currency: CurrencyType;
  label: string;
};

export type FormatPickerTexts = {
  header: ReactNode;
  format: ReactNode;
  numeric: ReactNode;
  cash: ReactNode;
  percentage: ReactNode;
  setDefault: ReactNode;
  useSeparator: ReactNode;
  compactNumbers: ReactNode;
  currencyMenuItemPrefix: string;
  /** Trigger label while `isEmpty` is set. Optional so a full `FormatPickerTexts` object stays valid. */
  placeholder?: ReactNode;
  /** Tooltip and accessible name (`aria-label`) of the clear icon, so it must be a plain string. */
  clear?: string;
};

export type FormatPickerProps = {
  format: FormattingValue;
  value: number;
  onDataFormatChange: (format: FormattingDataFormat) => void;
  onCurrencyChange: (currencyType: CurrencyType) => void;
  onUseSeparatorChange: (useSeparator: boolean) => void;
  onCompactNumbersChange: (useCompact: boolean) => void;
  onFixedLengthChange: (fixedLength: number) => void;
  onSetDefault?: () => void;
  onFormattedValueChange?: (formattedValue: string) => void;
  text?: Partial<FormatPickerTexts>;
  currenciesConfig?: CurrencyConfig[];
  buttonType?: ButtonType;
  disabled?: boolean;
  maxFixedLength?: number;
  /**
   * No format has been chosen yet: the trigger shows `texts.placeholder` instead of the formatted
   * example. The settings panel still edits `format`, so pass the value editing should start from.
   */
  isEmpty?: boolean;
  /**
   * If provided, a clear icon is rendered inside the trigger while a format is set (`isEmpty` is
   * falsy and the picker is enabled), mirroring `ds-completed-within`.
   */
  onClear?: () => void;
};
