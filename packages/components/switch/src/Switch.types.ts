import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react';

import { type TooltipProps as DsTooltipProps } from '@synerise/ds-tooltip';
import { type DataAttributes } from '@synerise/ds-utils';

export type SwitchSize = 'small' | 'default';

export type SwitchChangeHandler = (
  checked: boolean,
  event: MouseEvent<HTMLButtonElement>,
) => void;

/** antd-Switch-style controls (kept back-compatible). */
type SwitchControlProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  loading?: boolean;
  /** Accepted for API compatibility — the DS switch renders at a single fixed size. */
  size?: SwitchSize;
  onChange?: SwitchChangeHandler;
  onClick?: SwitchChangeHandler;
};

/**
 * Bare DS toggle (the `RawSwitch` export). A `<button role="switch">` that also forwards native
 * button attributes (name, onBlur/onFocus, etc.) + `data-*` so React-Final-Form `{...input}` spreads
 * keep working. `disabled`, `id`, `className`, `style`, `title`, `tabIndex` come from the native attrs.
 */
export type RawSwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'onClick' | 'type' | 'value'
> &
  SwitchControlProps &
  DataAttributes;

export type Props = RawSwitchProps & {
  label: ReactNode;
  description?: ReactNode;
  errorText?: ReactNode;
  withFormElementMargin?: boolean;
  tooltipIcon?: ReactNode;
  tooltip?: ReactNode;
  tooltipConfig?: DsTooltipProps;
  style?: CSSProperties;
};
