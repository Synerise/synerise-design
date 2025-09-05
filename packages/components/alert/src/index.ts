import * as MainAlertStyles from './Alert.styles';
import * as IconAlertStyles from './IconAlert/IconAlert.styles';
import * as ToastStyles from './Toast/Toast.styles';

export { default } from './Alert';

export const AlertStyles = {
  Alert: MainAlertStyles,
  Toast: ToastStyles,
  IconAlert: IconAlertStyles,
};

/** @deprecated use `@synerise/ds-section-message` instead */
export { default as SectionMessage } from './SectionMessage/SectionMessage';

export { default as Toast } from './Toast/Toast';
/** @deprecated - use Broadcast-Bar instead */
export { default as BroadcastBar } from './BroadcastBar/BroadcastBar';

export { default as IconAlert } from './IconAlert/IconAlert';
export type { IconAlertType } from './IconAlert/IconAlert.types';

export { default as InlineAlert } from './InlineAlert/InlineAlert';

export { default as AlertInfo } from './AlertInfo/AlertInfo';
export type { AlertSize } from './AlertInfo/AlertInfo.types';

// @deprecated use AlertStyles.Alert instead
export { AlertMessage } from './Alert.styles';
