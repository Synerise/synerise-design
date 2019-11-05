import styled, { SimpleInterpolation } from 'styled-components';
import Typography, { Label } from '@synerise/ds-typography';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

export const PreviewImage = styled.div<{ source: string }>`
  background: url('${(props): string => props.source}') 50% 50% no-repeat;
  min-width: 32px;
  min-height: 32px;
  width: 32px;
  height: 32px;
  border-radius: 3px;
  overflow: hidden;
`;

export const PlaceholderImage = styled.div`
  background-color: ${(props): string => props.theme.palette['grey-200']};
  width: 32px;
  height: 32px;
  border-radius: 3px;
  padding: 4px;

  ${IconContainer} {
    fill: ${(props): string => props.theme.palette['grey-500']};
  }
`;

export const Info = styled.div`
  overflow: hidden;
  margin: 0 0 0 10px;
`;

export const Name = styled(Label)`
  && {
    color: ${(props): string => props.theme.palette['grey-600']};
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    cursor: initial;
  }
`;

export const SizeOrError = styled(Typography.Text)`
  && {
    color: ${(props): string => props.theme.palette['grey-600']};
  }
`;

export const FileViewContainer = styled.button<{ disabled?: boolean; error?: boolean }>`
  background-color: ${(props): string => props.theme.palette.white};
  border-radius: 3px;
  border: 1px solid ${(props): string => props.theme.palette['grey-200']};
  display: flex;
  align-items: center;
  padding: 7px;
  height: 48px;
  width: 100%;
  text-align: left;
  line-height: initial;

  &:hover {
    border-color: ${(props): string => props.theme.palette['grey-300']};
  }

  &:active {
    border-color: ${(props): string => props.theme.palette['grey-300']};
    background-color: ${(props): string => props.theme.palette['grey-050']};
  }

  &:focus {
    border-color: ${(props): string => props.theme.palette['blue-600']};
    background-color: ${(props): string => props.theme.palette['grey-050']};
  }

  ${(props): SimpleInterpolation =>
    props.disabled &&
    `
    background-color: ${props.theme.palette['grey-050']};
    opacity: 0.4;
  `};

  ${(props): SimpleInterpolation =>
    props.error &&
    `
    && {
      border: 1px solid ${props.theme.palette['red-600']};

      ${SizeOrError}, ${Name} {
        color: ${props.theme.palette['red-600']};
      }
    }
  `};
`;
