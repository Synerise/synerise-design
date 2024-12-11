import { notification } from 'antd';
import * as NotificationStyles from './Notification/Notification.styles';
import * as SectionMessageStyles from './SectionMessage/SectionMessage.styles';
import * as ToastStyles from './Toast/Toast.styles';
import * as MainAlertStyles from './Alert.styles';
import * as IconAlertStyles from './IconAlert/IconAlert.styles';

export { default } from './Alert';

export const AlertStyles = {
  Alert: MainAlertStyles,
  Notification: NotificationStyles,
  SectionMessage: SectionMessageStyles,
  Toast: ToastStyles,
  IconAlert: IconAlertStyles,
};

/**
 * @deprecated - Notification component will no longer be supported
 **/
export const notificationsApi = notification;

export type { NotificationProps } from './Notification/Notification';

export { default as Notification } from './Notification/Notification';
export { notificationOpen } from './Notification/Notification';

export { default as SectionMessage } from './SectionMessage/SectionMessage';

export type {
  Props as SectionMessageProps,
  ColorType as SectionMessageColorType,
  AlertTypes as SectionMessageAlertTypes,
} from './SectionMessage/SectionMessage.types';

export { default as Toast } from './Toast/Toast';

export { default as IconAlert } from './IconAlert/IconAlert';
export type { IconAlertType } from './IconAlert/IconAlert.types';

export { default as InlineAlert } from './InlineAlert/InlineAlert';

export { default as AlertInfo } from './AlertInfo/AlertInfo';
export type { AlertSize } from './AlertInfo/AlertInfo.types';

// @deprecated use AlertStyles.Alert instead
export { AlertMessage } from './Alert.styles';

/**
 * @deprecated - Notification component will no longer be supported
 **/
export * as S from './Notification/Notification.styles';
