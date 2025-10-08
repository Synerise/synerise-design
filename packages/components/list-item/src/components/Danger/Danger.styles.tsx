import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

import Text from '../Text/Text';
import { Inner, PrefixWrapper, Wrapper } from '../Text/Text.styles';

export const DangerItem = styled(Text)`
  &&& {
    ${Inner} {
      color: ${(props) => props.theme.palette['red-600']};
      ${Wrapper} {
        color: ${(props) => props.theme.palette['red-600']};
      }
      ${PrefixWrapper} {
        .ds-icon > svg {
          ${(props) =>
            `
            fill: ${props.theme.palette['red-600']};
            `}
        }
      }
      &:hover {
        ${(props) =>
          !props.disabled &&
          `
            ${PrefixWrapper} > ${IconContainer} > svg {
            fill: ${props.theme.palette['red-600']} !important;
            }
            background: ${props.theme.palette['red-050']};
        `}
      }
      &:focus-visible {
        ${(props) =>
          !props.disabled &&
          `
            ${PrefixWrapper} > ${IconContainer} > svg {
              fill: ${props.theme.palette['red-600']} !important;
            }
            background: ${props.theme.palette['red-050']} !important;
        `}
      }
      &:focus-visible:active {
        ${(props) =>
          !props.disabled &&
          `
            background: ${props.theme.palette['red-100']} !important;
        `}
      }
    }
  }
`;
