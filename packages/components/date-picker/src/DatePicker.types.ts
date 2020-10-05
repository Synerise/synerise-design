import * as React from 'react';
import { IntlShape } from 'react-intl';

export type Props = {
  autoFocus?: boolean;
  disabledDates?: (date?: Date) => boolean;
  disabledHours: number[];
  disabledMinutes: number[];
  disabledSeconds: number[];
  intl?: IntlShape;
  onApply?: (date?: Date) => void;
  onClear?: () => void;
  onDropdownVisibleChange?: (visible: boolean) => void;
  onValueChange?: (date?: Date) => void;
  error?: boolean;
  errorText?: string | React.ReactNode;
  popoverPlacement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  showTime?: boolean;
  texts: Texts;
  value?: Date;
  useStartOfDay?: boolean;
  useEndOfDay?: boolean;
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
  clearTooltip?: string | React.ReactNode;
};
