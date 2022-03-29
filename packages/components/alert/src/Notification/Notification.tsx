import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { notification } from 'antd';
import { NotificationInstance } from 'antd/lib/notification';
import type { ArgsProps, NotificationApi } from 'antd/es/notification';

import 'antd/lib/notification/style/index.less';
import Button from '@synerise/ds-button';
import Icon, { UserAddM, CloseM } from '@synerise/ds-icon';

import * as S from './Notification.styles';

export type NotificationProps = {
  label?: string;
  type?: keyof NotificationInstance;
  onButtonClick?: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  closeIconClassName?: string;
  placement: ArgsProps['placement'] | 'bottom';
} & Partial<Omit<ArgsProps, 'placement'>>;

type NotificationApiHook = ReturnType<NotificationApi['useNotification']>;
type ApiHook = NotificationApiHook[0];
type ContextHolder = NotificationApiHook[1];

export function Notification({
  label,
  children = undefined,
  onButtonClick,
  onClose,
  icon,
  closeIconClassName = 'ds-close-icon',
}: NotificationProps & { children?: JSX.Element | React.ReactNode | React.ReactNode[] }): JSX.Element {
  return (
    <S.NotificationsContainer>
      <S.TextLabel>{children}</S.TextLabel>
      {(label || onClose) && (
        <S.Shrink>
          {label && (
            <Button type="primary" mode="icon-label" color="blue" onClick={onButtonClick}>
              {icon || (icon !== null && <Icon component={<UserAddM />} />)}
              {label}
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
 * creates a div, mounts it in getContainer and returns reference to it.
 * This is a helper function for creating a getContainer-compatible element,
 * which later should be passed to getContainer option in `antd-notification`'s api
 *
 * @param @contextHolder notification's hook api context
 * @param @getContainer where to mount styled wrapper; can be a ref=React.useRef, <div ref={ref}/>
 **/
export function mountInstance(
  contextHolder?: ContextHolder,
  { getContainer = (): HTMLElement => document.body, className = 'popup-container' } = {}
): [HTMLElement | null, Function] {
  const element = document.createElement('div');
  element.setAttribute('class', className);
  const cont = getContainer();
  cont.appendChild(element);
  const jsxEl = <S.NotificationsWrapper>{contextHolder}</S.NotificationsWrapper>;
  ReactDOM.render(jsxEl, element);
  const cleanUpFunction = (): void => {
    cont.removeChild(element);
  };
  return [element, cleanUpFunction];
}

export function notificationOpen(
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
): void {
  const api = notificationApi || notification;
  // TODO: check if context is actually available
  let el: HTMLElement | null = document.body.querySelector(`.${className}`);
  if (!el) {
    [el] = mountInstance(contextHolder, { className });
  }
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
