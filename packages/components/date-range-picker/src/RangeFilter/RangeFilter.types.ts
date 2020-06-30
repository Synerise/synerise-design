import { IntlShape } from 'react-intl';
import * as React from 'react';
import { Texts } from '@synerise/ds-items-roll/dist/ItemsRoll.types';

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
type Definition = {
  [key: string]: Day;
};
export type FilterValue = {
  type: string;
  definition: {
    [key: string]: Day;
  };
};
export type Day = {
  day?: number;
  start?: string | Date;
  stop?: string | Date;
  inverted?: boolean;
  restricted?: boolean;
};
