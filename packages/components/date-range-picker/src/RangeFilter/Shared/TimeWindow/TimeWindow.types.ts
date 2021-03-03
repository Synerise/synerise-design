import * as React from 'react';
import { IntlShape, WrappedComponentProps } from 'react-intl';
import { DayProps } from './Day/Day.types';
import { FilterDefinition, ValueSelectionModes } from '../../RangeFilter.types';
import { GridTexts } from './Grid/Grid.types';

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

export type TimeWindowTexts = {
  clearRange: React.ReactNode | string;
  copyRange: React.ReactNode | string;
  pasteRange: React.ReactNode | string;
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
  onCheckDay?: (dayKey: DayKey) => void;
  onSelectAll?: () => void;
  onUnselectAll?: () => void;
  readOnly: boolean;
  inverted?: boolean;
  labelInverted?: boolean;
  reverseGroup: number;
  intl: IntlShape;
  daily?: boolean;
  rangeClipboard: Partial<FilterDefinition>;
  valueSelectionModes: ValueSelectionModes;
  texts?: TimeWindowTexts & GridTexts;
} & Partial<RangeActions> &
  WrappedComponentProps;

export type State = {
  activeDays: DayKey[];
  controlKeyPressed: boolean;
  shiftKeyPressed?: boolean;
  isRangeDefined?: boolean;
};

export type RangeActions = {
  onRangeCopy: (range?: Partial<FilterDefinition>) => void;
  onRangePaste: (range?: Partial<FilterDefinition>) => void;
  onRangeClear: () => void;
};
