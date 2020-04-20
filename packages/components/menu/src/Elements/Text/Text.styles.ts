import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as React from 'react';
import MenuItem from 'antd/lib/menu/MenuItem';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

type WrapperProps = {
  disabled?: boolean;
  danger?: boolean;
  prefixel?: React.ReactNode;
  pressed: boolean;
  description?: string | React.ReactNode;
  copyable?: boolean;
};

function colorOnFocus(props: WrapperProps & ThemeProps): string {
  const { pressed, disabled, danger } = props;
  if (danger) {
    return `${props.theme.palette['red-600']}`;
  }
  if (pressed && !disabled) {
    return `${props.theme.palette['blue-600']}`;
  }
  return `${props.theme.palette['grey-700']}`;
}
function backgroundColorOnFocus(props: WrapperProps & ThemeProps): string {
  const { description, danger } = props;
  if (description) {
    return props.theme.palette.white;
  }
  if (danger) {
    return props.theme.palette['red-050'];
  }
  return props.theme.palette['grey-050'];
}
function iconFillOnFocus(props: WrapperProps & ThemeProps): string {
  const { danger } = props;
  if (danger) {
    return `${props.theme.palette['red-600']}`;
  }
  return `${props.theme.palette['grey-700']}`;
}
function backgroundColorOnPressed(props: WrapperProps & ThemeProps): string {
  const { danger } = props;
  if (danger) {
    return `${props.theme.palette['red-100']}`;
  }
  return `${props.theme.palette['grey-100']}`;
}

export const ArrowRight = styled.div`
  transition: all 0.3s ease-out;
  opacity: 0;
`;

export const PrefixelWrapper = styled.div<{ disabled?: boolean; pressed?: boolean }>`
  display: flex;
  margin-top: -7px;
  margin-bottom: -7px;
  margin-left: -4px;
  margin-right: 12px;
  align-items: center;
  svg {
    fill: ${(props): string => (props.disabled ? props.theme.palette['grey-600'] : 'inherit')};
  }
`;

export const Wrapper = styled(MenuItem)<WrapperProps>`
  &&& {
    color: ${(props): string => (props.danger ? props.theme.palette['red-600'] : props.theme.palette['grey-700'])};
    opacity: ${(props): string => (props.disabled ? '0.4' : '1')};
    cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
    background: ${(props): string =>
      props.pressed && !props.disabled ? `${backgroundColorOnPressed(props)} !important` : ''};
    padding-right: 12px;
    padding-left: ${(props): string => (props.prefixel ? '8px' : '12px')};
    font-weight: 500;
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin: 0;
    height: auto;
    transition: background-color 0.3s ease-out;
    ${(props): string =>
      props.disabled
        ? `
    & > * {
       pointer-events: none
    }`
        : ''}
    &.ant-menu-item-only-child {
      margin-bottom: 0px;
    }
    &.ant-menu-item-selected {
      background: none;

      &:focus,
      &:active {
        background: ${(props): string => props.theme.palette['grey-050']};
      }

      &::after {
        content: none;
      }
    }
    &.ant-menu-item-disabled,
    &.ant-menu-submenu-disabled {
      color: ${(props): string => props.theme.palette['grey-600']} !important;
      ${(props: WrapperProps & ThemeProps): FlattenSimpleInterpolation | false =>
        props.danger !== undefined &&
        css`
          color: ${props.danger && props.theme.palette['red-600']} !important;
          svg {
            fill: ${props.danger && props.theme.palette['red-600']} !important;
          }
        `}
    }
    & .ds-menu-prefix > * > .ant-avatar::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${(props): string => props.theme.palette['grey-800']};
      opacity: 0.05;
      border-radius: inherit;
    }
    &:active {
      background: none;

      ${ArrowRight} {
        opacity: 1;

        svg {
          fill: ${(props): string => props.theme.palette['blue-600']};
        }
      }
    }
    & .ds-checkbox {
      padding: 0px;
    }
    & .ds-checkbox > .ant-checkbox-wrapper {
      padding: 0px;
    }
    &:focus:not(:active) {
      box-shadow: ${(props): string =>
        props.pressed && !props.disabled ? 'none' : `inset 0 0 0 2px ${props.theme.palette['blue-600']} !important`};
      color: ${(props): string => colorOnFocus(props)};
      background: ${(props): string => backgroundColorOnFocus(props)};
      .ds-menu-prefix > ${IconContainer} > svg {
        fill: ${(props): string => iconFillOnFocus(props)};
      }
    }

    &:focus:active {
      ${ArrowRight} {
        opacity: 1;

        svg {
          fill: ${(props): string => props.theme.palette['blue-600']};
        }
      }
    }

    & {
      .ds-icon {
        height: 18px;
        display: flex;
        align-items: center;
      }
    }

    ${PrefixelWrapper} {
      svg {
        ${(props): string | false =>
          !props.disabled &&
          `
          fill: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['grey-600']};
        `}
      }
    }
    &:focus {
      color: ${(props): string => (props.description ? `${props.theme.palette['blue-600']} !important` : 'inherit')};
    }
    &:hover {
      & .ds-menu-prefix > * > .ant-avatar::before,
      .ds-menu-prefix > .ant-badge::before,
      .ds-menu-prefix > .ant-avatar::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: 2px solid ${(props): string => props.theme.palette.white};
        opacity: 0.3;
        border-radius: inherit;
        box-sizing: border-box;
      }
      & .ds-menu-prefix > * > .ant-avatar::after,
      .ds-menu-prefix > .ant-badge::after,
      .ds-menu-prefix > .ant-avatar::after {
        opacity: 0.1;
      }
      ${ArrowRight} {
        opacity: 1;

        svg {
          fill: ${(props): string => props.theme.palette['blue-600']};
        }
      }
      ${(props): string | false =>
        !props.disabled &&
        `
        .ds-menu-prefix > ${IconContainer} > svg {
          fill: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
        }
        color: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
        background: ${props.danger ? props.theme.palette['red-050'] : props.theme.palette['grey-050']};
      `}
    }
  }
`;

export const Content = styled.div<{ highlight?: boolean }>`
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  line-height: 1.39;
  min-height: 18px;
  align-items: center;
  flex-wrap: wrap;
  ${(props): string | false =>
    !!props.highlight &&
    `
  font-weight:400;
  & > .search-highlight{
    font-weight:600;
  }
  `}
`;

export const Description = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${(props): string => props.theme.palette['grey-600']};
  font-weight: normal;
  line-height: 1.39;
  font-size: 13px;
  width: 100%;
`;

export const SuffixWraper = styled.div<{ disabled?: boolean }>`
  justify-content: flex-end;
  display: flex;
  ${(props): string | false =>
    !!props.disabled &&
    `svg {
      fill:${props.theme.palette['grey-600']}
    }
  `};
  svg {
    margin-right: -4px;
  }
  &:hover {
    svg {
      fill: currentColor !important;
    }
  }
`;

export const ContentWrapper = styled.div<{ prefixel?: React.ReactNode; suffixel?: React.ReactNode }>`
  padding: 7px 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: ${(props): string => (props.suffixel ? 'wrap' : 'nowrap')};
`;

export const Inner = styled.div<{ prefixel?: React.ReactNode }>`
  width: 100%;
  display: flex;
`;
