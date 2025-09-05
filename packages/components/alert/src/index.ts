import * as MainAlertStyles from './Alert.styles';
import * as ToastStyles from './Toast/Toast.styles';

export { default } from './Alert';

export const AlertStyles = {
  Alert: MainAlertStyles,
  Toast: ToastStyles,
};

/** @deprecated use `@synerise/ds-section-message` instead */
export { default as SectionMessage } from './SectionMessage/SectionMessage';

export { default as Toast } from './Toast/Toast';
export { default as BroadcastBar } from './BroadcastBar/BroadcastBar';

/** @deprecated use `@synerise/ds-inline-alert` instead */
export { default as IconAlert } from './IconAlert/IconAlert';

export { default as InlineAlert } from './InlineAlert/InlineAlert';

export { default as AlertInfo } from './AlertInfo/AlertInfo';
export type { AlertSize } from './AlertInfo/AlertInfo.types';

// @deprecated use AlertStyles.Alert instead
export { AlertMessage } from './Alert.styles';
