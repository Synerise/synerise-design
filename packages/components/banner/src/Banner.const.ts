import { resolveCustomColor } from '@synerise/ds-utils';

export const DEFAULT_SLIDE_SPEED = 5000;
// Tag takes `color` / `textColor` as raw CSS, so the custom-colour name is resolved here to its
// theme-aware token (`--ds-color-custom-yellow-600`), with white-on-solid text paired to it.
export const DEFAULT_STATUS_COLOR = resolveCustomColor(
  'yellow-600',
  'var(--ds-color-background-warning-solidhover)',
);
export const DEFAULT_STATUS_TEXT_COLOR = 'var(--ds-color-text-base-onsolid)';
