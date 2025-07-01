import React from 'react';
import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

import Text from '../Text/Text';
import { ContentWrapper, PrefixelWrapper } from '../Text/Text.styles';

export const DangerItem = styled(({ children, disabled, ...rest }) => (
  <Text disabled={disabled} {...rest}>
    {children}
  </Text>
))`
  &&& {
    &.ant-menu-submenu-disabled,
    &.-submenu-disabled {
      color: ${(props): string => props.theme.palette['red-600']};
      svg {
        fill: ${(props): string => props.theme.palette['red-600']};
      }
    }
    color: ${(props): string => props.theme.palette['red-600']};
    ${ContentWrapper} {
      color: ${(props): string => props.theme.palette['red-600']};
    }
    ${PrefixelWrapper} {
      .ds-icon > svg {
        ${(props): string =>
          `
          fill: ${props.theme.palette['red-600']};
        `}
      }
    }
    &:hover {
      ${(props): string | false =>
        !props.disabled &&
        `
        ${PrefixelWrapper} > ${IconContainer} > svg {
          fill: ${props.theme.palette['red-600']} !important;
        }
        background: ${props.theme.palette['red-050']};
      `}
    }
    &:focus {
      ${(props): string | false =>
        !props.disabled &&
        `
        ${PrefixelWrapper} > ${IconContainer} > svg {
          fill: ${props.theme.palette['red-600']} !important;
        }
        background: ${props.theme.palette['red-050']} !important;
      `}
    }
    &:focus:active {
      ${(props): string | false =>
        !props.disabled &&
        `
        background: ${props.theme.palette['red-100']} !important;
      `}
    }
  }
`;
