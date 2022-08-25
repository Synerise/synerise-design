import { notification } from 'antd';

export { default } from './Alert';
export * as S from './Notification/Notification.styles';

/**
 * notificationApi is required for properly handling injecting ContextApi for styling and locales.
 * It's a proxy to `antd`'s `notification` module.
 */
export const notificationsApi = notification;

export type { NotificationProps } from './Notification/Notification';

export { default as Notification } from './Notification/Notification';

export { notificationOpen } from './Notification/Notification';
