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
  active?: boolean;
  clickable?: boolean;
};

enum ItemSize {
  DEFAULT = 'default',
  LARGE = 'large',
}
const INDENT_LEVEL_STEP = 16;

const TRANSITION_FN = '0.2s ease-out';

const calculateIndent = (indentLevel: number | undefined): number => {
  const indentLevelPadding = indentLevel && Number(indentLevel) > 0 ? indentLevel * INDENT_LEVEL_STEP : 0;
  return indentLevelPadding;
};

const hiddenElementStyle = (): FlattenSimpleInterpolation => css`
  opacity: 0;
  pointer-events: none;
`;

const visibleElementStyle = (): FlattenSimpleInterpolation => css`
  opacity: 1;
  pointer-events: all;
`;

export const ArrowRight = styled.div<{ disabled?: boolean }>`
  transition: all ${TRANSITION_FN};
  opacity: ${(props): string => (props.disabled ? '1' : '0')};
`;

export const Inner = styled.div`
  width: 100%;
  display: flex;
`;

export const PrefixelWrapper = styled.div<{ disabled?: boolean; visible?: boolean; clickable?: boolean }>`
  display: flex;
  ${(props): FlattenSimpleInterpolation => (props.visible ? visibleElementStyle() : hiddenElementStyle())};
  transition: opacity ${TRANSITION_FN};
  margin-top: -7px;
  margin-bottom: -7px;
  margin-left: -4px;
  margin-right: 12px;
  align-items: center;
  ${(props): string | false => !!props.disabled && `svg {fill: ${props.theme.palette['grey-600']}};`}
  ${(props): string | false => !props.clickable && !props.disabled && '.ds-icon svg{ cursor:pointer; }'}
`;

const disableOrdering = (): FlattenSimpleInterpolation => css`
  &::before {
    content: none;
  }
`;

const applySizeStyles = (props: WrapperProps): FlattenSimpleInterpolation => {
  if (props.size === ItemSize.LARGE) {
    return css`
      &.large {
        min-height: 50px;
      }
    `;
  }
  if (props.size === ItemSize.DEFAULT && !props.description) {
    return css`
      &.default {
        max-height: 32px;
      }
    `;
  }
  return css``;
};
export const Wrapper = styled(MenuItem)<WrapperProps>`
  &&& {
    ${(props): string | false => !props.description && props.size === ItemSize.DEFAULT && `max-height: 32px;`}
    ${(props): string | false => props.size === ItemSize.LARGE && `min-height: 50px;`}
    ${(props): string | FlattenSimpleInterpolation => (props.ordered ? '' : disableOrdering())};
    color: ${(props): string => props.theme.palette['grey-700']};
    opacity: ${(props): string => (props.disabled ? '0.4' : '1')};
    cursor: ${(props): string =>
      // eslint-disable-next-line no-nested-ternary
      props.disabled ? 'not-allowed' : props.clickable ? 'pointer' : 'default'};
    padding-right: 12px;
    font-weight: 500;
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin: 0;
    height: auto;
    transition: background-color ${TRANSITION_FN};
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

    ${(props): undefined | FlattenSimpleInterpolation => props.size && applySizeStyles(props)}
    &.ant-menu-item-only-child {
      margin-bottom: 0px;
    }
    &.ant-menu-item-selected {
      background:transparent;
      ${(props): FlattenSimpleInterpolation | false =>
        !!props.clickable &&
        css`
          background: ${props.theme.palette['blue-050']};
          color: ${props.theme.palette['blue-600']};
          &::before {
            color: ${props.theme.palette['blue-600']};
          }
          &:focus,
          &:active {
            background: ${props.theme.palette['grey-050']};
            &::before {
              color: ${props.theme.palette['grey-600']};
            }
          }
        `}
      .ds-menu-prefix > .ds-icon > svg {
        fill: ${(props): string => props.theme.palette['blue-600']};
      }

      &::after {
        content: none;
      }
    }
    &.ant-menu-item-disabled,
    &.ant-menu-submenu-disabled {
      color: ${(props): string => props.theme.palette['grey-600']} !important;
      ${(props): string | false => !props.clickable && `background: ${props.theme.palette.white};`}
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
        !props.disabled && props.clickable && `inset 0 0 0 2px ${props.theme.palette['blue-600']} `};
      color: ${(props): string => props.theme.palette['grey-700']};
      ${(props): string | false =>
        !!props.clickable &&
        `
        background: ${props.description ? props.theme.palette.white : props.theme.palette['grey-050']};
        `}
      ${PrefixelWrapper} > .ds-icon > svg {
        fill: ${(props): string => props.theme.palette['grey-700']};
      }
    }
    
    ${(props): FlattenSimpleInterpolation | false =>
      !props.disabled &&
      css`
        &:focus:active,
        &:active {
          ${props.clickable && `background: ${props.theme.palette['grey-100']};`}
          && {
            color: ${props.theme.palette['blue-600']};

            .ds-menu-prefix {
              ${IconContainer} > svg {
                fill: ${props.theme.palette['blue-600']};
              }
            }
          }
        }
      `}
    
    ${(props): string | false =>
      !!props.clickable &&
      !props.disabled &&
      `
      &:active {
        && {
      background: ${props.theme.palette['blue-050']};
        }
      }
    `}

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
      color: ${(props): string =>
        props.description && props.clickable ? `${props.theme.palette['blue-600']} !important` : 'inherit'};
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

export const SuffixWraper = styled.div<{ disabled?: boolean; visible?: boolean; clickable?: boolean }>`
  justify-content: flex-end;
  display: flex;
  transition: opacity ${TRANSITION_FN};
  ${(props): FlattenSimpleInterpolation => (props.visible ? visibleElementStyle() : hiddenElementStyle())};
  ${(props): string | false =>
    !!props.disabled &&
    `svg {
      fill:${props.theme.palette['grey-600']}
    }
  `};
  svg {
    margin-right: -4px;
  }
  ${(props): string | false => !props.clickable && !props.disabled && 'cursor: pointer;'}
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
