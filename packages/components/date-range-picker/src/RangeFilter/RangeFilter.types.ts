import { IntlShape } from 'react-intl';

export type Props = {
  value: FilterValue;
  onChange: () => void;
  onCancel: () => void;
  onApply: () => void;
  intl: IntlShape;
};
export type State = {
  value: FilterValue;
};
export type FilterValue = {
  type: string;
  definition: Day;
};
export type Day = {
  day?: number;
  start?: string | Date;
  stop?: string | Date;
  inverted?: boolean;
  restricted?: boolean;
};
