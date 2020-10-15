import * as React from 'react';
import { IntlShape, WrappedComponentProps } from 'react-intl';
import { Props as DayProps } from './Day/Day.types';
import { FilterDefinition } from '../RangeFilter.types';

export type DayKey = number | string;

export type DayOptions = {
  display?: boolean;
  inverted?: boolean;
  restricted: boolean;
  start: string;
  stop: string;
};

export type Days = {
  [key in DayKey]: DayOptions;
};

export type CustomDayConfig = {
  component?: React.ComponentType<DayProps>;
  template?: object;
  tooltip?: string;
  label?: string;
  longLabel?: string;
};

export type TimeWindowProps = {
  days: Days;
  monthlyFilter?: boolean;
  monthlyFilterPeriod?: string;
  customDays?: { [key: string]: CustomDayConfig };
  onChange: (days: Days) => void;
  showSelectAll: boolean;
  title: string;
  numberOfDays: number;
  numberOfDaysPerRow?: number;
  rowLabelFormatter?: (rowIndex: number) => string;
  dayTemplate: (day: DayKey) => object;
  dayFormatter: (day: DayKey, long?: boolean) => string;
  hideHeader?: boolean;
  style?: React.CSSProperties;
  onCheckDay?: (dayKey: DayKey) => void;
  onUncheckDay?: (dayKey: DayKey) => void;
  onSelectAll?: () => void;
  onUnselectAll?: () => void;
  readOnly: boolean;
  inverted?: boolean;
  labelInverted?: boolean;
  reverseGroup: number;
  intl: IntlShape;
  daily?: boolean;
  rangeClipboard: Partial<FilterDefinition>;
} & Partial<RangeActions> &
  WrappedComponentProps;

export type State = {
  activeDays: DayKey[];
  multipleSelectionMode: boolean;
  isRangeDefined?: boolean;
};

export type RangeActions = {
  onRangeCopy: (range?: Partial<FilterDefinition>) => void;
  onRangePaste: (range?: Partial<FilterDefinition>) => void;
  onRangeClear: () => void;
};
