export type MonthPickerProps = {
  min?: Date;
  max?: Date;
  value: Date;
  onChange: (date: Date) => void;
};
export type MonthPickerState = {
  cursor: Date;
  yearMode: boolean;
};
