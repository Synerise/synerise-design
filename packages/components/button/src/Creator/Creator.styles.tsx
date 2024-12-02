import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core';
import { IconContainer } from '@synerise/ds-icon';
import { hexToRgba } from '@synerise/ds-utils';

import Button from '../Button';
import { ButtonFocus, RippleEffect } from '../Button.styles';
import { CreatorStatus } from './Creator.types';

export const CreatorLabel = styled.span`
  && {
    margin: 0 12px 0 0;
    transition: all 0.3s ease;
    color: ${(props): string => props.theme.palette['grey-500']};
  }
`;
const errorStyles = ({ theme }: ThemeProps): FlattenSimpleInterpolation => css`
  border: 1px dashed ${theme.palette['red-600']};
  background: ${theme.palette['red-050']};

  &:focus {
    background: ${theme.palette.white};
  }
  &:hover:not(:disabled):not(:focus) {
    border: 1px dashed ${theme.palette['grey-400']};
    background: ${theme.palette.white};
  }
`;

const uploadStyles = ({ theme }: ThemeProps): FlattenSimpleInterpolation => css`
  & {
    border: 1px dashed ${theme.palette['blue-300']};
    background-color: ${theme.palette['blue-050']};
    ${IconContainer} {
      svg {
        transition: all 0.3s ease;
        fill: ${theme.palette['blue-500']};
      }
    }
    &:hover:not(:disabled) {
      ${IconContainer} {
        svg {
          fill: ${theme.palette['blue-500']} !important;
        }
      }
      ${CreatorLabel} {
        color: ${theme.palette['blue-500']};
      }
    }
    ${CreatorLabel} {
      color: ${theme.palette['blue-500']};
    }
    &:hover:not(:disabled):not(:focus) {
      border: 1px dashed ${theme.palette['blue-300']};
      background-color: ${theme.palette['blue-050']};
    }
    &:focus:active {
      border: 1px dashed ${theme.palette['blue-600']};
      background-color: ${theme.palette['blue-050']};
      box-shadow: none;
    }
    &:focus {
      border: 1px dashed ${theme.palette['blue-600']};
      box-shadow: none;
    }
    &:disabled {
      ${IconContainer} {
        margin: 12px;
        svg {
          transition: all 0.3s ease;
          color: ${theme.palette['grey-500']};
          fill: ${theme.palette['grey-500']};
        }
      }
      ${CreatorLabel} {
        color: ${theme.palette['grey-500']};
      }
    }
  }
`;
export const Creator = styled(({ status, pressed, withLabel, ...rest }) => <Button {...rest} />)<{
  withLabel: boolean;
  pressed: boolean;
  status: string;
}>`
  &&& {
    width: ${(props): string => {
      if (!props.withLabel) return '48px';
      if (props.block) return '100%';
      return 'auto';
    }};
    opacity: ${(props): string => (props.disabled ? `0.4` : '1')};
    height: 48px;
    padding: ${(props): string => (props.withLabel ? `0 12px 0 0` : '0')};
    border-radius: 3px;
    border: 1px dashed ${({ theme }): string => theme.palette['grey-400']};
    background: transparent;
    transition: all 0.3s ease;
    justify-content: ${(props): string => (props.withLabel && !props.block ? `flex-start` : 'center')};
    align-items: center;

    &.ant-btn > span {
      display: flex;
      align-items: center;
    }

    ${IconContainer} {
      margin: auto 12px;
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
      background-color: ${({ theme }): string => hexToRgba(theme.palette['grey-200'], 0.2)};
    }
    ${(props): string | false =>
      props.pressed && `&&{ background-color: ${hexToRgba(props.theme.palette['grey-200'], 0.4)}; }`}

    &:focus:active {
      border: 1px dashed ${(props): string => props.theme.palette['grey-400']} !important ;
      box-shadow: none;
      background-color: ${(props): string => props.theme.palette['grey-050']};
    }
    &:focus {
      border: 1px dashed ${(props): string => props.theme.palette['blue-600']};
      box-shadow: none;
    }
    &:disabled {
      border-color: ${(props): string => props.theme.palette['grey-300']};
      background-color: ${(props): string => props.theme.palette['grey-050']};
    }
    ${(props): FlattenSimpleInterpolation | false => props.status === CreatorStatus.Error && errorStyles(props)}
    ${(props): FlattenSimpleInterpolation | false => props.status === CreatorStatus.Upload && uploadStyles(props)}
  }
`;
