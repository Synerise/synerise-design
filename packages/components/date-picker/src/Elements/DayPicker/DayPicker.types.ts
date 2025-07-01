import type React from 'react';
import type MomentLocaleUtils from 'react-day-picker/moment';
import {
  type DayModifiers,
  type Modifier,
  type Modifiers,
} from 'react-day-picker/types/Modifiers';
import type { IntlShape } from 'react-intl';

export type DayPickerProps = {
  month: Date;
  onMonthChange?: (month: Date) => void;
  onMonthNameClick?: () => void;
  onYearNameClick?: () => void;
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
  renderDay?: (day: Date) => React.ReactNode;
  renderNavbar?: (props: DayPickerProps) => React.ReactNode;
  onDayClick?: (
    day: Date,
    modifiers: DayModifiers,
    e: React.MouseEvent<HTMLDivElement>,
  ) => void;
  onDayMouseEnter?: (day: Date) => void;
  onDayMouseLeave?: () => void;
};
