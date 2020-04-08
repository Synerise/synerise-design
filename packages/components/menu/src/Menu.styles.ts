import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Menu } from 'antd';
import { Inner, SuffixWraper } from './Elements/Text/Text.styles';

type SubMenuProps = {
  ordered?: boolean | undefined;
  disabled?: boolean | undefined;
  danger?: boolean | undefined;
  prefixel?: React.ReactNode;
  title: string | React.ReactNode;
  childrenCollapsed?: boolean;
};

type AntdMenuProps = {
  ordered?: boolean | undefined;
};

export const prefixelWrapper = styled.div``;

export const AntdMenu = styled(Menu)<AntdMenuProps>`
  ${(props: AntdMenuProps & ThemeProps): FlattenSimpleInterpolation | false =>
    props.ordered !== undefined &&
    css`
      &,
      ul {
        counter-reset: custom-counter;

        li {
          counter-increment: custom-counter;

          &::before {
            content: '0' counter(custom-counter) '. \\a0';
            line-height: 1.39;
            font-weight: normal;
            color: ${props.theme.palette['grey-500']};
          }
        }

        li.ant-menu-submenu {
          &::before {
            content: '';
          }
        }
      }
    `}

  > li {
    > .ant-menu-submenu-title {
      padding-left: 12px !important;
    }
    &:not(.ant-menu-submenu) {
      padding-left: 12px !important;
    }
  }
`;

export const SubMenuItem = styled(SubMenu)<SubMenuProps>`
  &&& {
    color: ${(props): string => props.theme.palette['grey-700']};
    opacity: ${(props): string => (props.disabled ? '0.4' : '1')};
    cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
    font-weight: 500;
    border-radius: 3px;
    transition: background-color 0.3s ease-out;

    .ant-menu-submenu-title {
      line-height: 1.39;
      height: auto;
      margin: 0;
      padding-bottom: 7px;
      padding-top: 7px;
      max-width: 100%;

      ${(props: SubMenuProps & ThemeProps): FlattenSimpleInterpolation | false =>
        props.ordered !== undefined &&
        css`
          &::before {
            content: '0' counter(custom-counter) '. \\a0';
            line-height: 1.39;
            font-weight: normal;
            color: ${props.theme.palette['grey-500']};
          }
        `}
    }

    &:focus {
      border: 2px solid ${(props): string => props.theme.palette['blue-600']};
    }

    i {
      right: 12px;
    }

    .ant-menu-submenu-title {
      border-radius: 3px;
      color: ${(props): string =>
        props.childrenCollapsed ? props.theme.palette['grey-700'] : props.theme.palette['blue-600']};
      &:hover {
        color: ${(props): string => props.theme.palette['blue-600']};
        background: ${(props): string => props.theme.palette['grey-050']};
      }
    }

    > li.ant-menu-submenu {
      &:hover {
        background: none !important;
      }
    }
    ${(props): string =>
      props.disabled
        ? `
     > * {
        pointer-events:none;
     }`
        : ``}

    > ul {
      li {
        .ant-menu-submenu-title {
          text-indent: ${(props): string => (props.ordered ? '0' : '-24px')};
        }
      }
    }

    > ul {
      li {
        ${SuffixWraper} {
          transform: ${(props): string => (props.ordered ? 'translateX(0)' : 'translateX(24px)')};
        }
        ${Inner} {
          margin-left: ${(props): string => (props.ordered ? '0' : '-24px')};
        }
        i {
          right: ${(props): string => (props.ordered ? '12px' : '-12px')};
        }
        > .ant-menu-submenu {
          &:hover {
            ${(props): string | false =>
              !props.disabled &&
              `
              ${prefixelWrapper} {
                svg {
                  fill: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
                }
              }
              color: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
              background: ${props.danger ? props.theme.palette['red-050'] : props.theme.palette['grey-050']};
           `}
          }
        }
      }
    }
  }
`;
