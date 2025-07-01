import React from 'react';
import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

import Text from '../Text/Text';
import { Inner, PrefixWrapper, Wrapper } from '../Text/Text.styles';

export const DangerItem = styled(({ children, disabled, ...rest }) => (
  <Text disabled={disabled} {...rest}>
    {children}
  </Text>
))`
  &&& {
    ${Inner} {
      color: ${(props): string => props.theme.palette['red-600']};
      ${Wrapper} {
        color: ${(props): string => props.theme.palette['red-600']};
      }
      ${PrefixWrapper} {
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
            ${PrefixWrapper} > ${IconContainer} > svg {
            fill: ${props.theme.palette['red-600']} !important;
            }
            background: ${props.theme.palette['red-050']};
        `}
      }
      &:focus {
        ${(props): string | false =>
          !props.disabled &&
          `
            ${PrefixWrapper} > ${IconContainer} > svg {
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
  }
`;
