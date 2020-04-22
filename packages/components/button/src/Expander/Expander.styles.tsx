import Button from '../Button';
import styled from 'styled-components';
import * as React from 'react';
import theme, { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

export type ExpanderProps = {
  size: 'S' | 'M' | number;
  disabled: boolean;
  pressed: boolean;
  expanded: boolean;
};

export const Expander = styled(({ children, pressed, expanded, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Button mode="single-icon" {...rest}>
    {children}
  </Button>
))`
  &&& {
    border-radius: 50px;
    border: none;
    outline: none !important;
    box-shadow: inset 0 0 0 1px ${(props: ThemeProps): string => props.theme.palette['grey-300']} !important;
    opacity: ${(props: ExpanderProps): string => (props.disabled ? `0.4` : `1`)};
    ${IconContainer} {
      svg {
        fill: ${(props: ThemeProps): string => props.theme.palette['grey-600']} !important;
        transition: transform 0.1s linear;
        transform: rotate(${(props): string => (props.expanded ? '0deg' : '180deg')});
      }
    }
    ${(props: ExpanderProps & ThemeProps): string | false =>
      !props.disabled &&
      `&:hover {
      .btn-focus {
        box-shadow: inset 0 0 0 1px ${props.theme.palette['grey-400']} !important;
      }
      background-color: ${props.theme.palette['grey-050']};
    }
    &:focus {
      .btn-focus {
        box-shadow: inset 0 0 0 1px
          ${(
        props.pressed ? props.theme.palette['blue-600'] : props.theme.palette['grey-300'])} !important;
      }
    }
    
    `}
    
  }
`;
