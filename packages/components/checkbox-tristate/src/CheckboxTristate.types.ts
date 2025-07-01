import type {
  CheckboxTristateChangeEvent as BaseCheckboxTristateChangeEvent,
  CheckboxTristateChangeEventTarget as BaseCheckboxTristateChangeEventTarget,
  CheckboxTristateProps as BaseCheckboxTristateProps,
} from '@synerise/ds-checkbox';

/**
 * @deprecated import from @synerise/ds-checkbox
 */
export type CheckboxTristateProps = Omit<BaseCheckboxTristateProps, 'tristate'>;

/**
 * @deprecated import from @synerise/ds-checkbox
 */
export type CheckboxTristateChangeEventTarget =
  BaseCheckboxTristateChangeEventTarget;

/**
 * @deprecated import from @synerise/ds-checkbox
 */
export type CheckboxTristateChangeEvent = BaseCheckboxTristateChangeEvent;
