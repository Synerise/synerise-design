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
  tooltip: string;
};

export type CurrencyConfig = {
  currency: CurrencyType;
  label: string;
};

export type FormatPickerProps = {
  format: FormattingValue;
  value: number;
  header?: string;
  onDataFormatChange: (format: FormattingDataFormat) => void;
  onCurrencyChange: (currencyType: CurrencyType) => void;
  onUseSeparatorChange: (useSeparator: boolean) => void;
  onCompactNumbersChange: (useCompact: boolean) => void;
  onFixedLengthChange: (fixedLength: number) => void;
  onSetDefault: () => void;
};
