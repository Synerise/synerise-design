import React, { useState } from 'react';

import Select from '@synerise/ds-select';
import type { SelectProps, SelectValue } from '@synerise/ds-select';

export const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
  { value: 'd', label: 'Option D' },
  { value: 'e', label: 'Option E' },
  { value: 'f', label: 'Very long option name that overflows the selector' },
  { value: 'g', label: 'Option G' },
  { value: 'h', label: 'Option H', disabled: true },
];

/**
 * Controlled wrapper so the stories are interactive. Handles both single-value
 * and multiple/tags (array) values; forwards the arg `onChange` for the actions
 * panel. `data-popup-container` gives the default `getPopupContainer` an anchor.
 */
export const SelectWithState = (args: SelectProps) => {
  const [value, setValue] = useState<SelectValue>(
    args.value ?? args.defaultValue,
  );

  return (
    <div data-popup-container>
      <Select
        {...args}
        value={value}
        onChange={(next, option) => {
          args.onChange?.(next, option);
          setValue(next);
        }}
      />
    </div>
  );
};
