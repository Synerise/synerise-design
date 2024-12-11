import React from 'react';
import * as ReactDOM from 'react-dom';
import { notification } from 'antd';
import { NotificationInstance } from 'antd/lib/notification';
import type { ArgsProps, NotificationApi } from 'antd/es/notification';

import 'antd/lib/notification/style/index.less';
import Button from '@synerise/ds-button';
import Icon, { UserAddM, CloseM } from '@synerise/ds-icon';

import * as S from './Notification.styles';

/**
 * @deprecated - Notification component will no longer be supported
 **/
export type NotificationProps = {
  /** content of the notification */
  children?: JSX.Element | React.ReactNode | React.ReactNode[];
  /** text displayed on the button */
  buttonText?: string;
  /** type of the notification, `"info" | "success"`, see `antd/notification`, `info` by default */
  type?: keyof NotificationInstance;
  /** handler for clicking on the button, note button is rendered only if `buttonText` is provided */
  onButtonClick?: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /** close icon class */
  closeIconClassName?: string;
  /** where to position notification, `"{top,bottom}{Left,Right}" | "bottom"` */
  placement?: ArgsProps['placement'] | 'bottom';
} & Partial<Omit<ArgsProps, 'placement'>>;

type NotificationApiHook = ReturnType<NotificationApi['useNotification']>;
type ApiHook = NotificationApiHook[0];
type ContextHolder = NotificationApiHook[1];

/**
 * @deprecated - Notification component will no longer be supported
 **/
export function Notification({
  buttonText,
  children = undefined,
  onButtonClick,
  onClose,
  icon,
  closeIconClassName = 'ds-close-icon',
}: NotificationProps): JSX.Element {
  return (
    <S.NotificationsContainer>
      <S.TextLabel>{children}</S.TextLabel>
      {(buttonText || onClose) && (
        <S.Shrink>
          {buttonText && (
            <Button type="primary" mode="icon-label" color="blue" onClick={onButtonClick}>
              {icon || (icon !== null && <Icon component={<UserAddM />} />)}
              {buttonText}
            </Button>
          )}
          {onClose && (
            <Button className={closeIconClassName} type="ghost" onClick={onClose}>
              <Icon component={<CloseM />} />
            </Button>
          )}
        </S.Shrink>
      )}
    </S.NotificationsContainer>
  );
}

/**
 * @deprecated - Notification component will no longer be supported
 **/
export function mountInstance(
  contextHolder?: ContextHolder,
  { getContainer = (): HTMLElement => document.body, className = 'popup-container' } = {}
): [Promise<HTMLElement>, HTMLElement, () => void] {
  const element = document.createElement('div');
  element.setAttribute('class', className);
  const cont = getContainer();
  cont.appendChild(element);
  const jsxEl = <S.NotificationsWrapper>{contextHolder}</S.NotificationsWrapper>;
  const renderPromsie = new Promise<HTMLElement>(resolve => {
    ReactDOM.render(jsxEl, element, () => resolve(element));
  });
  const cleanUpFunction = (): void => {
    cont.removeChild(element);
  };
  return [renderPromsie, element, cleanUpFunction];
}

/**
 * @deprecated - Notification component will no longer be supported
 **/
export async function notificationOpen(
  {
    type = 'info',
    className = 'popup-container',
    message,
    icon,
    onClick,
    onClose,
    closeIconClassName = 'ds-close-icon',
    placement = 'bottom',
    ...props
  }: NotificationProps,
  notificationApi?: ApiHook,
  contextHolder?: ContextHolder
): Promise<void> {
  const api = notificationApi || notification;
  // TODO: check if context is actually available
  let el: HTMLElement | null = document.body.querySelector(`.${className}`);
  let containerPromise;
  if (!el) {
    [containerPromise, el] = mountInstance(contextHolder, { className });
  }

  await containerPromise;

  const getContainer: ArgsProps['getContainer'] = (): HTMLElement =>
    el?.querySelector('div>div,.NotificationsBottomPlacementWrapper>.NotificationsWrapper') as HTMLElement;

  /** a workaround for handling close clicks,
   * since there's no way for injecting other element triggering onClose listener.
   * It is set as a listener for all the clicks
   * and fires onClose when close-icon was clicked */
  const maybeCloseClick = (ev: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const isClickedElementChildOfCloseIcon = (ev.target as HTMLElement).closest(`.${closeIconClassName}`);
    const isThisCloseIcon = ev?.currentTarget?.classList.contains(`${closeIconClassName}`);
    if (isClickedElementChildOfCloseIcon || isThisCloseIcon) {
      return onClose && onClose();
    }
    return onClick && onClick();
  };
  return api.open({
    message,
    type,
    placement: placement as ArgsProps['placement'],
    getContainer,
    icon,
    onClick: maybeCloseClick as ArgsProps['onClick'],
    bottom: 16,
    ...props,
  });
}

export default Notification;
