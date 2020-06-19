
export type Props = {
  format?: string;
  showTime?: boolean;
  value?: Date;
  onApply?: (date?: Date) => void;
  disabledDate?: (day?: Date) => boolean;
  disabledHours: number[];
  disabledMinutes: number[];
  disabledSeconds: number[];
  useStartOfDay?: boolean;
  useEndOfDay?: boolean;
};

export type State = {
  mode: string;
  month: Date;
  changed: boolean;
  value?: Date;
  enteredTo?: Date;
};

export type Modifier = {
  disabled: boolean;
}