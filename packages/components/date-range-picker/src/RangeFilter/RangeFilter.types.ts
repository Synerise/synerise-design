import * as React from 'react';
import { IntlShape } from 'react-intl';

export type FilterValue = {
  definition?: Partial<FilterDefinition>;
  type: string;
  value: string;
};
export type RangeFilterProps = {
  value: FilterValue;
  onApply: (filter: {}) => void;
  onCancel: () => void;
  intl: IntlShape;
};

export type RangeFilterState = {
  [filterType: string]: FilterValue | string | undefined;
  activeType: string;
};
export type FilterDefinition = {
  start?: string;
  stop?: string;
  inverted?: boolean;
  restricted?: boolean;
  period?: string;
  type: string;
  display?: string;
};

export type Period = {
  translationKey?: string;
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
  week?: React.ReactText;
};
export type WeekFilter = {
  week: number;
};
export type ComponentDataType = {
  labelTranslationKey: string;
  component: JSX.Element;
  definition: any;
};
