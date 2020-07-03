import { IntlShape } from 'react-intl';

export type Props = {
  value: FilterValue;
  onChange: (value: NormalizedRange) => void;
  onCancel: () => void;
  onApply: (value: NormalizedRange) => void;
  intl: IntlShape;
};
export type State = {
  value: FilterValue;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Rule = { weeks?: { week: number; days: Day[] }[]; type?: any; inverted?: boolean; days?: Day[] };
export type FilterValue = {
  type: string;
  definition: {
    [key: string]: Day;
  };
};
export type Day = {
  day?: number;
  week?: number;
  start?: string | Date;
  stop?: string | Date;
  inverted?: boolean;
  restricted?: boolean;
};

export type NormalizedRange = { type: string; nestingType: string; days?: Day[]; rules?: Rule[] };
