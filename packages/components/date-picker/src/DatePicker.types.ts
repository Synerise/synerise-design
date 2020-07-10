import * as React from 'react';
import { IntlShape } from 'react-intl';

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
  intl?: IntlShape;
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
  now: string | React.ReactNode;
  inputPlaceholder?: string;
};
