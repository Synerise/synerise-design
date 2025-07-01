import React from 'react';
import styled, {
  type FlattenSimpleInterpolation,
  type Keyframes,
  css,
  keyframes,
} from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import { IconContainer } from '@synerise/ds-icon';

import Button from '../Button';

export type ExpanderProps = {
  onClick: () => void;
  size: number;
  disabled: boolean;
  expanded: boolean;
};
export const focusAnimation = ({ theme }: ThemeProps): Keyframes => keyframes`
  0% {
      box-shadow: inset 0 0 0 1px inherit;
  }
  50% {
     box-shadow: inset 0 0 0 1px ${theme.palette['blue-600']};
  }
  100% {
     box-shadow: inset 0 0 0 1px inherit;
  }
`;

const SIZE_DEFAULT = 24;
export const Expander = styled(({ children, expanded, size, ...rest }) => (
  <Button mode="single-icon" {...rest}>
    {children}
  </Button>
))`
  &&& {
    width: ${(props): string => props.size || SIZE_DEFAULT}px;
    height: ${(props): string => props.size || SIZE_DEFAULT}px;
    border-radius: 50%;
    background-color: ${(props): string => props.theme.palette['grey-050']};
    ${IconContainer} {
      svg {
        opacity: ${(props: ExpanderProps): string =>
          props.disabled ? `0.4` : `1`};
        fill: ${(props: ThemeProps): string =>
          props.theme.palette['grey-600']} !important;
        transition: transform 0.1s linear;
        transform: rotate(
          ${(props): string => (props.expanded ? '180deg' : '0deg')}
        );
      }
    }
    .btn-focus {
      box-shadow: inset 0 0 0 1px
        ${(props): string =>
          props.disabled
            ? props.theme.palette['grey-200']
            : props.theme.palette['grey-300']};
    }
    ${(props: ExpanderProps & ThemeProps): FlattenSimpleInterpolation | false =>
      !props.disabled &&
      css`
        &:hover {
          .btn-focus {
            box-shadow: inset 0 0 0 1px ${props.theme.palette['grey-400']};
          }
          background-color: ${props.theme.palette['grey-050']};
        }
        &:focus:not(:active) {
          .btn-focus {
            animation: ${focusAnimation(props)} 1s ease-in-out 0s 1;
          }
        }
      `}
  }
`;
