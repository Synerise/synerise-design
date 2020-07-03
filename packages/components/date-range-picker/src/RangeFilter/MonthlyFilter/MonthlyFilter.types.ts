import { IntlShape } from 'react-intl';
import * as React from 'react';
import { Day } from '../RangeFilter.types';

export type Props = {
  value: Period[];
  onChange: (definition: Period[]) => void;
  intl: IntlShape;
};
export type State = {
  visible: {
    [key: number]: boolean;
  };
};
export type Period = {
  period: string;
  periodType: string;
  id: React.ReactText;
  definition: Day;
};
