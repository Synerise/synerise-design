export type Props = {
  format?: string;
  showTime?: boolean;
  value?: Date;
  onApply?: (date?: Date) => void;
  dateValidator?: (date?: Date) => boolean;
  disabledHours: number[];
  disabledMinutes: number[];
  disabledSeconds: number[];
  useStartOfDay?: boolean;
  useEndOfDay?: boolean;
  texts: Texts;
};

export type State = {
  mode: string;
  month: Date;
  changed: boolean;
  value?: Date;
  enteredTo?: Date;
  visible?: boolean;
};

export type Modifier = {
  start?: Date;
  end?: Date;
  entered?: Date;
  'entered-start'?: Date;
  'entered-end'?: Date;
  disabled: boolean;
};
export type Texts = {
  apply: string;
  selectTime: string;
  selectDate: string;
  now: string;
};
