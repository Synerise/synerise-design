import styled, { SimpleInterpolation } from 'styled-components';
import Typography, { Label as TypographyLabel } from '@synerise/ds-typography';
import Button from '@synerise/ds-button';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

export const Container = styled.div`
  width: 100%;
`;

export const Description = styled(Typography.Text)<{ hasError?: boolean }>`
  && {
    margin: ${(props): SimpleInterpolation => (props.hasError ? '4px 0 0' : '8px 0 0')};
    display: block;
    color: ${(props): string => props.theme.palette['grey-500']};
  }
`;

export const DropAreaContainer = styled.div<{ canUploadMore: boolean }>`
  width: 100%;
  margin: ${(props): string => (props.canUploadMore ? '12px 0 0' : '0')};
`;

export const DropAreaLabel = styled(Typography.Text)`
  color: ${(props): string => props.theme.palette['grey-500']};
  font-weight: 500;
`;

export const LargeDropAreaLabel = styled(TypographyLabel)`
  && {
    font-size: 14px;
    margin: 4px 0 0;
    display: block;
    color: ${(props): string => props.theme.palette['grey-500']};
  }
`;

export const LargeDropAreaDescription = styled(Typography.Text)`
  && {
    margin: 4px 0 0;
    display: block;
    color: ${(props): string => props.theme.palette['grey-500']};
  }
`;

export const DropAreaButton = styled.button<{ isDropping?: boolean; hasError?: boolean; mode: string }>`
  display: flex;
  align-items: center;
  border: 1px dashed ${(props): string => props.theme.palette['grey-300']};
  padding: 11px 12px;
  border-radius: 3px;
  cursor: pointer;
  background-color: transparent;
  width: 100%;
  height: 48px;
  transition: height 0.3s;

  ${(props): SimpleInterpolation =>
    props.mode === 'multi-large' &&
    `
      height: 108px;
      flex-direction: column;
      text-align: center;
      justify-content: center;
  `};

  ${IconContainer} {
    fill: ${(props): string => props.theme.palette['grey-500']};
  }

  span {
    display: inline-block;
    margin: 0 0 0 12px;
  }

  ${(props): SimpleInterpolation =>
    props.hasError &&
    `
      background-color: ${props.theme.palette['red-050']};
      border-color: ${props.theme.palette['red-600']};
    `}

  &:hover:not(:disabled) {
    background-color: transparent;
    border-color: ${(props): string => props.theme.palette['grey-400']};

    ${DropAreaLabel}, ${LargeDropAreaLabel} {
      color: ${(props): string => props.theme.palette['grey-600']};
    }

    ${IconContainer} {
      fill: ${(props): string => props.theme.palette['grey-600']};
      color: ${(props): string => props.theme.palette['grey-600']};
    }
  }

  
  &:disabled {
    background-color: ${(props): string => props.theme.palette['grey-050']};
  }

  &&:active {
    color:${(props): string => props.theme.palette['red-400']};
    border-color: ${(props): string => props.theme.palette['grey-400']};
    background-color: ${(props): string => props.theme.palette['grey-050']};
  }

  &:focus:not(:active):not(:disabled) {
    border-color: ${(props): string => props.theme.palette['blue-600']};
  }

  &:disabled {
    span,
    ${IconContainer} {
      opacity: 0.4;
    }
  }

  ${(props): SimpleInterpolation =>
    props.isDropping &&
    !props.disabled &&
    `
      height: ${props.mode === 'multi-large' ? '168px' : 'auto'};
      background-color: ${props.theme.palette['blue-050']} !important;
      border-color: ${props.theme.palette['blue-300']} !important;

      span, ${DropAreaLabel}, ${LargeDropAreaLabel}, ${LargeDropAreaDescription} {
        color: ${props.theme.palette['blue-500']} !important;
      }

      ${IconContainer} {
        fill: ${props.theme.palette['blue-500']} !important;
      }
    `}
`;

export const ErrorMessage = styled(Typography.Text)`
  && {
    margin: 8px 0 0;
    display: block;
    color: ${(props): string => props.theme.palette['red-600']};
  }
`;

export const Label = styled(TypographyLabel)`
  && {
    cursor: initial;
    margin: 0 0 8px;
    display: flex;
    align-items: center;

    ${IconContainer} {
      fill: ${(props): string => props.theme.palette['grey-400']};
    }
  }
`;

export const UploadButton = styled(Button)``;
