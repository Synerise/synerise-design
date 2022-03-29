import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { notification } from 'antd';
import { NotificationInstance } from 'antd/lib/notification';
import { Text } from '@synerise/ds-typography';
import type { ArgsProps, NotificationApi } from 'antd/es/notification';

import 'antd/lib/notification/style/index.less';
import Button from '@synerise/ds-button';
import Icon, { UserAddM, CloseM } from '@synerise/ds-icon';

import * as S from './Notification.styles';

export const defaultNotificationProps = {
  label: undefined as string | undefined,
  type: 'info' as keyof NotificationInstance | undefined,
  onButtonClick: undefined as unknown as undefined | ((ev: React.MouseEvent<HTMLElement, MouseEvent>) => void),
};
export type NotificationProps = Partial<ArgsProps> & Partial<typeof defaultNotificationProps>;
type NotificationApiHook = ReturnType<NotificationApi['useNotification']>;
type ApiHook = NotificationApiHook[0];
type ContextHolder = NotificationApiHook[1];

export function Notification({
  label,
  children = undefined,
  onButtonClick,
  onClose,
  icon,
}: NotificationProps & { children?: JSX.Element | React.ReactNode | React.ReactNode[] }): JSX.Element {
  const maybeCloseClick = React.useCallback(
    () =>
      (ev: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        const isClickedElementChildOfCloseIcon = (ev.target as HTMLElement).closest('.ds-close-icon');
        const isThisCloseIcon = ev?.currentTarget?.getAttribute('class')?.split(' ').indexOf('ds-close-icon') !== -1;
        if (isClickedElementChildOfCloseIcon || isThisCloseIcon) {
          onClose && onClose();
        }
      },
    [onClose]
  );
  return (
    <S.NotificationsContainer>
      <S.FlexGrow>{(typeof children === 'string' && <Text size="small">{children}</Text>) || children}</S.FlexGrow>
      {(label || onClose) && (
        <S.Shrink>
          {label && (
            <Button type="primary" mode="icon-label" color="blue" onClick={onButtonClick}>
              {icon || (icon !== null && <Icon component={<UserAddM />} />)}
              {label}
            </Button>
          )}
          {onClose && (
            <Button className="ds-close-icon" type="ghost" onClick={maybeCloseClick}>
              <Icon component={<CloseM />} />
            </Button>
          )}
        </S.Shrink>
      )}
    </S.NotificationsContainer>
  );
}

export function buildInstance(contextHolder?: ContextHolder, overwritePositioning = true): JSX.Element {
  return (
    <S.NotificationsWrapper>
      {(overwritePositioning && (
        <div key="popupcontainer" id="popup-container" style={{ position: 'absolute', right: '0px', bottom: '0px' }}>
          {contextHolder}
        </div>
      )) ||
        contextHolder}
    </S.NotificationsWrapper>
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
  const jsxEl = buildInstance(contextHolder);
  ReactDOM.render(jsxEl, element);
  const cleanUpFunction = (): void => {
    cont.removeChild(element);
  };
  return [element.querySelector('div,.NotificationsWrapper'), cleanUpFunction];
}

export function notificationOpen(
  {
    type = 'info',
    className = 'popup-container',
    message,
    icon,
    onClick,
    onClose,
    ...props
  }: NotificationProps = {} as NotificationProps,
  notificationApi?: ApiHook,
  contextHolder?: ContextHolder
): void {
  const api = notificationApi || notification; // fallback if no api given
  // TODO: check if context is actually available
  let el: HTMLElement | null = document.body.querySelector(`.${className} div`);
  const maybeCloseClick = (ev: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    if (
      (ev.target as HTMLElement).closest('.ds-close-icon') ||
      ev?.currentTarget?.getAttribute('class')?.split(' ').indexOf('ds-close-icon') !== -1
    ) {
      return onClose && onClose();
    }
    return onClick && onClick();
  };
  if (!el) {
    [el] = mountInstance(contextHolder, { className });
  }
  return api.open({
    message,
    type,
    placement: 'bottomRight',
    getContainer: () => el as HTMLElement,
    icon,
    onClick: maybeCloseClick as ArgsProps['onClick'],
    bottom: 16,
    ...props,
  });
}

export default Notification;
