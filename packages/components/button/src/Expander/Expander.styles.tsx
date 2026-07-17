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
    background-color: var(--ds-button-expander-variant-default-bg-default);
    color: var(--ds-button-expander-variant-default-icon-default);
    box-shadow: inset 0 0 0 1px
      ${(props): string =>
        props.disabled
          ? 'var(--ds-button-expander-variant-default-border-disabled)'
          : 'var(--ds-button-expander-variant-default-border-default)'};
    ${IconContainer} {
      svg {
        opacity: ${(props: ExpanderProps): string =>
          props.disabled ? 'var(--ds-buttons-disabled-opacity)' : '1'};
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
          box-shadow: inset 0 0 0 1px
            var(--ds-button-expander-variant-default-border-hover);
          background-color: var(
            --ds-button-expander-variant-default-bg-default
          );
        }
        &:focus-visible:not(:active) {
          animation: ${focusAnimation(props)} 1s ease-in-out 0s 1;
        }
      `}
  }
`;
