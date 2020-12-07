import * as React from 'react';

export type CurrencyType = 'USD' | 'EUR' | 'PLN' | 'JPY';

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
  tooltip: string | React.ReactNode;
};

export type CurrencyConfig = {
  currency: CurrencyType;
  label: string;
};

export type FormatPickerTexts = {
  header?: string | React.ReactNode;
  format?: string | React.ReactNode;
  numeric?: string | React.ReactNode;
  cash?: string | React.ReactNode;
  percentage?: string | React.ReactNode;
  setDefault?: string | React.ReactNode;
  useSeparator?: string | React.ReactNode;
  compactNumbers?: string | React.ReactNode;
};

export type FormatPickerProps = {
  format: FormattingValue;
  value: number;
  onDataFormatChange: (format: FormattingDataFormat) => void;
  onCurrencyChange: (currencyType: CurrencyType) => void;
  onUseSeparatorChange: (useSeparator: boolean) => void;
  onCompactNumbersChange: (useCompact: boolean) => void;
  onFixedLengthChange: (fixedLength: number) => void;
  onSetDefault: () => void;
  text: FormatPickerTexts;
};
