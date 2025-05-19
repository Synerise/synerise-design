import type { ConfirmationType } from './Confirmation.types';

export const BUTTON_COLOR_MAPPING: Record<ConfirmationType, string> = {
  negative: 'red',
  success: 'green',
  warning: 'yellow',
  informative: 'blue',
};

export const ITEM_SIZE = 32;

export const MAX_ITEMS = 6;
