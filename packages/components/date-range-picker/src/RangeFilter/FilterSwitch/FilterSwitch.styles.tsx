import * as React from 'react';
import styled from 'styled-components';
import IconBase from '@synerise/ds-icon';

export const Icon = styled(({ on, ...rest }) => <IconBase {...rest} />)`
grid-area: icon;
position: relative;

  &::before,
  &::after {
    display: ${(props): string => (props.on ? 'block' : 'none')};
    position: absolute;
    content: '';
    right: 0;
    top: 0;
    border-radius: 50%;
    background-color: red;
    width: 8px;
    height: 8px;
  }

&::before {
  box-shadow: 0 0 0 6px rgba(255, 0, 0, 0.125);
}

&::after {
  box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.25);
}
`;

export const OpenModalButton = styled.button`
  grid-area: button;
  vertical-align: middle;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${(props): string => props.theme.variable('@primary-color')};
  font-weight: 500;
`;

export const RemoveFilterButton = styled.button`
  grid-area: removeButton;
  vertical-align: middle;
  background: none;
  border: none;
  padding: 0 20px;
  cursor: pointer;
  color: ${(props): string => props.theme.variable('@error-color')};
  font-weight: 500;
`;

export const Status = styled.span`
grid-area: status;

  b {
    color: ${(props): string => props.theme.variable('@gray-color')};
  }
`;

