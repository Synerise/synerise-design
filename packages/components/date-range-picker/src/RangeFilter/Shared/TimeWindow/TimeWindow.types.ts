import type React from 'react';
import { type WrappedComponentProps } from 'react-intl';

import type { WithDataFormatProps } from '@synerise/ds-data-format';
import type { TimePickerProps } from '@synerise/ds-time-picker';

import { type Texts } from '../../../DateRangePicker.types';
import {
  type FilterDefinition,
  type WithDisabledProp,
} from '../../RangeFilter.types';
import { type DayProps } from './Day/Day.types';
import { type GridTexts } from './Grid/Grid.types';
import {
  type DateLimitMode,
  type RangeDisplayMode,
} from './RangeFormContainer/RangeForm/RangeForm.types';

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

export type TimeWindowTexts = Pick<
  Texts,
  | 'inverseSelection'
  | 'selectDaysDescription'
  | 'addTime'
  | 'clearRange'
  | 'copyRange'
  | 'pasteRange'
  | 'range'
  | 'hour'
  | 'selected'
  | 'clear'
  | 'setTimeFor'
>;

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
  dayFormatter: (day: DayKey, long?: boolean) => string | React.ReactNode;
  hideHeader?: boolean;
  headerOptions?: {
    includeSummary?: boolean;
    includeActions?: boolean;
  };
  onCheckDay?: (dayKey: DayKey) => void;
  onSelectAll?: () => void;
  onUnselectAll?: () => void;
  readOnly: boolean;
  inverted?: boolean;
  labelInverted?: boolean;
  reverseGroup: number;
  daily?: boolean;
  rangeClipboard: Partial<FilterDefinition>;
  valueSelectionModes: DateLimitMode[];
  rangeDisplayMode?: RangeDisplayMode;
  texts: TimeWindowTexts & GridTexts;
  renderRangeFormSuffix?: () => React.ReactNode;
  timePickerProps?: Partial<TimePickerProps>;
} & Partial<RangeActions> &
  WithDataFormatProps &
  WithDisabledProp &
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
