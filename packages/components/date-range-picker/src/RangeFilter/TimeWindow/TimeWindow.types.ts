import * as React from 'react';
import { IntlShape, WrappedComponentProps } from 'react-intl';
import { Props as DayProps } from './Day/Day.types';

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

export type Props = {
  days: Days;
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
  timeMarks?: object;
  style?: React.CSSProperties;
  onCheckDay?: Function;
  onUncheckDay?: Function;
  onSelectAll?: Function;
  onUnselectAll?: Function;
  readOnly: boolean;
  inverted?: boolean;
  labelInverted?: boolean;
  reverseGroup: number;
  intl: IntlShape;
  daily?: boolean;
} & WrappedComponentProps;

export type State = {
  activeDays: DayKey[];
  multipleSelectionMode: boolean;
};
