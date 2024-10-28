import type { ReactNode } from 'react';

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
  buttonType?: string;
  disabled?: boolean;
  maxFixedLength?: number;
};
