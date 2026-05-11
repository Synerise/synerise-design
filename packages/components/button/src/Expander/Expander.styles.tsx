import styled, {
  type FlattenSimpleInterpolation,
  type Keyframes,
  css,
  keyframes,
} from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import { IconContainer } from '@synerise/ds-icon';

import BaseButton from '../BaseButton';

export type ExpanderProps = {
  expanderSize?: number;
  disabled?: boolean;
  expanded?: boolean;
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
export const Expander = styled(BaseButton).attrs({
  type: 'ghost',
})<ExpanderProps>`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: ${(props): number => props.expanderSize || SIZE_DEFAULT}px;
    height: ${(props): number => props.expanderSize || SIZE_DEFAULT}px;
    border-radius: 50%;
    background-color: ${(props): string => props.theme.palette['grey-050']};
    box-shadow: inset 0 0 0 1px
      ${(props): string =>
        props.disabled
          ? props.theme.palette['grey-200']
          : props.theme.palette['grey-300']};
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
    ${(props: ExpanderProps & ThemeProps): FlattenSimpleInterpolation | false =>
      !props.disabled &&
      css`
        &:hover {
          box-shadow: inset 0 0 0 1px ${props.theme.palette['grey-400']};
          background-color: ${props.theme.palette['grey-050']};
        }
        &:focus-visible:not(:active) {
          animation: ${focusAnimation(props)} 1s ease-in-out 0s 1;
        }
      `}
  }
`;
