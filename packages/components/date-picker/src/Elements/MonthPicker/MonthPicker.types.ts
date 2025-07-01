import { type IntlShape } from 'react-intl';

export type MonthPickerProps = {
  min?: Date;
  max?: Date;
  value: Date;
  onChange: (date: Date) => void;
  intl: IntlShape;
};
export type MonthPickerState = {
  cursor: Date;
  yearMode: boolean;
};
