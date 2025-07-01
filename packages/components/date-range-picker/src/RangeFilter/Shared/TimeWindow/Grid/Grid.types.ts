import type React from 'react';
import { type IntlShape } from 'react-intl';

import type { Texts } from '../../../../DateRangePicker.types';
import { type DayKey, type Days } from '../TimeWindow.types';

export type GridProps = {
  keys: number[];
  days: Days;
  showSelectAll: boolean;
  showUnselectAll: boolean;
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
  onSelectAll: () => void;
  onUnselectAll: () => void;
  renderDay: (day: DayKey) => React.ReactNode;
  texts: GridTexts;
};

export type GridTexts = Pick<
  Texts,
  'clear' | 'selectAll' | 'unselectAll' | 'clickToSelect'
>;
