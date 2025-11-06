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

export type DatePickerProps = {
  autoFocus?: boolean;
  disabled?: boolean;
  disabledDates?: (date?: Date) => boolean;
  disabledHours?: number[];
  disabledMinutes?: number[];
  disabledSeconds?: number[];
  dropdownProps?: Partial<Omit<DropdownSharedProps, 'children' | 'overlay'>>;
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  format?: string;
  valueFormatOptions?: DateToFormatOptions;
  /**
   * @deprecated - will be dropped in 1.0
   */
  intl?: IntlShape;
  onApply: (date?: Date) => void;
  onClear?: () => void;
  onDropdownVisibleChange?: (visible: boolean) => void;
  onValueChange?: (date?: Date) => void;
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
  value?: Date;
  useStartOfDay?: boolean;
  useEndOfDay?: boolean;
  hideNow?: boolean;
  quickPicks?: QuickPick[];
  readOnly?: boolean;
  inputProps?: Pick<InputProps, 'autoResize'>;
  overlayHTMLAttributes?: HTMLAttributes<HTMLDivElement> & DataAttributes;
  triggerHTMLAttributes?: HTMLAttributes<HTMLDivElement> & DataAttributes;
};
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
