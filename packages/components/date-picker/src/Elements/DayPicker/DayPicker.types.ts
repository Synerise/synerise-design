import type React from 'react';
import type { Matcher, Modifiers } from 'react-day-picker';
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
  /**
   * Which day gets the `today` modifier. Without it react-day-picker uses its own
   * `dateLib.today()`, which is the *browser's* date — a workspace far enough east or west
   * circles the wrong day. Forwarded to the v10 picker through `...rest`.
   */
  today?: Date;
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
  renderDay?: (day: Date) => React.ReactNode;
  renderNavbar?: (props: DayPickerProps) => React.ReactNode;
  onDayClick?: (day: Date, modifiers: Modifiers, e: React.MouseEvent) => void;
  onDayMouseEnter?: (day: Date) => void;
  onDayMouseLeave?: () => void;
};
