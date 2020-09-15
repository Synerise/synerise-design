import { IntlShape } from 'react-intl';

export type MonthlyFilterProps = {
  value: Month[];
  onChange: (definition: string) => void;
  intl: IntlShape;
};
export type Month = {
  id: string;
  period: string;
  periodType?: string;
  definition: string | object;
};
