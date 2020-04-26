import styled from 'styled-components';
import * as React from 'react';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';
import Button from '../Button';

export type ExpanderProps = {
  onClick: () => void;
  size: number;
  disabled: boolean;
  pressed: boolean;
  expanded: boolean;
};
const SIZE_DEFAULT = 24;
export const Expander = styled(({ children, pressed, expanded, size, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
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
        opacity: ${(props: ExpanderProps): string => (props.disabled ? `0.4` : `1`)};
        fill: ${(props: ThemeProps): string => props.theme.palette['grey-600']} !important;
        transition: transform 0.1s linear;
        transform: rotate(${(props): string => (props.expanded ? '180deg' : '0deg')});
      }
    }
    .btn-focus {
      box-shadow: inset 0 0 0 1px
        ${(props): string => (props.disabled ? props.theme.palette['grey-200'] : props.theme.palette['grey-300'])};
    }
    ${(props: ExpanderProps & ThemeProps): string | false =>
      !props.disabled &&
      `&:hover {
      .btn-focus {
         box-shadow: inset 0 0 0 1px
          ${props.pressed ? props.theme.palette['blue-600'] : props.theme.palette['grey-400']} !important;
      }
      background-color: ${props.theme.palette['grey-050']};
    }
    &:focus:not(:hover) {
      .btn-focus {
        box-shadow: inset 0 0 0 1px
          ${props.pressed ? props.theme.palette['blue-600'] : props.theme.palette['grey-300']} !important;
      }
    }
    
    `}
  }
`;
