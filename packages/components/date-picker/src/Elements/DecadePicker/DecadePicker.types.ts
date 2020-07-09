export type DecadePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
  onTitleClick?: () => void;
};
export type DecadePickerState = {
  cursor: Date;
};
