import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

import { Text } from '@synerise/ds-typography';

export const AvatarLabel = styled.div<{
  onClick?: () => void;
  isDisabled?: boolean;
}>`
  display: inline-flex;
  min-width: 0;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  ${(props) => props.isDisabled && 'opacity: 0.4'};
  ${(props) => (props.onClick !== undefined ? 'cursor: pointer' : '')};
`;

export const Avatar = styled.div<{ clickable: boolean }>`
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props): string => (props.clickable ? 'cursor: pointer' : '')};
`;

export const Description = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 100%;
`;

export const AvatarLink = styled.a`
  display: flex;
  min-width: 0;
  color: inherit;
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    color: inherit;
  }
`;

export const Title = styled(Text)<{
  hasEllipsis?: boolean;
  maxWidth: number | undefined;
  avatarSize?: string | 'large';
}>`
  font-size: 14px;
  line-height: 20px;
  color: ${(props): string => props.theme.palette['grey-700']};
  font-weight: 500;
  ${(props): FlattenSimpleInterpolation | false =>
    Boolean(props.ellipsis) &&
    css`
      max-width: ${props.maxWidth ? `${props.maxWidth}px` : '100%'};
    `};
`;

export const Labels = styled.span<{
  ellipsis: boolean;
  maxWidth: number | undefined;
}>`
  font-size: 13px;
  line-height: 1.38;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  color: ${(props): string => props.theme.palette['grey-700']};
`;

export const Label = styled.span``;

export const Icon = styled.div`
  margin-right: 8px;
`;

export const Loader = styled.div``;
