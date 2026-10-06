import styled, { css } from 'styled-components';

import type { ThemeProps } from '@synerise/ds-core';
import { IconContainer } from '@synerise/ds-icon';
import { hexToRgba } from '@synerise/ds-utils';

import BaseButton from '../BaseButton';
import { CreatorStatus } from './Creator.types';

export const CreatorLabel = styled.span`
  margin: 0 12px 0 0;
  transition: all 0.3s ease;
  color: inherit;
`;
const errorStyles = () => css`
  border: 1px dashed var(--ds-color-border-danger-default);
  background: var(--ds-color-background-danger-subtle);

  &:focus-visible {
    background: var(--ds-color-background-base-default);
  }
  &:hover:not(:disabled):not(:focus-visible) {
    border: 1px dashed var(--ds-color-border-base-stronghover);
    background: var(--ds-color-background-base-default);
  }
`;

const uploadStyles = ({ theme }: ThemeProps) => css`
  & {
    border: 1px dashed var(--ds-color-border-brand-strong);
    background-color: var(--ds-color-background-brand-subtle);
    color: var(--ds-color-text-base-muted);
    &:hover:not(:disabled):not(:focus-visible) {
      border: 1px dashed var(--ds-color-border-brand-strong);
      background-color: var(--ds-color-background-brand-subtle);
      color: ${theme.palette['blue-500']};
    }
    &:focus-visible:active {
      border: 1px dashed var(--ds-color-border-brand-default);
      background-color: var(--ds-color-background-brand-subtle);
      box-shadow: none;
    }
    &:focus-visible {
      border: 1px dashed var(--ds-color-border-brand-default);
      box-shadow: none;
    }
    &:disabled {
      color: var(--ds-color-text-neutral-default);
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
    opacity: ${(props) =>
      props.disabled ? 'var(--ds-buttons-disabled-opacity)' : '1'};
    height: 48px;
    padding: ${(props) => (props.withLabel ? `0 12px 0 0` : '0')};
    border-radius: 3px;
    border: 1px dashed var(--ds-color-border-base-strong);
    background: transparent;
    color: var(--ds-color-text-base-muted);
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
      border: 1px dashed var(--ds-color-border-base-stronghover);
      background-color: ${({ theme }) =>
        hexToRgba(theme.palette['grey-200'], 0.25)};
    }
    ${(props) =>
      props.pressed &&
      `&&{ background-color: ${hexToRgba(props.theme.palette['grey-200'], 0.4)}; }`}

    &:focus-visible:active {
      border: 1px dashed var(--ds-color-border-base-stronghover) !important ;
      box-shadow: none;
      background-color: var(--ds-color-background-base-subtle);
    }
    &:focus-visible {
      border: 1px dashed var(--ds-color-border-brand-default);
      box-shadow: none;
    }
    &:disabled {
      border-color: var(--ds-color-border-base-strong);
      background-color: var(--ds-color-background-base-subtle);
    }
    ${(props) => props.status === CreatorStatus.Error && errorStyles()}
    ${(props) => props.status === CreatorStatus.Upload && uploadStyles(props)}
  }
`;
