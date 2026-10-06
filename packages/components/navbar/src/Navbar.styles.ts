import styled from 'styled-components';

import { macro } from '@synerise/ds-typography';

export const Navbar = styled.div<{ color?: string }>`
  background-color: ${(props): string =>
    props.color ? props.color : 'var(--ds-navbar-container-bg)'};
  padding: 16px 24px;
  height: 56px;
  display: flex;
  flex: 0 0 100%;
  align-items: center;
  color: var(--ds-color-text-base-onsolid);

  img {
    max-width: 100px;
  }
`;

export const NavbarDescription = styled.div`
  ${macro.h300};
  color: inherit;
  display: flex;
  flex: 1;
  padding-right: 24px;
`;

export const AdditionalNode = styled.div`
  display: flex;
  align-items: center;
  .ds-button:not(:last-child) {
    margin-right: 8px;
  }
`;

export const NavbarDivider = styled.div`
  width: 1px;
  height: 24px;
  background-color: var(--ds-navbar-left-separator-color);
  opacity: var(--ds-navbar-left-separator-opacity);
  margin: 0 12px;
`;

export const NavbarActions = styled.div`
  display: flex;
  align-items: center;

  > div {
    overflow: hidden;
  }
`;

export const NavbarActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: -4px;
  margin-right: -4px;

  > * {
    margin: 0 4px;
  }
`;
export const NavbarAlertNotification = styled.div`
  display: flex;
  align-items: center;
  .ds-button {
    margin-left: 12px;
  }
  .ds-inline-alert svg {
    color: var(--ds-color-text-base-onsolid);
  }
  .ds-inline-alert > span {
    color: var(--ds-color-text-base-onsolid);
  }
`;
