import styled from 'styled-components';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

export const NotificationsContainer = styled.div`
  background-color: ${(props): string => (props?.theme || theme).palette?.['grey-800']};
  color: white;
  min-width: 588px;
  padding: 8px;
  padding-left: 16px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  width: 100px;
  min-height: 50px;
`;

export const Shrink = styled.div`
  flex-grow: 0;
`;

export const FlexGrow = styled.div`
  flex-grow: 1;
`;

export const NotificationsWrapper = styled.div`
  & .ant-notification {
    right: 0px;
    left: 0px;
    margin: 0 auto;
    width: 588px;
    bottom: 8px;
  }
  & .ant-notification-hook-holder {
    margin: 0px; // make sure it's 0 as this component might be empty
    margin-top: 0px;
    &:not(:first-child) {
      margin-top: 8px; // TODO: if placement bottom*, for placement top - should be the opposite
    }
    background-color: transparent;
    box-shadow: none;
    width: 588px;
  }
  & .ant-notification-notice {
    padding: 0px;
    background-color: transparent;
    margin: unset;
    width: 588px;
    border-radius: 3px;
    box-shadow: 0 16px 32px 0 ${(props): string => (props?.theme || theme).palette?.['grey-900']}1a,
      0 8px 16px 0 ${(props): string => (props?.theme || theme).palette?.['grey-900']}1a;
  }
  .ant-notification-notice-icon {
    display: none;
  }
  .ant-notification-notice-with-icon {
    background-color: transparent;
  }
  & .ant-notification-notice-closable .ant-notification-notice-message {
    padding-right: 0;
  }
  & .ant-notification-notice-with-icon .ant-notification-notice-message {
    margin-left: 0;
    margin-bottom: 0;
  }
  .ant-notification-notice-close {
    display: none;
  }
}`;

export default {
  NotificationsContainer,
  FlexGrow,
  Shrink,
};
