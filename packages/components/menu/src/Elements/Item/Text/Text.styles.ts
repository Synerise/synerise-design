import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import * as React from 'react';
import MenuItem from 'antd/lib/menu/MenuItem';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

type WrapperProps = {
  disabled?: boolean;
  prefixel?: React.ReactNode;
  suffixel?: boolean;
  description?: string | React.ReactNode;
  copyable?: boolean;
  indentLevel?: number;
  ordered?: boolean;
  size?: 'default' | 'large';
};

const INDENT_LEVEL_STEP = 16;

const calculateIndent = (indentLevel: number | undefined): number => {
  const indentLevelPadding = indentLevel && Number(indentLevel) > 0 ? indentLevel * INDENT_LEVEL_STEP : 0;
  return indentLevelPadding;
};
export const ArrowRight = styled.div<{ disabled?: boolean }>`
  transition: all 0.3s ease-out;
  opacity: ${(props): string => (props.disabled ? '1' : '0')};
`;

export const Inner = styled.div`
  width: 100%;
  display: flex;
`;

export const PrefixelWrapper = styled.div<{ disabled?: boolean; visible?: boolean }>`
  display: ${(props): string | false => (props.visible ? `flex` : `none`)};
  margin-top: -7px;
  margin-bottom: -7px;
  margin-left: -4px;
  margin-right: 12px;
  align-items: center;
  ${(props): string | false => !!props.disabled && `svg {fill: ${props.theme.palette['grey-600']}};`}
`;

const disableOrdering = (): FlattenSimpleInterpolation => css`
  &::before {
    content: none;
  }
`;
export const Wrapper = styled(MenuItem)<WrapperProps>`
  &&& {
    ${(props): string | false => !props.description && props.size === 'default' && `max-height: 32px;`}
    ${(props): string | false => props.size === 'large' && `min-height: 50px;`}
    ${(props): string | FlattenSimpleInterpolation => (props.ordered ? '' : disableOrdering())};
    color: ${(props): string => props.theme.palette['grey-700']};
    opacity: ${(props): string => (props.disabled ? '0.4' : '1')};
    cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
    padding-right: 12px;
    font-weight: 500;
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin: 0;
    height: auto;
    transition: background-color 0.2s ease-out;
    padding-left: ${(props): string => (props.prefixel ? '8' : '12')}px;
    ${Inner} {
      padding-left: ${(props): string => `${calculateIndent(props.indentLevel)}px `};
    }
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
      color: ${(props): string => props.theme.palette['blue-600']};
      .ds-menu-prefix > .ds-icon > svg {
        fill: ${(props): string => props.theme.palette['blue-600']};
      }
      &::before {
        color: ${(props): string => props.theme.palette['blue-600']};
      }
      &:focus,
      &:active {
        background: ${(props): string => props.theme.palette['grey-050']};
        &::before {
          color: ${(props): string => props.theme.palette['grey-600']};
        }
      }

      &::after {
        content: none;
      }
    }
    &.ant-menu-item-disabled,
    &.ant-menu-submenu-disabled {
      color: ${(props): string => props.theme.palette['grey-600']} !important;
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
    }
    & .ds-checkbox {
      padding: 0px;
    }
    & .ds-checkbox > .ant-checkbox-wrapper {
      padding: 0px;
    }
    & .ds-tag {
      margin: 0;
    }
    &:focus:not(:active) {
      box-shadow: ${(props): string | false =>
        !props.disabled && `inset 0 0 0 2px ${props.theme.palette['blue-600']} `};
      color: ${(props): string => props.theme.palette['grey-700']};
      background: ${(props): string =>
        props.description ? props.theme.palette.white : props.theme.palette['grey-050']};
      ${PrefixelWrapper} > .ds-icon > svg {
        fill: ${(props): string => props.theme.palette['grey-700']};
      }
    }
    ${(props): string | false =>
      !props.disabled &&
      `
    &:focus:active {
      background: ${props.theme.palette['grey-100']};
      color: ${props.theme.palette['blue-600']};
    }`}

    & {
      .ds-icon {
        height: 18px;
        display: flex;
        align-items: center;
      }
    }
    ${PrefixelWrapper} > .ds-icon > svg {
      ${(props): string | false =>
        !props.disabled &&
        `
          fill: ${props.theme.palette['grey-600']};
        `}
    }

    &:focus {
      color: ${(props): string => (props.description ? `${props.theme.palette['blue-600']} !important` : 'inherit')};
      ${ArrowRight} {
        opacity: 1;
        svg {
          fill: ${(props): string =>
            props.disabled ? props.theme.palette['grey-700'] : props.theme.palette['blue-600']};
        }
      }
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
        box-shadow: inset 0 0 0 2px ${(props): string => props.theme.palette.white};
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
          fill: ${(props): string =>
            props.disabled ? props.theme.palette['grey-600'] : props.theme.palette['blue-600']};
        }
      }
      ${(props): string | false =>
        !props.disabled &&
        `
        .ds-menu-prefix { ${IconContainer} > svg {
          fill: ${props.theme.palette['blue-600']} !important;
        }}
        color: ${props.theme.palette['blue-600']} !important;
        background: ${props.theme.palette['grey-050']};
      `}
    }
  }
`;

export const Content = styled.div<{ highlight?: boolean }>`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  line-height: 1.39;
  min-height: 18px;
  align-items: center;
  flex-wrap: wrap;
  user-select: none;

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

export const SuffixWraper = styled.div<{ disabled?: boolean; visible?: boolean }>`
  justify-content: flex-end;
  display: ${(props): string | false => (props.visible ? `flex` : `none`)};
  ${(props): string | false =>
    !!props.disabled &&
    `svg {
      fill:${props.theme.palette['grey-600']}
    }
  `};
  svg {
    margin-right: -4px;
  }
`;

export const ContentWrapper = styled.div`
  padding: 7px 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  user-select: none;
`;

export const ContentDivider = styled.div`
  flex: 1;
`;
