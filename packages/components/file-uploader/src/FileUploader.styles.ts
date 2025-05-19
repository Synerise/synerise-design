import styled, { css } from 'styled-components';
import { Label as TypographyLabel, Text } from '@synerise/ds-typography';
import Button from '@synerise/ds-button';
import { IconContainer } from '@synerise/ds-icon';
import { hexToRgba } from '@synerise/ds-utils';

export const Container = styled.div`
  width: 100%;
`;

export const Description = styled(Text)<{ hasError?: boolean }>`
  && {
    margin: ${props => (props.hasError ? '4px 0 8px' : '8px 0 8px')};
    display: block;
    color: ${props => props.theme.palette['grey-500']};
  }
`;

export const DropAreaContainer = styled.div<{ canUploadMore: boolean }>`
  width: 100%;
  margin: ${props => (props.canUploadMore ? '12px 0 8px' : '0')};
`;

export const DropAreaLabel = styled(Text)`
  && {
    color: ${props => props.theme.palette['grey-600']};
    font-weight: 500;
  }
`;

export const LargeDropAreaLabel = styled(TypographyLabel)`
  && {
    font-size: 14px;
    margin: 4px 0 0;
    display: block;
    color: ${props => props.theme.palette['grey-800']};
  }
`;

export const LargeDropAreaDescription = styled(Text)`
  && {
    margin: 4px 0 0;
    display: block;
    color: ${props => props.theme.palette['grey-600']};
  }
`;

export const DropAreaButton = styled.button<{
  isDropping?: boolean;
  hasError?: boolean;
  mode: string;
  pressed: boolean;
  filesLength: number;
  hidden: boolean;
}>`
  display: ${props => (props.hidden ? 'none' : 'flex')};
  align-items: center;
  border: 1px dashed ${props => props.theme.palette['grey-400']};
  padding: 11px 12px;
  border-radius: 3px;
  cursor: pointer;
  background-color: transparent;
  width: 100%;
  height: 48px;
  transition: height 0.03s;

  ${props =>
    props.mode === 'multi-large' &&
    props.filesLength === 0 &&
    `
      height: 160px;
      flex-direction: column;
      text-align: center;
      justify-content: center;
  `};

  ${props =>
    props.mode !== 'multi-large' &&
    `
      gap: 12px;
  `};

  ${IconContainer} {
    color: ${props => props.theme.palette['grey-700']};
  }

  ${props =>
    props.hasError &&
    `
      background-color: ${props.theme.palette['red-050']};
      border-color: ${props.theme.palette['red-600']};
    `}
  ${props =>
    props.pressed &&
    !props.disabled &&
    css`
      &&&:active,
      &&& {
        background-color: ${hexToRgba(props.theme.palette['grey-200'], 0.4)};
      }
    `}


  &:hover:not(:disabled) {
    background-color: ${props => hexToRgba(props.theme.palette['grey-200'], 0.2)};
    border-color: ${props => props.theme.palette['grey-400']};

    ${DropAreaLabel}, ${LargeDropAreaLabel} {
      color: ${props => props.theme.palette['grey-700']};
    }

    ${IconContainer} {
      color: ${props => props.theme.palette['grey-700']};
    }
  }

  &:disabled {
    background-color: ${props => props.theme.palette['grey-050']};
    ${LargeDropAreaLabel} {
      color: ${props => props.theme.palette['grey-400']};
    }
  }

  &&:active {
    color: ${props => props.theme.palette['red-400']};
    border-color: ${props => props.theme.palette['grey-400']};
    background-color: ${props => props.theme.palette['grey-050']};
  }

  &:focus:not(:active):not(:disabled) {
    border-color: ${props => props.theme.palette['blue-600']};
    background-color: ${props => props.theme.palette['blue-050']};
  }

  &:disabled {
    span,
    ${IconContainer} {
      opacity: 0.4;
    }
  }

  ${props =>
    props.isDropping &&
    !props.disabled &&
    `
      height: ${props.mode === 'multi-large' && props.filesLength === 0 ? '160px' : 'auto'};
      background-color: ${props.theme.palette['blue-050']} !important;
      border-color: ${props.theme.palette['blue-300']} !important;

      span, ${DropAreaLabel}, ${LargeDropAreaLabel}, ${LargeDropAreaDescription} {
        color: ${props.theme.palette['blue-500']} !important;
      }

      ${IconContainer} {
        color: ${props.theme.palette['blue-500']} !important;
      }
    `}
`;

export const ErrorMessage = styled(Text)`
  && {
    margin: 8px 0 0;
    display: block;
    color: ${props => props.theme.palette['red-600']};
  }
`;

export const Label = styled(TypographyLabel)`
  && {
    cursor: initial;
    margin: 0 0 8px;
    display: flex;
    align-items: center;

    ${IconContainer} {
      color: ${props => props.theme.palette['grey-400']};
    }
  }
`;

export const UploadButton = styled(Button)``;
