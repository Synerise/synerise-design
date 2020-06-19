import { IntlShape } from 'react-intl';

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
  selectedDays?: (day?: Date) => boolean;
};
