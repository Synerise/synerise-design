import styled from 'styled-components';
import Button from '@synerise/ds-button';
import { ButtonFocus, RippleEffect } from '@synerise/ds-button/dist/Button.styles';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

export const AddButtonLabel = styled.span`
  && {
    margin: 0 12px 0 0;
    transition: all 0.3s ease;
    color: ${(props): string => props.theme.palette['grey-500']};
  }
`;

export const AddButton = styled(Button)<{ withLabel: boolean }>`
  &&& {
    width: ${(props): string => (props.withLabel ? 'auto' : '48px')};
    height: 48px;
    padding: 0;
    border-radius: 3px;
    border: 1px dashed ${({ theme }): string => theme.palette['grey-300']};
    background-color: transparent;
    transition: all 0.3s ease;

    ${IconContainer} {
      margin: 12px;
      svg {
        transition: all 0.3s ease;
        color: ${(props): string => props.theme.palette['grey-500']};
        fill: ${(props): string => props.theme.palette['grey-500']};
      }
    }
    ${RippleEffect} {
      background-color: ${(props): string => props.theme.palette['grey-050']};
    }
    ${ButtonFocus} {
      display: none;
    }

    &:hover:not(:disabled):not(:focus) {
      border: 1px dashed ${({ theme }): string => theme.palette['grey-400']} !important;
      background-color: transparent !important;

      ${IconContainer} {
        svg {
          color: ${(props): string => props.theme.palette['grey-600']};
          fill: ${(props): string => props.theme.palette['grey-600']} !important;
        }
      }

      ${AddButtonLabel} {
        color: ${(props): string => props.theme.palette['grey-600']};
      }
    }
    &.pressed {
      background-color: ${({ theme }): string => theme.palette['grey-050']};
    }
    &:focus {
      border: 1px dashed ${({ theme }): string => theme.palette['blue-600']};
      box-shadow: none;
    }
    &:disabled {
      border-color: ${(props): string => props.theme.palette['grey-300']};
      background-color: ${(props): string => props.theme.palette['grey-050']};
      > * {
        opacity: 0.4;
      }
    }
  }
`;
