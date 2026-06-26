import { createContext } from 'react';

import { type CheckboxValueType } from './Checkbox.types';

export type CheckboxGroupContextValue = {
  /** Currently checked values. */
  value: CheckboxValueType[];
  /** Toggle a value in/out of the checked set. */
  toggleOption: (value: CheckboxValueType) => void;
  /** Register a child value (in mount order) so onChange keeps child order. */
  registerValue: (value: CheckboxValueType) => void;
  /** Unregister a child value on unmount. */
  unregisterValue: (value: CheckboxValueType) => void;
  disabled?: boolean;
  name?: string;
};

/** Provided by `Checkbox.Group`; consumed by child `Checkbox`es. `null` when standalone. */
export const CheckboxGroupContext =
  createContext<CheckboxGroupContextValue | null>(null);
