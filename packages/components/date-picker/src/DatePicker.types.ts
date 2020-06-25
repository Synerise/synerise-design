import * as React from 'react';

export type Props = {
  showTime?: boolean;
  value?: Date;
  onApply?: (date?: Date) => void;
  disabledDates?: (date?: Date) => boolean;
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
  texts: Texts;
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
  apply: string | React.ReactNode;
  selectTime: string | React.ReactNode;
  selectDate: string | React.ReactNode;
  now: string | React.ReactNode;
};
