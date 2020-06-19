export type TimePickerProps = {
  format?: string;
  value?: Date;
  onChange: (date?: Date | undefined) => void;
  disabledHours: number[];
  disabledMinutes: number[];
  disabledSeconds: number[];
  /* showHour: boolean;
  showMinute: boolean;
  showSecond: boolean;
  hourOptions: [];
  minuteOptions: [];
  secondOptions: [];
  disabledHours: () => void;
  disabledMinutes: () => void;
  disabledSeconds: () => void;
  use12Hours: boolean;
  isAM: boolean; */
};
