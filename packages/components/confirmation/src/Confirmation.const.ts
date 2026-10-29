import type { ConfirmationType } from './Confirmation.types';

export const BUTTON_TYPE_MAPPING: Record<ConfirmationType, string> = {
  negative: 'danger',
  success: 'success',
  warning: 'warning',
  informative: 'primary',
};

export const ICON_COLOR_MAPPING: Record<ConfirmationType, string> = {
  negative: 'var(--ds-color-icon-danger-default)',
  success: 'var(--ds-color-icon-success-default)',
  warning: 'var(--ds-color-icon-warning-default)',
  informative: 'var(--ds-color-icon-base-default)',
};

export const ITEM_SIZE = 32;

export const MAX_ITEMS = 6;
