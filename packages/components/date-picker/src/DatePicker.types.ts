import type { IntlShape } from 'react-intl';
import type { ReactNode, ReactElement } from 'react';

import type { DropdownProps } from '@synerise/ds-dropdown/dist/Dropdown';
import type { DateToFormatOptions } from '@synerise/ds-data-format';
import type { InputProps } from '@synerise/ds-input';

type SharedDatePickerProps = {
  autoFocus?: boolean;
  disabled?: boolean;

  disabledHours?: number[];
  disabledMinutes?: number[];
  disabledSeconds?: number[];
  dropdownProps?: Partial<DropdownProps>;
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  format?: string;
  valueFormatOptions?: DateToFormatOptions;
  /**
   * @deprecated - will be dropped in 1.0
   */
  intl?: IntlShape;
  onClear?: () => void;
  onDropdownVisibleChange?: (visible: boolean) => void;
  allowClear?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  popoverPlacement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  showTime?: boolean;
  texts?: Partial<Texts>;
  renderTrigger?: () => ReactElement;
  useStartOfDay?: boolean;
  useEndOfDay?: boolean;
  hideNow?: boolean;
  readOnly?: boolean;
  inputProps?: Pick<InputProps, 'autoResize'>;
  disabledDates?: (date?: Date) => boolean;
};

type ValueRelatedProps<ValueType extends Date | string> = {
  onApply: (date?: ValueType) => void;
  value?: ValueType;
  onValueChange?: (date?: ValueType) => void;
  includeTimezoneOffset?: ValueType extends string ? boolean | string : never;
};

export type DatePickerProps<ValueType extends Date | string = Date> = SharedDatePickerProps &
  ValueRelatedProps<ValueType>;

// @deprecated - use DatePickerProps instead
export type Props = DatePickerProps;

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
  apply: ReactNode;
  now: ReactNode;
  inputPlaceholder: string;
  clearTooltip: ReactNode;
};
