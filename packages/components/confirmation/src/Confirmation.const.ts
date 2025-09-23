import type { ConfirmationType } from './Confirmation.types';

export const BUTTON_COLOR_MAPPING: Record<ConfirmationType, string> = {
  negative: 'red',
  success: 'green',
  warning: 'yellow',
  informative: 'blue',
};

export const ICON_COLOR_MAPPING: Record<ConfirmationType, string> = {
  negative: 'red-600',
  success: 'green-600',
  warning: 'yellow-600',
  informative: 'grey-600',
};

export const ITEM_SIZE = 32;

export const MAX_ITEMS = 6;
