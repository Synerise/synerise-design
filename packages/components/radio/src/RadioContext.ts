import { createContext } from 'react';

import {
  type RadioChangeEventTarget,
  type RadioValueType,
} from './Radio.types';

export type RadioGroupContextValue = {
  /** Currently selected value (single). */
  value?: RadioValueType;
  /**
   * Select a value; the group wraps `target` in the change event + calls the consumer onChange.
   * `target` is built by the child from its own props, as antd's rc-checkbox did.
   */
  onChange: (
    value: RadioValueType,
    nativeEvent: Event,
    target: RadioChangeEventTarget,
  ) => void;
  disabled?: boolean;
  name?: string;
  /** `'button'` makes the group render segmented `Radio.Button`s. */
  optionType?: 'default' | 'button';
  /** Button visual when `optionType === 'button'`. */
  buttonStyle?: 'outline' | 'solid';
  /** Segmented-button height (`small`/`middle`/`large`). */
  size?: 'small' | 'middle' | 'large';
};

/** Provided by `Radio.Group`; consumed by child `Radio`/`Radio.Button`. `null` when standalone. */
export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
  null,
);
