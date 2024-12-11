import styled from 'styled-components';
import { theme } from '@synerise/ds-core';

/**
 * @deprecated - Notification component will no longer be supported
 **/
export const NotificationsContainer = styled.div`
  background-color: ${(props): string => (props?.theme || theme).palette?.['grey-800']};
  color: white;
  min-width: 588px;
  padding: 8px 8px 8px 16px;
  display: flex;
  align-items: center;
  width: 100px;
  min-height: 50px;
`;

/**
 * @deprecated - Notification component will no longer be supported
 **/
export const Shrink = styled.div`
  flex-grow: 0;
`;

/**
 * @deprecated - Notification component will no longer be supported
 **/
export const TextLabel = styled.div`
  flex-grow: 1;
  font-size: 13px;
`;

/**
 * @deprecated - Notification component will no longer be supported
 **/
export const NotificationsWrapper = styled.div`
  & .ant-notification-bottom .ant-notification-hook-holder {
    margin: 0;

    &:not(:first-child) {
      margin-top: 8px; // TODO: if placement bottom*, for placement top - should be the opposite
    }
  }
  & .ant-notification.ant-notification-bottom {
    right: 0;
    left: 0;
    margin: 0 auto;
    width: 588px;
    bottom: 8px;
  }

  & .ant-notification-hook-holder {
    background-color: transparent;
    box-shadow: none;
    width: 588px;
  }
  & .ant-notification-notice {
    padding: 0;
    background-color: transparent;
    margin: unset;
  }
  & .ant-notification-notice {
    background-color: transparent;
    width: 588px;
    border-radius: 6px;
    box-shadow: 0 16px 32px 0 ${(props): string => (props?.theme || theme).palette?.['grey-900']}1a,
      0 8px 16px 0 ${(props): string => (props?.theme || theme).palette?.['grey-900']}1a;
  }
  .ant-notification-notice-icon {
    display: none;
  }
  .ant-notification-notice-with-icon {
    background-color: transparent;
  }
  .ant-notification-notice-close {
    display: none;
  }
  & .ant-notification-notice-message,
  & .ant-notification-notice-closable .ant-notification-notice-message {
    padding-right: 0;
  }
  & .ant-notification-notice-message,
  & .ant-notification-notice-with-icon .ant-notification-notice-message {
    margin-left: 0;
    margin-bottom: 0;
  }
}`;

export default {
  NotificationsContainer,
  NotificationsWrapper,
  TextLabel,
  Shrink,
};
