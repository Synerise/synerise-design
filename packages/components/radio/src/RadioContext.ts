import { createContext } from 'react';

import { type RadioValueType } from './Radio.types';

export type RadioGroupContextValue = {
  /** Currently selected value (single). */
  value?: RadioValueType;
  /** Select a value; the group builds the change event + calls the consumer onChange. */
  onChange: (value: RadioValueType, nativeEvent: Event) => void;
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
