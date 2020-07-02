export type TimePickerProps = {
  format?: string;
  value?: Date;
  onChange: (date?: Date | undefined) => void;
  disabledHours: number[];
  disabledMinutes: number[];
  disabledSeconds: number[];
  onShortNext?: () => void;
  onShortPrev?: () => void;
};
