import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as React from 'react';
import MenuItem from 'antd/lib/menu/MenuItem';

type WrapperProps = {
  disabled?: boolean;
  checked?: boolean;
  danger?: boolean;
  prefixel?: React.ReactNode;
  pressed: boolean;
};

export const ArrowRight = styled.div`
  transition: all 0.3s ease-out;
  opacity: 0;
`;

export const Checked = styled.div`
  transition: all 0.3s ease-out;
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`;

export const prefixelWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
`;

export const Wrapper = styled(MenuItem)<WrapperProps>`
  &&& {
    color: ${(props): string => (props.danger ? props.theme.palette['red-600'] : props.theme.palette['grey-700'])};
    opacity: ${(props): string => (props.disabled ? '0.4' : '1')};
    cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
    background: ${(props): string =>
      props.pressed && !props.disabled ? `${props.theme.palette['grey-100']} !important` : ''};
    padding-right: ${(props): string => (props.checked ? '8px' : '12px')};
    font-weight: 500;
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin: 0;
    height: auto;
    transition: background-color 0.3s ease-out;

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

    &:active {
      background: none;

      ${ArrowRight} {
        opacity: 1;

        svg {
          fill: ${(props): string => props.theme.palette['blue-600']};
        }
      }

      ${Checked} {
        svg {
          fill: currentColor;
        }
      }
    }

    &:focus {
      box-shadow: inset 0 0 0 2px ${(props): string => props.theme.palette['blue-600']};

      ${ArrowRight} {
        opacity: 1;

        svg {
          fill: ${(props): string => props.theme.palette['blue-600']};
        }
      }

      ${Checked} {
        svg {
          fill: currentColor;
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

    ${prefixelWrapper} {
      svg {
        ${(props): string | false =>
          !props.disabled &&
          `
          fill: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['grey-600']};
        `}
      }
    }

    &:hover {
      ${ArrowRight} {
        opacity: 1;

        svg {
          fill: ${(props): string => props.theme.palette['blue-600']};
        }
      }
      ${(props): string | false =>
        !props.disabled &&
        `
        svg {
          fill: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
        }
        color: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
        background: ${props.danger ? props.theme.palette['red-050'] : props.theme.palette['grey-050']};
      `}
      ${Checked} {
        svg {
          fill: currentColor;
        }
      }
    }
  }
`;

export const Content = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  line-height: 1.39;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const Description = styled.div`
  color: ${(props): string => props.theme.palette['grey-600']};
  font-weight: normal;
  line-height: 1.39;
  font-size: 13px;
  width: 100%;
`;

export const SuffixWraper = styled.div`
  flex: 1;
  justify-content: flex-end;
  display: flex;
`;

export const ContentWrapper = styled.div<{ prefixel?: React.ReactNode; suffixel?: React.ReactNode }>`
  padding: 7px 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: ${(props): string => (props.suffixel ? 'wrap' : 'nowrap')};

  > div {
    padding-left: ${(props): string => (props.prefixel ? '12px' : '0')};
    width: 100%;
  }
`;

export const Inner = styled.div<{ prefixel?: React.ReactNode }>`
  transform: translateX(${(props): string => (props.prefixel ? '-4px' : '0')});
  width: ${(props): string => (props.prefixel ? 'calc(100% + 4px)' : '100%')};
  display: flex;
`;
