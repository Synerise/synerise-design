import type { CSSProperties, ReactNode } from 'react';

export type CheckboxValueType = string | number | boolean;

export type BaseCheckboxProps = {
  description?: ReactNode;
  errorText?: ReactNode;
  hasError?: boolean;
  withoutPadding?: boolean;
};

/** antd-compatible change event shape (`target.checked` is a boolean for the base checkbox). */
export type CheckboxChangeEventTarget = {
  type: 'checkbox';
  checked: boolean;
  value?: CheckboxValueType;
  name?: string;
  [key: string]: unknown;
};

export type CheckboxChangeEvent = {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: Event;
};

/** Tristate event — `target.checked` may be `undefined` (the indeterminate state). */
export type CheckboxTristateChangeEventTarget = Omit<
  CheckboxChangeEventTarget,
  'checked'
> & {
  checked: boolean | undefined;
};

export type CheckboxTristateChangeEvent = {
  target: CheckboxTristateChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: Event;
};

type CommonCheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  value?: CheckboxValueType;
  name?: string;
  id?: string;
  autoFocus?: boolean;
  tabIndex?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Forwarded to the underlying <input> (e.g. data-testid), matching antd's rc-checkbox. */
  [dataAttr: `data-${string}`]: string;
};

type OnChangeBaseProps = {
  tristate?: never | false | undefined;
  onChange?: (event: CheckboxChangeEvent) => void;
};
type OnChangeTristateProps = {
  tristate: true;
  onChange?: (event: CheckboxTristateChangeEvent) => void;
};

export type CheckboxBaseProps = CommonCheckboxProps &
  BaseCheckboxProps &
  OnChangeBaseProps;
export type CheckboxTristateProps = CommonCheckboxProps &
  BaseCheckboxProps &
  OnChangeTristateProps;

export type CheckboxProps = CheckboxBaseProps | CheckboxTristateProps;

export type CheckboxOptionType = {
  label: ReactNode;
  value: CheckboxValueType;
  disabled?: boolean;
};

export type CheckboxGroupProps = {
  value?: CheckboxValueType[];
  defaultValue?: CheckboxValueType[];
  onChange?: (checkedValues: CheckboxValueType[]) => void;
  options?: (CheckboxValueType | CheckboxOptionType)[];
  disabled?: boolean;
  name?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};
