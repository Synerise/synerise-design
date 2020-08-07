import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const AvatarLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Avatar = styled.div<{ clickable: boolean }>`
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props): string => (props.clickable ? 'pointer' : 'default')};
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Title = styled.span<{
  withLabels: boolean;
  textSize: 'small' | 'default';
  ellipsis: boolean;
  maxWidth: number | undefined;
}>`
  font-size: ${(props): string => (props.withLabels && props.textSize === 'default' ? '16px' : '14px')};
  line-height: 20px;
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-700']};
  ${(props): FlattenSimpleInterpolation | false =>
    props.ellipsis &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: ${props.maxWidth ? `${props.maxWidth}px` : '100%'};
    `};
`;

export const Label = styled.span<{ textSize: 'small' | 'default'; ellipsis: boolean; maxWidth: number | undefined }>`
  font-size: 13px;
  line-height: 1.38;
  color: ${(props): string => props.theme.palette['grey-700']};
  font-weight: 400;
  margin-top: ${(props): string => (props.textSize === 'default' ? '4px' : '0px')};
  ${(props): FlattenSimpleInterpolation | false =>
    props.ellipsis &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: ${props.maxWidth ? `${props.maxWidth}px` : '100%'};
    `};
`;

export const Icon = styled.div`
  margin-right: 8px;
`;
