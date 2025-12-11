import { fn } from 'storybook/test';

export const texts = {
  apply: 'Apply',
  now: 'Now',
  inputPlaceholder: 'Select date',
  clearTooltip: 'Clear',
};

export const baseArgs = {
  onApply: fn(),
  onDropdownVisibleChange: fn(),
  onClear: fn(),
  onValueChange: fn(),
  disabledHours: [],
  disabledMinutes: [],
  disabledSeconds: [],
  texts,
};
