import * as React from 'react';
import { IntlShape } from 'react-intl';
import { DayKey, Days } from '../TimeWindow.types';
import type { Texts } from '../../../../DateRangePicker.types';

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

export type GridTexts = Pick<Texts, 'clear' | 'selectAll' | 'unselectAll' | 'clickToSelect'>;
