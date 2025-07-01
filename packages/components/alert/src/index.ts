import * as MainAlertStyles from './Alert.styles';
import * as IconAlertStyles from './IconAlert/IconAlert.styles';
import * as SectionMessageStyles from './SectionMessage/SectionMessage.styles';
import * as ToastStyles from './Toast/Toast.styles';

export { default } from './Alert';

export const AlertStyles = {
  Alert: MainAlertStyles,
  SectionMessage: SectionMessageStyles,
  Toast: ToastStyles,
  IconAlert: IconAlertStyles,
};

export { default as SectionMessage } from './SectionMessage/SectionMessage';

export type {
  Props as SectionMessageProps,
  ColorType as SectionMessageColorType,
  AlertTypes as SectionMessageAlertTypes,
} from './SectionMessage/SectionMessage.types';

export { default as Toast } from './Toast/Toast';
export { default as BroadcastBar } from './BroadcastBar/BroadcastBar';

export { default as IconAlert } from './IconAlert/IconAlert';
export type { IconAlertType } from './IconAlert/IconAlert.types';

export { default as InlineAlert } from './InlineAlert/InlineAlert';

export { default as AlertInfo } from './AlertInfo/AlertInfo';
export type { AlertSize } from './AlertInfo/AlertInfo.types';

// @deprecated use AlertStyles.Alert instead
export { AlertMessage } from './Alert.styles';
