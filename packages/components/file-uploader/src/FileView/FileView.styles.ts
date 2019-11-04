import styled, { SimpleInterpolation } from 'styled-components';
import Typography, { Label } from '@synerise/ds-typography';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

export const FileViewContainer = styled.div<{ disabled?: boolean; error?: string }>`
  background-color: ${(props): string => props.theme.palette.white};
  border-radius: 3px;
  border: 1px solid ${(props): string => props.theme.palette['grey-200']};
  display: flex;
  align-items: center;
  padding: 8px;
  height: 48px;

  img {
    width: 32px;
    height: 32px;
  }

  ${(props): SimpleInterpolation =>
    props.disabled &&
    `
    background-color: ${props.theme.palette['grey-050']};
    opacity: 0.4;
  `};
`;

export const PreviewImage = styled.div<{ source: string }>`
  background: url('${(props): string => props.source}') 50% 50% no-repeat;
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

export const Size = styled(Typography.Text)`
  && {
    color: ${(props): string => props.theme.palette['grey-600']};
  }
`;
