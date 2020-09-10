import * as React from 'react';
import { IntlShape } from 'react-intl';

export type FilterValue = {
  definition: Partial<FilterDefinition> | Partial<FilterDefinition>[];
  type: string;
};
export type RangeFilterProps = {
  value: FilterValue;
  onApply: (filter: {}) => void;
  onCancel: () => void;
  intl: IntlShape;
};
export type RangeFilterState = {
  type: string;
  value: FilterValue;
};
export type FilterDefinition = {
  start?: string;
  stop?: string;
  inverted?: boolean;
  restricted?: boolean;
  period?: string;
};
export type FilterType = {
  component: JSX.Element;
  definition: FilterDefinition;
  labelTranslationKey: string;
};
export type Period = {
  name: string | React.ReactNode;
  value: string | React.ReactNode;
};

export type DenormalizedFilter = {
  start: string;
  stop: string;
  day?: React.ReactText;
};
export type NormalizedFilter = {
  from: string;
  to: string;
  day?: React.ReactText;
};
