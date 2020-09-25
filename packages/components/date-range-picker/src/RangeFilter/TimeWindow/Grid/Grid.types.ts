import * as React from 'react';
import { IntlShape } from 'react-intl';
import { CustomDayConfig, DayKey, Days } from '../TimeWindow.types';

export type GridProps = {
  keys: number[];
  days: Days;
  showUnselectAll: boolean;
  showSelectAll: boolean;
  title: string;
  numberOfDays: number;
  numberOfDaysPerRow?: number;
  rowLabelFormatter?: (rowIndex: number) => string;
  hideHeader?: boolean;
  timeMarks?: object;
  inverted?: boolean;
  labelInverted?: boolean;
  reverseGroup: number;
  intl: IntlShape;
  onClearSelected: () => void;
  onSelectAll: Function;
  renderDay: (day: DayKey) => React.ReactNode;
};
