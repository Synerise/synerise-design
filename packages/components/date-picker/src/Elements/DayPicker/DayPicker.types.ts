import { IntlShape } from 'react-intl';
import * as React from 'react';
import { Modifier } from 'react-day-picker/types/Modifiers';
import MomentLocaleUtils from 'react-day-picker/moment';

export type DayPickerProps = {
  month: Date;
  onMonthChange: (month: Date) => void;
  onMonthNameClick: () => void;
  onYearNameClick: () => void;
  hidePrev?: boolean;
  hideNext?: boolean;
  intl: IntlShape;
  fixedWeeks?: boolean;
  showOutsideDays?: boolean;
  canChangeMonth?: boolean;
  disabledDays?: (day?: Date) => boolean;
  selectedDays?: Date[];
  modifiers?: Modifier;
  localeUtils: MomentLocaleUtils;
  title?: string;
  renderDay: (day: Date) => React.ReactNode;
  onDayClick: (day: Date, modifiers: { disabled: boolean }) => void;
  onDayMouseEnter: (day: Date) => void;
  onDayMouseLeave: () => void;
};
