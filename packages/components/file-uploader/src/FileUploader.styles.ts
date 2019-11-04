import styled, { css, SimpleInterpolation } from 'styled-components';
import Typography from '@synerise/ds-typography';
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

export const DropAreaContainer = styled.div`
  width: 100%;
`;

export const DropAreaLabel = styled(Typography.Text)`
  color: ${props => props.theme.palette['grey-500']};
  font-weight: 500;
`;

export const DropArea = styled.button<{ isDropping?: boolean; hasError?: boolean }>`
  display: flex;
  align-items: center;
  border: 1px dashed ${(props): SimpleInterpolation => props.theme.palette['grey-300']};
  padding: 12px;
  border-radius: 3px;
  cursor: pointer;
  background-color: transparent;
  width: 100%;

  ${IconContainer} {
    fill: ${(props): SimpleInterpolation => props.theme.palette['grey-500']};
    color: ${(props): SimpleInterpolation => props.theme.palette['grey-500']};
  }

  span {
    display: inline-block;
    margin: 0 0 0 12px;
  }

  &:hover:not(:disabled) {
    border-color: ${(props): SimpleInterpolation => props.theme.palette['grey-400']};

    ${DropAreaLabel} {
      color: ${(props): SimpleInterpolation => props.theme.palette['grey-600']};
    }

    ${IconContainer} {
      fill: ${(props): SimpleInterpolation => props.theme.palette['grey-600']};
      color: ${(props): SimpleInterpolation => props.theme.palette['grey-600']};
    }
  }

  &:active,
  &:disabled {
    background-color: ${(props): SimpleInterpolation => props.theme.palette['grey-050']};
  }

  &:focus:not(:active):not(:disabled) {
    border-color: ${(props): SimpleInterpolation => props.theme.palette['blue-600']};
  }

  &:disabled {
    span,
    ${IconContainer} {
      opacity: 0.4;
    }
  }

  ${(props): SimpleInterpolation =>
    props.isDropping &&
    css`
      background-color: ${props.theme.palette['blue-050']};
      border-color: ${props.theme.palette['blue-300']};

      span,
      ${IconContainer} {
        color: ${props.theme.palette['blue-500']};
      }
    `}

  ${(props): SimpleInterpolation =>
    props.hasError &&
    css`
      background-color: ${props.theme.palette['red-050']};
      border-color: ${props.theme.palette['red-600']};
    `}
`;

export const ErrorMessage = styled(Typography.Text)`
  && {
    margin: 8px 0 0;
    display: block;
    color: ${(props): SimpleInterpolation => props.theme.palette['red-600']};
  }
`;

export const Label = styled(Typography.Title)`
  && {
    margin: 0 0 8px;
    font-size: 13px;
  }
`;

export const UploadButton = styled(Button)``;
