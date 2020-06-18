export type DayPickerProps = {
  month: Date;
  onMonthChange: (month: Date) => void;
  onMonthNameClick: () => void;
  onYearNameClick: () => void;
  hidePrev?: boolean;
  hideNext?: boolean;
  intl?: any;
};
