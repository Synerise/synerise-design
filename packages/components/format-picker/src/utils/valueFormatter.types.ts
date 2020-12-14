import { IntlShape } from 'react-intl';
import { FormattingValue } from '../FomartPicker.types';

export type ValueFormatterProps = {
  formatting: FormattingValue;
  value: number;
  intl: IntlShape;
};
