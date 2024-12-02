import React from 'react';
import { createRoot } from 'react-dom/client';
import { notification } from 'antd';
import { NotificationInstance } from 'antd/lib/notification';
import type { ArgsProps, NotificationApi } from 'antd/es/notification';

import 'antd/lib/notification/style/index.less';
import Button from '@synerise/ds-button';
import Icon, { UserAddM, CloseM } from '@synerise/ds-icon';

import * as S from './Notification.styles';

/**
 * Typings for using better autocompletion for defining an argument for `notificationOpen`'s message property.
 */
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
 * Component with the content of the notification.
 * Note that in order to show notification you need to use `notificationOpen`
 */
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
): [Promise<HTMLElement>, HTMLElement, () => void] {
  const element = document.createElement('div');
  element.setAttribute('class', className);
  const cont = getContainer();
  cont.appendChild(element);
  const renderPromsie = new Promise<HTMLElement>(resolve => {
    const root = createRoot(element);
    const jsxEl = <S.NotificationsWrapper ref={() => resolve(element)}>{contextHolder}</S.NotificationsWrapper>;
    root.render(jsxEl);
  });
  const cleanUpFunction = (): void => {
    cont.removeChild(element);
  };
  return [renderPromsie, element, cleanUpFunction];
}

/**
 * Function for showing new notifications.
 * It requires proper context to be injected (see `notificationApi.useNotification`)
 * and `message` prop in its first argument.
 * Below you will find an example usage.
 * Please remember that it is on you to provide contextHolder in the right place.
 * ```
 *   import { notificationApi, Notification, notificationOpen } from '@synerise/ds-alert';
 *   const [api, contextHolder] = notificationApi.useNotification();
 *
 *   function App() {
 *     return (<div id="app">
 *       {contextHolder}
 *       <button onClick={() => notificationOpen({
 *         message: <Notification>You have been notified.</Notification>
 *       })}>
 *         Show notification
 *       </button>);
 *
 *    ReactDOM.render(<App/>, document.querySelector('#app'));
 * ```
 */
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
