import styled, { type SimpleInterpolation, css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

type WrapperProps = {
  disabled?: boolean;
  danger?: boolean;
  icon?: JSX.Element;
  size?: ListItemType;
};
type ContentWrapperProps = {
  icon?: JSX.Element;
};

export type ListItemType = 'small' | 'medium';

export const IconWrapper = styled.div``;

export const Wrapper = styled.li<WrapperProps>`
  color: ${(props: WrapperProps & ThemeProps): string => {
    if (props.danger) {
      return props.theme.palette['red-600'];
    }

    if (props.disabled) {
      return props.theme.palette['grey-700'];
    }

    return props.theme.palette['grey-700'];
  }};
  opacity: ${(props): string => (props.disabled ? '0.4' : '1')};
  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  border-radius: 3px;
  display: flex;
  align-items: center;
  ${(props): SimpleInterpolation =>
    props.size === 'small' &&
    css`
      padding: 5px 12px 4px 7px;
    `}
  ${(props): SimpleInterpolation =>
    props.size === 'medium' &&
    css`
      padding: 12px;
      padding-left: ${props.icon ? '12px' : '16px'};
    `}
  ${IconWrapper} {
    svg {
      ${(props): string | false =>
        !props.disabled &&
        `
        fill: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['grey-600']};
      `}
    }
  }
  &:hover {
    ${(props): string | false =>
      !props.disabled &&
      `
      ${IconWrapper} {
        svg {
          fill: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
        }
      }
      color: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
      background: ${props.danger ? props.theme.palette['red-050'] : props.theme.palette['grey-050']};
    `}
    span {
      color: ${({ theme }): string => theme.palette['blue-600']};
    }
  }

  &:focus {
    box-shadow: inset 0 0 0 2px
      ${(props): string => props.theme.palette['blue-600']};
  }
`;

export const ContentWrapper = styled.div<ContentWrapperProps>`
  overflow: hidden;
  overflow-wrap: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  padding-left: ${(props): string => (props.icon ? '12px' : '0')};
`;

export const ActionWraper = styled.div`
  flex: 1;
`;
