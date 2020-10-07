import * as React from 'react';
import { IntlShape } from 'react-intl';
import { DayKey, Days } from '../TimeWindow.types';

export type GridProps = {
  keys: number[];
  days: Days;
  showSelectAll: boolean;
  title: string | React.ReactNode;
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
