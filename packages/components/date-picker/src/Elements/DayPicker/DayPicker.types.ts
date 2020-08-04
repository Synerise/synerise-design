import { IntlShape } from 'react-intl';
import * as React from 'react';
import { DayModifiers, Modifier, Modifiers } from 'react-day-picker/types/Modifiers';
import MomentLocaleUtils from 'react-day-picker/moment';

export type DayPickerProps = {
  month: Date;
  onMonthChange: (month: Date) => void;
  onMonthNameClick: () => void;
  onYearNameClick: () => void;
  hideLongPrev?: boolean;
  hideShortPrev?: boolean;
  hideShortNext?: boolean;
  hideLongNext?: boolean;
  intl: IntlShape;
  fixedWeeks?: boolean;
  showOutsideDays?: boolean;
  canChangeMonth?: boolean;
  disabledDays?: (day?: Date) => boolean;
  selectedDays?: Modifier | Modifier[];
  modifiers?: Modifiers;
  localeUtils?: MomentLocaleUtils;
  title?: string;
  renderDay: (day: Date) => React.ReactNode;
  onDayClick: (day: Date, modifiers: DayModifiers, e: React.MouseEvent<HTMLDivElement>) => void;
  onDayMouseEnter: (day: Date) => void;
  onDayMouseLeave: () => void;
};
