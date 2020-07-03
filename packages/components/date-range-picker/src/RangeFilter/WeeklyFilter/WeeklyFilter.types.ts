import { IntlShape } from 'react-intl';
import { Day } from 'RangeFilter/RangeFilter.types';

export type Props = {
  value: { [key: string]: Day };
  onChange: (value: string) => void;
  intl: IntlShape;
};
