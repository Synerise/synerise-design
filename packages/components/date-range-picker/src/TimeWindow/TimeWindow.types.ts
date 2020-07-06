import * as React from 'react';
import { WrappedComponentProps } from 'react-intl';
import { Props as DayProps } from './Day/Day.types';
import { Day } from '../RangeFilter/RangeFilter.types';
import { SliderMarks } from 'antd/lib/slider';

export type DayKey = number | string;

export type Days = { [DayKey: string]: Day };

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
  showUnselectAll: boolean;
  showSelectAll: boolean;
  title?: string;
  numberOfDays: number;
  numberOfDaysPerRow?: number;
  rowLabelFormatter?: (rowIndex: number) => string;
  dayTemplate: (day: DayKey) => object;
  dayFormatter: (day: DayKey, long?: boolean) => string;
  invertibleTime?: boolean;
  timeMarks?: SliderMarks;
  style?: React.CSSProperties;
  customForm?: (dayKey: React.ReactText, singleMode: boolean) => React.ReactNode;
  onCheckDay?: (day: DayKey) => void;
  onUncheckDay?: (day: DayKey) => void;
  onSelectAll?: () => void;
  onUnselectAll?: () => void;
  readOnly: boolean;
  inverted?: boolean;
  labelInverted?: boolean;
  reverseGroup?: number;
} & WrappedComponentProps;

export type State = {
  activeDay: DayKey | null;
};
