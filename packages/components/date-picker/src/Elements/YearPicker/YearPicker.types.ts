export type YearPickerProps = {
  value: Date;
  onChange: (date: Date) => void;
  onTitleClick?: () => void;
};
export type YearPickerState = {
  cursor: Date;
  decadeMode: boolean;
};
