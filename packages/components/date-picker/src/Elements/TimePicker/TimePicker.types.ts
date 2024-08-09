export type TimePickerProps = {
  format?: string;
  value?: Date;
  onChange: (date?: Date | undefined) => void;
  disabledHours?: number[];
  disabledMinutes?: number[];
  disabledSeconds?: number[];
  inactivePrev?: boolean;
  inactiveNext?: boolean;
  onShortNext?: () => void;
  onShortPrev?: () => void;
  includeTimezoneOffset?: true | string;
};
