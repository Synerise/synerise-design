import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import type { IntlShape } from 'react-intl';

import type { DateToFormatOptions } from '@synerise/ds-core';
import type { DropdownSharedProps } from '@synerise/ds-dropdown';
import type { InputProps } from '@synerise/ds-input';
import type { DataAttributes } from '@synerise/ds-utils';

export type QuickPick = {
  label: ReactNode;
  value: Date;
};

export type BaseDatePickerProps = {
  autoFocus?: boolean;
  disabled?: boolean;

  disabledHours?: number[];
  disabledMinutes?: number[];
  disabledSeconds?: number[];
  dropdownProps?: Partial<Omit<DropdownSharedProps, 'children' | 'overlay'>>;
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
  popoverPlacement?:
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight';
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  showTime?: boolean;
  texts?: Partial<Texts>;
  renderTrigger?: () => ReactElement;
  useStartOfDay?: boolean;
  useEndOfDay?: boolean;
  hideNow?: boolean;
  quickPicks?: QuickPick[];
  readOnly?: boolean;
  inputProps?: Pick<InputProps, 'autoResize'>;
  disabledDates?: (date?: Date) => boolean;
  overlayHTMLAttributes?: HTMLAttributes<HTMLDivElement> & DataAttributes;
  triggerHTMLAttributes?: HTMLAttributes<HTMLDivElement> & DataAttributes;
};

/**
 * `value` takes either shape — a `Date`, or an ISO string, which `toDateValue` parses.
 *
 * What comes back out is always a `Date`. Without `timeZone` it is the plain `Date`
 * the picker was handed; with it, a `TZDate` carrying the resolved zone, which is a `Date`
 * subclass and so needs no separate type. Input and output used to be tied to one `ValueType`
 * parameter, which forced a consumer holding a `Date` to also declare its output as `string` —
 * unsatisfiable in practice, and every call site suppressed the error instead of obeying it.
 */
type ValueRelatedProps = {
  onApply: (date?: Date) => void;
  value?: Date | string;
  onValueChange?: (date?: Date) => void;
  timeZone?: true | string;
};

export type DatePickerProps = ValueRelatedProps & BaseDatePickerProps;

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
  quickPicks: ReactNode;
};
