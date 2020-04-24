import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';
import * as React from 'react';
import Button from '../Button';
import { ButtonFocus, RippleEffect } from '../Button.styles';
import { CreatorProps } from './Creator';

const CREATOR_TYPE = {
  default: 'default',
  upload: 'upload',
  error: 'error',
};
export const CreatorLabel = styled.span`
  && {
    margin: 0 12px 0 0;
    transition: all 0.3s ease;
    color: ${(props): string => props.theme.palette['grey-500']};
  }
`;
const errorStyles = (props: CreatorProps & ThemeProps): FlattenSimpleInterpolation => {
  return css`
    border: 1px dashed ${props.theme.palette['red-600']};
    background: ${props.theme.palette['red-050']};

    &:focus {
      background: ${props.theme.palette.white};
    }
    &:hover:not(:disabled):not(:focus) {
      border: 1px dashed ${props.theme.palette['grey-400']};
      background: ${props.theme.palette.white};
    }
  `;
};
const uploadStyles = (props: CreatorProps & ThemeProps): FlattenSimpleInterpolation => css`
  border: 1px dashed ${props.theme.palette['blue-300']};
  background: ${props.theme.palette['blue-050']} !important;
  ${IconContainer} {
    margin: 12px;
    svg {
      transition: all 0.3s ease;
      fill: ${props.theme.palette['blue-500']};
    }
  }
  &:hover:not(:disabled) {
    ${IconContainer} {
      svg {
        fill: ${props.theme.palette['blue-500']} !important;
      }
    }
    ${CreatorLabel} {
      color: ${props.theme.palette['blue-500']} !important;
    }
  }
  ${CreatorLabel} {
    color: ${props.theme.palette['blue-500']};
  }
  &:hover:not(:disabled):not(:focus) {
    border: 1px dashed ${props.theme.palette['blue-300']};
    background-color: ${props.theme.palette['blue-050']} !important;
  }
  &:focus:active {
    border: 1px dashed ${props.theme.palette['blue-600']} !important ;
    box-shadow: none;
  }
  &:focus {
    border: 1px dashed ${props.theme.palette['blue-600']};
    box-shadow: none;
  }
  &:disabled {
    ${IconContainer} {
      margin: 12px;
      svg {
        transition: all 0.3s ease;
        color: ${props.theme.palette['grey-500']};
        fill: ${props.theme.palette['grey-500']};
      }
    }
    ${CreatorLabel} {
      color: ${props.theme.palette['grey-500']};
    }
  }
`;
export const Creator = styled(props => <Button {...props} />)<{ withLabel: boolean; pressed: boolean; status: string }>`
  &&& {
    width: ${(props): string => {
      if (props.block) return '100%';
      return props.withLabel ? 'auto' : '48px';
    }};
    opacity: ${(props): string => (props.disabled ? `0.4` : '1')};
    height: 48px;
    ${(props): string | false => props.withLabel && !props.block && `min-width: 200px;`}
    padding: 0;
    border-radius: 3px;
    border: 1px dashed ${({ theme }): string => theme.palette['grey-300']};
    background: ${({ theme }): string => theme.palette.white};
    transition: all 0.3s ease;
    justify-content: flex-start;

    ${IconContainer} {
      margin: 12px;
      box-sizing:content-box;
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
    &:hover:not(:disabled) {
      ${IconContainer} {
        svg {
          color: ${(props): string => props.theme.palette['grey-600']} !important;
          fill: ${(props): string => props.theme.palette['grey-600']} !important;
        }
      }
      ${CreatorLabel} {
        color: ${(props): string => props.theme.palette['grey-600']};
      }
    }
    &:hover:not(:disabled):not(:focus) {
      border: 1px dashed ${({ theme }): string => theme.palette['grey-400']};
      background-color: ${({ theme }): string => theme.palette.white};
    }
    ${(props): string | false => props.pressed && `background-color: ${props.theme.palette['grey-050']};`}

    &:focus:active {
      border: 1px dashed ${(props): string => props.theme.palette['grey-400']} !important ;
      box-shadow: none;
    }
    &:focus {
      border: 1px dashed ${(props): string => props.theme.palette['blue-600']};
      box-shadow: none;
    }
    &:disabled {
      border-color: ${(props): string => props.theme.palette['grey-300']};
      background-color: ${(props): string => props.theme.palette['grey-050']};
    }
    ${(props): FlattenSimpleInterpolation | false => props.status === CREATOR_TYPE.error && errorStyles(props)}
    ${(props): FlattenSimpleInterpolation | false => props.status === CREATOR_TYPE.upload && uploadStyles(props)}
  }
`;
