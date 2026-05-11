import styled, { css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import { IconContainer } from '@synerise/ds-icon';
import { hexToRgba } from '@synerise/ds-utils';

import BaseButton from '../BaseButton';
import { CreatorStatus } from './Creator.types';

export const CreatorLabel = styled.span`
  margin: 0 12px 0 0;
  transition: all 0.3s ease;
  color: inherit;
`;
const errorStyles = ({ theme }: ThemeProps) => css`
  border: 1px dashed ${theme.palette['red-600']};
  background: ${theme.palette['red-050']};

  &:focus-visible {
    background: ${theme.palette.white};
  }
  &:hover:not(:disabled):not(:focus-visible) {
    border: 1px dashed ${theme.palette['grey-400']};
    background: ${theme.palette.white};
  }
`;

const uploadStyles = ({ theme }: ThemeProps) => css`
  & {
    border: 1px dashed ${theme.palette['blue-300']};
    background-color: ${theme.palette['blue-050']};
    color: ${theme.palette['grey-600']};
    &:hover:not(:disabled):not(:focus-visible) {
      border: 1px dashed ${theme.palette['blue-300']};
      background-color: ${theme.palette['blue-050']};
      color: ${theme.palette['blue-500']};
    }
    &:focus-visible:active {
      border: 1px dashed ${theme.palette['blue-600']};
      background-color: ${theme.palette['blue-050']};
      box-shadow: none;
    }
    &:focus-visible {
      border: 1px dashed ${theme.palette['blue-600']};
      box-shadow: none;
    }
    &:disabled {
      color: ${theme.palette['grey-500']};
      ${IconContainer} {
        margin: 12px;
      }
    }
  }
`;

type StyledCreatorProps = {
  withLabel: boolean;
  pressed: boolean;
  status?: string;
  labelAlign: 'left' | 'center';
};
export const Creator = styled(BaseButton).attrs({
  type: 'ghost',
})<StyledCreatorProps>`
  && {
    display: inline-flex;
    width: ${(props) => {
      if (!props.withLabel) {
        return '48px';
      }
      if (props.block) {
        return '100%';
      }
      return 'auto';
    }};
    opacity: ${(props) => (props.disabled ? `0.4` : '1')};
    height: 48px;
    padding: ${(props) => (props.withLabel ? `0 12px 0 0` : '0')};
    border-radius: 3px;
    border: 1px dashed ${({ theme }) => theme.palette['grey-300']};
    background: transparent;
    color: ${({ theme }) => theme.palette['grey-600']};
    transition: all 0.3s ease;
    justify-content: ${(props) =>
      props.withLabel && !props.block ? `flex-start` : 'center'};
    align-items: center;

    > span {
      display: flex;
      align-items: center;
      justify-content: ${(props) =>
        props.labelAlign === 'center' ? 'center' : 'flex-start'};
    }

    ${IconContainer} {
      margin: auto 12px;
    }

    &:hover:not(:disabled):not(:focus-visible) {
      border: 1px dashed ${({ theme }) => theme.palette['grey-400']};
      background-color: ${({ theme }) =>
        hexToRgba(theme.palette['grey-200'], 0.25)};
    }
    ${(props) =>
      props.pressed &&
      `&&{ background-color: ${hexToRgba(props.theme.palette['grey-200'], 0.4)}; }`}

    &:focus-visible:active {
      border: 1px dashed ${(props) => props.theme.palette['grey-400']} !important ;
      box-shadow: none;
      background-color: ${(props) => props.theme.palette['grey-050']};
    }
    &:focus-visible {
      border: 1px dashed ${(props) => props.theme.palette['blue-600']};
      box-shadow: none;
    }
    &:disabled {
      border-color: ${(props) => props.theme.palette['grey-300']};
      background-color: ${(props) => props.theme.palette['grey-050']};
    }
    ${(props) => props.status === CreatorStatus.Error && errorStyles(props)}
    ${(props) => props.status === CreatorStatus.Upload && uploadStyles(props)}
  }
`;
