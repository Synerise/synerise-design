import type React from 'react';
import { type Matcher, type Modifiers } from 'react-day-picker';
import type { IntlShape } from 'react-intl';

import type { DateLocaleUtils } from '../../localeUtils';

/**
 * Props of the design-system calendar wrapper.
 *
 * The shape is deliberately unchanged from the `react-day-picker` v7 era so that
 * `RawDatePicker` and `RangePicker` keep passing what they always passed; `DayPicker.tsx`
 * translates it into the v10 API at that single boundary.
 */
export type DayPickerProps = {
  month: Date;
  className?: string;
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
  selectedDays?: Matcher | Matcher[];
  /** Day-of-month predicates or dates keyed by modifier name; each becomes a `DayPicker-Day--*` class. */
  modifiers?: Record<string, Matcher | Matcher[] | undefined>;
  localeUtils?: DateLocaleUtils;
  title?: string;
  renderDay?: (day: Date) => React.ReactNode;
  renderNavbar?: (props: DayPickerProps) => React.ReactNode;
  onDayClick?: (day: Date, modifiers: Modifiers, e: React.MouseEvent) => void;
  onDayMouseEnter?: (day: Date) => void;
  onDayMouseLeave?: () => void;
};
